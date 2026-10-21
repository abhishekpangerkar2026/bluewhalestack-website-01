import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wasl_fit/core/api.dart';
import 'package:wasl_fit/core/state.dart';
import 'package:wasl_fit/main.dart';

import 'fake_backend.dart';

Future<(FakeBackend, AppState)> boot(WidgetTester tester, {FakeBackend? backend, Map<String, Object> prefs = const {}}) async {
  SharedPreferences.setMockInitialValues(prefs);
  tester.view.physicalSize = const Size(390 * 2, 844 * 2);
  tester.view.devicePixelRatio = 2;
  addTearDown(tester.view.reset);
  final fake = backend ?? FakeBackend();
  final state = AppState(api: ApiClient(baseUrl: 'http://fake', client: fake.client));
  await tester.pumpWidget(WaslFitApp(state: state));
  await tester.pumpAndSettle();
  return (fake, state);
}

void main() {
  testWidgets('new resident signs up, links a lease and books a gym slot', (tester) async {
    final (fake, _) = await boot(tester);

    expect(find.text('Your community fitness, in one place.'), findsOneWidget);
    await tester.tap(find.widgetWithText(FilledButton, 'Create account'));
    await tester.pumpAndSettle();

    await tester.enterText(find.widgetWithText(TextFormField, 'Phone number'), '+971501234567');
    await tester.enterText(find.widgetWithText(TextFormField, 'Full name'), 'Layla Khan');
    await tester.enterText(find.widgetWithText(TextFormField, 'Password'), 'Sup3rSecret!');
    await tester.tap(find.widgetWithText(FilledButton, 'Create account'));
    await tester.pumpAndSettle();

    // No lease yet, so the app asks for one before showing anything else.
    expect(find.text('Confirm your home'), findsOneWidget);
    await tester.tap(find.text('Wasl 1'));
    await tester.pump();
    await tester.enterText(find.widgetWithText(TextField, 'Unit number'), '1204');
    await tester.pump();
    await tester.tap(find.widgetWithText(FilledButton, 'Continue'));
    await tester.pumpAndSettle();

    expect(find.text('Ready to move?'), findsOneWidget);
    expect(find.text('Wasl 1 · 1204'), findsOneWidget);
    expect(find.text('Wasl 1 Gym'), findsOneWidget);
    expect(find.text('18 / 60 inside'), findsOneWidget);
    expect(find.text('Nothing booked yet'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.calendar_month_outlined).last);
    await tester.pumpAndSettle();
    expect(find.text('Full'), findsOneWidget);
    expect(find.text('Women only'), findsOneWidget);

    await tester.tap(find.text('17 spots left').first);
    await tester.pump();
    await tester.tap(find.textContaining('Confirm booking'));
    await tester.pumpAndSettle();

    expect(find.text("You're booked"), findsOneWidget);
    expect(find.text('Wasl 1 Gym'), findsOneWidget);
    expect(fake.bookings, hasLength(1));
    expect(fake.requests, contains('POST /bookings/slot'));
  });

  testWidgets('a returning resident lands on home and can see bookings and cancel one', (tester) async {
    final fake = FakeBackend()
      ..leases.add({'id': 'l1', 'communityId': FakeBackend.communityId, 'community': 'Wasl 1', 'unit': '1204', 'endDate': '2027-01-01T00:00:00Z'});
    await boot(tester, backend: fake, prefs: {'token': 'tok'});
    expect(find.text('Ready to move?'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.calendar_month_outlined).last);
    await tester.pumpAndSettle();
    await tester.tap(find.text('17 spots left').first);
    await tester.pump();
    await tester.tap(find.textContaining('Confirm booking'));
    await tester.pumpAndSettle();
    await tester.tap(find.widgetWithText(FilledButton, 'View my bookings'));
    await tester.pumpAndSettle();

    expect(find.text('My bookings'), findsOneWidget);
    await tester.tap(find.widgetWithText(OutlinedButton, 'Cancel'));
    await tester.pumpAndSettle();
    await tester.tap(find.widgetWithText(TextButton, 'Cancel'));
    await tester.pumpAndSettle();
    expect(fake.bookings, isEmpty);
    expect(find.text('Nothing booked yet'), findsOneWidget);
  });

  testWidgets('trainer booking surfaces the insufficient-balance error from the API', (tester) async {
    final fake = FakeBackend()
      ..leases.add({'id': 'l1', 'communityId': FakeBackend.communityId, 'community': 'Wasl 1', 'unit': '1204', 'endDate': '2027-01-01T00:00:00Z'});
    await boot(tester, backend: fake, prefs: {'token': 'tok'});

    await tester.tap(find.byIcon(Icons.sports_gymnastics_outlined).last);
    await tester.pumpAndSettle();
    expect(find.text('Omar Hassan'), findsOneWidget);
    await tester.tap(find.text('Omar Hassan'));
    await tester.pumpAndSettle();
    expect(find.text('Certified and Wasl verified'), findsOneWidget);

    await tester.tap(find.byType(ChoiceChip).first);
    await tester.pump();
    await tester.tap(find.textContaining('Book session'));
    await tester.pumpAndSettle();
    expect(find.text('Insufficient wallet balance.'), findsOneWidget);
    expect(fake.bookings, isEmpty);
  });

  testWidgets('shows a retryable offline state instead of crashing', (tester) async {
    final fake = FakeBackend()
      ..leases.add({'id': 'l1', 'communityId': FakeBackend.communityId, 'community': 'Wasl 1', 'unit': '1204', 'endDate': '2027-01-01T00:00:00Z'});
    // The session restore (/me) succeeds; afterwards the network drops.
    await boot(tester, backend: fake, prefs: {'token': 'tok'});
    fake.offline = true;
    await tester.tap(find.byIcon(Icons.emoji_events_outlined).last);
    await tester.pumpAndSettle();
    expect(find.text('You are offline'), findsOneWidget);

    fake.offline = false;
    await tester.tap(find.widgetWithText(OutlinedButton, 'Retry'));
    await tester.pumpAndSettle();
    expect(find.text('October challenge'.toUpperCase()), findsOneWidget);
  });

  testWidgets('Arabic switches the layout to right-to-left', (tester) async {
    final fake = FakeBackend()
      ..leases.add({'id': 'l1', 'communityId': FakeBackend.communityId, 'community': 'Wasl 1', 'unit': '1204', 'endDate': '2027-01-01T00:00:00Z'});
    await boot(tester, backend: fake, prefs: {'token': 'tok', 'lang': 'ar'});
    expect(find.text('جاهز للتمرين؟'), findsOneWidget);
    final dir = Directionality.of(tester.element(find.text('جاهز للتمرين؟')));
    expect(dir, TextDirection.rtl);
  });
}
