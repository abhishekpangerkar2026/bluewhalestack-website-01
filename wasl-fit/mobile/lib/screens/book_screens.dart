import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../core/l10n.dart';
import '../core/models.dart';
import '../core/state.dart';
import '../core/theme.dart';
import '../core/widgets.dart';
import 'home_screen.dart';

/// Next seven days in Dubai time.
List<DateTime> nextDays() {
  final today = dubai(DateTime.now().toUtc());
  final d0 = DateTime(today.year, today.month, today.day);
  return List.generate(7, (i) => d0.add(Duration(days: i)));
}

class DateStrip extends StatelessWidget {
  const DateStrip({super.key, required this.days, required this.selected, required this.onSelect});
  final List<DateTime> days;
  final int selected;
  final ValueChanged<int> onSelect;

  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context).toString();
    return SizedBox(
      height: 68,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: days.length,
        separatorBuilder: (_, _) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final on = i == selected;
          return InkWell(
            borderRadius: BorderRadius.circular(14),
            onTap: () => onSelect(i),
            child: Container(
              width: 60,
              decoration: BoxDecoration(
                color: on ? Palette.teal : Palette.card,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: on ? Palette.teal : Palette.line),
              ),
              child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                Text(DateFormat('E', locale).format(days[i]), style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: on ? Colors.white : Palette.muted)),
                Text('${days[i].day}', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: on ? Colors.white : Palette.ink)),
              ]),
            ),
          );
        },
      ),
    );
  }
}

(Color, Color) audienceColors(String a) => switch (a) {
      'Women' => (const Color(0xFFF9DDE2), const Color(0xFF9B1C3A)),
      'Men' => (const Color(0xFFE3E7F5), const Color(0xFF34408F)),
      _ => (Palette.tealSoft, Palette.teal),
    };

String audienceLabel(BuildContext c, String a) => switch (a) {
      'Women' => c.tr('Women only'),
      'Men' => c.tr('Men only'),
      _ => c.tr('Mixed'),
    };

class BookScreen extends StatefulWidget {
  const BookScreen({super.key});

  @override
  State<BookScreen> createState() => _BookScreenState();
}

class _BookScreenState extends State<BookScreen> {
  final _days = nextDays();
  int _day = 0;
  String? _facilityId;
  SlotInfo? _slot;
  bool _busy = false;

  Future<void> _confirm(Facility f) async {
    final slot = _slot;
    if (slot == null) return;
    setState(() => _busy = true);
    final s = context.read<AppState>();
    try {
      final res = await s.api.post('/bookings/slot', {'slotId': slot.id}) as Map<String, dynamic>;
      if (!mounted) return;
      context.push('/confirm', extra: BookingInfo.created(res, title: f.name, trainer: false));
      setState(() => _slot = null);
    } catch (e) {
      if (mounted) showError(context, e);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    final communityId = context.select<AppState, String?>((x) => x.communityId);
    return SafeArea(
      child: AsyncView<List<Facility>>(
        key: ValueKey('facilities-$communityId'),
        load: () => loadFacilities(s),
        builder: (context, facilities, _) {
          if (facilities.isEmpty) {
            return EmptyState(icon: Icons.fitness_center_rounded, title: context.tr('Nothing booked yet'));
          }
          final f = facilities.firstWhere((x) => x.id == _facilityId, orElse: () => facilities.first);
          final dateParam = dubaiDateParam(_days[_day]);
          return Column(children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
              child: Align(alignment: AlignmentDirectional.centerStart, child: Text(context.tr('Book'), style: Theme.of(context).textTheme.headlineSmall)),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: DateStrip(days: _days, selected: _day, onSelect: (i) => setState(() { _day = i; _slot = null; })),
            ),
            if (facilities.length > 1)
              SizedBox(
                height: 56,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  children: [
                    for (final x in facilities)
                      Padding(
                        padding: const EdgeInsetsDirectional.only(end: 8),
                        child: ChoiceChip(
                          label: Text(x.name),
                          selected: x.id == f.id,
                          onSelected: (_) => setState(() { _facilityId = x.id; _slot = null; }),
                        ),
                      ),
                  ],
                ),
              ),
            Expanded(
              child: AsyncView<List<SlotInfo>>(
                key: ValueKey('slots-${f.id}-$dateParam'),
                load: () async => ((await s.api.get('/facilities/${f.id}/slots', query: {'date': dateParam})) as List)
                    .map((e) => SlotInfo.fromJson(e))
                    .toList(),
                builder: (context, slots, _) {
                  final open = slots.where((x) => !x.isPast).toList();
                  if (open.isEmpty) {
                    return ListView(children: [SizedBox(height: 300, child: EmptyState(icon: Icons.event_busy_outlined, title: context.tr('No times left this day')))]);
                  }
                  return ListView.separated(
                    padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
                    itemCount: open.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 10),
                    itemBuilder: (context, i) => _SlotTile(
                      slot: open[i],
                      selected: _slot?.id == open[i].id,
                      onTap: () => setState(() => _slot = open[i]),
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 4, 20, 12),
              child: FilledButton(
                onPressed: _slot == null || _busy ? null : () => _confirm(f),
                child: _busy
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white))
                    : Text(_slot == null
                        ? context.tr('Select a time')
                        : '${context.tr('Confirm booking')} · ${_slot!.price == 0 ? context.tr('Free') : aed(_slot!.price)}'),
              ),
            ),
          ]);
        },
      ),
    );
  }
}

class _SlotTile extends StatelessWidget {
  const _SlotTile({required this.slot, required this.selected, required this.onTap});
  final SlotInfo slot;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final (bg, fg) = audienceColors(slot.audience);
    final low = !slot.isFull && slot.spotsLeft <= 3;
    return WCard(
      onTap: slot.isFull ? null : onTap,
      border: selected ? Palette.teal : null,
      color: selected ? Palette.tealSoft : (slot.isFull ? const Color(0xFFEEF0F4) : null),
      child: Row(children: [
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(fmtRange(slot.startsAt, slot.endsAt),
                style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: slot.isFull ? Palette.muted : Palette.ink)),
            const SizedBox(height: 4),
            Wrap(spacing: 8, runSpacing: 4, crossAxisAlignment: WrapCrossAlignment.center, children: [
              Pill(audienceLabel(context, slot.audience), bg: bg, fg: fg),
              Text(
                slot.isFull ? context.tr('Full') : '${slot.spotsLeft} ${context.tr('spots left')}',
                style: TextStyle(fontSize: 13, color: low ? Palette.amberInk : Palette.muted, fontWeight: low ? FontWeight.w700 : FontWeight.w400),
              ),
            ]),
          ]),
        ),
        Icon(selected ? Icons.check_circle_rounded : Icons.circle_outlined, color: selected ? Palette.teal : Palette.line),
      ]),
    );
  }
}

/// Facility detail: live occupancy and today's timings by audience.
class GymScreen extends StatelessWidget {
  const GymScreen({super.key, required this.facilityId, this.facility});
  final String facilityId;
  final Facility? facility;

  @override
  Widget build(BuildContext context) {
    final s = context.read<AppState>();
    return Scaffold(
      appBar: AppBar(title: Text(facility?.name ?? context.tr('Gym'))),
      body: AsyncView<(Occupancy, List<SlotInfo>)>(
        load: () async {
          final occ = Occupancy.fromJson(await s.api.get('/facilities/$facilityId/occupancy'));
          final slots = ((await s.api.get('/facilities/$facilityId/slots', query: {'date': dubaiDateParam(nextDays().first)})) as List)
              .map((e) => SlotInfo.fromJson(e))
              .toList();
          return (occ, slots);
        },
        builder: (context, data, _) {
          final (occ, slots) = data;
          final pct = occ.capacity == 0 ? 0.0 : (occ.inside / occ.capacity).clamp(0.0, 1.0);
          final busy = occ.level != 'Quiet';
          // Collapse consecutive hours with the same audience into ranges.
          final ranges = <(String, DateTime, DateTime)>[];
          for (final sl in slots) {
            if (ranges.isNotEmpty && ranges.last.$1 == sl.audience && ranges.last.$3 == sl.startsAt) {
              ranges[ranges.length - 1] = (sl.audience, ranges.last.$2, sl.endsAt);
            } else {
              ranges.add((sl.audience, sl.startsAt, sl.endsAt));
            }
          }
          return ListView(padding: const EdgeInsets.all(20), children: [
            WCard(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text('${occ.inside} / ${occ.capacity} ${context.tr('inside')}', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16))),
                  Pill(context.tr(occ.level), bg: busy ? Palette.amberSoft : Palette.tealSoft, fg: busy ? Palette.amberInk : Palette.teal),
                ]),
                const SizedBox(height: 14),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: LinearProgressIndicator(value: pct, minHeight: 10, backgroundColor: Palette.line, color: busy ? Palette.amber : Palette.teal),
                ),
              ]),
            ),
            SectionTitle(context.tr('Today')),
            WCard(
              child: Column(children: [
                for (var i = 0; i < ranges.length; i++) ...[
                  if (i > 0) const Divider(height: 24, color: Palette.line),
                  Row(children: [
                    Expanded(child: Text(audienceLabel(context, ranges[i].$1))),
                    Text(fmtRange(ranges[i].$2, ranges[i].$3), style: const TextStyle(fontWeight: FontWeight.w700)),
                  ]),
                ],
              ]),
            ),
            const SizedBox(height: 20),
            FilledButton(onPressed: () => context.go('/book'), child: Text(context.tr('Book a time'))),
          ]);
        },
      ),
    );
  }
}
