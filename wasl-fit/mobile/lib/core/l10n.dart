import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

import 'state.dart';

/// Lightweight translations: the English string is the key, so a missing
/// Arabic entry falls back to English instead of breaking the screen.
/// Arabic copy is a first draft and should be reviewed by a native speaker.
extension Tr on BuildContext {
  /// For build methods: rebuilds when the language changes.
  String tr(String en) {
    final ar = watch<AppState>().isArabic;
    return ar ? (_ar[en] ?? en) : en;
  }

  /// For event handlers and validators, where `watch` is not allowed.
  String trRead(String en) {
    final ar = read<AppState>().isArabic;
    return ar ? (_ar[en] ?? en) : en;
  }
}

const _ar = <String, String>{
  'Wasl Fit': 'وصل فت',
  'Your community fitness, in one place.': 'لياقتك البدنية في مجتمعك، في مكان واحد.',
  'Create account': 'إنشاء حساب',
  'Sign in': 'تسجيل الدخول',
  'Phone number': 'رقم الهاتف',
  'Full name': 'الاسم الكامل',
  'Password': 'كلمة المرور',
  'At least 8 characters': '٨ أحرف على الأقل',
  'Already have an account? Sign in': 'لديك حساب؟ سجّل الدخول',
  'New here? Create an account': 'مستخدم جديد؟ أنشئ حساباً',
  'Confirm your home': 'أكّد منزلك',
  'We match your Wasl lease so only residents can book community facilities.':
      'نطابق عقد إيجارك مع وصل لكي يحجز السكان فقط مرافق المجتمع.',
  'Community': 'المجتمع',
  'Unit number': 'رقم الوحدة',
  'Continue': 'متابعة',
  'Home': 'الرئيسية',
  'Book': 'الحجز',
  'Trainers': 'المدربون',
  'Compete': 'تنافس',
  'Profile': 'حسابي',
  'Today': 'اليوم',
  'Scan': 'مسح',
  'Good morning': 'صباح الخير',
  'Ready to move?': 'جاهز للتمرين؟',
  'Next booking': 'الحجز القادم',
  'Show entry QR': 'عرض رمز الدخول',
  'Nothing booked yet': 'لا توجد حجوزات بعد',
  'Reserve a gym slot or book a trainer.': 'احجز موعداً في النادي أو احجز مدرباً.',
  'Book a slot': 'احجز موعداً',
  'Quick actions': 'إجراءات سريعة',
  'Top trainers near you': 'أفضل المدربين بالقرب منك',
  'See all': 'عرض الكل',
  'Gym status': 'حالة النادي',
  'Open gym details': 'تفاصيل النادي',
  'inside': 'بالداخل',
  'Quiet': 'هادئ',
  'Moderate': 'متوسط',
  'Busy': 'مزدحم',
  'Capacity': 'السعة',
  'Book a time': 'احجز وقتاً',
  'Women only': 'للنساء فقط',
  'Men only': 'للرجال فقط',
  'Mixed': 'مختلط',
  'spots left': 'أماكن متاحة',
  'Full': 'ممتلئ',
  'Free': 'مجاني',
  'Confirm booking': 'تأكيد الحجز',
  'Select a time': 'اختر وقتاً',
  'Search trainers': 'ابحث عن مدرب',
  'All': 'الكل',
  'per session': 'للجلسة',
  'reviews': 'تقييمات',
  'Certified and Wasl verified': 'معتمد وموثّق من وصل',
  'Pick a time': 'اختر وقتاً',
  'Book session': 'احجز الجلسة',
  'No times left this day': 'لا توجد أوقات متاحة في هذا اليوم',
  "You're booked": 'تم الحجز',
  'Show this code at the entrance': 'اعرض هذا الرمز عند المدخل',
  'View my bookings': 'عرض حجوزاتي',
  'My bookings': 'حجوزاتي',
  'Upcoming': 'القادمة',
  'Past': 'السابقة',
  'Cancel': 'إلغاء',
  'Cancel booking?': 'إلغاء الحجز؟',
  'Cancelling within 2 hours of the start is not refunded.': 'لا يتم استرداد المبلغ عند الإلغاء قبل أقل من ساعتين.',
  'Keep it': 'إبقاء',
  'Booking cancelled': 'تم إلغاء الحجز',
  'Wallet': 'المحفظة',
  'Wasl Fit balance': 'رصيد وصل فت',
  'Top up': 'شحن الرصيد',
  'Recent': 'الأحدث',
  'No transactions yet': 'لا توجد معاملات بعد',
  'Challenge': 'التحدي',
  'days left': 'أيام متبقية',
  'Your goal': 'هدفك',
  'workouts': 'تمارين',
  'Top in your community': 'الأفضل في مجتمعك',
  'Communities': 'المجتمعات',
  'You': 'أنت',
  'Language': 'اللغة',
  'English': 'English',
  'Arabic': 'العربية',
  'Sign out': 'تسجيل الخروج',
  'Retry': 'إعادة المحاولة',
  'Check in a resident': 'تسجيل دخول مقيم',
  'Booking code': 'رمز الحجز',
  'Check in': 'تسجيل الدخول',
  'Checked in': 'تم تسجيل الدخول',
  'Earnings this month': 'الأرباح هذا الشهر',
  'Sessions': 'الجلسات',
  'Rating': 'التقييم',
  'No sessions today': 'لا توجد جلسات اليوم',
  'Gym': 'النادي',
  'You are offline': 'أنت غير متصل',
  'Something went wrong': 'حدث خطأ ما',
  'No trainers match': 'لا يوجد مدربون مطابقون',
  'No workouts logged yet': 'لم تُسجَّل تمارين بعد',
  'Paid': 'المدفوع',
};
