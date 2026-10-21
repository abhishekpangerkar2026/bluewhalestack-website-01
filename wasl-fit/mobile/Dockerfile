# Builds the Flutter web app and serves it with nginx (Railway sets $PORT).
# Flutter is installed at the exact version the app was developed and tested with.
FROM debian:bookworm-slim AS build
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl git unzip xz-utils ca-certificates \
 && rm -rf /var/lib/apt/lists/*
ARG FLUTTER_VERSION=3.47.7
RUN curl -fsSL "https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_${FLUTTER_VERSION}-stable.tar.xz" \
  | tar -xJ -C /opt
ENV PATH="/opt/flutter/bin:${PATH}" FLUTTER_SUPPRESS_ANALYTICS=true CI=true
RUN git config --global --add safe.directory /opt/flutter \
 && flutter config --no-analytics \
 && flutter precache --web

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
