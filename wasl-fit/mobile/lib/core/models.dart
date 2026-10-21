import 'package:intl/intl.dart';

/// Dubai is UTC+4 year-round. All times shown to residents are Dubai time,
/// whatever the phone's own zone is.
DateTime dubai(DateTime utc) => utc.toUtc().add(const Duration(hours: 4));

String fmtTime(DateTime utc) => DateFormat('h:mm a').format(dubai(utc));
String fmtDay(DateTime utc) => DateFormat('EEE d MMM').format(dubai(utc));
String fmtDayTime(DateTime utc) => '${fmtDay(utc)} · ${fmtTime(utc)}';
String fmtRange(DateTime a, DateTime b) => '${fmtTime(a)} – ${fmtTime(b)}';
String aed(num v) => v == v.roundToDouble() ? 'AED ${v.toInt()}' : 'AED ${v.toStringAsFixed(2)}';

/// yyyy-MM-dd in Dubai time, for the API's date parameter.
String dubaiDateParam(DateTime d) => DateFormat('yyyy-MM-dd').format(d);

DateTime _dt(dynamic v) => DateTime.parse(v as String).toUtc();

class Community {
  Community(this.id, this.name, this.area);
  factory Community.fromJson(Map<String, dynamic> j) => Community(j['id'], j['name'], j['area']);
  final String id, name, area;
}

class Lease {
  Lease(this.communityId, this.community, this.unit);
  factory Lease.fromJson(Map<String, dynamic> j) => Lease(j['communityId'], j['community'], j['unit']);
  final String communityId, community, unit;
}

class Facility {
  Facility(this.id, this.name, this.type, this.capacity);
  factory Facility.fromJson(Map<String, dynamic> j) => Facility(j['id'], j['name'], j['type'], j['capacity']);
  final String id, name, type;
  final int capacity;
}

class Occupancy {
  Occupancy(this.capacity, this.inside, this.level);
  factory Occupancy.fromJson(Map<String, dynamic> j) => Occupancy(j['capacity'], j['inside'], j['level']);
  final int capacity, inside;
  final String level;
}

class SlotInfo {
  SlotInfo(this.id, this.startsAt, this.endsAt, this.audience, this.price, this.spotsLeft);
  factory SlotInfo.fromJson(Map<String, dynamic> j) => SlotInfo(
        j['id'],
        _dt(j['startsAt']),
        _dt(j['endsAt']),
        j['audience'],
        (j['priceAed'] as num).toDouble(),
        j['spotsLeft'],
      );
  final String id, audience;
  final DateTime startsAt, endsAt;
  final double price;
  final int spotsLeft;
  bool get isFull => spotsLeft <= 0;
  bool get isPast => startsAt.isBefore(DateTime.now().toUtc());
}

class TrainerSummary {
  TrainerSummary(this.id, this.name, this.speciality, this.languages, this.rate, this.rating, this.reviews, {this.bio = ''});
  factory TrainerSummary.fromJson(Map<String, dynamic> j) => TrainerSummary(
        j['id'],
        j['name'],
        j['speciality'],
        j['languages'],
        (j['rateAed'] as num).toDouble(),
        (j['rating'] as num).toDouble(),
        j['reviewCount'],
        bio: (j['bio'] as String?) ?? '',
      );
  final String id, name, speciality, languages, bio;
  final double rate, rating;
  final int reviews;
  String get initials => name.split(' ').where((p) => p.isNotEmpty).take(2).map((p) => p[0]).join().toUpperCase();
}

class TrainerHour {
  TrainerHour(this.startsAt, this.available);
  factory TrainerHour.fromJson(Map<String, dynamic> j) => TrainerHour(_dt(j['startsAt']), j['available']);
  final DateTime startsAt;
  final bool available;
}

class BookingInfo {
  BookingInfo(this.id, this.startsAt, this.endsAt, this.price, this.status, this.qrToken, this.kind, this.title);
  factory BookingInfo.fromJson(Map<String, dynamic> j) {
    final isTrainer = j['kind'] == 'Trainer';
    return BookingInfo(
      j['id'],
      _dt(j['startsAt']),
      _dt(j['endsAt']),
      (j['priceAed'] as num).toDouble(),
      j['status'],
      j['qrToken'],
      j['kind'],
      isTrainer ? (j['trainer'] ?? 'Trainer session') as String : (j['facility'] ?? 'Facility') as String,
    );
  }
  /// Built from the POST /bookings/* response, which carries no status or title.
  factory BookingInfo.created(Map<String, dynamic> j, {required String title, required bool trainer}) => BookingInfo(
        j['id'],
        _dt(j['startsAt']),
        _dt(j['endsAt']),
        (j['priceAed'] as num).toDouble(),
        'Confirmed',
        j['qrToken'],
        trainer ? 'Trainer' : 'Slot',
        title,
      );
  final String id, status, qrToken, kind, title;
  final DateTime startsAt, endsAt;
  final double price;
  bool get isTrainer => kind == 'Trainer';
  bool get isUpcoming => status == 'Confirmed' && endsAt.isAfter(DateTime.now().toUtc());
}

class WalletTxn {
  WalletTxn(this.amount, this.kind, this.reference, this.createdAt);
  factory WalletTxn.fromJson(Map<String, dynamic> j) =>
      WalletTxn((j['amountAed'] as num).toDouble(), j['kind'], j['reference'], _dt(j['createdAt']));
  final double amount;
  final String kind, reference;
  final DateTime createdAt;
}

class Wallet {
  Wallet(this.balance, this.transactions);
  factory Wallet.fromJson(Map<String, dynamic> j) => Wallet(
        (j['balanceAed'] as num).toDouble(),
        (j['transactions'] as List).map((e) => WalletTxn.fromJson(e)).toList(),
      );
  final double balance;
  final List<WalletTxn> transactions;
}

class LeaderRow {
  LeaderRow(this.rank, this.name, this.workouts, this.isMe);
  factory LeaderRow.fromJson(Map<String, dynamic> j) => LeaderRow(j['rank'], j['name'], j['workouts'], j['isMe']);
  final int rank, workouts;
  final String name;
  final bool isMe;
}

class CommunityScore {
  CommunityScore(this.name, this.workouts);
  factory CommunityScore.fromJson(Map<String, dynamic> j) => CommunityScore(j['name'], j['workouts']);
  final String name;
  final int workouts;
}

class Challenge {
  Challenge(this.title, this.endsAt, this.goal, this.mine, this.communities, this.leaderboard);
  factory Challenge.fromJson(Map<String, dynamic> j) => Challenge(
        j['title'],
        _dt(j['endsAt']),
        j['goal'],
        j['myWorkouts'],
        (j['communities'] as List).map((e) => CommunityScore.fromJson(e)).toList(),
        (j['leaderboard'] as List).map((e) => LeaderRow.fromJson(e)).toList(),
      );
  final String title;
  final DateTime endsAt;
  final int goal, mine;
  final List<CommunityScore> communities;
  final List<LeaderRow> leaderboard;
  int get daysLeft => endsAt.difference(DateTime.now().toUtc()).inDays.clamp(0, 31);
}

class TrainerSession {
  TrainerSession(this.id, this.startsAt, this.endsAt, this.status, this.resident);
  factory TrainerSession.fromJson(Map<String, dynamic> j) =>
      TrainerSession(j['id'], _dt(j['startsAt']), _dt(j['endsAt']), j['status'], j['resident']);
  final String id, status, resident;
  final DateTime startsAt, endsAt;
}

class TrainerDashboard {
  TrainerDashboard(this.rating, this.sessions, this.today, this.earnings);
  factory TrainerDashboard.fromJson(Map<String, dynamic> j) => TrainerDashboard(
        (j['rating'] as num).toDouble(),
        j['sessionsThisMonth'],
        (j['today'] as List).map((e) => TrainerSession.fromJson(e)).toList(),
        (j['earningsThisMonthAed'] as num).toDouble(),
      );
  final double rating, earnings;
  final int sessions;
  final List<TrainerSession> today;
}
