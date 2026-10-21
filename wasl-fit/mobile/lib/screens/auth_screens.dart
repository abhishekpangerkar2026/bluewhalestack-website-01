import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../core/l10n.dart';
import '../core/models.dart';
import '../core/state.dart';
import '../core/theme.dart';
import '../core/widgets.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Palette.ink,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Spacer(),
            Container(
              width: 72,
              height: 72,
              decoration: BoxDecoration(color: Palette.teal, borderRadius: BorderRadius.circular(22)),
              child: const Icon(Icons.fitness_center_rounded, color: Colors.white, size: 36),
            ),
            const SizedBox(height: 28),
            Text(context.tr('Wasl Fit'), style: const TextStyle(color: Colors.white, fontSize: 40, fontWeight: FontWeight.w800)),
            const SizedBox(height: 10),
            Text(
              context.tr('Your community fitness, in one place.'),
              style: const TextStyle(color: Color(0xFFC9D2E0), fontSize: 18, height: 1.4),
            ),
            const Spacer(),
            FilledButton(
              style: FilledButton.styleFrom(backgroundColor: Palette.amber, foregroundColor: Palette.ink),
              onPressed: () => context.go('/register'),
              child: Text(context.tr('Create account')),
            ),
            const SizedBox(height: 12),
            OutlinedButton(
              style: OutlinedButton.styleFrom(foregroundColor: Colors.white, side: const BorderSide(color: Colors.white38)),
              onPressed: () => context.go('/login'),
              child: Text(context.tr('Sign in')),
            ),
            const SizedBox(height: 8),
            Center(
              child: TextButton(
                onPressed: () {
                  final s = context.read<AppState>();
                  s.setLocale(Locale(s.isArabic ? 'en' : 'ar'));
                },
                child: Text(context.read<AppState>().isArabic ? 'English' : 'العربية', style: const TextStyle(color: Colors.white70)),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key, required this.register});
  final bool register;

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _form = GlobalKey<FormState>();
  final _phone = TextEditingController(text: '+971');
  final _name = TextEditingController();
  final _password = TextEditingController();
  bool _busy = false;
  bool _hide = true;

  @override
  void dispose() {
    _phone.dispose();
    _name.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_form.currentState!.validate()) return;
    setState(() => _busy = true);
    final state = context.read<AppState>();
    try {
      if (widget.register) {
        await state.register(_phone.text.trim(), _name.text.trim(), _password.text);
      } else {
        await state.login(_phone.text.trim(), _password.text);
      }
    } catch (e) {
      if (mounted) showError(context, e);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = context.tr(widget.register ? 'Create account' : 'Sign in');
    return Scaffold(
      appBar: AppBar(leading: BackButton(onPressed: () => context.go('/welcome'))),
      body: SafeArea(
        child: ListView(padding: const EdgeInsets.all(20), children: [
          Text(title, style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontSize: 28)),
          const SizedBox(height: 24),
          Form(
            key: _form,
            child: Column(children: [
              TextFormField(
                controller: _phone,
                keyboardType: TextInputType.phone,
                autofillHints: const [AutofillHints.telephoneNumber],
                decoration: InputDecoration(labelText: context.tr('Phone number')),
                validator: (v) => RegExp(r'^\+?\d{8,15}$').hasMatch((v ?? '').trim()) ? null : context.trRead('Enter a valid phone number, e.g. +971501234567'),
              ),
              if (widget.register) ...[
                const SizedBox(height: 14),
                TextFormField(
                  controller: _name,
                  textCapitalization: TextCapitalization.words,
                  autofillHints: const [AutofillHints.name],
                  decoration: InputDecoration(labelText: context.tr('Full name')),
                  validator: (v) => (v ?? '').trim().isEmpty ? context.trRead('Enter your name') : null,
                ),
              ],
              const SizedBox(height: 14),
              TextFormField(
                controller: _password,
                obscureText: _hide,
                autofillHints: [widget.register ? AutofillHints.newPassword : AutofillHints.password],
                decoration: InputDecoration(
                  labelText: context.tr('Password'),
                  helperText: widget.register ? context.tr('At least 8 characters') : null,
                  suffixIcon: IconButton(
                    icon: Icon(_hide ? Icons.visibility_outlined : Icons.visibility_off_outlined),
                    onPressed: () => setState(() => _hide = !_hide),
                  ),
                ),
                validator: (v) => (v ?? '').length >= 8 ? null : context.trRead('At least 8 characters'),
                onFieldSubmitted: (_) => _submit(),
              ),
            ]),
          ),
          const SizedBox(height: 24),
          FilledButton(
            onPressed: _busy ? null : _submit,
            child: _busy
                ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white))
                : Text(title),
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () => context.go(widget.register ? '/login' : '/register'),
            child: Text(context.tr(widget.register ? 'Already have an account? Sign in' : 'New here? Create an account')),
          ),
        ]),
      ),
    );
  }
}

/// Links the resident's Wasl lease so facilities unlock.
class LeaseScreen extends StatefulWidget {
  const LeaseScreen({super.key});

  @override
  State<LeaseScreen> createState() => _LeaseScreenState();
}

class _LeaseScreenState extends State<LeaseScreen> {
  String? _community;
  final _unit = TextEditingController();
  bool _busy = false;

  @override
  void dispose() {
    _unit.dispose();
    super.dispose();
  }

  Future<void> _continue() async {
    if (_community == null || _unit.text.trim().isEmpty) return;
    setState(() => _busy = true);
    try {
      await context.read<AppState>().linkLease(_community!, _unit.text.trim());
    } catch (e) {
      if (mounted) showError(context, e);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = context.read<AppState>();
    return Scaffold(
      appBar: AppBar(
        actions: [TextButton(onPressed: state.logout, child: Text(context.tr('Sign out')))],
      ),
      body: SafeArea(
        child: AsyncView<List<Community>>(
          load: () async => ((await state.api.get('/communities')) as List).map((e) => Community.fromJson(e)).toList(),
          builder: (context, communities, _) => ListView(padding: const EdgeInsets.all(20), children: [
            Text(context.tr('Confirm your home'), style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontSize: 26)),
            const SizedBox(height: 8),
            Text(context.tr('We match your Wasl lease so only residents can book community facilities.'),
                style: Theme.of(context).textTheme.bodySmall?.copyWith(fontSize: 14, height: 1.5)),
            const SizedBox(height: 20),
            Text(context.tr('Community'), style: const TextStyle(fontWeight: FontWeight.w700)),
            const SizedBox(height: 8),
            for (final c in communities)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: WCard(
                  onTap: () => setState(() => _community = c.id),
                  border: _community == c.id ? Palette.teal : null,
                  color: _community == c.id ? Palette.tealSoft : null,
                  child: Row(children: [
                    Expanded(
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(c.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                        Text(c.area, style: Theme.of(context).textTheme.bodySmall),
                      ]),
                    ),
                    Icon(_community == c.id ? Icons.check_circle_rounded : Icons.circle_outlined,
                        color: _community == c.id ? Palette.teal : Palette.line),
                  ]),
                ),
              ),
            const SizedBox(height: 8),
            TextField(
              controller: _unit,
              onChanged: (_) => setState(() {}),
              decoration: InputDecoration(labelText: context.tr('Unit number')),
            ),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: _busy || _community == null || _unit.text.trim().isEmpty ? null : _continue,
              child: _busy
                  ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white))
                  : Text(context.tr('Continue')),
            ),
          ]),
        ),
      ),
    );
  }
}
