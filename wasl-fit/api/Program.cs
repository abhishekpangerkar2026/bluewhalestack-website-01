using System.Text;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;
using WaslFit.Api;

var builder = WebApplication.CreateBuilder(args);

var jwtSecret = builder.Configuration["JWT_SECRET"]
    ?? (builder.Environment.IsDevelopment()
        ? "dev-only-secret-change-me-at-least-32-bytes!!"
        : throw new InvalidOperationException("JWT_SECRET is required outside Development"));

builder.Services.AddDbContext<AppDb>(o => o.UseNpgsql(ConnectionString(builder.Configuration)));

builder.Services.AddSingleton(new TokenService(jwtSecret));
builder.Services
    .AddAuthentication(Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.MapInboundClaims = false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            RoleClaimType = "role",
            NameClaimType = "sub",
            ClockSkew = TimeSpan.FromMinutes(1),
        };
    });
builder.Services.AddAuthorization();

builder.Services.ConfigureHttpJsonOptions(o => o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.SwaggerDoc("v1", new OpenApiInfo { Title = "Wasl Fit API", Version = "v1" });
    o.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http, Scheme = "bearer", BearerFormat = "JWT", In = ParameterLocation.Header,
    });
    o.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        [new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } }] = Array.Empty<string>(),
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    await Seed.RunAsync(scope.ServiceProvider.GetRequiredService<AppDb>());
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health", () => Results.Ok(new { status = "ok", time = DateTime.UtcNow })).AllowAnonymous();
app.MapGet("/", () => Results.Redirect("/swagger")).ExcludeFromDescription();

ApiRoutes.Map(app);

app.Run();

// Railway injects DATABASE_URL (postgresql://user:pass@host:port/db); locally use ConnectionStrings:Default.
static string ConnectionString(IConfiguration config)
{
    var url = config["DATABASE_URL"];
    if (string.IsNullOrWhiteSpace(url))
    {
        return config.GetConnectionString("Default")
            ?? "Host=localhost;Database=waslfit;Username=postgres;Password=postgres";
    }

    var uri = new Uri(url);
    var info = uri.UserInfo.Split(':', 2);
    return new NpgsqlConnectionStringBuilder
    {
        Host = uri.Host,
        Port = uri.Port > 0 ? uri.Port : 5432,
        Database = uri.AbsolutePath.Trim('/'),
        Username = Uri.UnescapeDataString(info[0]),
        Password = info.Length > 1 ? Uri.UnescapeDataString(info[1]) : "",
        SslMode = SslMode.Prefer,
    }.ConnectionString;
}
