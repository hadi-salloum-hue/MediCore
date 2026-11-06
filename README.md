# MediCore — الموقع التعريفي (المرحلة 1)

الموقع التعريفي لمنتج **MediCore** (نظام إدارة عيادات SaaS). مبني بـ Next.js (App Router) وTypeScript وTailwind CSS، ويدعم العربية (RTL) والإنجليزية (LTR).

> هذا موقع تسويقي فقط. لا يحتوي على نظام طبي ولا يخزّن بيانات مرضى. كل بيانات معاينة اللوحة وهمية وموسومة كذلك.

## المتطلبات
- Node.js 18.18 أو أحدث (يُفضّل 20)
- npm

## التشغيل
```bash
npm install
cp .env.example .env.local   # ثم عدّل القيم
npm run dev                  # http://localhost:3000  (يحوّل تلقائياً إلى /en أو /ar)
```

| الأمر | الوظيفة |
|---|---|
| `npm run dev` | تشغيل التطوير |
| `npm run build` / `npm start` | بناء وتشغيل الإنتاج |
| `npm run lint` | فحص ESLint |
| `npm run typecheck` | فحص TypeScript |

## متغيرات البيئة
| المتغير | الوظيفة |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | العنوان الأساسي للموقع (للـ metadata وhreflang) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | بريد زر «راسلنا بالبريد» وإشعار الخصوصية |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | رقم واتساب بصيغة دولية أرقام فقط (مثل `962791234567`). إن تُرك فارغاً يختفي الزر. وإن فرغ البريد والرقم معاً يفتح زر التواصل نموذج الطلب |
| `DEMO_REQUEST_WEBHOOK_URL` | وجهة طلبات العرض التجريبي (على الخادم فقط) |

**مهم:** نموذج "احجز عرضاً تجريبياً" يرسل إلى `/api/demo-request`. بدون `DEMO_REQUEST_WEBHOOK_URL`:
- في التطوير: يقبل الطلب ولا يرسله لأي جهة (يظهر ذلك في سجل الخادم فقط).
- في الإنتاج: يرجع خطأ 503 فيظهر للمستخدم رسالة فشل، كي لا يوهم الموقع بأن الطلب وصل.

## هيكل المشروع
```
messages/            en.json / ar.json  (كل النصوص هنا، لا نصوص ثابتة بالمكونات)
public/brand/        ملفات الشعار المعتمدة
src/app/[locale]/    الصفحات (الرئيسية، privacy، terms) وlayout الذي يضبط lang/dir والخطوط
src/app/api/         demo-request (التحقق + التمرير للـ webhook + rate limit بسيط)
src/components/
  layout/            Navbar, Footer, Logo, LanguageSwitcher, SiteShell
  sections/          Hero, DashboardPreview, Features, Steps, Faq, FinalCta
  demo/              نافذة طلب العرض (Radix Dialog + react-hook-form + zod)
  ui/                Button, SectionHeading, button-styles
src/i18n/            إعدادات next-intl (routing, request, navigation)
src/lib/             مخطط التحقق المشترك (zod) و rate-limit
src/middleware.ts     اكتشاف اللغة وبادئة /en /ar (يجب أن يكون داخل src لأن المشروع يستخدم مجلد src)
```

## قرارات تصميمية
- **RTL:** كل المواضع بخصائص منطقية (`start/end`, `ms/me`, `text-start`) بدل left/right، والأسهم الاتجاهية تنقلب بـ `rtl:-scale-x-100`. الأوقات والأرقام ضمن `<bdi dir="ltr">` لتبقى صحيحة داخل النص العربي.
- **الخطوط:** Inter وPlus Jakarta Sans للإنجليزية، وTajawal للعربية، عبر حزم `@fontsource` (تُثبَّت مع npm وتُستضاف محلياً، فلا يعتمد التطوير ولا البناء على الاتصال بـ Google). `letter-spacing` يُصفَّر بالعربية لأنه يكسر اتصال الحروف.
- **التباين:** زر رئيسي بنص كحلي `#123B4A` على `#14B8A6` (تباين ≈ 4.8:1) وhover بتركوازي أفتح للحفاظ على التباين.
- **الوضع الداكن:** يتبع إعداد النظام افتراضياً ويحفظ اختيار المستخدم (`localStorage`). متغيرات الألوان في `globals.css` و`tailwind.config.ts`. هذا الوضع من تصميمنا نحن وليس من تصميم Stitch المعتمد. 
- **حفظ الإعدادات:** الثيم يُحفظ في `localStorage` ويُعاد تطبيقه عند تبديل اللغة (`ThemeProvider.tsx`)، واللغة تُحفظ بكوكي سنة (`NEXT_LOCALE`، من `routing.ts`) فيعيدك فتح الموقع إلى آخر لغة.
- **الأنيميشن:** دخول الـHero بـCSS فقط، وظهور الأقسام عند التمرير بمكوّن `Reveal` (`IntersectionObserver`)، وحركات للأزرار والبطاقات والقائمة والنافذة والأسئلة الشائعة. كلها تُعطَّل تلقائياً لمن فعّل «تقليل الحركة» في نظامه. التعريفات في `tailwind.config.ts` و`globals.css`.
- **الشعار بالوضع الداكن:** نسخ `*-dark.png` مولّدة من الشعار الأصلي (الكحلي صار فاتحاً والتركواز كما هو). يُفضَّل استبدالها بنسخة الشعار المعكوسة الرسمية عند توفرها.
- **زر العودة للأعلى:** أسفل يسار الصفحة، يظهر بعد التمرير 400px (`ScrollToTop.tsx`).
- **الوصول:** حلقة تركيز ظاهرة، `aria-expanded` للأسئلة الشائعة، `aria-pressed` لأزرار اللغة، نافذة بـ`role=dialog` وEsc وحجز التركيز (Radix)، وSkip link.
- **الحالات بصرياً:** الحالة دائماً أيقونة + نص، ولا تعتمد على اللون وحده.

## قبل النشر (غير منجز بعد)
- [ ] **Privacy:** إشعار الخصوصية مكتوب ويطابق ما يجمعه الموقع فعلاً (`messages/*.json` → `privacyPolicy`)، لكنه **مسودة** حتى تراجعه جهة قانونية. حدّد `NEXT_PUBLIC_LEGAL_ENTITY_NAME` و`NEXT_PUBLIC_CONTACT_EMAIL`، وبعد الموافقة القانونية اضبط `NEXT_PUBLIC_LEGAL_REVIEWED=true`. **أي تغيير بما يجمعه الموقع (حقول، كوكيز، أدوات تحليل، مزودين) يستلزم تحديث الإشعار و`PRIVACY_LAST_UPDATED` في `src/lib/legal.ts`.**
- [ ] **Terms:** صفحة شروط الخدمة ما زالت نصاً مؤقتاً (`noindex`).
- [ ] تحديد `DEMO_REQUEST_WEBHOOK_URL` وبريد التواصل.
- [ ] استبدال شعار PNG الأفقي بنسخة SVG أو PNG أعلى دقة (الحالي ارتفاعه 63px فقط).
- [ ] rate limit الحالي في الذاكرة ويصلح لخادم واحد فقط؛ على استضافة serverless يلزم مخزن مشترك.
- [ ] اختبار يدوي على الهاتف والتابلت بالاتجاهين، وإضافة اختبارات E2E (Playwright).
- [ ] مراجعة سياسة الخصوصية للنموذج (يجمع اسماً وبريداً واسم عيادة) قبل أي استخدام فعلي.

## الأقسام والنصوص
تُعدَّل النصوص من `messages/*.json` فقط. أي مفتاح جديد يجب أن يوجد في الملفين.
