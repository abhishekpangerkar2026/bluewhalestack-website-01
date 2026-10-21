import 'package:flutter/material.dart';

import 'api.dart';
import 'l10n.dart';
import 'theme.dart';

class WCard extends StatelessWidget {
  const WCard({super.key, required this.child, this.onTap, this.color, this.border, this.padding = const EdgeInsets.all(16)});
  final Widget child;
  final VoidCallback? onTap;
  final Color? color;
  final Color? border;
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    final box = Container(
      padding: padding,
      decoration: BoxDecoration(
        color: color ?? Palette.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: border ?? Palette.line, width: border == null ? 1 : 2),
      ),
      child: child,
    );
    if (onTap == null) return box;
    return Material(
      color: Colors.transparent,
      child: InkWell(borderRadius: BorderRadius.circular(18), onTap: onTap, child: box),
    );
  }
}

class Pill extends StatelessWidget {
  const Pill(this.text, {super.key, this.bg = Palette.tealSoft, this.fg = Palette.teal});
  final String text;
  final Color bg, fg;

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(99)),
        child: Text(text, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(color: fg, fontSize: 12, fontWeight: FontWeight.w700)),
      );
}

class Avatar extends StatelessWidget {
  const Avatar(this.initials, {super.key, this.size = 48, this.bg = Palette.tealSoft, this.fg = Palette.teal});
  final String initials;
  final double size;
  final Color bg, fg;

  @override
  Widget build(BuildContext context) => Container(
        width: size,
        height: size,
        alignment: Alignment.center,
        decoration: BoxDecoration(color: bg, shape: BoxShape.circle),
        child: Text(initials, style: TextStyle(color: fg, fontWeight: FontWeight.w800, fontSize: size * .36)),
      );
}

class SectionTitle extends StatelessWidget {
  const SectionTitle(this.text, {super.key, this.action, this.onAction});
  final String text;
  final String? action;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.only(top: 8, bottom: 10),
        child: Row(children: [
          Expanded(child: Text(text, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontSize: 16, fontWeight: FontWeight.w800))),
          if (action != null) TextButton(onPressed: onAction, child: Text(action!, style: const TextStyle(fontWeight: FontWeight.w700))),
        ]),
      );
}

class EmptyState extends StatelessWidget {
  const EmptyState({super.key, required this.icon, required this.title, this.body, this.actionLabel, this.onAction});
  final IconData icon;
  final String title;
  final String? body;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) => Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Container(
              width: 88,
              height: 88,
              decoration: const BoxDecoration(color: Palette.line, shape: BoxShape.circle),
              child: Icon(icon, size: 40, color: Palette.muted),
            ),
            const SizedBox(height: 16),
            Text(title, textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontSize: 18)),
            if (body != null) ...[
              const SizedBox(height: 8),
              Text(body!, textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodySmall),
            ],
            if (actionLabel != null) ...[
              const SizedBox(height: 16),
              OutlinedButton(onPressed: onAction, child: Text(actionLabel!)),
            ],
          ]),
        ),
      );
}

/// Loads data, shows a spinner, and turns failures into a retryable
/// message (with a distinct offline state). The builder must return a
/// scrollable so pull-to-refresh works.
class AsyncView<T> extends StatefulWidget {
  const AsyncView({super.key, required this.load, required this.builder});
  final Future<T> Function() load;
  final Widget Function(BuildContext context, T data, Future<void> Function() refresh) builder;

  @override
  State<AsyncView<T>> createState() => _AsyncViewState<T>();
}

class _AsyncViewState<T> extends State<AsyncView<T>> {
  late Future<T> _future = widget.load();

  Future<void> _refresh() async {
    final next = widget.load();
    setState(() {
      _future = next;
    });
    try {
      await next;
    } on Object {
      // The FutureBuilder shows the error.
    }
  }

  @override
  Widget build(BuildContext context) => FutureBuilder<T>(
        future: _future,
        builder: (context, snap) {
          if (snap.connectionState != ConnectionState.done) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snap.hasError) {
            final e = snap.error;
            final offline = e is ApiException && e.offline;
            return EmptyState(
              icon: offline ? Icons.wifi_off_rounded : Icons.error_outline_rounded,
              title: offline ? context.tr('You are offline') : context.tr('Something went wrong'),
              body: e is ApiException ? e.message : e.toString(),
              actionLabel: context.tr('Retry'),
              onAction: _refresh,
            );
          }
          return RefreshIndicator(onRefresh: _refresh, child: widget.builder(context, snap.data as T, _refresh));
        },
      );
}

void showError(BuildContext context, Object e) {
  final msg = e is ApiException ? e.message : e.toString();
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(SnackBar(content: Text(msg), backgroundColor: Palette.danger, behavior: SnackBarBehavior.floating));
}

void showInfo(BuildContext context, String msg) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(SnackBar(content: Text(msg), backgroundColor: Palette.ink, behavior: SnackBarBehavior.floating));
}
