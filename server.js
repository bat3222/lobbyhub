const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Data directory & persistent file path
const DATA_DIR = process.env.LOBBYHUB_DATA_DIR || path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Default Seed Data
const DEFAULT_DB = {
  "settings": {
    "storeName": "LobbyHub",
    "tagline": "أكثر من مجرد متجر، مجتمعك الرقمي المتكامل",
    "logoUrl": "assets/شعاري رسمي_2.png",
    "logoHorizontal": "assets/logo-horizontal.png",
    "avatarUrl": "assets/logo-avatar.jpg",
    "heroBg": "assets/خلفية.png",
    "heroVisual": "assets/ChatGPT Image 4 Oct 2026, 21_22_10.png",
    "promoVideo": "assets/promo-video.mp4",
    "communityBanner": "assets/صورة طويلة.png",
    "aboutFeaturesBanner": "assets/e1cc45ed-2c5a-4b85-8923-11657210f11d.jpg",
    "marqueeText": "منتجات رقمية ومجتمع للاعبين — الطلبات قيد المراجعة قبل الدفع",
    "marqueeEnabled": true,
    "marqueeSpeed": 25,
    "ownerEmail": "alfawazibrahim73@gmail.com",
    "ownerPhone": "0550230156",
    "whatsappUrl": "https://api.whatsapp.com/send?phone=966550230156",
    "discordUrl": "https://discord.gg/pn7JNrXxg",
    "tiktokUrl": "https://www.tiktok.com/@llobbyhub",
    "supportEmail": "alfawazibrahim73@gmail.com",
    "currency": "SAR",
    "exchangeRates": {
      "SAR": 1,
      "USD": 0.27,
      "AED": 0.98,
      "KWD": 0.082,
      "EUR": 0.25
    },
    "currencySymbols": {
      "SAR": "ر.س",
      "USD": "$",
      "AED": "د.إ",
      "KWD": "د.ك",
      "EUR": "€"
    },
    "status": "open",
    "maintenanceMessage": "🛠️ نحن الآن في مرحلة تحديث وصيانة لمتجر LobbyHub لنقدم لكم تجربة أسرع وأفضل! سنعود خلال وقت قصير.",
    "closedTempMessage": "⏸️ المتجر مغلق مؤقتاً لاستقبال وتجهيز طلبات العملاء الكرام، نفتح قريباً.",
    "closedPermMessage": "🛑 المتجر مغلق حالياً. لأي استفسارات يرجى التواصل عبر الديسكورد أو الواتساب.",
    "announcementBar": {
      "enabled": true,
      "text": "مرحبًا بك في LobbyHub — أرسل طلبك وتابع تأكيد التوفر والدفع مع المتجر"
    },
    "paymentMethods": {
      "mada": false,
      "visa": false,
      "applePay": false,
      "stcPay": false,
      "crypto": false,
      "whatsappOrder": true
    },
    "checkoutEnabled": false,
    "manualOrdersEnabled": true,
    "otpEnabled": false
  },
  "users": [
    {
      "id": "export-owner",
      "name": "LobbyHub Owner",
      "email": "alfawazibrahim73@gmail.com",
      "role": "super_owner",
      "status": "active"
    }
  ],
  "categories": [
    {
      "id": "cat-discord",
      "name": "اشتراكات ديسكورد",
      "slug": "discord-services",
      "icon": "fa-brands fa-discord",
      "description": "اشتراكات ديسكورد نترو جيمنج، بوستات سيرفرات، وتفعيل فوري بالثواني",
      "order": 1,
      "isVisible": true
    },
    {
      "id": "cat-gaming",
      "name": "حسابات وبطاقات الألعاب",
      "slug": "gaming-accounts",
      "icon": "fa-solid fa-gamepad",
      "description": "إكس بوكس قيم باس، ألعاب ستيم، بلايستيشن، وشحن عملات الألعاب",
      "order": 2,
      "isVisible": true
    },
    {
      "id": "cat-subscriptions",
      "name": "منصات الترفيه والمشاهدة",
      "slug": "subscriptions",
      "icon": "fa-solid fa-tv",
      "description": "شاهد VIP، أمازون برايم فيديو، نتفلكس 4K، ويوتيوب بريميوم",
      "order": 3,
      "isVisible": true
    },
    {
      "id": "cat-software",
      "name": "برامج ومفاتيح التفعيل",
      "slug": "software-keys",
      "icon": "fa-brands fa-windows",
      "description": "مفاتيح ويندوز 11 الأصلية مدى الحياة وبرامج مايكروسوفت أوفيس",
      "order": 4,
      "isVisible": true
    }
  ],
  "products": [
    {
      "id": "prod-discord-nitro",
      "name": "اشتراكات Discord Nitro الأصلية (3 أشهر مع بوستات)",
      "category": "cat-discord",
      "categoryName": "اشتراكات ديسكورد",
      "price": 45,
      "oldPrice": 65,
      "image": "assets/product-discord-hd.jpg",
      "badge": "الأكثر طلباً 🔥",
      "rating": 0,
      "reviewsCount": 0,
      "stock": 0,
      "description": "ارتق بتجربة ديسكورد إلى مستوى جديد كلياً! احصل على مميزات حصرية، إيموجيات مخصصة في كل مكان، شارة Nitro، بث 1080p 60FPS، ورفع ملفات حتى 500MB مع 2 سيرفر بوست مجاناً.",
      "features": [
        "إيموجي مخصصة واستخدامها في كل السيرفرات",
        "صورة ملف شخصية متحركة (GIF) وبانر مخصص",
        "بث بجودة فائقة 1080p 60FPS",
        "رفع ملفات حتى 500MB وشارات مميزة",
        "2 سيرفر بوست مجاناً وخصم 30% على البوستات الإضافية"
      ],
      "requiresCustomInput": false,
      "customInputLabel": "",
      "isFeatured": true,
      "isActive": true,
      "keys": [],
      "salesCount": 0
    },
    {
      "id": "prod-xbox-gamepass",
      "name": "اشتراكات Xbox Game Pass Ultimate (شامل EA Play)",
      "category": "cat-gaming",
      "categoryName": "حسابات وبطاقات الألعاب",
      "price": 55,
      "oldPrice": 89,
      "image": "assets/product-xbox-hd.jpg",
      "badge": "مكتبة ضخمة 🎮",
      "rating": 0,
      "reviewsCount": 0,
      "stock": 0,
      "description": "الوصول غير المحدود إلى مئات الألعاب ذات الجودة العالية على الكونسول والـ PC مع اشتراك EA Play المجاني واللعب السحابي Cloud Gaming وإصدارات اليوم الأول مثل Starfield و Forza و FC24.",
      "features": [
        "مكتبة ألعاب تضم أكثر من 400 لعبة كبرى",
        "جميع إصدارات Xbox Game Studios في اليوم الأول",
        "اشتراك EA Play مجاناً متضمن في الباقة",
        "يعمل على أجهزة Xbox والكمبيوتر والهاتف السحابي",
        "ضمان كامل المدة وتسليم فوري"
      ],
      "requiresCustomInput": false,
      "customInputLabel": "",
      "isFeatured": true,
      "isActive": true,
      "keys": [],
      "salesCount": 0
    },
    {
      "id": "prod-steam-accounts",
      "name": "حسابات وألعاب Steam الأصلية والمفعلة",
      "category": "cat-gaming",
      "categoryName": "حسابات وبطاقات الألعاب",
      "price": 79,
      "oldPrice": 120,
      "image": "assets/product-steam-hd.jpg",
      "badge": "ألعاب كبرى 🚀",
      "rating": 0,
      "reviewsCount": 0,
      "stock": 0,
      "description": "استمتع بآلاف الألعاب على حسابات ستيم أصلية وآمنة مع إمكانية تغيير البيانات كاملة أو حسابات جاهزة للعب فوراً مع ألعاب كبرى مثل Elden Ring, Red Dead Redemption 2, GTA V, Counter-Strike 2.",
      "features": [
        "حسابات أصلية ومفعلة 100%",
        "جاهزة للعب فوراً مع دعم كامل للغة العربية",
        "إمكانية ربط الحساب بإيميلك الشخصي وضمان ضد الإغلاق",
        "تفعيل فوري ودعم فني على مدار الساعة 24/7",
        "متوافق مع منصة ستيم الرسمية والكمبيوتر"
      ],
      "requiresCustomInput": false,
      "customInputLabel": "",
      "isFeatured": true,
      "isActive": true,
      "keys": [],
      "salesCount": 0
    },
    {
      "id": "prod-shahid-vip",
      "name": "اشتراكات شاهد VIP الأصلية (أعلى باقة شاملة المسلسلات والرياضة)",
      "category": "cat-subscriptions",
      "categoryName": "منصات الترفيه والمشاهدة",
      "price": 29,
      "oldPrice": 45,
      "image": "assets/product-shahid-hd.jpg",
      "badge": "مسلسلات حصرية 🎬",
      "rating": 0,
      "reviewsCount": 0,
      "stock": 0,
      "description": "استمتع بأكبر مكتبة عربية من المسلسلات والأفلام والبرامج الحصرية وقنوات البث المباشر بجودة Full HD و 4K على شاهد VIP بدون أي إعلانات مزعجة.",
      "features": [
        "أعمال شاهد الأصلية الحصرية وأحدث المسلسلات العربية والتركية",
        "بث حي ومباشر للقنوات التلفزيونية والرياضية بتقنية عالية",
        "مشاهدة بدون فواصل إعلانية نهائياً",
        "متوافق مع جميع أجهزة التلفاز الذكية، الجوال، التابلت والكمبيوتر",
        "حساب أصلي ومضمون 100%"
      ],
      "requiresCustomInput": false,
      "customInputLabel": "",
      "isFeatured": true,
      "isActive": true,
      "keys": [],
      "salesCount": 0
    },
    {
      "id": "prod-netflix-4k",
      "name": "اشتراكات Netflix 4K UHD بريميوم (بروفايل شخصي برمز سري)",
      "category": "cat-subscriptions",
      "categoryName": "منصات الترفيه والمشاهدة",
      "price": 28,
      "oldPrice": 49,
      "image": "assets/product-netflix-hd.jpg",
      "badge": "جودة 4K UHD 🍿",
      "rating": 0,
      "reviewsCount": 0,
      "stock": 0,
      "description": "استمتع بمشاهدة آلاف الأفلام والمسلسلات الحصرية على نتفلكس بأعلى جودة فائقة 4K Ultra HD مع بروفايل شخصي خاص بك مقفل برقم سري وضمان كامل المدة.",
      "features": [
        "جودة بث فائقة 4K Ultra HD + HDR والصوت المحيطي Dolby Atmos",
        "بروفايل شخصي خاص بك مع قفل برمز سري (PIN)",
        "إمكانية التحميل والمشاهدة بدون إنترنت",
        "متاح على الشاشات الذكية، أجهزة الألعاب، الجوالات، والكمبيوتر",
        "حسابات مستقرة وآمنة ومضمونة طوال فترة الاشتراك"
      ],
      "requiresCustomInput": false,
      "customInputLabel": "",
      "isFeatured": true,
      "isActive": true,
      "keys": [],
      "salesCount": 0
    },
    {
      "id": "prod-youtube-premium",
      "name": "اشتراكات YouTube Premium الأصلية (بدون إعلانات + YouTube Music)",
      "category": "cat-subscriptions",
      "categoryName": "منصات الترفيه والمشاهدة",
      "price": 22,
      "oldPrice": 35,
      "image": "assets/product-youtube-hd.jpg",
      "badge": "بدون إعلانات 🔴",
      "rating": 0,
      "reviewsCount": 0,
      "stock": 0,
      "description": "تخلص من الإعلانات المزعجة نهائياً! استمتع بمشاهدة جميع فيديوهات يوتيوب بدون إعلانات مع ميزة تشغيل الصوت في الخلفية وتحميل الفيديوهات بالإضافة إلى اشتراك YouTube Music مجاناً.",
      "features": [
        "مشاهدة فيديوهات اليوتيوب بدون أي إعلانات إطلاقاً",
        "تشغيل في الخلفية أثناء تصفح التطبيقات أو قفل الشاشة",
        "تحميل الفيديوهات والمقاطع لمشاهدتها بدون إنترنت",
        "اشتراك كامل في تطبيق YouTube Music بدون انقطاع",
        "تفعيل فوري ورسمي على إيميلك الشخصي"
      ],
      "requiresCustomInput": true,
      "customInputLabel": "أدخل بريدك الإلكتروني (Gmail) للتفعيل الفوري",
      "isFeatured": true,
      "isActive": true,
      "keys": [],
      "salesCount": 0
    },
    {
      "id": "prod-prime-video",
      "name": "اشتراكات Amazon Prime Video 4K الأصلية",
      "category": "cat-subscriptions",
      "categoryName": "منصات الترفيه والمشاهدة",
      "price": 19,
      "oldPrice": 35,
      "image": "assets/product-prime-video-hd.jpg",
      "badge": "أفلام عالمية ✨",
      "rating": 0,
      "reviewsCount": 0,
      "stock": 0,
      "description": "عالم من الترفيه اللامحدود مع برايم فيديو! شاهد أضخم المسلسلات العالمية مثل The Boys و Fallout و Reacher بأعلى جودة 4K UHD وترجمة عربية كاملة.",
      "features": [
        "محتوى حصري وعالمي من استوديوهات أمازون الأصلية",
        "جودة مشاهدة فائقة 4K UHD مع ترجمة احترافية",
        "مشاهدة وتحميل على الهواتف والأجهزة اللوحية والشاشات",
        "تسليم فوري بعد الدفع وضمان كامل 100%"
      ],
      "requiresCustomInput": false,
      "customInputLabel": "",
      "isFeatured": true,
      "isActive": true,
      "keys": [],
      "salesCount": 0
    }
  ],
  "coupons": [],
  "orders": [],
  "reviews": [],
  "faqs": [
    {
      "id": "faq-01",
      "question": "كيف يتم تسليم المنتجات الرقمية بعد إتمام الدفع؟",
      "answer": "التسليم فوري وآلي 100%! بمجرد اكتمال عملية الدفع تظهر لك الأكواد وروابط التفعيل مباشرة في شاشة الطلب، وتُحفظ تلقائياً في حسابك الشخصي بقسم (أكوادك الرقمية) كما تصلك نسخة إلى بريدك الإلكتروني."
    }
  ],
  "activityLogs": []
};

// Persistent data is private; only explicit projections are returned to browsers.
const crypto = require('crypto');
let dbData;
function saveDatabase() {
    const tmp = DB_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(dbData, null, 2), {mode: 0o600});
    fs.renameSync(tmp, DB_FILE);
}
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    return salt + ':' + crypto.scryptSync(password, salt, 64).toString('hex');
}
function verifyPassword(password, hash) {
    if (typeof password !== 'string' || password.length > 200 || !hash) return false;
    const [salt, digest] = hash.split(':');
    const actual = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(digest || '', 'hex');
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}
dbData = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : structuredClone(DEFAULT_DB);
if (!dbData.securityVersion) {
    const credentials = [];
    for (const user of dbData.users || []) {
        // All former passwords were exposed by the old public database.
        const password = crypto.randomBytes(20).toString('base64url');
        user.passwordHash = hashPassword(password);
        if (user.role === 'super_owner') credentials.push(`${user.email}\n${password}\n`);
        else user.status = 'reset_required';
        delete user.password;
    }
    dbData.securityVersion = 1;
    dbData.currentUser = null;
    fs.writeFileSync(path.join(DATA_DIR, 'owner-login-private.txt'),
        'Private owner credentials. Keep this file private.\n\n' + credentials.join('\n'), {mode: 0o600});
    saveDatabase();
}
const sessions = new Map();
const attempts = new Map();
const safeUser = u => u ? Object.fromEntries(Object.entries(u).filter(([k]) => !['password','passwordHash'].includes(k))) : null;
const publicProduct = p => Object.fromEntries(Object.entries(p).filter(([k]) => !['keys','downloadUrl','credentials','password'].includes(k)));
const paymentMethods = {mada:false,visa:false,applePay:false,stcPay:false,crypto:false,whatsappOrder:true};
function publicSettings() {
    const {ownerEmail, ownerPhone, ...settings} = dbData.settings || {};
    return {...settings, paymentMethods, checkoutEnabled:false, manualOrdersEnabled:true, otpEnabled:false};
}
function view(req) {
    const owner = req.user?.role === 'super_owner';
    return {
        settings: publicSettings(),
        categories: dbData.categories || [],
        products: owner ? dbData.products : (dbData.products || []).filter(p => p.isVisible !== false).map(publicProduct),
        reviews: dbData.reviews || [], faqs: dbData.faqs || [],
        coupons: owner ? dbData.coupons || [] : [],
        users: owner ? dbData.users.map(safeUser) : [],
        orders: owner ? dbData.orders || [] : (dbData.orders || []).filter(o=>o.userId===req.user?.id && !!req.user),
        activityLogs: owner ? dbData.activityLogs || [] : [],
        currentUser: safeUser(req.user)
    };
}
app.disable('x-powered-by');
app.use((req,res,next) => {
    res.set('X-Content-Type-Options','nosniff');
    res.set('X-Frame-Options','DENY');
    res.set('Referrer-Policy','strict-origin-when-cross-origin');
    if (req.path.startsWith('/api/') || req.path.endsWith('.js')) res.set('Cache-Control','no-store');
    if (!['GET','HEAD','OPTIONS'].includes(req.method)) {
        if (req.headers['sec-fetch-site'] === 'cross-site') return res.status(403).json({success:false,message:'طلب غير مسموح'});
        if (req.headers.origin) {
            try { if (new URL(req.headers.origin).host !== req.headers.host) return res.status(403).json({success:false}); }
            catch { return res.status(403).json({success:false}); }
        }
        if (!req.is('application/json')) return res.status(415).json({success:false,message:'JSON required'});
    }
    const token = (req.headers.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith('lh_session='))?.slice(11);
    const session = sessions.get(token);
    if (session && session.expires > Date.now()) req.user = dbData.users.find(u=>u.id===session.id && u.status==='active');
    req.sessionToken = token;
    next();
});
app.use(express.json({limit:'20mb'}));
function ownerOnly(req,res,next) {
    if (!req.user) return res.status(401).json({success:false,message:'يرجى تسجيل الدخول'});
    if (req.user.role !== 'super_owner') return res.status(403).json({success:false,message:'هذه العملية للمالك فقط'});
    next();
}
function issueSession(req,res,user) {
    if (req.sessionToken) sessions.delete(req.sessionToken);
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token,{id:user.id,expires:Date.now()+8*3600000});
    const secure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    res.setHeader('Set-Cookie',`lh_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure?'; Secure':''}`);
}
function authLimit(req,res,next) {
    const key = req.socket.remoteAddress + ':' + String(req.body.email || '').toLowerCase();
    const now = Date.now();
    if (attempts.size>10000) for (const [k,v] of attempts) if(v.until<now) attempts.delete(k);
    let state=attempts.get(key);
    if (!state || state.until<now) state={count:0,until:now+15*60000};
    attempts.set(key,state);
    if (++state.count>15) return res.status(429).json({success:false,message:'محاولات كثيرة؛ حاول بعد 15 دقيقة'});
    next();
}
app.post('/api/auth/login',authLimit,(req,res)=>{
    const email=String(req.body.email || '').trim().toLowerCase();
    const user=dbData.users.find(u=>u.email?.toLowerCase()===email);
    if (!user || user.status!=='active' || !verifyPassword(req.body.password,user.passwordHash))
        return res.status(401).json({success:false,message:'بيانات الدخول غير صحيحة أو الحساب يحتاج إعادة تعيين'});
    issueSession(req,res,user); res.json({success:true,user:safeUser(user)});
});
app.post('/api/auth/register',authLimit,(req,res)=>{
    const {name,email,password,phone}=req.body;
    if (typeof name!=='string' || !name.trim() || name.length>100 || /[<>"'`]/.test(name) || typeof email!=='string' || !/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email) || email.length>200 || typeof password!=='string' || password.length<12 || password.length>200 || (phone && !/^[+\d ()-]{6,25}$/.test(phone)))
        return res.status(400).json({success:false,message:'أدخل بيانات صحيحة وكلمة مرور من 12 حرفًا على الأقل'});
    if (dbData.users.some(u=>u.email?.toLowerCase()===email.trim().toLowerCase())) return res.status(409).json({success:false,message:'البريد مسجل مسبقًا'});
    const user={id:crypto.randomUUID(),name:name.trim(),email:email.trim().toLowerCase(),phone:phone||'',passwordHash:hashPassword(password),role:'customer',status:'active',createdAt:new Date().toISOString()};
    dbData.users.push(user); saveDatabase(); issueSession(req,res,user); res.status(201).json({success:true,user:safeUser(user)});
});
app.get('/api/auth/me',(req,res)=>res.json({success:true,user:safeUser(req.user)}));
app.post('/api/auth/logout',(req,res)=>{
    sessions.delete(req.sessionToken); res.setHeader('Set-Cookie','lh_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); res.json({success:true});
});
app.post(['/api/auth/send-otp','/api/auth/verify-otp'],(req,res)=>res.status(503).json({success:false,message:'تسجيل الجوال غير متاح حتى ربط خدمة رسائل حقيقية؛ استخدم البريد الإلكتروني'}));
app.get('/api/health',(req,res)=>res.json({status:'online',securityVersion:2,checkoutEnabled:false,manualOrdersEnabled:true,otpEnabled:false}));
app.get('/api/db/load',(req,res)=>res.json({success:true,data:view(req)}));
app.get('/api/products',(req,res)=>res.json({success:true,data:view(req).products}));
app.get('/api/settings',(req,res)=>res.json({success:true,data:publicSettings()}));
app.get('/api/users',ownerOnly,(req,res)=>res.json({success:true,data:dbData.users.map(safeUser)}));
app.get('/api/orders',ownerOnly,(req,res)=>res.json({success:true,data:dbData.orders||[]}));
function signedIn(req,res,next) {
    if(!req.user) return res.status(401).json({success:false,message:'سجّل الدخول لحفظ طلبك ومتابعته'});
    next();
}
const orderAttempts=new Map();
app.post('/api/orders',signedIn,(req,res)=>{
    const previous=orderAttempts.get(req.user.id)||0;
    if(Date.now()-previous<5000) return res.status(429).json({success:false,message:'انتظر قليلًا قبل إرسال طلب آخر'});
    const data=req.body;
    if(dbData.settings.status!=='open') return res.status(409).json({success:false,message:'المتجر لا يستقبل طلبات حاليًا'});
    if(data.paymentMethod!=='manual') return res.status(503).json({success:false,message:'الدفع الإلكتروني غير مربوط؛ اختر الطلب اليدوي'});
    if(data.currency && data.currency!=='SAR') return res.status(400).json({success:false,message:'تُسجّل الطلبات بالريال السعودي'});
    if(!Array.isArray(data.items)||data.items.length<1||data.items.length>30) return res.status(400).json({success:false,message:'السلة غير صالحة'});
    const quantities=new Map();
    for(const item of data.items){
        if(typeof item.id!=='string'||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>20) return res.status(400).json({success:false,message:'كمية غير صالحة'});
        quantities.set(item.id,(quantities.get(item.id)||0)+item.quantity);
    }
    const items=[];
    for(const [id,quantity] of quantities){
        const p=dbData.products.find(x=>x.id===id&&x.isVisible!==false);
        if(!p||quantity>20||!Number.isFinite(Number(p.price))||Number(p.price)<0) return res.status(400).json({success:false,message:'تحقق من المنتجات والكميات'});
        if(Number(p.stock)<quantity) return res.status(409).json({success:false,message:'الكمية المطلوبة غير متوفرة'});
        items.push({id,name:p.name,price:Number(p.price),quantity,deliveredKeys:[]});
    }
    if(data.couponCode) return res.status(400).json({success:false,message:'تُراجع الخصومات مع المالك قبل الدفع'});
    const phone=String(data.customerPhone||req.user.phone||'').trim();
    if(!/^[+\d ()-]{8,25}$/.test(phone)) return res.status(400).json({success:false,message:'أدخل رقم تواصل صحيحًا'});
    const notes=String(data.notes||'').slice(0,1000).replace(/[<>"'`]/g,'');
    const total=Math.round(items.reduce((n,i)=>n+i.price*i.quantity,0)*100)/100;
    const key=String(data.requestId||'');
    if(!/^[a-zA-Z0-9-]{10,80}$/.test(key)) return res.status(400).json({success:false,message:'أعد فتح نموذج الطلب'});
    const existing=(dbData.orders||[]).find(o=>o.userId===req.user.id&&o.requestId===key);
    if(existing)return res.json({success:true,order:existing});
    const order={id:'LH-'+crypto.randomUUID(),requestId:key,userId:req.user.id,customerName:req.user.name,customerEmail:req.user.email,customerPhone:phone,items,subtotal:total,total,discount:0,currency:'SAR',paymentMethod:'manual',paymentStatus:'unpaid',status:'pending',orderStatus:'pending',createdAt:new Date().toISOString(),date:new Date().toLocaleString('ar-SA'),notes};
    dbData.orders.unshift(order);saveDatabase();orderAttempts.set(req.user.id,Date.now());
    res.status(201).json({success:true,order});
});
app.post('/api/reviews',signedIn,(req,res)=>{
 const order=dbData.orders.find(o=>o.userId===req.user.id&&o.orderStatus==='completed');
 if(!order)return res.status(403).json({success:false,message:'يمكن التقييم بعد إكمال طلب حقيقي'});
 if((dbData.reviews||[]).some(r=>r.userId===req.user.id))return res.status(409).json({success:false,message:'لديك تقييم مسجل بالفعل'});
 const {rating,comment}=req.body;
 if(!Number.isInteger(rating)||rating<1||rating>5||typeof comment!=='string'||comment.trim().length<3||comment.length>1000||/[<>"'`]/.test(comment))return res.status(400).json({success:false,message:'اكتب تقييمًا صحيحًا من 1 إلى 5 ونصًا واضحًا'});
 dbData.reviews.unshift({id:crypto.randomUUID(),userId:req.user.id,author:req.user.name,product:'طلب مكتمل',rating,comment:comment.trim(),verifiedPurchase:true,date:new Date().toISOString().slice(0,10)});saveDatabase();res.json({success:true});
});
app.put('/api/orders/:id/status',ownerOnly,(req,res)=>{
    const order=dbData.orders.find(o=>o.id===req.params.id);
    if(!order)return res.status(404).json({success:false,message:'الطلب غير موجود'});
    if(order.paymentMethod!=='manual'||!order.userId) return res.status(409).json({success:false,message:'طلب قديم؛ راجعه خارج مسار الطلبات الجديدة'});
    const status=req.body.status;
    if(status===order.orderStatus)return res.json({success:true,order});
    if(status==='processing'){
        if(order.orderStatus!=='pending'||req.body.confirmPayment!==true) return res.status(409).json({success:false,message:'يجب تأكيد استلام الدفع فعليًا أولًا'});
        const ref=String(req.body.paymentReference||'').trim();
        if(ref.length<3||ref.length>150||/[<>"'`]/.test(ref))return res.status(400).json({success:false,message:'أدخل مرجع الدفع الفعلي'});
        order.paymentStatus='paid_manual';order.paymentReference=ref;order.paymentVerifiedBy=req.user.id;order.paymentVerifiedAt=new Date().toISOString();
    }else if(status==='completed'){
        if(order.orderStatus!=='processing'||order.paymentStatus!=='paid_manual')return res.status(409).json({success:false,message:'أكد استلام الدفع قبل التسليم'});
        for(const item of order.items){const p=dbData.products.find(p=>p.id===item.id);if(!p||!Array.isArray(p.keys)||p.keys.length<item.quantity)return res.status(409).json({success:false,message:'أضف أكوادًا أصلية كافية لكل منتجات الطلب قبل إكماله'});}
        for(const item of order.items){const p=dbData.products.find(p=>p.id===item.id);item.deliveredKeys=p.keys.splice(0,item.quantity);p.stock=Math.max(0,Number(p.stock||0)-item.quantity);}
        order.deliveredAt=new Date().toISOString();
    }else if(status==='cancelled'){
        if(order.paymentStatus!=='unpaid') return res.status(409).json({success:false,message:'الطلب مدفوع؛ راجع الاسترداد يدويًا'});
    }else return res.status(409).json({success:false,message:'الاسترداد المالي يتطلب إجراءً فعليًا؛ لا ينفذ الموقع تحويلات مالية'});
    order.orderStatus=status;order.status=status;saveDatabase();res.json({success:true,order});
});

app.post('/api/db/save',ownerOnly,(req,res)=>{
    const input=req.body;
    if (input.orders && JSON.stringify(input.orders)!==JSON.stringify(dbData.orders || []))
        return res.status(409).json({success:false,message:'لا يمكن تغيير حالات الدفع والتسليم قبل ربط بوابة دفع حقيقية'});
    // Existing legacy admin uses whole-view saves. Never accept order/payment changes this way.
    for (const key of ['products','categories','faqs','coupons','reviews']) {
        if (input[key]!==undefined && !Array.isArray(input[key])) return res.status(400).json({success:false,message:'بيانات غير صالحة'});
    }
    if (input.products?.some(p=>!p.id || typeof p.name!=='string' || !Number.isFinite(Number(p.price)) || Number(p.price)<0)) return res.status(400).json({success:false,message:'تحقق من المنتجات والأسعار'});
    if (input.users) {
        if (!Array.isArray(input.users)) return res.status(400).json({success:false});
        // Preserve owner identities, hash replacement passwords, and never expose hashes.
        const owners=dbData.users.filter(u=>u.role==='super_owner');
        const others=[];
        for (const u of input.users.filter(u=>!owners.some(o=>o.id===u.id))) {
            const old=dbData.users.find(x=>x.id===u.id);
            if (!['customer','supervisor'].includes(u.role)) return res.status(400).json({success:false,message:'صلاحية غير صالحة'});
            if (!old && (!u.password || u.password.length<12)) return res.status(400).json({success:false,message:'كلمة المرور الجديدة يجب ألا تقل عن 12 حرفًا'});
            if (u.password && u.password.length<12) return res.status(400).json({success:false,message:'كلمة المرور يجب ألا تقل عن 12 حرفًا'});
            const item={...safeUser(u),passwordHash:u.password?hashPassword(u.password):old?.passwordHash};
            others.push(item);
        }
        dbData.users=[...owners,...others];
    }
    for (const key of ['products','categories','faqs','coupons','reviews']) if(input[key]) dbData[key]=input[key];
    if(input.settings) dbData.settings={...dbData.settings,...input.settings,paymentMethods};
    saveDatabase(); res.json({success:true,message:'تم الحفظ',data:view(req)});
});
app.post('/api/settings',ownerOnly,(req,res)=>{
    const input=req.body;
    for(const key of ['logoUrl','heroVisual','promoVideo','communityBanner','aboutFeaturesBanner','heroBg']) {
        if(input[key]===undefined)continue;
        if(typeof input[key]!=='string')return res.status(400).json({success:false,message:'رابط الوسائط غير صالح'});
        const value=input[key].trim();
        if(value && !/^(?:\/?assets\/[^\r\n]+|https?:\/\/[^\s]+)$/.test(value))return res.status(400).json({success:false,message:'ارفع الصورة من زر الرفع أو استخدم رابط https. مسار الصورة على جهازك لا يعمل للزوار.'});
    }
    dbData.settings={...dbData.settings,...input,paymentMethods};saveDatabase();res.json({success:true,settings:publicSettings()});
});
app.post('/api/upload',ownerOnly,(req,res)=>{
    const types={'image/png':'.png','image/jpeg':'.jpg','image/webp':'.webp','image/gif':'.gif','video/mp4':'.mp4','video/webm':'.webm'};
    const match=typeof req.body.base64Data==='string' && req.body.base64Data.match(/^data:([^;]+);base64,([A-Za-z0-9+/=]+)$/);
    if (!match || !types[match[1]]) return res.status(400).json({success:false,message:'نوع الملف غير مسموح'});
    const buffer=Buffer.from(match[2],'base64');
    if(buffer.length>12*1024*1024) return res.status(413).json({success:false,message:'الحد الأقصى 12 ميجابايت'});
    const name=crypto.randomUUID()+types[match[1]]; fs.writeFileSync(path.join(__dirname,'public','assets',name),buffer);
    const target=req.body.target;
    if(['logo','heroVisual','promoVideo','communityBanner','aboutFeaturesBanner','heroBg'].includes(target)) {dbData.settings[target==='logo'?'logoUrl':target]='assets/'+name;saveDatabase();}
    res.json({success:true,url:'assets/'+name});
});
app.post(['/api/notify/dispatch-sms','/api/notify/owner-alert'],ownerOnly,(req,res)=>res.status(503).json({success:false,message:'لم يتم ربط مزود الرسائل بعد'}));
app.get('/api/notify/sms-logs',ownerOnly,(req,res)=>res.json({success:true,logs:[]}));
app.use('/api',(req,res)=>res.status(404).json({success:false,message:'المسار غير موجود'}));
app.get('/admin',(req,res)=>res.sendFile(path.join(__dirname,'public','admin.html')));
app.use(express.static(path.join(__dirname,'public'),{dotfiles:'deny',index:'index.html'}));
app.use((req,res)=>res.status(404).send('Not found'));
app.use((error,req,res,next)=>{console.error('Request failed:',error.message);res.status(500).json({success:false,message:'تعذر إكمال العملية'});});
app.listen(PORT,process.env.HOST || '0.0.0.0',()=>console.log(`LobbyHub running on port ${PORT}; online payments disabled until configured.`));
