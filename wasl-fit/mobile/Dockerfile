# Builds the Flutter web app and serves it with nginx (Railway sets $PORT).
FROM ghcr.io/cirruslabs/flutter:stable AS build
WORKDIR /app
COPY pubspec.yaml pubspec.lock ./
RUN flutter pub get
COPY . .
ARG API_URL=https://api-production-11c6f.up.railway.app
RUN flutter build web --release --no-web-resources-cdn --dart-define=API_URL=${API_URL}

FROM nginx:1.27-alpine
ENV PORT=8080
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/build/web /usr/share/nginx/html
