import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:http/testing.dart';

/// In-memory stand-in for the Wasl Fit API, mirroring its routes and
/// response shapes, so the app can be exercised end to end in tests.
class FakeBackend {
  FakeBackend({this.offline = false});

  bool offline;
  final List<Map<String, dynamic>> leases = [];
  final List<Map<String, dynamic>> bookings = [];
  double wallet = 0;
  String role = 'Resident';
  final requests = <String>[];

  static const communityId = 'c1';
  static const facilityId = 'f1';
  static final _start = DateTime.now().toUtc().add(const Duration(hours: 5)).copyWith(minute: 0, second: 0, millisecond: 0, microsecond: 0);

  MockClient get client => MockClient(_handle);

  http.Response _json(Object body, [int status = 200]) =>
      http.Response(jsonEncode(body), status, headers: {'content-type': 'application/json'});

  Future<http.Response> _handle(http.Request r) async {
    if (offline) throw http.ClientException('offline');
    final path = r.url.path;
    requests.add('${r.method} $path');
    final body = r.body.isEmpty ? <String, dynamic>{} : jsonDecode(r.body) as Map<String, dynamic>;

    switch ((r.method, path)) {
      case ('POST', '/auth/register'):
      case ('POST', '/auth/login'):
        return _json({'token': 'tok', 'user': {'id': 'u1', 'name': body['name'] ?? 'Layla Khan', 'role': role}});
      case ('GET', '/me'):
        return _json({'id': 'u1', 'name': 'Layla Khan', 'phone': '+971501234567', 'role': role, 'leases': leases});
      case ('GET', '/communities'):
        return _json([
          {'id': communityId, 'name': 'Wasl 1', 'area': 'Al Satwa'},
          {'id': 'c2', 'name': 'Wasl Green Park', 'area': 'Ras Al Khor'},
        ]);
      case ('POST', '/me/leases'):
        leases
          ..clear()
          ..add({'id': 'l1', 'communityId': body['communityId'], 'community': 'Wasl 1', 'unit': body['unit'], 'endDate': '2027-01-01T00:00:00Z'});
        return http.Response('', 204);
      case ('GET', '/communities/$communityId/facilities'):
        return _json([
          {'id': facilityId, 'name': 'Wasl 1 Gym', 'type': 'Gym', 'capacity': 60},
        ]);
      case ('GET', '/facilities/$facilityId/occupancy'):
        return _json({'capacity': 60, 'inside': 18, 'level': 'Quiet'});
      case ('GET', '/facilities/$facilityId/slots'):
        return _json([
          for (var i = 0; i < 3; i++)
            {
              'id': 's$i',
              'startsAt': _start.add(Duration(hours: i)).toIso8601String(),
              'endsAt': _start.add(Duration(hours: i + 1)).toIso8601String(),
              'audience': i == 0 ? 'Women' : 'Mixed',
              'priceAed': 0,
              'capacity': 20,
              'booked': i == 2 ? 20 : 3,
              'spotsLeft': i == 2 ? 0 : 17,
            },
        ]);
      case ('GET', '/trainers'):
        return _json([
          {'id': 't1', 'name': 'Omar Hassan', 'speciality': 'Strength', 'languages': 'English, Arabic', 'rateAed': 180, 'rating': 4.9, 'reviewCount': 128},
          {'id': 't2', 'name': 'Sara Al Ali', 'speciality': 'Yoga', 'languages': 'English, Arabic', 'rateAed': 150, 'rating': 4.8, 'reviewCount': 96},
        ]);
      case ('GET', '/trainers/t1'):
        return _json({
          'id': 't1', 'name': 'Omar Hassan', 'speciality': 'Strength', 'languages': 'English, Arabic', 'bio': 'Strength coach.',
          'rateAed': 180, 'rating': 4.9, 'reviewCount': 128, 'verified': true, 'communityId': communityId,
        });
      case ('GET', '/trainers/t1/availability'):
        return _json([
          for (var i = 0; i < 3; i++) {'startsAt': _start.add(Duration(hours: i + 3)).toIso8601String(), 'available': i != 1},
        ]);
      case ('POST', '/bookings/slot'):
        final slot = body['slotId'] as String;
        final i = int.parse(slot.substring(1));
        final b = {
          'id': 'b${bookings.length + 1}',
          'startsAt': _start.add(Duration(hours: i)).toIso8601String(),
          'endsAt': _start.add(Duration(hours: i + 1)).toIso8601String(),
          'priceAed': 0,
          'status': 'Confirmed',
          'qrToken': 'QR-${bookings.length + 1}',
          'kind': 'Slot',
          'trainer': null,
          'facility': 'Wasl 1 Gym',
        };
        bookings.add(b);
        return _json(b);
      case ('POST', '/bookings/trainer'):
        if (wallet < 180) return _json({'title': 'Payment Required', 'status': 402, 'detail': 'Insufficient wallet balance.'}, 402);
        wallet -= 180;
        final b = {
          'id': 'b${bookings.length + 1}',
          'startsAt': body['startsAt'],
          'endsAt': DateTime.parse(body['startsAt']).add(const Duration(hours: 1)).toIso8601String(),
          'priceAed': 180,
          'status': 'Confirmed',
          'qrToken': 'QR-${bookings.length + 1}',
          'kind': 'Trainer',
          'trainer': 'Omar Hassan',
          'facility': null,
        };
        bookings.add(b);
        return _json(b);
      case ('GET', '/bookings/mine'):
        return _json(bookings);
      case ('GET', '/wallet'):
        return _json({'balanceAed': wallet, 'transactions': []});
      case ('POST', '/wallet/topup'):
        wallet += (body['amountAed'] as num).toDouble();
        return _json({'balanceAed': wallet});
      case ('GET', '/challenges/current'):
        return _json({
          'title': 'October challenge',
          'endsAt': DateTime.now().toUtc().add(const Duration(days: 11)).toIso8601String(),
          'goal': 20,
          'myWorkouts': 3,
          'communities': [
            {'communityId': communityId, 'name': 'Wasl 1', 'workouts': 54},
            {'communityId': 'c2', 'name': 'Wasl Green Park', 'workouts': 46},
          ],
          'leaderboard': [
            {'rank': 1, 'name': 'Khalid M.', 'workouts': 12, 'isMe': false},
            {'rank': 2, 'name': 'Layla K.', 'workouts': 3, 'isMe': true},
          ],
        });
    }
    if (r.method == 'DELETE' && path.startsWith('/bookings/')) {
      bookings.removeWhere((b) => path.endsWith(b['id'] as String));
      return _json({'refunded': false});
    }
    return _json({'title': 'Not Found', 'status': 404, 'detail': 'No such route: ${r.method} $path'}, 404);
  }
}
