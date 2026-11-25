/* تنظیمات پورتال — برای تغییر مشخصات و افزودن برنامه‌ها، این فایل را ویرایش کنید.
 * فیلد اصلی فارسی است؛ فیلدهای *En ترجمهٔ انگلیسی هستند.
 * شناسه‌های id را تغییر ندهید؛ چون مسیر لینک برنامه‌ها هستند.
 */
(function () {
/* ① مشخصات شما. موارد خالی در پورتال نمایش داده نمی‌شوند. */
const PROFILE = {
  nameFa: 'کامبیز چراغی',
  nameEn: 'Kambiz Cheraghi',
  email: 'kambiz.cheraghi@gmail.com',
  telegram: 'engineer_teacher',
  instagram: '',
  linkedin: '',
  website: '',
  orcid: 'https://orcid.org/0000-0002-8177-394X',
  googleScholar: 'https://scholar.google.com/citations?user=NSAwy-4AAAAJ&hl=en',
  photo: 'profile.jpg' // عکس در همان پوشهٔ index.html و config.js قرار بگیرد
};

/* ② عنوان و توضیح صفحهٔ اول، به فارسی و انگلیسی */
const SITE = {
  title: 'آزمایشگاه نرم‌افزارهای مهندسی',
  titleEn: 'Engineering Software Laboratory',
  lead: 'تحلیل سازه، طراحی تیر بتنی، خواص مقطع و ریاضیات مهندسی. همه در مرورگر شما اجرا می‌شود، بدون نصب و ثبت‌نام.',
  leadEn: 'Structural analysis, reinforced concrete beam design, section properties, and engineering mathematics — all running in your browser, with no installation or sign-up required.'
};

/* معرفی کوتاه: در بخش «درباره من» نمایش داده می‌شود. هر دو زبان قابل ویرایش هستند. */
const ABOUT = {
  role: 'پژوهشگر مهندسی سازه | توسعه‌دهنده نرم‌افزارهای مهندسی',
  roleEn: 'Structural Engineering Researcher | Engineering Software Developer',
  bio: 'پژوهشگر در حوزه رفتار لرزه‌ای سازه‌ها و میراگرهای اتلاف انرژی؛ توسعه‌دهنده ابزارهای تعاملی تحلیل سازه، طراحی بتن و ریاضیات مهندسی.',
  bioEn: 'Researcher focused on seismic behavior of structures and energy-dissipating dampers; developer of interactive tools for structural analysis, concrete design, and engineering mathematics.'
};

/* ②-ب آمار بازدید (اختیاری) */
const GOATCOUNTER = 'kambiz';

/* ②-ج لینک فرم گزارش خطا و پیشنهاد (اختیاری) */
const FEEDBACK_URL = '';

/* سفارش مقاله: آدرس Web app منتشرشده در Google Apps Script؛ تا زمان تنظیم، فرم غیرفعال است. */
const ORDER_FORM_URL = 'https://script.google.com/macros/s/AKfycbyj3avRdVMApUKn3FmL5HsIRVqhDpsaZSWZeJPSn30GYaCNJ9RZ-VT0Emp2_z0WWCJ6zQ/exec';

/* ③ دسته‌بندی‌ها: name برای فارسی و nameEn برای انگلیسی */
const CATS = [
  { id: 'analysis', name: 'تحلیل سازه',  nameEn: 'Structural Analysis', color: 'teal' },
  { id: 'design',   name: 'بتن و مقطع',  nameEn: 'Concrete & Sections',  color: 'blue' },
  { id: 'math',     name: 'ریاضی',       nameEn: 'Mathematics',          color: 'violet' },
  { id: 'exam',     name: 'کنکور دکترا', nameEn: 'PhD Entrance Exam',     color: 'gold' }
];

/* ④ برنامه‌ها: title / desc / tags / badge برای فارسی و *En برای انگلیسی.
 * id همان نام پوشه و آدرس برنامه است: …/beam/
 * icon: beam | frame | truss | dynamics | buckling | concrete | section | calculus | seismic
 * enabled:false → پنهان کردن موقت برنامه
 */
const APPS = [
  { id: 'beam', icon: 'beam', cat: 'analysis',
    title: 'Beam Analysis Studio',
    titleEn: 'Beam Analysis Studio',
    desc: 'تحلیل تیر با اجزای محدود و نمودارهای برش، لنگر و تغییرشکل.',
    descEn: 'Finite element beam analysis with shear-force, bending-moment, and deflection diagrams.',
    tags: ['تحلیل تیر', 'اجزای محدود', 'خروجی Excel'],
    tagsEn: ['Beam analysis', 'Finite elements', 'Excel export'] },

  { id: 'framelab', icon: 'frame', cat: 'analysis',
    title: 'FrameLab',
    titleEn: 'FrameLab',
    desc: 'تحلیل الاستیک قاب خمشی و خرپای دوبعدی.',
    descEn: 'Elastic analysis of 2D moment-resisting frames and trusses.',
    tags: ['قاب خمشی', 'خرپا', 'گزارش تحلیل'],
    tagsEn: ['Moment frames', 'Trusses', 'Analysis report'] },

  { id: 'static', icon: 'truss', cat: 'analysis',
    title: 'تحلیل سازه‌ها',
    titleEn: 'Structural Analysis Lab',
    desc: 'آزمایشگاه تحلیل سازه‌ها؛ ترسیم سریع تیر، قاب و خرپا و دریافت گزارش مهندسی.',
    descEn: 'Quickly model beams, frames, and trusses, and generate engineering analysis reports.',
    tags: ['ترسیم سریع', 'تیر و قاب', 'گزارش'],
    tagsEn: ['Quick modeling', 'Beams & frames', 'Reports'] },

  { id: 'dynamics', icon: 'dynamics', cat: 'analysis',
    title: 'تحلیل دینامیکی سازه‌ها',
    titleEn: 'Structural Dynamics',
    desc: 'سیستم‌های جرم–فنر–میراگر با ۱، ۲ و ۳ درجه آزادی.',
    descEn: 'Mass–spring–damper systems with one, two, or three degrees of freedom.',
    tags: ['۱ تا ۳ درجه آزادی', 'جرم–فنر–میراگر'],
    tagsEn: ['1–3 degrees of freedom', 'Mass–spring–damper'] },

  { id: 'buckling', icon: 'buckling', cat: 'analysis',
    title: 'آزمایشگاه کمانش ستون و قاب',
    titleEn: 'Column & Frame Buckling Lab',
    desc: 'بار بحرانی اویلر برای ستون‌های چندپله، فنرها، تیرهای متصل و قاب‌های ۱ و ۲ طبقه.',
    descEn: 'Euler critical loads for stepped columns, springs, connected beams, and one- or two-story frames.',
    tags: ['بار بحرانی', 'ستون چندپله', 'قاب ۱ و ۲ طبقه'],
    tagsEn: ['Critical load', 'Stepped columns', '1- & 2-story frames'] },

  { id: 'beton', icon: 'concrete', cat: 'design',
    title: 'بتن‌یار',
    titleEn: 'Concrete Beam Design',
    desc: 'لنگر نهایی و نوع شکست تیر بتن‌آرمه طبق ACI 318-19.',
    descEn: 'Ultimate flexural strength and failure modes of reinforced concrete beams according to ACI 318-19.',
    tags: ['ACI 318-19', 'مقطع مستطیلی و T', 'میلگرد بالا و پایین'],
    tagsEn: ['ACI 318-19', 'Rectangular & T-sections', 'Top & bottom reinforcement'] },

  { id: 'moqta', icon: 'section', cat: 'design',
    title: 'مقطع‌یار',
    titleEn: 'Section Properties Calculator',
    desc: 'محاسبه خواص هندسی، پیچش و مصالح مرکب برای مقاطع مختلف.',
    descEn: 'Calculate geometric properties and torsion characteristics for a range of sections, including composite-material sections.',
    tags: ['خواص هندسی', 'پیچش', 'مصالح مرکب'],
    tagsEn: ['Section properties', 'Torsion', 'Composite materials'] },

  { id: 'calc', icon: 'calculus', cat: 'math',
    title: 'حسابان',
    titleEn: 'Calculus Studio',
    desc: 'مشتق، انتگرال، معادلات غیرخطی و سری فوریه با حل گام‌به‌گام و فرمول‌نامه.',
    descEn: 'Derivatives, integrals, nonlinear equations, and Fourier series, with step-by-step solutions and a formula reference.',
    tags: ['ریاضی ۱ و ۲', 'ریاضیات مهندسی', 'فرمول‌نامه'],
    tagsEn: ['Calculus I & II', 'Engineering mathematics', 'Formula reference'],
    badge: 'جدید', badgeEn: 'New' },

  { id: 'konkoor', icon: 'dynamics', cat: 'exam',
    title: 'بانک پاسخ‌های کنکور دکترا',
    titleEn: 'Civil Engineering PhD Exam Solutions',
    desc: 'پاسخ تشریحی دست‌نویس سؤال‌های کنکور دکترای عمران، درس دینامیک سازه‌ها، به‌همراه جمع‌بندی فرمول‌ها.',
    descEn: 'Handwritten, fully worked solutions to structural dynamics questions from the civil engineering PhD entrance exam, plus formula summaries.',
    tags: ['دینامیک سازه‌ها', 'پاسخ دست‌نویس', 'جمع‌بندی فرمول'],
    tagsEn: ['Structural dynamics', 'Handwritten solutions', 'Formula summaries'],
    badge: 'جدید', badgeEn: 'New' },

  { id: 's2800', icon: 'seismic', cat: 'analysis',
    title: 'محاسبه‌گر ضریب زلزله | استاندارد ۲۸۰۰',
    titleEn: 'Seismic Coefficient Calculator | Standard 2800',
    desc: 'محاسبه ضریب زلزله در دو جهت بر اساس ویرایش‌های چهارم و پنجم، همراه با نمودار و اعتبارسنجی نتایج.',
    descEn: 'Calculate seismic coefficients in two directions using the 4th and 5th editions of Standard 2800, with charts and result validation.',
    tags: ['استاندارد ۲۸۰۰', 'ویرایش ۴ و ۵', 'گزارش PDF'],
    tagsEn: ['Standard 2800', '4th & 5th editions', 'PDF report'],
    badge: 'جدید', badgeEn: 'New' }
];

window.PORTAL = {
  profile: PROFILE, site: SITE, about: ABOUT, cats: CATS, apps: APPS,
  goatcounter: GOATCOUNTER, feedbackUrl: FEEDBACK_URL, orderFormUrl: ORDER_FORM_URL
};
})();
