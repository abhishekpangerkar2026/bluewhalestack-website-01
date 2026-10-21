import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../core/l10n.dart';
import '../core/models.dart';
import '../core/state.dart';
import '../core/theme.dart';
import '../core/widgets.dart';
import 'book_screens.dart';

class TrainersScreen extends StatefulWidget {
  const TrainersScreen({super.key});

  @override
  State<TrainersScreen> createState() => _TrainersScreenState();
}

class _TrainersScreenState extends State<TrainersScreen> {
  String _query = '';
  String? _speciality;

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    return SafeArea(
      child: AsyncView<List<TrainerSummary>>(
        load: () async => ((await s.api.get('/trainers')) as List).map((e) => TrainerSummary.fromJson(e)).toList(),
        builder: (context, all, _) {
          final specialities = all.map((t) => t.speciality).toSet().toList()..sort();
          final shown = all.where((t) {
            final q = _query.trim().toLowerCase();
            final matchesQuery = q.isEmpty || t.name.toLowerCase().contains(q) || t.speciality.toLowerCase().contains(q);
            return matchesQuery && (_speciality == null || t.speciality == _speciality);
          }).toList();
          return ListView(padding: const EdgeInsets.fromLTRB(20, 16, 20, 24), children: [
            Text(context.tr('Trainers'), style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 14),
            TextField(
              onChanged: (v) => setState(() => _query = v),
              decoration: InputDecoration(hintText: context.tr('Search trainers'), prefixIcon: const Icon(Icons.search_rounded)),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 40,
              child: ListView(scrollDirection: Axis.horizontal, children: [
                Padding(
                  padding: const EdgeInsetsDirectional.only(end: 8),
                  child: ChoiceChip(label: Text(context.tr('All')), selected: _speciality == null, onSelected: (_) => setState(() => _speciality = null)),
                ),
                for (final sp in specialities)
                  Padding(
                    padding: const EdgeInsetsDirectional.only(end: 8),
                    child: ChoiceChip(label: Text(sp), selected: _speciality == sp, onSelected: (_) => setState(() => _speciality = sp)),
                  ),
              ]),
            ),
            const SizedBox(height: 12),
            if (shown.isEmpty)
              SizedBox(height: 240, child: EmptyState(icon: Icons.search_off_rounded, title: context.tr('No trainers match')))
            else
              for (final t in shown)
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: WCard(
                    onTap: () => context.push('/trainer/${t.id}'),
                    child: Row(children: [
                      Avatar(t.initials, size: 60),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Row(children: [
                            Expanded(child: Text(t.name, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16))),
                            const Icon(Icons.star_rounded, color: Palette.amber, size: 18),
                            Text(' ${t.rating}', style: const TextStyle(fontWeight: FontWeight.w700)),
                          ]),
                          const SizedBox(height: 2),
                          Text('${t.speciality} · ${t.languages}', style: Theme.of(context).textTheme.bodySmall),
                          const SizedBox(height: 6),
                          Text('${aed(t.rate)} ${context.tr('per session')}', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                        ]),
                      ),
                    ]),
                  ),
                ),
          ]);
        },
      ),
    );
  }
}

class TrainerScreen extends StatefulWidget {
  const TrainerScreen({super.key, required this.trainerId});
  final String trainerId;

  @override
  State<TrainerScreen> createState() => _TrainerScreenState();
}

class _TrainerScreenState extends State<TrainerScreen> {
  final _days = nextDays();
  int _day = 0;
  TrainerHour? _hour;
  bool _busy = false;

  Future<void> _book(TrainerSummary t) async {
    final hour = _hour;
    if (hour == null) return;
    setState(() => _busy = true);
    final s = context.read<AppState>();
    try {
      final res = await s.api.post('/bookings/trainer', {
        'trainerId': t.id,
        'startsAt': hour.startsAt.toUtc().toIso8601String(),
      }) as Map<String, dynamic>;
      if (!mounted) return;
      context.push('/confirm', extra: BookingInfo.created(res, title: t.name, trainer: true));
      setState(() => _hour = null);
    } catch (e) {
      if (mounted) showError(context, e);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    return Scaffold(
      appBar: AppBar(),
      body: AsyncView<TrainerSummary>(
        load: () async => TrainerSummary.fromJson(await s.api.get('/trainers/${widget.trainerId}')),
        builder: (context, t, _) => Column(children: [
          Expanded(
            child: ListView(padding: const EdgeInsets.fromLTRB(20, 0, 20, 12), children: [
              Center(child: Avatar(t.initials, size: 96)),
              const SizedBox(height: 12),
              Center(child: Text(t.name, style: Theme.of(context).textTheme.headlineSmall)),
              Center(child: Text('${t.speciality} · ${t.languages}', style: Theme.of(context).textTheme.bodySmall)),
              const SizedBox(height: 10),
              Center(child: Pill(context.tr('Certified and Wasl verified'))),
              const SizedBox(height: 18),
              Row(children: [
                _Stat('${t.rating}', '${t.reviews} ${context.tr('reviews')}'),
                const SizedBox(width: 10),
                _Stat(aed(t.rate), context.tr('per session')),
              ]),
              if (t.bio.isNotEmpty) ...[
                const SizedBox(height: 14),
                WCard(child: Text(t.bio, style: const TextStyle(height: 1.5))),
              ],
              SectionTitle(context.tr('Pick a time')),
              DateStrip(days: _days, selected: _day, onSelect: (i) => setState(() { _day = i; _hour = null; })),
              const SizedBox(height: 12),
              AsyncView<List<TrainerHour>>(
                key: ValueKey('hours-${t.id}-$_day'),
                load: () async => ((await s.api.get('/trainers/${t.id}/availability', query: {'date': dubaiDateParam(_days[_day])})) as List)
                    .map((e) => TrainerHour.fromJson(e))
                    .toList(),
                builder: (context, hours, _) {
                  final open = hours.where((h) => h.available).toList();
                  if (open.isEmpty) {
                    return SizedBox(height: 120, child: Center(child: Text(context.tr('No times left this day'), style: Theme.of(context).textTheme.bodySmall)));
                  }
                  return Wrap(spacing: 8, runSpacing: 8, children: [
                    for (final h in open)
                      ChoiceChip(
                        label: Text(fmtTime(h.startsAt)),
                        selected: _hour?.startsAt == h.startsAt,
                        onSelected: (_) => setState(() => _hour = h),
                      ),
                  ]);
                },
              ),
            ]),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 4, 20, 12),
              child: FilledButton(
                onPressed: _hour == null || _busy ? null : () => _book(t),
                child: _busy
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white))
                    : Text('${context.tr('Book session')} · ${aed(t.rate)}'),
              ),
            ),
          ),
        ]),
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  const _Stat(this.value, this.label);
  final String value, label;

  @override
  Widget build(BuildContext context) => Expanded(
        child: WCard(
          padding: const EdgeInsets.symmetric(vertical: 14),
          child: Column(children: [
            Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            Text(label, style: Theme.of(context).textTheme.bodySmall?.copyWith(fontSize: 12)),
          ]),
        ),
      );
}
