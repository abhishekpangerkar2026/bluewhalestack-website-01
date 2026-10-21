import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'models.dart';

/// Session state: who is signed in, which lease they hold, and UI language.
class AppState extends ChangeNotifier {
  AppState({ApiClient? api}) : api = api ?? ApiClient();

  final ApiClient api;
  SharedPreferences? _prefs;

  bool ready = false;
  Map<String, dynamic>? user;
  List<Lease> leases = [];
  Locale locale = const Locale('en');
  String? communityId;

  bool get isSignedIn => user != null;
  String get role => (user?['role'] as String?) ?? 'Resident';
  bool get isResident => role == 'Resident' || role == 'Admin';
  bool get isTrainer => role == 'Trainer';
  bool get isStaff => role == 'Staff' || role == 'Admin';
  bool get hasLease => leases.isNotEmpty;
  String get firstName => ((user?['name'] as String?) ?? '').split(' ').first;
  bool get isArabic => locale.languageCode == 'ar';

  Lease? get activeLease {
    if (leases.isEmpty) return null;
    return leases.firstWhere((l) => l.communityId == communityId, orElse: () => leases.first);
  }

  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
    final lang = _prefs!.getString('lang');
    if (lang != null) locale = Locale(lang);
    communityId = _prefs!.getString('community');
    api.token = _prefs!.getString('token');
    if (api.token != null) {
      try {
        await refreshMe();
      } on ApiException catch (e) {
        if (e.status == 401) await _clearSession();
      }
    }
    ready = true;
    notifyListeners();
  }

  Future<void> login(String phone, String password) async {
    final res = await api.post('/auth/login', {'phone': phone, 'password': password});
    await _startSession(res);
  }

  Future<void> register(String phone, String name, String password) async {
    final res = await api.post('/auth/register', {'phone': phone, 'name': name, 'password': password});
    await _startSession(res);
  }

  Future<void> _startSession(dynamic res) async {
    api.token = res['token'] as String;
    await _prefs?.setString('token', api.token!);
    await refreshMe();
    notifyListeners();
  }

  Future<void> refreshMe() async {
    final me = await api.get('/me') as Map<String, dynamic>;
    user = me;
    leases = (me['leases'] as List).map((e) => Lease.fromJson(e)).toList();
    if (leases.isNotEmpty && !leases.any((l) => l.communityId == communityId)) {
      communityId = leases.first.communityId;
    }
    notifyListeners();
  }

  Future<void> linkLease(String community, String unit) async {
    await api.post('/me/leases', {'communityId': community, 'unit': unit});
    communityId = community;
    await _prefs?.setString('community', community);
    await refreshMe();
  }

  Future<void> selectCommunity(String id) async {
    communityId = id;
    await _prefs?.setString('community', id);
    notifyListeners();
  }

  Future<void> setLocale(Locale l) async {
    locale = l;
    await _prefs?.setString('lang', l.languageCode);
    notifyListeners();
  }

  Future<void> logout() async {
    await _clearSession();
    notifyListeners();
  }

  Future<void> _clearSession() async {
    api.token = null;
    user = null;
    leases = [];
    await _prefs?.remove('token');
  }
}
