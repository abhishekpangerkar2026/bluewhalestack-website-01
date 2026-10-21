import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../core/l10n.dart';
import '../core/models.dart';
import '../core/state.dart';
import '../core/theme.dart';
import '../core/widgets.dart';
import 'home_screen.dart';

class ConfirmScreen extends StatelessWidget {
  const ConfirmScreen({super.key, required this.booking});
  final BookingInfo booking;

  @override
  Widget build(BuildContext context) {
    final b = booking;
    return Scaffold(
      appBar: AppBar(leading: CloseButton(onPressed: () => context.canPop() ? context.pop() : context.go('/home'))),
      body: SafeArea(
        child: ListView(padding: const EdgeInsets.all(20), children: [
          Center(
            child: Container(
              width: 64,
              height: 64,
              decoration: const BoxDecoration(color: Palette.teal, shape: BoxShape.circle),
              child: const Icon(Icons.check_rounded, color: Colors.white, size: 36),
            ),
          ),
          const SizedBox(height: 12),
          Center(child: Text(context.tr("You're booked"), style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontSize: 24))),
          const SizedBox(height: 4),
          Center(child: Text(context.tr('Show this code at the entrance'), style: Theme.of(context).textTheme.bodySmall)),
          const SizedBox(height: 20),
          WCard(
            padding: const EdgeInsets.all(22),
            child: Column(children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Palette.line)),
                child: QrImageView(data: b.qrToken, size: 200, eyeStyle: const QrEyeStyle(color: Palette.ink, eyeShape: QrEyeShape.square)),
              ),
              const SizedBox(height: 16),
              Text(b.isTrainer ? 'Session with ${b.title}' : b.title, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
              const SizedBox(height: 4),
              Text(fmtDayTime(b.startsAt), style: Theme.of(context).textTheme.bodySmall?.copyWith(fontSize: 14)),
              const Divider(height: 28, color: Palette.line),
              Row(children: [
                Text(context.tr('Paid'), style: Theme.of(context).textTheme.bodySmall),
                const Spacer(),
                Text(b.price == 0 ? context.tr('Free') : aed(b.price), style: const TextStyle(fontWeight: FontWeight.w700)),
              ]),
            ]),
          ),
          const SizedBox(height: 20),
          FilledButton(onPressed: () => context.go('/bookings'), child: Text(context.tr('View my bookings'))),
        ]),
      ),
    );
  }
}

class BookingsScreen extends StatefulWidget {
  const BookingsScreen({super.key});

  @override
  State<BookingsScreen> createState() => _BookingsScreenState();
}

class _BookingsScreenState extends State<BookingsScreen> {
  bool _upcoming = true;
  int _reload = 0;

  Future<void> _cancel(BookingInfo b) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(context.tr('Cancel booking?')),
        content: Text(context.tr('Cancelling within 2 hours of the start is not refunded.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(c, false), child: Text(context.tr('Keep it'))),
          TextButton(onPressed: () => Navigator.pop(c, true), child: Text(context.tr('Cancel'), style: const TextStyle(color: Palette.danger))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await context.read<AppState>().api.delete('/bookings/${b.id}');
      if (!mounted) return;
      showInfo(context, context.trRead('Booking cancelled'));
      setState(() => _reload++);
    } catch (e) {
      if (mounted) showError(context, e);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('My bookings'))),
      body: Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 4, 20, 12),
          child: SegmentedButton<bool>(
            segments: [
              ButtonSegment(value: true, label: Text(context.tr('Upcoming'))),
              ButtonSegment(value: false, label: Text(context.tr('Past'))),
            ],
            selected: {_upcoming},
            onSelectionChanged: (v) => setState(() => _upcoming = v.first),
          ),
        ),
        Expanded(
          child: AsyncView<List<BookingInfo>>(
            key: ValueKey('bookings-$_reload'),
            load: () => loadBookings(s),
            builder: (context, all, _) {
              final rows = all.where((b) => b.isUpcoming == _upcoming).toList();
              if (!_upcoming) rows.sort((a, b) => b.startsAt.compareTo(a.startsAt));
              if (rows.isEmpty) {
                return ListView(children: [
                  SizedBox(
                    height: 360,
                    child: EmptyState(
                      icon: Icons.event_available_outlined,
                      title: context.tr('Nothing booked yet'),
                      body: context.tr('Reserve a gym slot or book a trainer.'),
                      actionLabel: context.tr('Book a slot'),
                      onAction: () => context.go('/book'),
                    ),
                  ),
                ]);
              }
              return ListView.separated(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                itemCount: rows.length,
                separatorBuilder: (_, _) => const SizedBox(height: 12),
                itemBuilder: (context, i) {
                  final b = rows[i];
                  final cancelled = b.status == 'Cancelled';
                  return WCard(
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(children: [
                        Flexible(
                          child: Pill(fmtDayTime(b.startsAt),
                              bg: cancelled ? const Color(0xFFEEF0F4) : Palette.tealSoft, fg: cancelled ? Palette.muted : Palette.teal),
                        ),
                        const SizedBox(width: 8),
                        Text(b.price == 0 ? context.tr('Free') : aed(b.price), style: const TextStyle(fontWeight: FontWeight.w700)),
                      ]),
                      const SizedBox(height: 10),
                      Text(b.isTrainer ? 'Session with ${b.title}' : b.title, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                      if (cancelled || b.status == 'CheckedIn')
                        Padding(
                          padding: const EdgeInsets.only(top: 4),
                          child: Text(cancelled ? 'Cancelled' : context.tr('Checked in'), style: Theme.of(context).textTheme.bodySmall),
                        ),
                      if (b.isUpcoming) ...[
                        const SizedBox(height: 12),
                        Row(children: [
                          Expanded(child: FilledButton(
                            style: FilledButton.styleFrom(minimumSize: const Size.fromHeight(44)),
                            onPressed: () => context.push('/confirm', extra: b),
                            child: Text(context.tr('Show entry QR')),
                          )),
                          const SizedBox(width: 10),
                          Expanded(child: OutlinedButton(onPressed: () => _cancel(b), child: Text(context.tr('Cancel')))),
                        ]),
                      ],
                    ]),
                  );
                },
              );
            },
          ),
        ),
      ]),
    );
  }
}

class WalletScreen extends StatefulWidget {
  const WalletScreen({super.key});

  @override
  State<WalletScreen> createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  int _reload = 0;

  Future<void> _topUp() async {
    final amount = await showModalBottomSheet<int>(
      context: context,
      showDragHandle: true,
      builder: (c) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(context.tr('Top up'), style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 14),
            Wrap(spacing: 10, runSpacing: 10, children: [
              for (final a in const [50, 100, 200, 500])
                ActionChip(label: Text('AED $a'), onPressed: () => Navigator.pop(c, a)),
            ]),
          ]),
        ),
      ),
    );
    if (amount == null || !mounted) return;
    try {
      await context.read<AppState>().api.post('/wallet/topup', {'amountAed': amount});
      if (mounted) setState(() => _reload++);
    } catch (e) {
      if (mounted) showError(context, e);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('Wallet'))),
      body: AsyncView<Wallet>(
        key: ValueKey('wallet-$_reload'),
        load: () async => Wallet.fromJson(await s.api.get('/wallet')),
        builder: (context, w, _) => ListView(padding: const EdgeInsets.fromLTRB(20, 4, 20, 24), children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: Palette.ink, borderRadius: BorderRadius.circular(20)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(context.tr('Wasl Fit balance'), style: const TextStyle(color: Color(0xFFC9D2E0), fontSize: 13)),
              const SizedBox(height: 6),
              Text('AED ${w.balance.toStringAsFixed(2)}', style: const TextStyle(color: Colors.white, fontSize: 34, fontWeight: FontWeight.w800)),
              const SizedBox(height: 16),
              FilledButton(
                style: FilledButton.styleFrom(backgroundColor: Palette.amber, foregroundColor: Palette.ink, minimumSize: const Size.fromHeight(46)),
                onPressed: _topUp,
                child: Text(context.tr('Top up')),
              ),
            ]),
          ),
          SectionTitle(context.tr('Recent')),
          if (w.transactions.isEmpty)
            SizedBox(height: 200, child: EmptyState(icon: Icons.receipt_long_outlined, title: context.tr('No transactions yet')))
          else
            WCard(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(children: [
                for (var i = 0; i < w.transactions.length; i++) ...[
                  if (i > 0) const Divider(height: 1, color: Palette.line),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    child: Row(children: [
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(w.transactions[i].kind, style: const TextStyle(fontWeight: FontWeight.w600)),
                          Text(fmtDayTime(w.transactions[i].createdAt), style: Theme.of(context).textTheme.bodySmall?.copyWith(fontSize: 12)),
                        ]),
                      ),
                      Text(
                        '${w.transactions[i].amount >= 0 ? '+' : '−'}AED ${w.transactions[i].amount.abs().toStringAsFixed(0)}',
                        style: TextStyle(fontWeight: FontWeight.w800, color: w.transactions[i].amount >= 0 ? Palette.teal : Palette.ink),
                      ),
                    ]),
                  ),
                ],
              ]),
            ),
        ]),
      ),
    );
  }
}

class CompeteScreen extends StatelessWidget {
  const CompeteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    return SafeArea(
      child: AsyncView<Challenge>(
        load: () async => Challenge.fromJson(await s.api.get('/challenges/current', query: {if (s.communityId != null) 'communityId': s.communityId!})),
        builder: (context, c, _) {
          final total = c.communities.fold<int>(0, (a, b) => a + b.workouts);
          return ListView(padding: const EdgeInsets.fromLTRB(20, 16, 20, 24), children: [
            Text(context.tr('Challenge'), style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 14),
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(color: Palette.ink, borderRadius: BorderRadius.circular(20)),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text(c.title.toUpperCase(), style: const TextStyle(color: Palette.amber, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: .6))),
                  Pill('${c.daysLeft} ${context.tr('days left')}', bg: Colors.white24, fg: Colors.white),
                ]),
                const SizedBox(height: 10),
                Text(context.tr('Communities'), style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
                const SizedBox(height: 12),
                if (c.communities.isEmpty)
                  Text('0 ${context.tr('workouts')}', style: const TextStyle(color: Color(0xFFC9D2E0)))
                else
                  for (final cs in c.communities.take(4))
                    Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Row(children: [
                          Expanded(child: Text(cs.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600))),
                          Text('${cs.workouts}', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800)),
                        ]),
                        const SizedBox(height: 4),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(value: total == 0 ? 0 : cs.workouts / total, minHeight: 8, backgroundColor: Colors.white12, color: Palette.amber),
                        ),
                      ]),
                    ),
              ]),
            ),
            const SizedBox(height: 14),
            WCard(
              child: Row(children: [
                SizedBox(
                  width: 56,
                  height: 56,
                  child: Stack(alignment: Alignment.center, children: [
                    CircularProgressIndicator(value: (c.mine / c.goal).clamp(0.0, 1.0), strokeWidth: 6, backgroundColor: Palette.tealSoft, color: Palette.teal),
                    Text('${c.mine}', style: const TextStyle(fontWeight: FontWeight.w800, color: Palette.teal)),
                  ]),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text('${context.tr('Your goal')}: ${c.goal} ${context.tr('workouts')}', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                    Text('${(c.goal - c.mine).clamp(0, c.goal)} ${context.tr('workouts')}', style: Theme.of(context).textTheme.bodySmall),
                  ]),
                ),
              ]),
            ),
            SectionTitle(context.tr('Top in your community')),
            if (c.leaderboard.isEmpty)
              SizedBox(height: 180, child: EmptyState(icon: Icons.emoji_events_outlined, title: context.tr('No workouts logged yet')))
            else
              for (final r in c.leaderboard)
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: WCard(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    color: r.isMe ? Palette.tealSoft : null,
                    border: r.isMe ? Palette.teal : null,
                    child: Row(children: [
                      SizedBox(width: 28, child: Text('${r.rank}', style: TextStyle(fontWeight: FontWeight.w800, color: r.rank == 1 ? Palette.amberInk : Palette.muted))),
                      Expanded(child: Text(r.isMe ? context.tr('You') : r.name, style: TextStyle(fontWeight: r.isMe ? FontWeight.w800 : FontWeight.w600))),
                      Text('${r.workouts} ${context.tr('workouts')}', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                    ]),
                  ),
                ),
          ]);
        },
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final s = context.watch<AppState>();
    return SafeArea(
      child: ListView(padding: const EdgeInsets.fromLTRB(20, 16, 20, 24), children: [
        Text(context.tr('Profile'), style: Theme.of(context).textTheme.headlineSmall),
        const SizedBox(height: 16),
        WCard(
          child: Row(children: [
            Avatar(s.firstName.isEmpty ? '?' : s.firstName[0].toUpperCase(), size: 56, bg: Palette.ink, fg: Colors.white),
            const SizedBox(width: 14),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text((s.user?['name'] as String?) ?? '', style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                Text((s.user?['phone'] as String?) ?? '', style: Theme.of(context).textTheme.bodySmall),
                if (s.activeLease != null) Text('${s.activeLease!.community} · ${s.activeLease!.unit}', style: Theme.of(context).textTheme.bodySmall),
              ]),
            ),
          ]),
        ),
        const SizedBox(height: 12),
        if (s.isResident) ...[
          _Row(Icons.event_available_outlined, context.tr('My bookings'), () => context.push('/bookings')),
          _Row(Icons.account_balance_wallet_outlined, context.tr('Wallet'), () => context.push('/wallet')),
        ],
        WCard(
          padding: const EdgeInsets.all(14),
          child: Row(children: [
            const Icon(Icons.translate_rounded, color: Palette.teal),
            const SizedBox(width: 12),
            Expanded(child: Text(context.tr('Language'), style: const TextStyle(fontWeight: FontWeight.w600))),
            SegmentedButton<String>(
              showSelectedIcon: false,
              segments: const [ButtonSegment(value: 'en', label: Text('EN')), ButtonSegment(value: 'ar', label: Text('عربي'))],
              selected: {s.locale.languageCode},
              onSelectionChanged: (v) => s.setLocale(Locale(v.first)),
            ),
          ]),
        ),
        const SizedBox(height: 20),
        OutlinedButton(
          style: OutlinedButton.styleFrom(foregroundColor: Palette.danger),
          onPressed: s.logout,
          child: Text(context.tr('Sign out')),
        ),
      ]),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row(this.icon, this.label, this.onTap);
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: WCard(
          onTap: onTap,
          padding: const EdgeInsets.all(14),
          child: Row(children: [
            Icon(icon, color: Palette.teal),
            const SizedBox(width: 12),
            Expanded(child: Text(label, style: const TextStyle(fontWeight: FontWeight.w600))),
            const Icon(Icons.chevron_right_rounded, color: Palette.muted),
          ]),
        ),
      );
}
