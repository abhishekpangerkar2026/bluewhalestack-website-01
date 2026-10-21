import 'dart:convert';

import 'package:http/http.dart' as http;

/// Override at build time: --dart-define=API_URL=https://...
const defaultApiUrl = String.fromEnvironment(
  'API_URL',
  defaultValue: 'https://api-production-11c6f.up.railway.app',
);

class ApiException implements Exception {
  ApiException(this.message, {this.status, this.offline = false});
  final String message;
  final int? status;
  final bool offline;

  @override
  String toString() => message;
}

class ApiClient {
  ApiClient({String? baseUrl, http.Client? client})
      : baseUrl = baseUrl ?? defaultApiUrl,
        _client = client ?? http.Client();

  final String baseUrl;
  final http.Client _client;
  String? token;

  Uri _uri(String path, [Map<String, String>? query]) =>
      Uri.parse('$baseUrl$path').replace(queryParameters: query?.isEmpty ?? true ? null : query);

  Map<String, String> get _headers => {
        'content-type': 'application/json',
        if (token != null) 'authorization': 'Bearer $token',
      };

  Future<dynamic> get(String path, {Map<String, String>? query}) =>
      _send(() => _client.get(_uri(path, query), headers: _headers));

  Future<dynamic> post(String path, [Object? body]) =>
      _send(() => _client.post(_uri(path), headers: _headers, body: body == null ? null : jsonEncode(body)));

  Future<dynamic> delete(String path) => _send(() => _client.delete(_uri(path), headers: _headers));

  Future<dynamic> _send(Future<http.Response> Function() call) async {
    final http.Response res;
    try {
      res = await call().timeout(const Duration(seconds: 20));
    } on Exception {
      throw ApiException('You appear to be offline. Check your connection and try again.', offline: true);
    }
    final body = res.body.isEmpty ? null : _tryDecode(res.body);
    if (res.statusCode >= 200 && res.statusCode < 300) return body;
    final detail = body is Map ? (body['detail'] ?? body['title']) as String? : null;
    throw ApiException(detail ?? 'Something went wrong (${res.statusCode}).', status: res.statusCode);
  }

  dynamic _tryDecode(String s) {
    try {
      return jsonDecode(s);
    } on FormatException {
      return null;
    }
  }
}
