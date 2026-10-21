import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'core/l10n.dart';
import 'core/models.dart';
import 'core/state.dart';
import 'screens/account_screens.dart';
import 'screens/auth_screens.dart';
import 'screens/book_screens.dart';
import 'screens/home_screen.dart';
import 'screens/staff_screens.dart';
import 'screens/trainer_screens.dart';

const _authPaths = {'/welcome', '/login', '/register'};

String homeFor(AppState s) => s.isTrainer ? '/today' : (s.role == 'Staff' ? '/scan' : '/home');

GoRouter buildRouter(AppState state) {
  return GoRouter(
    initialLocation: '/home',
    refreshListenable: state,
    redirect: (context, routerState) {
      final loc = routerState.uri.path;
      if (!state.ready) return null;
      if (!state.isSignedIn) return _authPaths.contains(loc) ? null : '/welcome';
      if (_authPaths.contains(loc)) return state.isResident && !state.hasLease ? '/lease' : homeFor(state);
      if (state.isResident && !state.hasLease) return loc == '/lease' ? null : '/lease';
      if (loc == '/lease') return homeFor(state);
      return null;
    },
    routes: [
      GoRoute(path: '/welcome', builder: (_, _) => const WelcomeScreen()),
      GoRoute(path: '/login', builder: (_, _) => const AuthScreen(register: false)),
      GoRoute(path: '/register', builder: (_, _) => const AuthScreen(register: true)),
      GoRoute(path: '/lease', builder: (_, _) => const LeaseScreen()),
      ShellRoute(
        builder: (context, routerState, child) => AppShell(location: routerState.uri.path, child: child),
        routes: [
          GoRoute(path: '/home', builder: (_, _) => const HomeScreen()),
          GoRoute(path: '/book', builder: (_, _) => const BookScreen()),
          GoRoute(path: '/trainers', builder: (_, _) => const TrainersScreen()),
          GoRoute(path: '/compete', builder: (_, _) => const CompeteScreen()),
          GoRoute(path: '/profile', builder: (_, _) => const ProfileScreen()),
          GoRoute(path: '/today', builder: (_, _) => const TrainerTodayScreen()),
          GoRoute(path: '/scan', builder: (_, _) => const CheckInScreen()),
        ],
      ),
      GoRoute(
        path: '/gym/:id',
        builder: (_, st) => GymScreen(facilityId: st.pathParameters['id']!, facility: st.extra as Facility?),
      ),
      GoRoute(path: '/trainer/:id', builder: (_, st) => TrainerScreen(trainerId: st.pathParameters['id']!)),
      GoRoute(
        path: '/confirm',
        builder: (_, st) => st.extra is BookingInfo ? ConfirmScreen(booking: st.extra as BookingInfo) : const _Redirect('/bookings'),
      ),
      GoRoute(path: '/bookings', builder: (_, _) => const BookingsScreen()),
      GoRoute(path: '/wallet', builder: (_, _) => const WalletScreen()),
    ],
  );
}

class _Redirect extends StatelessWidget {
  const _Redirect(this.to);
  final String to;

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) => context.go(to));
    return const Scaffold(body: Center(child: CircularProgressIndicator()));
  }
}

class _Dest {
  const _Dest(this.path, this.icon, this.selected, this.label);
  final String path;
  final IconData icon, selected;
  final String label;
}

/// Bottom navigation that adapts to the signed-in role.
class AppShell extends StatelessWidget {
  const AppShell({super.key, required this.location, required this.child});
  final String location;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final s = context.watch<AppState>();
    final dests = s.isTrainer
        ? const [
            _Dest('/today', Icons.today_outlined, Icons.today_rounded, 'Today'),
            _Dest('/scan', Icons.qr_code_scanner_rounded, Icons.qr_code_scanner_rounded, 'Scan'),
            _Dest('/profile', Icons.person_outline_rounded, Icons.person_rounded, 'Profile'),
          ]
        : s.role == 'Staff'
            ? const [
                _Dest('/scan', Icons.qr_code_scanner_rounded, Icons.qr_code_scanner_rounded, 'Scan'),
                _Dest('/profile', Icons.person_outline_rounded, Icons.person_rounded, 'Profile'),
              ]
            : const [
                _Dest('/home', Icons.home_outlined, Icons.home_rounded, 'Home'),
                _Dest('/book', Icons.calendar_month_outlined, Icons.calendar_month_rounded, 'Book'),
                _Dest('/trainers', Icons.sports_gymnastics_outlined, Icons.sports_gymnastics_rounded, 'Trainers'),
                _Dest('/compete', Icons.emoji_events_outlined, Icons.emoji_events_rounded, 'Compete'),
                _Dest('/profile', Icons.person_outline_rounded, Icons.person_rounded, 'Profile'),
              ];
    final index = dests.indexWhere((d) => location.startsWith(d.path)).clamp(0, dests.length - 1);
    return Scaffold(
      body: child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: index,
        onDestinationSelected: (i) => context.go(dests[i].path),
        destinations: [
          for (final d in dests)
            NavigationDestination(icon: Icon(d.icon), selectedIcon: Icon(d.selected, color: const Color(0xFF0B7A75)), label: context.tr(d.label)),
        ],
      ),
    );
  }
}
