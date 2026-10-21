using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WaslFit.Api;

public class TokenService(string secret)
{
    private readonly SigningCredentials _creds =
        new(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)), SecurityAlgorithms.HmacSha256);

    public string Create(User user)
    {
        var token = new JwtSecurityToken(
            claims:
            [
                new Claim("sub", user.Id.ToString()),
                new Claim("name", user.Name),
                new Claim("role", user.Role.ToString()),
            ],
            expires: DateTime.UtcNow.AddDays(14),
            signingCredentials: _creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public static class PrincipalExtensions
{
    public static Guid UserId(this ClaimsPrincipal p) => Guid.Parse(p.FindFirstValue("sub")!);
}
