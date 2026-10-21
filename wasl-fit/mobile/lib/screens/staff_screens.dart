import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../core/l10n.dart';
import '../core/models.dart';
import '../core/state.dart';
import '../core/theme.dart';
import '../core/widgets.dart';

/// Trainer home: today's clients and this month's earnings.
class TrainerTodayScreen extends StatelessWidget {
  const TrainerTodayScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    return SafeArea(
      child: AsyncView<TrainerDashboard>(
        load: () async => TrainerDashboard.fromJson(await s.api.get('/trainer/me/sessions')),
        builder: (context, d, _) => ListView(padding: const EdgeInsets.fromLTRB(20, 16, 20, 24), children: [
          Text('${context.tr('Good morning')}, ${s.firstName}', style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 16),
          Row(children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: Palette.ink, borderRadius: BorderRadius.circular(16)),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(context.tr('Earnings this month'), style: const TextStyle(color: Color(0xFFC9D2E0), fontSize: 12)),
                  const SizedBox(height: 6),
                  Text(aed(d.earnings), style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800)),
                ]),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: WCard(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(context.tr('Sessions'), style: Theme.of(context).textTheme.bodySmall),
                  const SizedBox(height: 6),
                  Text('${d.sessions}', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
                  Text('${context.tr('Rating')} ${d.rating}', style: Theme.of(context).textTheme.bodySmall?.copyWith(fontSize: 12)),
                ]),
              ),
            ),
          ]),
          SectionTitle(context.tr('Today')),
          if (d.today.isEmpty)
            SizedBox(height: 220, child: EmptyState(icon: Icons.event_available_outlined, title: context.tr('No sessions today')))
          else
            for (final t in d.today)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: WCard(
                  child: Row(children: [
                    Avatar(t.resident.split(' ').take(2).map((p) => p[0]).join().toUpperCase(), size: 44),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(t.resident, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                        Text(fmtRange(t.startsAt, t.endsAt), style: Theme.of(context).textTheme.bodySmall),
                      ]),
                    ),
                    Pill(t.status == 'CheckedIn' ? context.tr('Checked in') : t.status,
                        bg: t.status == 'CheckedIn' ? Palette.tealSoft : const Color(0xFFEEF0F4),
                        fg: t.status == 'CheckedIn' ? Palette.teal : Palette.muted),
                  ]),
                ),
              ),
        ]),
      ),
    );
  }
}

/// Staff and trainers confirm a resident at the door. Type or paste the
/// code shown under the resident's QR; a camera scanner can be added later.
class CheckInScreen extends StatefulWidget {
  const CheckInScreen({super.key});

  @override
  State<CheckInScreen> createState() => _CheckInScreenState();
}

class _CheckInScreenState extends State<CheckInScreen> {
  final _code = TextEditingController();
  bool _busy = false;
  String? _result;

  @override
  void dispose() {
    _code.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final code = _code.text.trim();
    if (code.isEmpty) return;
    setState(() { _busy = true; _result = null; });
    try {
      final res = await context.read<AppState>().api.post('/checkin', {'qrToken': code}) as Map<String, dynamic>;
      if (!mounted) return;
      final done = context.trRead('Checked in');
      setState(() => _result = '${res['resident']} · $done');
      _code.clear();
    } catch (e) {
      if (mounted) showError(context, e);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(padding: const EdgeInsets.all(20), children: [
        Text(context.tr('Check in a resident'), style: Theme.of(context).textTheme.headlineSmall),
        const SizedBox(height: 16),
        TextField(
          controller: _code,
          autocorrect: false,
          onSubmitted: (_) => _submit(),
          decoration: InputDecoration(labelText: context.tr('Booking code')),
        ),
        const SizedBox(height: 16),
        FilledButton(
          onPressed: _busy ? null : _submit,
          child: _busy
              ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white))
              : Text(context.tr('Check in')),
        ),
        if (_result != null) ...[
          const SizedBox(height: 20),
          WCard(
            color: Palette.tealSoft,
            border: Palette.teal,
            child: Row(children: [
              const Icon(Icons.check_circle_rounded, color: Palette.teal),
              const SizedBox(width: 12),
              Expanded(child: Text(_result!, style: const TextStyle(fontWeight: FontWeight.w700))),
            ]),
          ),
        ],
      ]),
    );
  }
}
