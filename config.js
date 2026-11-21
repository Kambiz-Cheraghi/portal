/* تنظیمات پورتال — فقط همین فایل را برای تغییر مشخصات و افزودن برنامه ویرایش کنید */
(function () {
/* ① مشخصات شما. هر مورد را که خالی بگذارید، در پورتال نمایش داده نمی‌شود. */
const PROFILE = {
  nameFa: 'کامبیز چراغی',
  nameEn: 'Kambiz Cheraghi',
  email: 'kambiz.cheraghi@gmail.com',
  telegram: 'engineer_teacher',
  instagram: '',    // مثال: 'my_username'
  linkedin: '',     // مثال: 'https://www.linkedin.com/in/...'
  website: ''       // مثال: 'https://example.com'
};

/* ② عنوان و توضیح صفحه‌ی اول */
const SITE = {
  title: 'آزمایشگاه نرم‌افزارهای مهندسی',
  lead: 'تحلیل سازه، طراحی تیر بتنی، خواص مقطع و ریاضیات مهندسی. همه در مرورگر شما اجرا می‌شود، بدون نصب و ثبت‌نام.'
};

/* ②-ب آمار بازدید (اختیاری، رایگان و بدون کوکی).
   در goatcounter.com ثبت‌نام کنید و فقط «کد سایت» را اینجا بنویسید. خالی = غیرفعال */
const GOATCOUNTER = 'kambiz';

/* ②-ج لینک فرم گزارش خطا و پیشنهاد (اختیاری، مثلاً لینک Google Form). خالی = پنهان */
const FEEDBACK_URL = '';

/* ③ دسته‌ها (برای فیلتر). color: یکی از teal ، blue ، violet ، gold */
const CATS = [
  { id: 'analysis', name: 'تحلیل سازه',     color: 'teal'   },
  { id: 'design',   name: 'بتن و مقطع',     color: 'blue'   },
  { id: 'math',     name: 'ریاضی',          color: 'violet' },
  { id: 'exam',     name: 'کنکور دکترا',    color: 'gold'   }
];

/* ④ برنامه‌ها — هر برنامه یک بلوک است.
 *   id    : نام کوتاه انگلیسی؛ هم نام پوشه‌ی برنامه است و هم آدرس آن  (…/beam/)
 *   icon  : beam | frame | truss | dynamics | buckling | concrete | section | calculus
 *   badge : (اختیاری) برچسب کوچک مثل «جدید»
 *   enabled:false  → برنامه موقتاً از پورتال پنهان می‌شود
 */
const APPS = [
  { id: 'beam',     icon: 'beam',     cat: 'analysis',
    title: 'Beam Analysis Studio',
    desc: 'تحلیل تیر با اجزای محدود و نمودارهای برش، لنگر و تغییرشکل.',
    tags: ['تحلیل تیر', 'اجزای محدود', 'خروجی Excel'] },

  { id: 'framelab', icon: 'frame',    cat: 'analysis',
    title: 'FrameLab',
    desc: 'تحلیل الاستیک قاب خمشی و خرپای دوبعدی.',
    tags: ['قاب خمشی', 'خرپا', 'گزارش تحلیل'] },

  { id: 'static',   icon: 'truss',    cat: 'analysis',
    title: 'استاتیک‌یار ۲',
    desc: 'آزمایشگاه تحلیل سازه‌ها؛ ترسیم سریع تیر، قاب و خرپا و دریافت گزارش مهندسی.',
    tags: ['ترسیم سریع', 'تیر و قاب', 'گزارش'] },

  { id: 'dynamics', icon: 'dynamics', cat: 'analysis',
    title: 'تحلیل دینامیکی سازه‌ها',
    desc: 'سیستم‌های جرم–فنر–میراگر با ۱، ۲ و ۳ درجه آزادی.',
    tags: ['۱ تا ۳ درجه آزادی', 'جرم–فنر–میراگر'] },

  { id: 'buckling', icon: 'buckling', cat: 'analysis',
    title: 'آزمایشگاه کمانش ستون و قاب',
    desc: 'بار بحرانی اویلر برای ستون‌های چندپله، فنرها، تیرهای متصل و قاب‌های ۱ و ۲ طبقه.',
    tags: ['بار بحرانی', 'ستون چندپله', 'قاب ۱ و ۲ طبقه'] },

  { id: 'beton',    icon: 'concrete', cat: 'design',
    title: 'بتن‌یار',
    desc: 'لنگر نهایی و نوع شکست تیر بتن‌آرمه طبق ACI 318-19.',
    tags: ['ACI 318-19', 'مقطع مستطیلی و T', 'میلگرد بالا و پایین'] },

  { id: 'moqta',    icon: 'section',  cat: 'design',
    title: 'مقطع‌یار',
    desc: 'محاسبه خواص هندسی، پیچش و مصالح مرکب برای مقاطع مختلف.',
    tags: ['خواص هندسی', 'پیچش', 'مصالح مرکب'] },

  { id: 'calc',     icon: 'calculus', cat: 'math',
    title: 'حسابان',
    desc: 'مشتق، انتگرال، معادلات غیرخطی و سری فوریه با حل گام‌به‌گام و فرمول‌نامه.',
    tags: ['ریاضی ۱ و ۲', 'ریاضیات مهندسی', 'فرمول‌نامه'], badge: 'جدید' },

  { id: 'konkoor',  icon: 'dynamics', cat: 'exam',
    title: 'بانک پاسخ‌های کنکور دکترا',
    desc: 'پاسخ تشریحی دست‌نویس سؤال‌های کنکور دکترای عمران، درس دینامیک سازه‌ها، به‌همراه جمع‌بندی فرمول‌ها.',
    tags: ['دینامیک سازه‌ها', 'پاسخ دست‌نویس', 'جمع‌بندی فرمول'], badge: 'جدید' }
];

    { id: 's2800', icon: 'dynamics', cat: 'analysis',
    title: 'محاسبه‌گر ضریب زلزله | استاندارد ۲۸۰۰',
    desc: 'محاسبه ضریب زلزله در دو جهت بر اساس ویرایش‌های چهارم و پنجم، همراه با نمودار و اعتبارسنجی نتایج.',
    tags: ['استاندارد ۲۸۰۰', 'ویرایش ۴ و ۵', 'گزارش PDF'],
    badge: 'جدید' }

window.PORTAL = { profile: PROFILE, site: SITE, cats: CATS, apps: APPS, goatcounter: GOATCOUNTER, feedbackUrl: FEEDBACK_URL };
})();
