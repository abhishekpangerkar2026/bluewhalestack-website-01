import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../core/l10n.dart';
import '../core/models.dart';
import '../core/state.dart';
import '../core/theme.dart';
import '../core/widgets.dart';

Future<List<Facility>> loadFacilities(AppState s) async {
  final id = s.communityId;
  if (id == null) return [];
  final rows = await s.api.get('/communities/$id/facilities') as List;
  return rows.map((e) => Facility.fromJson(e)).toList();
}

Future<List<BookingInfo>> loadBookings(AppState s) async =>
    ((await s.api.get('/bookings/mine')) as List).map((e) => BookingInfo.fromJson(e)).toList();

class _HomeData {
  _HomeData(this.bookings, this.gym, this.occupancy, this.trainers);
  final List<BookingInfo> bookings;
  final Facility? gym;
  final Occupancy? occupancy;
  final List<TrainerSummary> trainers;
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  Future<_HomeData> _load(AppState s) async {
    final bookingsF = loadBookings(s);
    final facilities = await loadFacilities(s);
    final gym = facilities.where((f) => f.type == 'Gym').firstOrNull;
    final occF = gym == null ? Future.value(null) : s.api.get('/facilities/${gym.id}/occupancy');
    final trainersF = s.api.get('/trainers');
    final occ = await occF;
    return _HomeData(
      await bookingsF,
      gym,
      occ == null ? null : Occupancy.fromJson(occ),
      ((await trainersF) as List).map((e) => TrainerSummary.fromJson(e)).toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    final lease = context.select<AppState, Lease?>((x) => x.activeLease);
    return SafeArea(
      child: AsyncView<_HomeData>(
        load: () => _load(s),
        builder: (context, d, _) {
          final next = d.bookings.where((b) => b.isUpcoming).firstOrNull;
          return ListView(padding: const EdgeInsets.fromLTRB(20, 16, 20, 24), children: [
            Row(children: [
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('${context.tr('Good morning')}, ${s.firstName}', style: Theme.of(context).textTheme.bodySmall?.copyWith(fontSize: 13)),
                  const SizedBox(height: 2),
                  Text(context.tr('Ready to move?'), style: Theme.of(context).textTheme.headlineSmall),
                ]),
              ),
              InkWell(
                onTap: () => context.go('/profile'),
                customBorder: const CircleBorder(),
                child: Avatar(s.firstName.isEmpty ? '?' : s.firstName[0].toUpperCase(), size: 44, bg: Palette.ink, fg: Colors.white),
              ),
            ]),
            const SizedBox(height: 16),
            if (lease != null)
              WCard(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                onTap: s.leases.length > 1 ? () => _pickCommunity(context, s) : null,
                child: Row(children: [
                  const Icon(Icons.place_outlined, color: Palette.teal, size: 20),
                  const SizedBox(width: 10),
                  Expanded(child: Text('${lease.community} · ${lease.unit}', style: const TextStyle(fontWeight: FontWeight.w600))),
                  if (s.leases.length > 1) const Icon(Icons.unfold_more_rounded, color: Palette.muted),
                ]),
              ),
            const SizedBox(height: 16),
            _NextBooking(next: next),
            const SizedBox(height: 16),
            if (d.gym != null && d.occupancy != null) _GymStatus(gym: d.gym!, occ: d.occupancy!),
            const SizedBox(height: 8),
            SectionTitle(context.tr('Quick actions')),
            Row(children: [
              _Action(Icons.calendar_month_outlined, context.tr('Book'), () => context.go('/book')),
              _Action(Icons.person_outline_rounded, context.tr('Trainers'), () => context.go('/trainers')),
              _Action(Icons.emoji_events_outlined, context.tr('Challenge'), () => context.go('/compete')),
              _Action(Icons.account_balance_wallet_outlined, context.tr('Wallet'), () => context.push('/wallet')),
            ]),
            SectionTitle(context.tr('Top trainers near you'), action: context.tr('See all'), onAction: () => context.go('/trainers')),
            SizedBox(
              height: 92,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: d.trainers.take(5).length,
                separatorBuilder: (_, _) => const SizedBox(width: 12),
                itemBuilder: (context, i) {
                  final t = d.trainers[i];
                  return SizedBox(
                    width: 190,
                    child: WCard(
                      onTap: () => context.push('/trainer/${t.id}'),
                      padding: const EdgeInsets.all(12),
                      child: Row(children: [
                        Avatar(t.initials, size: 44),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(t.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.w700)),
                            Text('${t.speciality} · ${t.rating}', style: Theme.of(context).textTheme.bodySmall),
                          ]),
                        ),
                      ]),
                    ),
                  );
                },
              ),
            ),
          ]);
        },
      ),
    );
  }

  void _pickCommunity(BuildContext context, AppState s) {
    showModalBottomSheet(
      context: context,
      showDragHandle: true,
      builder: (_) => SafeArea(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          for (final l in s.leases)
            ListTile(
              title: Text('${l.community} · ${l.unit}'),
              trailing: l.communityId == s.communityId ? const Icon(Icons.check_rounded, color: Palette.teal) : null,
              onTap: () {
                s.selectCommunity(l.communityId);
                Navigator.pop(context);
              },
            ),
        ]),
      ),
    );
  }
}

class _NextBooking extends StatelessWidget {
  const _NextBooking({required this.next});
  final BookingInfo? next;

  @override
  Widget build(BuildContext context) {
    final n = next;
    if (n == null) {
      return WCard(
        child: Row(children: [
          const Icon(Icons.event_available_outlined, color: Palette.muted, size: 30),
          const SizedBox(width: 14),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(context.tr('Nothing booked yet'), style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
              Text(context.tr('Reserve a gym slot or book a trainer.'), style: Theme.of(context).textTheme.bodySmall),
            ]),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(0, 40), padding: const EdgeInsets.symmetric(horizontal: 16)),
            onPressed: () => context.go('/book'),
            child: Text(context.tr('Book')),
          ),
        ]),
      );
    }
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(color: Palette.ink, borderRadius: BorderRadius.circular(20)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text(context.tr('Next booking').toUpperCase(), style: const TextStyle(color: Palette.amber, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: .6))),
          Pill(fmtDay(n.startsAt), bg: Colors.white24, fg: Colors.white),
        ]),
        const SizedBox(height: 10),
        Text(n.isTrainer ? 'Session with ${n.title}' : n.title, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
        const SizedBox(height: 4),
        Text(fmtRange(n.startsAt, n.endsAt), style: const TextStyle(color: Color(0xFFC9D2E0), fontSize: 14)),
        const SizedBox(height: 14),
        FilledButton(
          style: FilledButton.styleFrom(backgroundColor: Palette.amber, foregroundColor: Palette.ink, minimumSize: const Size.fromHeight(46)),
          onPressed: () => context.push('/confirm', extra: n),
          child: Text(context.tr('Show entry QR')),
        ),
      ]),
    );
  }
}

class _GymStatus extends StatelessWidget {
  const _GymStatus({required this.gym, required this.occ});
  final Facility gym;
  final Occupancy occ;

  @override
  Widget build(BuildContext context) {
    final color = switch (occ.level) {
      'Busy' => (Palette.amberSoft, Palette.amberInk),
      'Moderate' => (Palette.amberSoft, Palette.amberInk),
      _ => (Palette.tealSoft, Palette.teal),
    };
    return WCard(
      onTap: () => context.push('/gym/${gym.id}', extra: gym),
      child: Row(children: [
        Container(
          width: 52,
          height: 52,
          decoration: BoxDecoration(color: Palette.tealSoft, borderRadius: BorderRadius.circular(14)),
          child: const Icon(Icons.fitness_center_rounded, color: Palette.teal),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(gym.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
            Text('${occ.inside} / ${occ.capacity} ${context.tr('inside')}', style: Theme.of(context).textTheme.bodySmall),
          ]),
        ),
        Pill(context.tr(occ.level), bg: color.$1, fg: color.$2),
      ]),
    );
  }
}

class _Action extends StatelessWidget {
  const _Action(this.icon, this.label, this.onTap);
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Expanded(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: WCard(
            onTap: onTap,
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 4),
            child: Column(children: [
              Icon(icon, color: Palette.teal),
              const SizedBox(height: 8),
              Text(label, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
            ]),
          ),
        ),
      );
}
