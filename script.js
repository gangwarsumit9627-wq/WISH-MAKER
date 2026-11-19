 /* =====================================================
   1. YAHAN APNI DETAILS BADLO (sirf yahi hissa badalna hai)
   ===================================================== */
/* Footer me "Made with love by ..." ke baad ye naam hamesha dikhega */
const FOOTER_NAME = 'Sumiii';

const CONFIG = {
  name: 'Her Name',          // jisko wish karni hai uska naam
  nick: '',                  // nickname (khali = nahi dikhega)
  from: 'Sumiii',         // tumhara naam
  dob: '2003-02-14',         // janam tithi: saal-mahina-din (YYYY-MM-DD)
  photo: 'photo.jpg',        // photo ka naam. Isi folder me rakhna
  music: 'music.mp3',        // gana (na ho to bina music chalega)
  theme: 'rose',             // rose, gold ya midnight
  unlock: '',                // kab khule, jaise '2027-02-14T00:00' (khali = turant)
  reasons: ['Tumhari muskurahat', 'Tumhari fikar', 'Tumhara saath'],   // "wajah" wale cards
  video: 'video.mp4',        // short video ka naam. Isi folder me rakhna (na ho to video skip ho jayegi)
  videoWhen: 'after',        // video kab chale: 'after' = candle bujhane ke baad, 'before' = cake se pehle
  occasion: 'birthday',      // birthday, anniversary, valentine, diwali, holi, eid, christmas, newyear, rakhi ... (poori list OCC me)
  relation: 'love',          // love (partner), friend, family
  anim: ['hearts'],          // ek ya zyada: hearts, confetti, balloons, fireworks, sparkle, petals, diyas, flowers, emoji ... (poori list ANIMS me, [] = koi nahi)
  effect: 'normal',          // normal, glow, slow, fast, dense
  animColor: '',             // animation + page ka colour (khali = theme ka apna colour)
  title: '',                 // apna khud ka title (khali = occasion wala title)
  emoji: '',                 // apne emoji jo animation me udenge, jaise '🦋🌹🥳'
  scrap: [],                 // yaadon ke scrapbook ki photos (4 tak)
  pw: '',                    // password ka hash (khali = koi password nahi)
  lines: [                   // message ki lines (badal sakte ho)
    'Meri jaan, duniya ke liye aaj ek aam din hai,',
    'par mere liye sabse khaas, kyunki aaj tum is duniya me aaye.',
    'Tumhari muskurahat meri har subah ko roshan kar deti hai.',
    'Rab kare tumhari har wish poori ho,',
    'aur tumhare saath mera safar hamesha chalta rahe.',
    'Happy Birthday, mere pyaar!'
  ]
};

/* =====================================================
   2. Chhote helpers
   ===================================================== */
const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const COLORS = ['#ff4d79', '#ff8fab', '#ffd27a', '#ffffff', '#ff6b9d'];
const SHAPES = ['\u2764', '\u2665', '\u2728', '\uD83D\uDC96', '\uD83C\uDF38'];

// Occasion ke hisaab se icon, title, theme, animation aur message.
// core = 2 khaas lines ({u} = tumhari/teri/aapki, {you} = tumhe/tujhe/aapko). cake = cake wali screen aayegi. rom = pyaar wale rishte me dil bhi udenge
const OCC = {
  birthday:    { icon: '🎂', label: 'Birthday',        title: 'Happy Birthday',        theme: 'rose',     anim: ['balloons', 'confetti', 'gifts'],            cake: true, rom: true },
  anniversary: { icon: '💞', label: 'Anniversary',     title: 'Happy Anniversary',     theme: 'rose',     anim: ['hearts', 'petals', 'flowers'],              cake: true, rom: true },
  valentine:   { icon: '💘', label: "Valentine's Day", title: "Happy Valentine's Day", theme: 'rose',     anim: ['hearts', 'love', 'flowers'], rom: true,
    core: ['{u} wajah se meri har subah khoobsurat lagti hai.', 'Aaj ke din bas ek hi baat dil me hai: I love you.'] },
  ilu:         { icon: '💖', label: 'I Love You / Propose', title: 'I Love You',       theme: 'rose',     anim: ['hearts', 'love', 'flowers'], rom: true, word: 'khaas din',
    core: ['{you} dekhte hi dil ko sukoon milta hai.', 'Hamesha ke liye mere saath rehna.'] },
  wedding:     { icon: '💍', label: 'Wedding / Shaadi', title: 'Shubh Vivah',          theme: 'gold',     anim: ['petals', 'flowers', 'fireworks'], cake: true, word: 'shaadi',
    core: ['{u} nayi zindagi pyaar aur khushiyon se bhari rahe.', 'Ye jodi hamesha yunhi salamat rahe.'] },
  diwali:      { icon: '🪔', label: 'Diwali',          title: 'Happy Diwali',          theme: 'gold',     anim: ['diyas', 'crackers', 'lanterns', 'sparkle'], rom: true,
    core: ['{u} zindagi diyon ki tarah roshan rahe.', 'Maa Lakshmi sukh aur samriddhi layein.'] },
  holi:        { icon: '🎨', label: 'Holi',            title: 'Happy Holi',            theme: 'violet',   anim: ['holi', 'petals', 'confetti'], rom: true,
    core: ['Holi ke rang {u} zindagi me khushiyan aur pyaar bhar dein.', 'Bura na mano, Holi hai!'] },
  eid:         { icon: '🌙', label: 'Eid',             title: 'Eid Mubarak',           theme: 'emerald',  anim: ['moon', 'stars', 'sparkle'],
    core: ['Allah {u} har dua qubool kare.', 'Eid ka chaand {u} zindagi me sukh aur barkat laye.'] },
  christmas:   { icon: '🎄', label: 'Christmas',       title: 'Merry Christmas',       theme: 'emerald',  anim: ['xmas', 'snow', 'sparkle'],
    core: ['Is Christmas {u} zindagi khushiyon aur tohfon se bhar jaye.', 'Santa {u} har wish poori kare!'] },
  newyear:     { icon: '🎆', label: 'New Year',        title: 'Happy New Year',        theme: 'midnight', anim: ['fireworks', 'cheers', 'confetti'], rom: true },
  rakhi:       { icon: '🪢', label: 'Raksha Bandhan',  title: 'Happy Raksha Bandhan',  theme: 'gold',     anim: ['flowers', 'sweets', 'sparkle'] },
  bhaidooj:    { icon: '🙏', label: 'Bhai Dooj',       title: 'Happy Bhai Dooj',       theme: 'gold',     anim: ['sweets', 'diyas', 'flowers'],
    core: ['Bhai Dooj ka ye tilak {u} lambi umar ki dua hai.', 'Bhai-behan ka ye pyaar hamesha yunhi bana rahe.'] },
  mothersday:  { icon: '🌷', label: "Mother's Day",    title: "Happy Mother's Day",    theme: 'rose',     anim: ['flowers', 'hearts', 'butterflies'],
    core: ['Maa, aap hi meri pehli dost aur sabse badi taakat ho.', 'Aapke pyaar ka koi mol nahi.'] },
  fathersday:  { icon: '👨', label: "Father's Day",    title: "Happy Father's Day",    theme: 'midnight', anim: ['stars', 'emoji', 'gifts'],
    core: ['Papa, aap meri himmat aur meri pehchaan ho.', 'Aapke bina meri har kamyabi adhoori hai.'] },
  teachers:    { icon: '📚', label: "Teachers' Day",   title: "Happy Teachers' Day",   theme: 'gold',     anim: ['stars', 'flowers', 'sparkle'],
    core: ['Guru ke bina gyaan adhoora hai, aapne mujhe sahi raah dikhayi.', 'Aapko is din dil se pranam.'] },
  friendship:  { icon: '🤝', label: 'Friendship Day',  title: 'Happy Friendship Day',  theme: 'midnight', anim: ['emoji', 'confetti', 'hearts'],
    core: ['Sacha dost wohi jo har haal me saath rahe, aur {you} paakar main khushnasib hoon.', 'Hamari dosti hamesha yunhi bani rahe.'] },
  navratri:    { icon: '🔱', label: 'Navratri',        title: 'Happy Navratri',        theme: 'ruby',     anim: ['bhakti', 'flowers', 'diyas'],
    core: ['Maa Durga {u} zindagi me shakti aur sukh layein.', 'Jai Mata Di!'] },
  ganesh:      { icon: '🐘', label: 'Ganesh Chaturthi', title: 'Ganpati Bappa Morya',  theme: 'gold',     anim: ['bhakti', 'flowers', 'sweets'], word: 'Ganesh Chaturthi',
    core: ['Ganpati Bappa {u} zindagi ke saare vighna door karein.', 'Ganpati Bappa Morya!'] },
  janmashtami: { icon: '🦚', label: 'Janmashtami',     title: 'Happy Janmashtami',     theme: 'midnight', anim: ['bhakti', 'flowers', 'music'],
    core: ['Kanha {u} zindagi me pyaar ki bansuri bajaye.', 'Radhe Radhe, Jai Shri Krishna!'] },
  karwachauth: { icon: '🌕', label: 'Karwa Chauth',    title: 'Happy Karwa Chauth',    theme: 'ruby',     anim: ['moon', 'diyas', 'hearts'], rom: true,
    core: ['Chaand ki roshni {u} zindagi aur pyaar ko hamesha roshan rakhe.', 'Ye vrat humare vishwas ka bandhan aur gehra kare.'] },
  lohri:       { icon: '🪁', label: 'Lohri / Makar Sankranti', title: 'Happy Lohri',   theme: 'gold',     anim: ['kites', 'sweets', 'sparkle'], word: 'Lohri',
    core: ['Lohri ki aag aur patang ki udaan {u} zindagi me khushiyan laye.', 'Til-gud khao, meetha meetha bolo!'] },
  independence:{ icon: '🇮🇳', label: 'Independence Day', title: 'Happy Independence Day', theme: 'tricolor', anim: ['flags', 'fireworks', 'stars'],
    core: ['Azaadi ke is jashn par dil se Jai Hind!', 'Desh ke liye pyaar hamesha dil me rahe.'] },
  republic:    { icon: '🇮🇳', label: 'Republic Day',    title: 'Happy Republic Day',    theme: 'tricolor', anim: ['flags', 'fireworks', 'stars'],
    core: ['Is Republic Day par tiranga hamesha shaan se lehrata rahe.', 'Jai Hind, Vande Mataram!'] },
  womensday:   { icon: '👩', label: "Women's Day",     title: "Happy Women's Day",     theme: 'violet',   anim: ['flowers', 'butterflies', 'hearts'],
    core: ['{u} himmat ko dil se salaam.', 'Aap jaisi mahilayein hi duniya ko khoobsurat banati hain.'] },
  graduation:  { icon: '🎓', label: 'Graduation',      title: 'Happy Graduation',      theme: 'midnight', anim: ['stars', 'confetti', 'cheers'],
    core: ['{u} mehnat rang layi, ye degree uska sabut hai.', 'Aage ka safar aur bhi shandar ho!'] },
  babyshower:  { icon: '🍼', label: 'Baby Shower',     title: 'Welcome Little One',    theme: 'violet',   anim: ['teddy', 'balloons', 'stars'], word: 'khushi ke mauke',
    core: ['Ek nanha mehman khushiyan lekar aa raha hai.', 'Naye safar ke liye dher saari shubhkamnayein!'] },
  congrats:    { icon: '🏆', label: 'Congratulations', title: 'Congratulations',       theme: 'gold',     anim: ['confetti', 'cheers', 'stars', 'fireworks'], word: 'kamyabi',
    core: ['{u} mehnat aur lagan ne ye kamyabi dilayi hai.', 'Mujhe {you} par bahut garv hai!'] },
  goodluck:    { icon: '🍀', label: 'Good Luck',       title: 'Best of Luck',          theme: 'emerald',  anim: ['stars', 'confetti', 'sparkle'], word: 'naye safar',
    core: ['{u} mehnat rang layegi, bas himmat mat haarna.', 'Meri dua hai ki safalta {u} har manzil par saath rahe.'] },
  thankyou:    { icon: '🙏', label: 'Thank You',       title: 'Thank You',             theme: 'emerald',  anim: ['flowers', 'hearts', 'sparkle'], word: 'mauke',
    core: ['{u} madad aur saath ke liye dil se shukriya.', '{you} paakar main sachmuch khushnasib hoon.'] },
  sorry:       { icon: '🥺', label: 'Sorry',           title: 'I Am Sorry',            theme: 'midnight', anim: ['petals', 'hearts'], word: 'maafi',
    core: ['Meri galti thi, dil se maafi.', 'Please naraz mat raho, mujhe maaf kar do.'] },
  missyou:     { icon: '💌', label: 'Miss You',        title: 'Miss You',              theme: 'midnight', anim: ['stars', 'butterflies', 'hearts'], word: 'din',
    core: ['Dil har pal {you} yaad karta hai.', 'Dooriyan jo bhi ho, dil se hamesha paas ho.'] },
  getwell:     { icon: '💐', label: 'Get Well Soon',   title: 'Get Well Soon',         theme: 'emerald',  anim: ['flowers', 'butterflies', 'sparkle'], word: 'waqt',
    core: ['Meri dua hai {u} sehat jaldi theek ho jaye.', 'Aap jald se jald muskurate hue wapas aao!'] }
};

// Background animation: shapes = kya udega/girega (emoji), sym = apna colour chunne par colour wale symbols, fall = upar se neeche
const ANIMS = {
  hearts:    { icon: '❤️', label: 'Udte dil',               shapes: SHAPES, sym: ['\u2665\uFE0E', '\u2764\uFE0E'] },
  confetti:  { icon: '🎉', label: 'Confetti',               shapes: ['\uD83C\uDF89', '\uD83C\uDF8A', '\u2728', '\u2B50'], sym: ['\u25A0', '\u25CF', '\u25B2', '\u2726'], fall: true },
  balloons:  { icon: '🎈', label: 'Gubbare',                shapes: ['\uD83C\uDF88'], sym: ['\u25CF', '\u2B24'] },
  sparkle:   { icon: '✨', label: 'Sparkle baarish',        shapes: ['\u2728', '\u2B50', '\uD83D\uDCAB'], sym: ['\u2726', '\u2736', '\u2727'], fall: true },
  petals:    { icon: '🌸', label: 'Girti pankhudiyan',      shapes: ['\uD83C\uDF38', '\uD83C\uDF3A', '\uD83C\uDF37'], sym: ['\u273F', '\u2740', '\u2741'], fall: true },
  diyas:     { icon: '🪔', label: 'Udte diye',              shapes: ['\uD83E\uDE94'], sym: ['\u2726', '\u273A'] },
  fireworks: { icon: '🎆', label: 'Fireworks',              fireworks: true },
  // ---- nayi animations ----
  flowers:   { icon: '🌹', label: 'Phool (gulab, sunflower, lotus)', shapes: ['🌹', '🌻', '🌼', '💐', '🌺', '🌷', '🪷', '🏵️', '🌸'], sym: ['\u273F', '\u2740', '\u2741', '\u273E'], fall: true },
  emoji:     { icon: '😍', label: 'Smiley emoji',           shapes: ['😀', '🥳', '😍', '🤩', '😘', '😊', '🤗', '😎', '🥰'], sym: ['\u263A\uFE0E', '\u263B\uFE0E'] },
  love:      { icon: '💋', label: 'Pyaar ke emoji',         shapes: ['💋', '💌', '💘', '💝', '💞', '💕', '😘', '🌹'], sym: ['\u2665\uFE0E', '\u2763\uFE0E'] },
  butterflies:{ icon: '🦋', label: 'Titliyan',              shapes: ['🦋', '🦋', '🐝', '🐞', '🌼'], sym: ['\u2766', '\u2767', '\u2740'] },
  gifts:     { icon: '🎁', label: 'Gift, cake, mithai',     shapes: ['🎁', '🎂', '🧁', '🍰', '🎀', '🍭'], sym: ['\u25A0', '\u25C6'] },
  teddy:     { icon: '🧸', label: 'Teddy aur cute',         shapes: ['🧸', '🐻', '💞', '🐣', '🍼', '🎀'], sym: ['\u2661', '\u2740'] },
  stars:     { icon: '⭐', label: 'Chamakte sitare',        shapes: ['⭐', '🌟', '💫', '🌠'], sym: ['\u2605', '\u2606', '\u2726'], fall: true },
  moon:      { icon: '🌙', label: 'Chaand aur tare',        shapes: ['🌙', '⭐', '🌟', '☪️'], sym: ['\u263E', '\u2726', '\u2605'] },
  snow:      { icon: '❄️', label: 'Barf girna',             shapes: ['❄️', '⛄', '☃️', '❄️'], sym: ['\u2744\uFE0E', '\u2745', '\u2746'], fall: true },
  xmas:      { icon: '🎄', label: 'Christmas (tree, Santa)', shapes: ['🎄', '🎅', '🔔', '🎁', '⭐', '🦌'], sym: ['\u2736', '\u2726', '\u25CF'], fall: true },
  lanterns:  { icon: '🏮', label: 'Udte lantern',           shapes: ['🏮', '🏮', '✨'], sym: ['\u25C9', '\u25CF'] },
  crackers:  { icon: '🧨', label: 'Patakhe aur rocket',     shapes: ['🎆', '🎇', '🧨', '✨'], sym: ['\u273A', '\u2739', '\u2738'] },
  holi:      { icon: '🎨', label: 'Holi ke rang',           shapes: ['🎨', '💦', '🌈', '🟣', '🟡', '🔴', '🟢', '🔵'], sym: ['\u25CF', '\u25C9', '\u273A'] },
  kites:     { icon: '🪁', label: 'Patang',                 shapes: ['🪁', '🪁', '☁️'], sym: ['\u25C6', '\u25B2'] },
  flags:     { icon: '🇮🇳', label: 'Tiranga aur desh',       shapes: ['🇮🇳', '🦚', '🪁', '🎆', '⭐'], sym: ['\u2605', '\u25CF'] },
  sweets:    { icon: '🍬', label: 'Mithai aur sweets',      shapes: ['🍬', '🍭', '🍫', '🧁', '🍩', '🥮'], sym: ['\u25CF', '\u25C6'] },
  cheers:    { icon: '🥂', label: 'Cheers aur party',       shapes: ['🥂', '🍾', '🎉', '🎊', '🎈'], sym: ['\u25CF', '\u2726'] },
  music:     { icon: '🎵', label: 'Music notes',            shapes: ['🎵', '🎶', '🎼', '🎤'], sym: ['\u266A', '\u266B', '\u266C'] },
  bhakti:    { icon: '🕉️', label: 'Bhakti (om, ghanti, diya)', shapes: ['🕉️', '🪔', '🔔', '🙏', '🌺', '🪷'], sym: ['\u0950', '\u273A', '\u2726'] }
};

// Ready-made message suggestions: occasion -> rishta -> lines  ({n} = naam)
const SUG = {
  birthday: {
    love:   ['{n}, tum meri duniya ho, aur aaj ka din mere liye bhi sabse khaas hai.', 'Tumhari muskurahat meri har subah ko roshan kar deti hai.', 'Rab kare tumhari har wish poori ho aur hamara saath hamesha rahe.', 'Happy Birthday, mere pyaar!'],
    friend: ['{n}, tu mera sabse accha dost hai, aur aaj teri party banti hai!', 'Teri wajah se meri zindagi me hansi aur masti hai.', 'Rab kare tere saare sapne poore hon.', 'Happy Birthday, mere yaar!'],
    family: ['{n}, aapko janamdin bahut bahut mubarak ho.', 'Aapke bina ye ghar aur ye zindagi adhoori hai.', 'Bhagwan aapko hamesha khush aur swasth rakhe.', 'Happy Birthday!']
  },
  anniversary: {
    love:   ['{n}, humare saath ka ek aur saal poora hua.', 'Tumhare saath har pal ek khoobsurat yaad ban jaata hai.', 'Har janam me bas tumhara saath chahiye.', 'Happy Anniversary, meri jaan!'],
    friend: ['{n}, humari dosti ki is khaas tithi par dher saari shubhkamnayein.', 'Tumhare jaisa dost naseeb se milta hai.', 'Ye saath hamesha yunhi bana rahe.', 'Happy Anniversary!'],
    family: ['{n}, aapki anniversary par dher saari badhaiyan.', 'Aapka pyaar hum sab ke liye misaal hai.', 'Aap hamesha yunhi saath muskurate rahein.', 'Happy Anniversary!']
  },
  diwali: {
    love:   ['{n}, meri zindagi ki roshni tum ho.', 'Is Diwali tumhare saath ek ek diya jalana chahta hoon.', 'Tumhari zindagi khushiyon se jagmagati rahe.', 'Happy Diwali, mere pyaar!'],
    friend: ['{n}, is Diwali teri zindagi roshni aur mithaiyon se bhar jaye.', 'Dher saari masti, patakhe aur khushiyan tujhe mile.', 'Happy Diwali, mere yaar!'],
    family: ['{n}, aapko aur poore parivar ko Diwali ki hardik shubhkamnayein.', 'Maa Lakshmi aapke ghar sukh aur samriddhi layein.', 'Shubh Deepawali!']
  },
  newyear: {
    love:   ['{n}, naya saal tumhare saath aur bhi khoobsurat ho.', 'Meri har dua me tumhari khushi shamil hai.', 'Happy New Year, meri jaan!'],
    friend: ['{n}, naya saal naye sapne aur nayi masti laye.', 'Is saal bhi hum saath me khoob hasenge.', 'Happy New Year, yaar!'],
    family: ['{n}, aapko naye saal ki dher saari shubhkamnayein.', 'Ye saal aapke liye sukh, swasthya aur khushiyan laye.', 'Happy New Year!']
  },
  rakhi: {
    family: ['{n}, Raksha Bandhan ki hardik shubhkamnayein.', 'Ye dhaaga sirf dhaaga nahi, humare pyaar ka bandhan hai.', 'Tum hamesha khush raho, yahi meri dua hai.', 'Happy Raksha Bandhan!'],
    friend: ['{n}, Raksha Bandhan par dher saara pyaar.', 'Rishta khoon ka na ho, par dil ka hai.', 'Happy Raksha Bandhan!']
  }
};

// Rishta ke hisaab se bolne ka andaaz: open/close line aur "tumhari/teri/aapki" jaise shabd
const REL_TXT = {
  love:   { open: '{n}, meri jaan,',  close: '{t}, mere pyaar!', u: 'tumhari', you: 'tumhe' },
  friend: { open: '{n}, mere yaar,',  close: '{t}, dost!',       u: 'teri',    you: 'tujhe' },
  family: { open: '{n},',             close: '{t}!',             u: 'aapki',   you: 'aapko' }
};
// Rishta chunte hi effect lagta hai. Theme aur animation occasion se aate hain
const REL_EFFECT = { love: 'glow', friend: 'fast', family: 'normal' };
const THEME_COL = { rose: '#ff4d79', gold: '#ffb347', midnight: '#6ea8ff', violet: '#b388ff', emerald: '#34d399', tricolor: '#ff9933', ruby: '#ff5a5f' };

// Message ke alag-alag andaaz (har occasion par lagte hain). {o} = occasion ka naam, {t} = title
const STYLE = {
  shayari: {
    love:   ['Dil ki har dhadkan tera naam leti hai,', 'har {o} par tujhe hi yaad karti hai.', '{n}, tu mil gaya to jahan mil gaya,', '{t}, meri jaan!'],
    friend: ['Dost wo nahi jo bas saath hanse,', 'dost wo hai jo har haal me saath rahe.', '{n}, tu mera wahi dost hai,', '{t}, yaar!'],
    family: ['Aapki duaon se meri duniya roshan hai,', 'aapke aashirwad se har din gulshan hai.', '{n}, is {o} par dher saari shubhkamnayein,', '{t}!']
  },
  emotional: {
    love:   ['{n}, tumse mile to laga zindagi ko wajah mil gayi.', 'Is {o} par bas itna kehna hai, tum mere liye sab kuch ho.', 'Rab se roz tumhari khushi maangta hoon.', '{t}, meri jaan!'],
    friend: ['{n}, tu sirf dost nahi, mera sahara hai.', 'Har mushkil me tu saath khada raha.', 'Is {o} par dil se dua, tu hamesha khush rahe.', '{t}, mere yaar!'],
    family: ['{n}, aap ho to ghar ghar lagta hai.', 'Aapne jo kuch sikhaya, wahi meri taakat hai.', 'Is {o} par dil se pranam aur dher saara pyaar.', '{t}!']
  },
  funny: {
    love:   ['{n}, tum itni pyaari ho ki mera WiFi bhi tumhe dekh kar tez ho jata hai!', 'Is {o} par jo bhi maango, mil jayega. Bas pizza share mat karna.', 'Wish karna free hai, par treat dena compulsory hai!', '{t}, meri jaan!'],
    friend: ['{n}, tu itna pagal hai ki tujhe wish karna bhi risk hai!', 'Is {o} par party tere paise se, wish mere dil se.', 'Teri har gadbad me maine saath diya, ab treat ki baari teri.', '{t}, pagal!'],
    family: ['{n}, aapko wish karne ke liye maine 3 baar alarm lagaya!', 'Is {o} par mithai aur gift, dono ki demand pending hai.', 'Aap jaise bhi ho, hamare ho.', '{t}!']
  },
  short: {
    love:   ['{t}, {n}! Tum meri duniya ho.'],
    friend: ['{t}, {n}! Party kab hai?'],
    family: ['{t}, {n}! Dher saara pyaar.']
  }
};

const occ = () => OCC[CONFIG.occasion] || OCC.birthday;
const occTitle = () => (CONFIG.title || '').trim() || occ().title;

// Occasion + rishta + andaaz se message ki lines banata hai
function suggestLines(key, rel, style, name) {
  const o = OCC[key] || OCC.birthday;
  const r = REL_TXT[rel] || REL_TXT.love;
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const fill = s => cap(s.replace(/\{n\},\s*/g, name ? name + ', ' : '').replace(/,\s*\{n\}/g, name ? ', ' + name : '').replace(/\{n\}/g, name).replace(/\{t\}/g, o.title).replace(/\{o\}/g, o.word || o.label)
    .replace(/\{u\}/g, r.u).replace(/\{you\}/g, r.you));
  let lines;
  if (style && style !== 'khaas' && STYLE[style]) lines = STYLE[style][rel] || STYLE[style].love;
  else if (SUG[key]) lines = SUG[key][rel] || SUG[key].family || SUG[key].friend || SUG[key].love;
  else lines = [r.open].concat(o.core || [], [r.close]);
  return lines.map(fill).map(l => l.trim()).filter(Boolean);
}

// Occasion aur animation ki list select/checkbox me bharta hai (HTML me nahi likhni padti)
function buildOptions() {
  ['nOcc', 'fOcc'].forEach(id => {
    const s = $(id); s.textContent = '';
    Object.keys(OCC).forEach(k => {
      const op = document.createElement('option');
      op.value = k; op.textContent = OCC[k].icon + ' ' + OCC[k].label;
      s.append(op);
    });
  });
  ['fAnim', 'nAnim'].forEach(id => {
    const box = $(id);
    Object.keys(ANIMS).forEach(k => {
      const lb = document.createElement('label'), cb = document.createElement('input');
      cb.type = 'checkbox'; cb.value = k;
      lb.append(cb, ' ' + ANIMS[k].icon + ' ' + ANIMS[k].label);
      box.append(lb);
    });
  });
}
buildOptions();

// Apne likhe hue emoji (har ek alag udega)
function customEmojis() {
  const s = (CONFIG.emoji || '').replace(/\s+/g, '');
  if (!s) return [];
  const parts = (window.Intl && Intl.Segmenter)
    ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s), x => x.segment)
    : Array.from(s);
  return parts.slice(0, 20);
}
// Animation ki list: nayi link me list hoti hai, purani link me ek naam. Galat naam hata dete hain
function animList() {
  const a = CONFIG.anim;
  if (Array.isArray(a)) return a.filter(n => ANIMS[n]);
  return ANIMS[a] ? [a] : ['hearts'];
}
const getAnimChecks = () => Array.from(document.querySelectorAll('#fAnim input:checked')).map(i => i.value);
const setAnimChecks = list => document.querySelectorAll('#fAnim input').forEach(i => { i.checked = list.includes(i.value); });
const okColor = c => (/^#[0-9a-f]{6}$/i.test(c || '') ? c : '');   // link se aaya colour pakka sahi ho tabhi use hoga

async function sha256(t) {
  if (window.crypto && crypto.subtle) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('bw:' + t));
    return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('');
  }
  let h = 5381;
  for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0;
  return 'x' + h;
}

// Janam tithi se umar aur agle birthday tak ke din nikalta hai
function birthdayInfo() {
  const b = new Date(CONFIG.dob + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thisYear = new Date(today.getFullYear(), b.getMonth(), b.getDate());
  const age = today.getFullYear() - b.getFullYear() - (thisYear > today ? 1 : 0);
  const next = thisYear < today ? new Date(today.getFullYear() + 1, b.getMonth(), b.getDate()) : thisYear;
  const days = Math.round((next - today) / 86400000);

  const dateText = b.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const ageText = days === 0
    ? 'Aaj tumhare ' + age + ' saal poore hue!'
    : 'Abhi ' + age + ' saal. Agle birthday me ' + days + ' din baaki hain.';
  return { dateText, ageText };
}

/* =====================================================
   3. Udte 3D dil (neeche se upar, ghumte hue)
   ===================================================== */
function spawnFloat() {
  const floats = animList().filter(n => !ANIMS[n].fireworks);   // fireworks ka apna alag tareeka hai
  const cust = customEmojis();                                   // user ke apne emoji
  if (!floats.length && !cust.length) return;
  const keys = cust.length ? floats.concat('__own') : floats;
  const pick = keys[Math.floor(Math.random() * keys.length)];   // chuni hui animations me se ek
  const a = pick === '__own' ? { shapes: cust, sym: cust, own: true } : ANIMS[pick];
  const custom = okColor(CONFIG.animColor);
  const eff = CONFIG.effect || 'normal';
  const pool = (custom && a.sym && !a.own) ? a.sym : a.shapes;   // apna colour ho to colour wale symbols
  const col = custom || COLORS[Math.floor(Math.random() * COLORS.length)];
  const h = document.createElement('span');
  h.className = 'heart' + (a.fall ? ' fall' : '');
  h.textContent = pool[Math.floor(Math.random() * pool.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = 14 + Math.random() * 26 + 'px';
  h.style.color = col;
  if (eff === 'glow') h.style.filter = 'drop-shadow(0 0 6px ' + col + ') drop-shadow(0 0 14px ' + col + ')';
  const speed = eff === 'slow' ? 1.8 : eff === 'fast' ? 0.55 : 1;
  h.style.animationDuration = (6 + Math.random() * 6) * speed + 's';
  h.style.setProperty('--sway', (Math.random() * 120 - 60) + 'px');
  $('hearts').appendChild(h);
  h.addEventListener('animationend', () => h.remove());   // kaam hone par hata do
}

// Button dabane par dil har taraf bikhar jate hain
function burst() {
  for (let i = 0; i < 36; i++) {
    const b = document.createElement('span');
    b.className = 'burst';
    b.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    b.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    b.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    b.style.setProperty('--rot', Math.random() * 540 + 'deg');
    b.style.fontSize = 18 + Math.random() * 22 + 'px';
    b.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    document.body.appendChild(b);
    b.addEventListener('animationend', () => b.remove());
  }
}

/* =====================================================
   4. Message ek-ek akshar karke likhna (typewriter)
   ===================================================== */
let typeTimer;
function typeText(text) {
  const el = $('wish');
  clearInterval(typeTimer);
  if (reduceMotion) { el.textContent = text; return; }
  let i = 0;
  typeTimer = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(typeTimer);
  }, 40);
}

/* =====================================================
   5. 3D photo tilt: mouse ya ungli ke hisaab se card jhukta hai
   ===================================================== */
function setupTilt() {
  const card = $('card3d');
  function tilt(e) {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;    // -0.5 se 0.5
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', x * 28 + 'deg');
    card.style.setProperty('--rx', -y * 28 + 'deg');
  }
  function reset() {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }
  card.addEventListener('pointermove', tilt);
  card.addEventListener('pointerleave', reset);
  card.addEventListener('pointerup', reset);
}

/* =====================================================
   6. Poora sequence: lifafa animation -> video -> main page
   ===================================================== */
let videoFailed = false;   // video na mile to seedha main page par chale jayenge
let theaterOn = false;     // video screen abhi dikh rahi hai ya nahi

function startSequence() {
  $('openBtn').disabled = true;
  document.body.classList.add('busy', 'started');
  startMusic();
  const video = $('video');

  // Video ko tap ke time hi taiyar kar lete hain, taaki phone par bhi baad me chal sake
  if (CONFIG.video) {
    video.src = CONFIG.video;
    video.play().then(() => {
      if (!theaterOn) { video.pause(); video.currentTime = 0; }
    }).catch(() => {});
  } else {
    videoFailed = true;
  }

  $('intro').hidden = true;
  $('opening').hidden = false;
  requestAnimationFrame(() => $('opening').classList.add('show'));
  burst();

  setTimeout(() => $('env').classList.add('open'), 700);       // lifafa khulta hai
  setTimeout(() => $('openText').classList.add('on'), 1900);   // text aata hai
  setTimeout(afterEnvelope, 4200);                             // phir cake (ya video, agar 'before' chuna ho)
}

// Lifafa ke baad: video 'before' ho to pehle video, warna seedha cake
function afterEnvelope() {
  if (CONFIG.video && CONFIG.videoWhen === 'before') return startVideo(cakeOrStage);
  $('opening').classList.remove('show');
  $('opening').hidden = true;
  cakeOrStage();
}

// Cake birthday aur anniversary me. Baaki occasion me seedha main page (video 'after' ho to pehle video)
function cakeOrStage() {
  if (occ().cake) return showCake();
  if (CONFIG.video && CONFIG.videoWhen === 'after' && !videoFailed) startVideo(showStage);
  else showStage();
}

// next = video ke baad kya dikhana hai (showCake ya showStage)
let videoNext = null;
function startVideo(next) {
  videoNext = next || cakeOrStage;
  if (videoFailed || !CONFIG.video) return endVideo();
  $('opening').classList.remove('show');
  $('theater').hidden = false;
  theaterOn = true;
  $('music').pause();   // video ki apni awaaz hai
  requestAnimationFrame(() => $('theater').classList.add('show'));
  // Apne aap chalu na ho paye to controls dikha do, user khud play dabaye
  $('video').play().catch(() => { $('video').controls = true; });
}

// Video khatam ho, skip ho ya na mile: main birthday page dikhao
function endVideo() {
  if (endVideo.done) return;
  endVideo.done = true;
  $('video').pause();
  theaterOn = false;
  $('theater').hidden = true;
  $('theater').classList.remove('show');
  $('opening').hidden = true;
  musicResume();
  const next = videoNext || cakeOrStage;
  videoNext = null;
  next();
}

// Main page ka text aur photo bharta hai (side panel se badlav par bhi yahi chalta hai)
function fillStage(retype) {
  const info = birthdayInfo();
  $('name').textContent = CONFIG.name + (CONFIG.nick ? ' (' + CONFIG.nick + ')' : '');
  $('dob').textContent = 'Janam tithi: ' + info.dateText;
  $('ageInfo').textContent = info.ageText;
  const isB = (CONFIG.occasion || 'birthday') === 'birthday';
  $('dob').hidden = !isB; $('ageInfo').hidden = !isB;
  $('from').textContent = 'Hamesha tumhara, ' + CONFIG.from;

  renderReasons(); renderScrap();
  $('navReasons').hidden = !CONFIG.reasons.length;                       // content na ho to option nahi
  $('navScrap').hidden = !(CONFIG.scrap || []).filter(Boolean).length;
  const photo = $('photo');
  if (photo.getAttribute('src') !== CONFIG.photo) {   // photo badli ho tabhi dobara load karo
    $('frame').classList.remove('nophoto');
    photo.src = CONFIG.photo;
  }
  if (retype) typeText(CONFIG.lines.join('\n'));
}

function showStage() {
  fillStage(false);
  document.body.classList.remove('busy');
  document.body.classList.add('onstage');
  $('stage').hidden = false;
  requestAnimationFrame(() => $('stage').classList.add('show'));
  burst();
  setTimeout(() => typeText(CONFIG.lines.join('\n')), 1200);
}

// "Dobara dekho": sab kuch shuru se, nayi details ke saath
function replay() {
  endVideo.done = false; videoFailed = false; theaterOn = false; videoNext = null;
  document.body.classList.remove('onstage');
  clearInterval(typeTimer);
  $('wish').textContent = '';
  $('stage').classList.remove('show'); $('stage').hidden = true;
  $('theater').classList.remove('show'); $('opening').classList.remove('show');
  $('env').classList.remove('open'); $('openText').classList.remove('on');
  $('cakeScr').hidden = true; $('cakeScr').classList.remove('show', 'out');
  $('cakeMsg').textContent = 'Wish maango, phir candles bujhao';
  $('openBtn').disabled = false;
  $('intro').hidden = false;
  document.body.classList.remove('busy');
  window.scrollTo(0, 0);
}

/* =====================================================
   6b. Side panel: user apni details, photo, video aur message daal sake
   ===================================================== */
const DEFAULTS = JSON.parse(JSON.stringify(CONFIG));   // Reset ke liye asli values
let scrapBlobs = [];   // scrapbook photos ke temporary links
const blobUrls = { photo: null, video: null, music: null };            // upload ki hui files ke temporary links

// Paste kiye hue link ko seedhe chalne wale link me badalta hai
function cleanLink(raw) {
  let u = raw.trim();
  if (!/^https?:\/\//i.test(u)) return { ok: false, msg: 'link https:// se shuru hona chahiye.' };
  if (/youtube\.com|youtu\.be|instagram\.com|facebook\.com/i.test(u))
    return { ok: false, msg: 'YouTube/Instagram ka link yahan nahi chalta. Seedha file ka link (.mp4/.mp3/.jpg) do ya device se upload karo.' };
  // Google Drive "share" link -> download link (file "Anyone with the link" par honi chahiye)
  const d = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || u.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([\w-]+)/);
  if (d) u = 'https://drive.google.com/uc?export=download&id=' + d[1];
  // Dropbox share link -> seedha link
  if (/dropbox\.com/i.test(u)) u = u.replace(/[?&]dl=0/, '').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
  return { ok: true, url: u };
}

function fillForm() {
  $('fName').value = CONFIG.name;
  $('fNick').value = CONFIG.nick || '';
  $('fFrom').value = CONFIG.from;
  $('fDob').value = CONFIG.dob;
  $('fMsg').value = CONFIG.lines.join('\n');
  $('fReasons').value = CONFIG.reasons.join('\n');
  $('fTheme').value = CONFIG.theme;
  $('fLock').value = CONFIG.unlock;
  fillLook();
  $('fScrap').value = '';
  $('fMusic').value = '';
  $('fPhoto').value = '';
  $('fVideo').value = '';
  // Agar pehle link diya tha to wahi dikhao (device se upload wali file ka link nahi dikhate)
  const isLink = v => /^https?:/i.test(v || '');
  $('fPhotoUrl').value = isLink(CONFIG.photo) ? CONFIG.photo : '';
  $('fVideoUrl').value = isLink(CONFIG.video) ? CONFIG.video : '';
  $('fMusicUrl').value = isLink(CONFIG.music) ? CONFIG.music : '';
  $('fVideoWhen').value = CONFIG.videoWhen;
  $('fNote').textContent = '';
}

function toggleDrawer(open) {
  $('drawer').classList.toggle('open', open);
  $('drawer').setAttribute('aria-hidden', String(!open));
  if (open) fillForm();
}

function readForm() {
  CONFIG.name = $('fName').value.trim() || DEFAULTS.name;
  CONFIG.nick = $('fNick').value.trim();
  CONFIG.from = $('fFrom').value.trim() || DEFAULTS.from;
  CONFIG.dob = $('fDob').value || DEFAULTS.dob;
  const lines = $('fMsg').value.split('\n').map(l => l.trim()).filter(Boolean);
  CONFIG.lines = lines.length ? lines : DEFAULTS.lines;
  CONFIG.reasons = $('fReasons').value.split('\n').map(l => l.trim()).filter(Boolean);
  CONFIG.theme = $('fTheme').value;
  CONFIG.unlock = $('fLock').value;
  CONFIG.occasion = $('fOcc').value;
  CONFIG.relation = $('fRel').value;
  CONFIG.anim = getAnimChecks();
  CONFIG.effect = $('fEffect').value;
  CONFIG.animColor = $('fAnimColor').dataset.auto === '0' ? $('fAnimColor').value : '';
  CONFIG.title = $('fTitle').value.trim();
  CONFIG.emoji = $('fEmoji').value.trim();

  CONFIG.videoWhen = $('fVideoWhen').value;

  const problems = [];
  // Har media ke liye: pehle device ki file, nahi to paste kiya hua link
  const picks = [
    { key: 'photo', fileEl: 'fPhoto', urlEl: 'fPhotoUrl', type: 'image/', bad: 'Photo ke liye image file chuno.', name: 'Photo' },
    { key: 'video', fileEl: 'fVideo', urlEl: 'fVideoUrl', type: 'video/', bad: 'Video ke liye video file chuno.', name: 'Video' },
    { key: 'music', fileEl: 'fMusic', urlEl: 'fMusicUrl', type: 'audio/', bad: 'Gana ke liye audio file chuno.', name: 'Gana' }
  ];
  picks.forEach(p => {
    const file = $(p.fileEl).files[0];
    const link = $(p.urlEl).value.trim();
    if (file) {
      if (!file.type.startsWith(p.type)) { problems.push(p.bad); return; }
      if (blobUrls[p.key]) URL.revokeObjectURL(blobUrls[p.key]);
      blobUrls[p.key] = URL.createObjectURL(file);    // file ka temporary link
      CONFIG[p.key] = blobUrls[p.key]; files[p.key] = file;
    } else if (link && link !== CONFIG[p.key]) {
      const fixed = cleanLink(link);
      if (!fixed.ok) { problems.push(p.name + ': ' + fixed.msg); return; }
      if (blobUrls[p.key]) { URL.revokeObjectURL(blobUrls[p.key]); blobUrls[p.key] = null; }
      CONFIG[p.key] = fixed.url; delete files[p.key];  // link hai to upload ki zaroorat nahi
    }
  });
  // Scrapbook: 4 tak photo
  const sf = Array.from($('fScrap').files);
  if (sf.length) {
    if (sf.length > 4) problems.push('Scrapbook me sirf 4 photo chun sakte ho.');
    else if (sf.some(f => !f.type.startsWith('image/'))) problems.push('Scrapbook ke liye sirf image files chuno.');
    else {
      scrapBlobs.forEach(u => URL.revokeObjectURL(u)); scrapBlobs = [];
      for (let i = 0; i < 4; i++) delete files['s' + i];
      CONFIG.scrap = sf.map((f, i) => { const u = URL.createObjectURL(f); scrapBlobs.push(u); files['s' + i] = f; return u; });
    }
  }
  $('fNote').textContent = problems.join(' ');
  return problems;
}

function applyForm(e) {
  e.preventDefault();
  if (readForm().length) return;                      // galat file ho to panel khula rahe

  toggleDrawer(false);
  applyTheme(); checkLock();
  $('introHint').textContent = 'Details lag gayi hain. Ab surprise kholo';
  if (!$('stage').hidden) fillStage(true);            // main page dikh raha ho to turant badlo
}

// Play: customize ki hui sab chije lagao aur surprise shuru se chala ke dekho
function playForm() {
  if (readForm().length) return;                      // galat file ho to panel khula rahe
  toggleDrawer(false);
  applyTheme();
  clearInterval(lockTimer); $('lock').hidden = true;  // test ke liye lock screen hata do (Apply dabane par wapas lagega)
  $('introHint').textContent = 'Details lag gayi hain. Ab surprise kholo';
  previewGo('env');
}

function resetForm() {
  for (const k in blobUrls) { if (blobUrls[k]) URL.revokeObjectURL(blobUrls[k]); blobUrls[k] = null; }
  for (const k in files) delete files[k];
  scrapBlobs.forEach(u => URL.revokeObjectURL(u)); scrapBlobs = [];
  $('fPass').value = ''; $('fScrap').value = ''; msgTouched = false;
  Object.assign(CONFIG, JSON.parse(JSON.stringify(DEFAULTS)));
  fillForm(); applyTheme(); checkLock();
  $('fNote').textContent = 'Reset ho gaya.';
  if (!$('stage').hidden) fillStage(true);
}

/* =====================================================
   6c. Music, cake, fireworks, theme, lock, reasons, share link
   ===================================================== */




// Share link ke liye files (photo/video/gana) yahan upload hongi. Free account: cloudinary.com
// 1) Sign up karo -> Dashboard se "Cloud name" copy karo
// 2) Settings > Upload > Upload presets > Add preset -> Signing mode = "Unsigned" -> Save, uska naam copy karo
// Dono khali rahe to sirf wo share link banega jisme koi file device se upload na ki ho (links wali).
const UPLOAD = { cloudName: 'selv7q6s', preset: 'wishmaker' };



// Site online hone ke baad uska poora link yahan daalo (share link isi se banega)
// Jaise: 'https://mera-birthday.netlify.app/'  (local file se kholte ho to ye zaroori hai)
const SITE_URL = 'https://superb-douhua-ba9af5.netlify.app/';   // apne site ka link yahan daalo




const files = {};               // upload ki hui asli files (share link banane ke kaam aati hain)
let musicOn = true;
let shareUrl = '';

function startMusic() {
  const m = $('music');
  if (!CONFIG.music) return;
  if (m.getAttribute('src') !== CONFIG.music) m.src = CONFIG.music;
  if (musicOn) m.play().catch(() => {});
}
function musicResume() { if (musicOn && CONFIG.music) $('music').play().catch(() => {}); }
function toggleMusic() {
  musicOn = !musicOn;
  $('muteBtn').textContent = 'Music: ' + (musicOn ? 'ON' : 'OFF');
  if (musicOn) musicResume(); else $('music').pause();
}

function applyTheme() {
  const root = document.documentElement;
  root.dataset.theme = CONFIG.theme;
  const col = okColor(CONFIG.animColor);
  if (col) root.style.setProperty('--rose', col); else root.style.removeProperty('--rose');
  applyOccasion();
  $('footFrom').textContent = FOOTER_NAME;   // footer me "Made with love by ..."
  syncNav();
}

// Look wali sab fields (occasion, rishta, theme, animation, effect, colour) CONFIG se bharo
function fillLook() {
  $('fTheme').value = CONFIG.theme;
  $('fOcc').value = CONFIG.occasion || 'birthday';
  $('fRel').value = CONFIG.relation || 'love';
  setAnimChecks(animList());
  $('fEffect').value = CONFIG.effect || 'normal';
  $('fTitle').value = CONFIG.title || '';
  $('fEmoji').value = CONFIG.emoji || '';
  $('fAnimColor').dataset.auto = CONFIG.animColor ? '0' : '1';
  $('fAnimColor').value = okColor(CONFIG.animColor) || THEME_COL[CONFIG.theme] || '#ff4d79';
}

// Title bar ke Occasion / Rishta / Colour ko CONFIG ke saath mila do
function syncNav() {
  $('nOcc').value = CONFIG.occasion || 'birthday';
  $('nRel').value = CONFIG.relation || 'love';
  $('nColor').value = okColor(CONFIG.animColor) || THEME_COL[CONFIG.theme] || '#ff4d79';
  const list = animList();
  document.querySelectorAll('#nAnim input').forEach(i => { i.checked = list.includes(i.value); });
  $('nAnimCount').textContent = list.length;
}

// Occasion chunte hi uska theme aur animation apne aap lag jaata hai (baad me khud badal sakte ho)
function occPreset() {
  const o = OCC[$('fOcc').value];
  if (!o) return;
  const list = o.anim.slice();
  if ($('fRel').value === 'love' && o.rom && !list.includes('hearts')) list.push('hearts');
  setAnimChecks(list);
  $('fTheme').value = o.theme;
  $('fAnimColor').dataset.auto = '1';
}
function relPreset() {
  occPreset();
  $('fEffect').value = REL_EFFECT[$('fRel').value] || 'normal';
}

// Panel me look badalte hi turant background par dikhao (Apply dabane ki zaroorat nahi)
let msgTouched = false;   // user ne khud message likha ho to occasion badalne par use mat badlo
function previewLook() {
  const c = $('fAnimColor');
  if (c.dataset.auto !== '0') c.value = THEME_COL[$('fTheme').value] || '#ff4d79';
  const prevOcc = CONFIG.occasion;
  CONFIG.occasion = $('fOcc').value;
  CONFIG.relation = $('fRel').value;
  CONFIG.theme = $('fTheme').value;
  CONFIG.anim = getAnimChecks();
  CONFIG.effect = $('fEffect').value;
  CONFIG.animColor = c.dataset.auto === '0' ? c.value : '';
  CONFIG.title = $('fTitle').value.trim();
  CONFIG.emoji = $('fEmoji').value.trim();
  let retype = false;
  if (CONFIG.occasion !== prevOcc && !msgTouched) {
    const nm = CONFIG.name && CONFIG.name !== DEFAULTS.name ? CONFIG.name : '';
    CONFIG.lines = suggestLines(CONFIG.occasion, CONFIG.relation, 'khaas', nm);
    $('fMsg').value = CONFIG.lines.join('\n');
    retype = true;
  }
  $('hearts').textContent = '';
  applyTheme();
  if (!$('stage').hidden && (retype || CONFIG.occasion !== prevOcc)) fillStage(retype);
}

// Share link copy karna
async function copyLink() {
  const inp = $('shareLink'), btn = $('copyBtn');
  if (!inp.value) { $('shareNote').textContent = 'Pehle "Share link banao" dabao.'; return; }
  try { await navigator.clipboard.writeText(inp.value); }
  catch (e) {                                   // purane browser ke liye tareeka
    inp.removeAttribute('readonly'); inp.select(); inp.setSelectionRange(0, 99999);
    document.execCommand('copy'); inp.setAttribute('readonly', '');
  }
  btn.textContent = 'Copy ho gaya!';
  setTimeout(() => { btn.textContent = 'Link copy karo'; }, 2000);
}

// Occasion (ya apne title) ke hisaab se title, lifafe ka text aur page ka naam
function applyOccasion() {
  const t = occTitle();
  const w = t.split(' ');
  const L = $('letterTxt');
  L.textContent = '';
  L.append(w[0], document.createElement('br'), w.slice(1).join(' '), document.createElement('br'), '\u2764');
  $('titleTxt').textContent = t;
  document.title = t;
  $('navTitle').textContent = t;      // title bar me bhi
}

// Message suggestion: occasion, rishta aur andaaz (khaas / shayari / emotional / funny / chhota) dekh kar ready-made lines
function suggestMsg() {
  const nm = $('fName').value.trim();
  $('fMsg').value = suggestLines($('fOcc').value, $('fRel').value, $('fStyle').value, nm).join('\n');
  msgTouched = false;
}

// Yaadon ka scrapbook (polaroid style photos)
function renderScrap() {
  const box = $('scrap');
  box.textContent = '';
  const list = (CONFIG.scrap || []).filter(Boolean);
  if (!list.length) return;
  const title = document.createElement('p');
  title.className = 'rTitle script';
  title.textContent = 'Humari yaadon ka scrapbook';
  const grid = document.createElement('div');
  grid.className = 'scrapGrid';
  list.forEach((src, i) => {
    const pol = document.createElement('div');
    pol.className = 'pol';
    pol.style.setProperty('--r', (i % 2 ? 1 : -1) * (2 + i * 1.5) + 'deg');
    const img = document.createElement('img');
    img.src = src; img.alt = 'Yaad ' + (i + 1); img.loading = 'lazy';
    pol.append(img);
    grid.append(pol);
  });
  box.append(title, grid);
}

// Tay samay se pehle lock screen aur countdown
let lockTimer;
function checkLock() {
  clearInterval(lockTimer);
  const t = CONFIG.unlock ? new Date(CONFIG.unlock).getTime() : 0;
  if (!t || Date.now() >= t) { $('lock').hidden = true; return; }
  $('lock').hidden = false;
  const tick = () => {
    const ms = t - Date.now();
    if (ms <= 0) { clearInterval(lockTimer); $('lock').hidden = true; return; }
    $('count').textContent = Math.floor(ms / 864e5) + ' din ' + Math.floor(ms / 36e5) % 24 + ' ghanta ' +
      Math.floor(ms / 6e4) % 60 + ' minute ' + Math.floor(ms / 1e3) % 60 + ' second baaki';
  };
  tick();
  lockTimer = setInterval(tick, 1000);
}

// "Wajah" wale 3D flip cards
function renderReasons() {
  const box = $('reasons');
  box.textContent = '';
  if (!CONFIG.reasons.length) return;
  const title = document.createElement('p');
  title.className = 'rTitle script';
  title.textContent = ({ love: 'Tumhe itna pyaar karne ki wajah', friend: 'Tumhari dosti ki khaas baatein', family: 'Aap itne khaas kyun ho' }[CONFIG.relation] || 'Khaas wajah') + ' (tap karo)';
  const grid = document.createElement('div');
  grid.className = 'rGrid';
  CONFIG.reasons.forEach((text, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'rc';
    const front = document.createElement('span'); front.className = 'rf'; front.textContent = i + 1;
    const back = document.createElement('span'); back.className = 'rb'; back.textContent = text;
    card.append(front, back);
    card.addEventListener('click', () => card.classList.toggle('flip'));
    grid.append(card);
  });
  box.append(title, grid);
}

// Cake: candles bujhao, phir aatishbaazi aur main page
function showCake() {
  $('cakeScr').hidden = false;
  requestAnimationFrame(() => $('cakeScr').classList.add('show'));
}
function blowCandles() {
  // 8 second: 0-4s bear aur panda phoonk maarte hain (candles bujhti hain), 4-8s chaaku se cake katta hai
  const c = $('cakeScr');
  if (c.classList.contains('out')) return;
  c.classList.add('out');
  const say = t => { $('cakeMsg').textContent = t; };
  say('Phooooo... candles bujh rahi hain');
  setTimeout(() => say('Ab cake cut karte hain!'), 4000);
  setTimeout(() => { say('Wish poori ho! ' + occTitle() + '!'); burst(); fireworks(); }, 5600);
  setTimeout(() => {
    c.hidden = true; c.classList.remove('show');
    // Cake katne ke baad wali video, warna seedha main page
    if (CONFIG.video && CONFIG.videoWhen === 'after' && !videoFailed) startVideo(showStage);
    else showStage();
  }, 8000);
}

function fireworks() {
  if (reduceMotion) return;
  const cv = $('fx'), ctx = cv.getContext('2d');
  cv.width = innerWidth; cv.height = innerHeight;
  let parts = [], last = 0;
  const end = Date.now() + 4500;
  function boom() {
    const x = cv.width * (.1 + Math.random() * .8), y = cv.height * (.1 + Math.random() * .45);
    const col = okColor(CONFIG.animColor) || COLORS[Math.floor(Math.random() * COLORS.length)];
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * 6.283, v = 1 + Math.random() * 4;
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, col });
    }
  }
  (function frame(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    if (Date.now() < end && t - last > 450) { boom(); last = t; }
    parts = parts.filter(p => p.life > 0);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += .05; p.life -= .012;
      ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, 3, 3);
    });
    if (parts.length || Date.now() < end) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })(0);
}

// Share link: details link ke andar hi hoti hain (database nahi chahiye), files Cloudinary par jaati hain
const encode = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const decode = t => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, '+').replace(/_/g, '/')))));

// ---- Chhota link: chhote keys + default jaisi values hata do + Cloudinary ka lamba hissa chhota + compress ----
const SHORT = { name: 'n', nick: 'k', from: 'f', dob: 'd', lines: 'l', reasons: 'r', theme: 't', unlock: 'u', photo: 'p', video: 'v', music: 'm',
  videoWhen: 'w', occasion: 'o', relation: 'q', anim: 'a', effect: 'e', animColor: 'c', title: 'i', emoji: 'j', scrap: 's', pw: 'x' };
const LONG = {}; for (const k in SHORT) LONG[SHORT[k]] = k;
const MEDIA = ['photo', 'video', 'music'];
const cloudPre = () => UPLOAD.cloudName ? 'https://res.cloudinary.com/' + UPLOAD.cloudName + '/' : '';
const shrinkUrl = u => { const p = cloudPre(); return (p && typeof u === 'string' && u.startsWith(p)) ? '~' + u.slice(p.length) : u; };
const growUrl = u => (typeof u === 'string' && u[0] === '~') ? cloudPre() + u.slice(1) : u;

function compactData(data) {
  const out = {};
  for (const k in data) {
    let v = data[k];
    if (MEDIA.includes(k)) v = shrinkUrl(v);
    if (k === 'scrap') v = v.map(shrinkUrl);
    if (k !== 'pw' && JSON.stringify(v) === JSON.stringify(DEFAULTS[k])) continue;   // default jaisi value link me nahi jaati
    if (k === 'pw' && !v) continue;
    out[SHORT[k] || k] = v;
  }
  return out;
}
function expandData(o) {
  const out = {};
  for (const k in o) {
    const L = LONG[k] || k;
    let v = o[k];
    if (MEDIA.includes(L)) v = growUrl(v);
    if (L === 'scrap') v = v.map(growUrl);
    out[L] = v;
  }
  return out;
}
const b64u = bytes => { let s = ''; bytes.forEach(b => s += String.fromCharCode(b)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = t => Uint8Array.from(atob(t.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
async function pipeBytes(bytes, stream) {
  const w = stream.writable.getWriter(); w.write(bytes); w.close();
  return new Uint8Array(await new Response(stream.readable).arrayBuffer());
}
// Naya chhota format (#z=). Purane browser me compress na ho to purana (#w=) format hi banega
async function encodeShort(data) {
  const json = JSON.stringify(compactData(data));
  if (typeof CompressionStream === 'undefined') return '#w=' + encode(data);
  try {
    const z = await pipeBytes(new TextEncoder().encode(json), new CompressionStream('deflate-raw'));
    return '#z=' + b64u(z);
  } catch (e) { return '#w=' + encode(data); }
}
async function decodeHash(h) {
  if (h.startsWith('#w=')) return decode(h.slice(3));       // purane links bhi chalte rahenge
  const raw = await pipeBytes(unb64u(h.slice(3)), new DecompressionStream('deflate-raw'));
  return expandData(JSON.parse(new TextDecoder().decode(raw)));
}
const isWishHash = () => location.hash.startsWith('#w=') || location.hash.startsWith('#z=');

// Share link ka base: SITE_URL ho to wo, warna abhi ka address. Local file (file://) se link nahi banta
function baseUrl() {
  if (SITE_URL) return SITE_URL.split('?')[0].split('#')[0];
  if (location.protocol === 'file:') return '';
  return location.href.split('?')[0].split('#')[0];
}

const fmtMB = b => (b / 1048576).toFixed(1) + ' MB';

// Ek file Cloudinary par bhejta hai aur har pal bataata hai kitni ja chuki hai
function uploadFile(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cloudinary.com/v1_1/' + UPLOAD.cloudName + '/auto/upload');
    xhr.upload.onprogress = e => { if (e.lengthComputable) onProgress(e.loaded, e.total); };
    xhr.onload = () => {
      let r = {};
      try { r = JSON.parse(xhr.responseText); } catch (e) {}
      if (xhr.status === 200 && r.secure_url) { onProgress(file.size, file.size); resolve(r.secure_url); }
      else reject(new Error((r.error && r.error.message) || ('upload fail (' + xhr.status + ')')));
    };
    xhr.onerror = () => reject(new Error('internet ya network ki dikkat'));
    xhr.ontimeout = () => reject(new Error('time out ho gaya'));
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', UPLOAD.preset);
    xhr.send(fd);
  });
}

async function makeLink() {
  const note = $('shareNote'), btn = $('linkBtn'), bar = $('barFill'), box = $('upBox');
  const base = baseUrl();
  if (!base) {
    note.textContent = 'Abhi page apne computer se khula hai, isliye link dusre ke kaam nahi aayega. Pehle site ko Netlify/GitHub Pages par daalo, phir wahi link khol kar share banao (ya SITE_URL bharo).';
    return;
  }
  // Apply dabaye bina bhi: form me jo file/link/details bhari hain unhe link me le lo
  const prob = readForm();
  if (prob.length) { note.textContent = prob.join(' '); return; }
  applyTheme(); checkLock();
  const data = {
    name: CONFIG.name, nick: CONFIG.nick, from: CONFIG.from, dob: CONFIG.dob, lines: CONFIG.lines, reasons: CONFIG.reasons,
    theme: CONFIG.theme, unlock: CONFIG.unlock, photo: CONFIG.photo, video: CONFIG.video, music: CONFIG.music,
    videoWhen: CONFIG.videoWhen, occasion: CONFIG.occasion, relation: CONFIG.relation, anim: CONFIG.anim, effect: CONFIG.effect, animColor: CONFIG.animColor, title: CONFIG.title, emoji: CONFIG.emoji,
    scrap: (CONFIG.scrap || []).slice(), pw: ''
  };
  const keys = ['photo', 'video', 'music'];
  const names = { photo: 'Photo', video: 'Video', music: 'Gana' };

  // Jo files upload honi hain unki list (jobs)
  const jobs = [];
  keys.forEach(k => {
    if (files[k]) jobs.push({ id: k, label: names[k], file: files[k], done: u => { data[k] = u; } });
    else if (String(data[k]).startsWith('blob:')) data[k] = '';
  });
  data.scrap.forEach((u, i) => {
    if (files['s' + i]) jobs.push({ id: 's' + i, label: 'Yaad ' + (i + 1), file: files['s' + i], done: x => { data.scrap[i] = x; } });
    else if (String(u).startsWith('blob:')) data.scrap[i] = '';
  });

  if (jobs.length && (!UPLOAD.cloudName || !UPLOAD.preset)) {
    note.textContent = 'Device se upload ki hui file share karne ke liye script.js me UPLOAD ke andar cloudName aur preset bharo (steps wahin likhe hain). Ya photo/video/gana ka seedha link paste karo.';
    return;
  }

  btn.disabled = true;
  const prog = {};
  jobs.forEach(j => { prog[j.id] = { loaded: 0, total: j.file.size || 1 }; });

  // Kitna ho gaya, kitna baaki: har file ka aur poore ka percent
  const show = () => {
    let L = 0, T = 0;
    const rows = jobs.map(j => {
      const p = prog[j.id]; L += p.loaded; T += p.total;
      const pc = Math.min(100, Math.round(p.loaded / p.total * 100));
      return j.label + ': ' + pc + '% ho gaya, ' + (100 - pc) + '% baaki (' + fmtMB(p.loaded) + ' / ' + fmtMB(p.total) + ')';
    });
    const all = T ? Math.min(100, Math.round(L / T * 100)) : 100;
    bar.style.width = all + '%';
    $('upPct').textContent = 'Total ' + all + '% upload ho gaya, ' + (100 - all) + '% baaki';
    $('upRows').textContent = rows.join('\n');
  };

  try {
    const pw = $('fPass').value;
    if (pw) data.pw = await sha256(pw);
    if (jobs.length) { box.hidden = false; show(); note.textContent = 'Upload chal raha hai, page band mat karna...'; }
    else note.textContent = 'Link ban raha hai...';

    await Promise.all(jobs.map(async j => {
      try {
        j.done(await uploadFile(j.file, (l, t) => { prog[j.id].loaded = l; prog[j.id].total = t; show(); }));
      } catch (e) {
        throw new Error(j.label + ' upload nahi hui: ' + e.message);
      }
    }));
    data.scrap = data.scrap.filter(Boolean);

    shareUrl = base + await encodeShort(data);
    $('shareLink').value = shareUrl;
    if (jobs.length) $('upPct').textContent = 'Upload 100% poora';
    // Jo file online (https) nahi hai wo dusre ke phone par nahi dikhegi, uska saaf warning
    const miss = keys.filter(k => data[k] && !/^https?:/i.test(data[k]));
    const empty = keys.filter(k => !data[k]);
    note.textContent = 'Link taiyar hai! Copy karo ya WhatsApp par bhejo.' +
      (miss.length ? ' DHYAN: ' + miss.map(k => names[k] + ' (' + data[k] + ')').join(', ') +
        ' sirf tabhi dikhegi jab ye file site ke folder me index.html ke saath online daali ho. Safe tarika: device se upload karo ya https link do.' : '') +
      (empty.length ? ' Khali: ' + empty.map(k => names[k]).join(', ') + ' (link me nahi gayi).' : '');
  } catch (e) {
    note.textContent = 'Error: ' + e.message;
  } finally {
    btn.disabled = false;
  }
}
function shareWA() {
  const url = shareUrl || (isWishHash() ? location.href : '');
  if (!url) { toggleDrawer(true); $('shareNote').textContent = 'Pehle \"Share link banao\" dabao.'; return; }
  window.open('https://wa.me/?text=' + encodeURIComponent('Tumhare liye ek chhota sa surprise ' + url), '_blank');
}

// Chhota sandesh (toast)
let toastTimer;
function showToast(msg, ms) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms || 4500);
}

// Title bar ka Share button: website ka link kisi ko bhi bhejo
let shareData = null;
async function shareNow() {
  // Wish ka link bana hua ho (ya link se khola ho) to wahi, warna website ka link
  const wishUrl = shareUrl || (isWishHash() ? location.href : '');
  const url = wishUrl || baseUrl();
  if (!url) {
    showToast('Site abhi computer se khuli hai. Netlify/GitHub Pages par online karo, phir share ho payega.', 6000);
    return;
  }
  const text = wishUrl ? 'Tumhare liye ek chhota sa surprise' : 'Ye website dekho: apno ke liye 3D wish surprise banao';
  shareData = { title: document.title, text, url };
  if (!wishUrl) showToast('Ye sirf website ka link hai. Apni wish aur files bhejni hain to Customize me "Share link banao" dabao.', 6500);
  if (navigator.share) {                          // phone ka apna share box (saari apps ke saath)
    try { await navigator.share(shareData); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }   // user ne cancel kiya to kuch nahi
  }
  $('shareMenu').hidden = false;                  // computer par apna chhota menu
}

async function shareVia(app) {
  if (!shareData) return;
  const { title, text, url } = shareData;
  const enc = encodeURIComponent;
  if (app === 'copy') {
    try { await navigator.clipboard.writeText(url); showToast('Link copy ho gaya!', 2500); }
    catch (e) { prompt('Link copy karo:', url); }
  } else if (app === 'wa') window.open('https://wa.me/?text=' + enc(text + ' ' + url), '_blank');
  else if (app === 'tg') window.open('https://t.me/share/url?url=' + enc(url) + '&text=' + enc(text), '_blank');
  else if (app === 'mail') location.href = 'mailto:?subject=' + enc(title) + '&body=' + enc(text + '\n' + url);
  $('shareMenu').hidden = true;
}

/* =====================================================
   7. Shuruaat
   ===================================================== */
$('openBtn').addEventListener('click', startSequence);
$('video').addEventListener('ended', endVideo);
$('video').addEventListener('error', () => { videoFailed = true; if (theaterOn) endVideo(); });
$('skipBtn').addEventListener('click', endVideo);
$('photo').addEventListener('error', () => $('frame').classList.add('nophoto'));
$('replayBtn').addEventListener('click', replay);
$('gearBtn').addEventListener('click', () => toggleDrawer(true));
$('closeBtn').addEventListener('click', () => toggleDrawer(false));
$('form').addEventListener('submit', applyForm);
$('resetBtn').addEventListener('click', resetForm);
$('playBtn').addEventListener('click', playForm);
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleDrawer(false); });
$('moreBtn').addEventListener('click', burst);
setupTilt();

let animTick = 0;
if (!reduceMotion) setInterval(() => {              // har aadhe second me ek cheez
  if (animList().includes('fireworks') && ++animTick % 10 === 0) fireworks();
  for (let i = (CONFIG.effect === 'dense' ? 3 : 1); i > 0; i--) spawnFloat();
}, 500);

$('blowBtn').addEventListener('click', blowCandles);
$('cake').addEventListener('click', blowCandles);
$('muteBtn').addEventListener('click', toggleMusic);
$('linkBtn').addEventListener('click', makeLink);
$('sugBtn').addEventListener('click', suggestMsg);
$('copyBtn').addEventListener('click', copyLink);

// Title bar ke options
function goTo(id) {
  const el = id === 'top' ? null : $(id);
  const smooth = reduceMotion ? 'auto' : 'smooth';
  if (el) el.scrollIntoView({ behavior: smooth, block: 'start' });
  else window.scrollTo({ top: 0, behavior: smooth });
}
document.querySelectorAll('#nav [data-go]').forEach(b => b.addEventListener('click', () => {
  goTo(b.dataset.go);
  $('nav').classList.remove('open'); $('navToggle').setAttribute('aria-expanded', 'false');
}));
$('navToggle').addEventListener('click', () => {
  const open = $('nav').classList.toggle('open');
  $('navToggle').setAttribute('aria-expanded', String(open));
});
$('navShare').addEventListener('click', e => { e.stopPropagation(); $('nav').classList.remove('open'); shareNow(); });
document.querySelectorAll('#shareMenu [data-app]').forEach(b => b.addEventListener('click', () => shareVia(b.dataset.app)));
document.addEventListener('click', e => { const m = $('shareMenu'); if (!m.hidden && !m.contains(e.target)) m.hidden = true; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('shareMenu').hidden = true; });
$('gearBtn').addEventListener('click', () => $('nav').classList.remove('open'));

// Footer ke buttons
$('footYear').textContent = new Date().getFullYear();
$('footReplay').addEventListener('click', replay);
$('footWA').addEventListener('click', shareWA);
$('footCustom').addEventListener('click', () => toggleDrawer(true));
$('footCopy').addEventListener('click', async () => {
  const b = $('footCopy'), url = shareUrl || location.href;
  try { await navigator.clipboard.writeText(url); }
  catch (e) { prompt('Link copy karo:', url); return; }
  b.textContent = 'Copy ho gaya!';
  setTimeout(() => { b.textContent = 'Link copy karo'; }, 2000);
});
// Upar jaane ka button: thoda scroll karne par dikhta hai
$('toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
window.addEventListener('scroll', () => $('toTop').classList.toggle('show', window.scrollY > 300), { passive: true });
$('fRel').addEventListener('change', () => { relPreset(); previewLook(); });
['fTheme', 'fAnim', 'fEffect'].forEach(id => $(id).addEventListener('change', previewLook));
$('fAnimColor').addEventListener('input', () => { $('fAnimColor').dataset.auto = '0'; previewLook(); });
$('fOcc').addEventListener('change', () => { occPreset(); previewLook(); });
// Title bar ke controls: wahi kaam karte hain jo panel ke, bas upar se
$('nOcc').addEventListener('change', () => { $('fOcc').value = $('nOcc').value; occPreset(); previewLook(); });
$('nRel').addEventListener('change', () => { $('fRel').value = $('nRel').value; relPreset(); previewLook(); });
$('nColor').addEventListener('input', () => { $('fAnimColor').value = $('nColor').value; $('fAnimColor').dataset.auto = '0'; previewLook(); });
// Title bar ke Animation dropdown: tick karte hi chuni hui animations lag jaati hain
document.querySelectorAll('#nAnim input').forEach(i => i.addEventListener('change', () => {
  setAnimChecks(Array.from(document.querySelectorAll('#nAnim input:checked')).map(x => x.value));
  previewLook();
}));
// Bahar tap karne ya Escape dabane par dropdown band
document.addEventListener('click', e => { const d = $('navAnim'); if (d.open && !d.contains(e.target)) d.open = false; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('navAnim').open = false; });
$('nColorAuto').addEventListener('click', () => { $('fAnimColor').dataset.auto = '1'; previewLook(); });
$('colorAuto').addEventListener('click', () => { $('fAnimColor').dataset.auto = '1'; previewLook(); });
$('waBtn').addEventListener('click', shareWA);
$('waStage').addEventListener('click', shareWA);

/* =====================================================
   Preview: kab kya aayega, saari cheezein ek jagah
   ===================================================== */
const EFFECT_NAME = { normal: 'Normal', glow: 'Glow (chamak)', slow: 'Dheema', fast: 'Tez', dense: 'Zyada (bheed)' };
const REL_NAME = { love: 'Partner (pyaar)', friend: 'Dost', family: 'Family' };

// Ab tak ki settings ke hisaab se poora sequence ki list banata hai
function previewSteps() {
  const c = CONFIG, o = occ(), t = occTitle();
  const isB = (c.occasion || 'birthday') === 'birthday';
  const hasV = !!c.video, vBefore = hasV && c.videoWhen === 'before', vAfter = hasV && c.videoWhen !== 'before';
  const sc = (c.scrap || []).filter(Boolean).length;
  const S = [];

  S.push({ go: 'intro', when: 'Page khulte hi', title: 'Pehli screen',
    text: '"Tap karo" likha aata hai aur "Open my surprise" button. Upar title bar me Home, Preview, Share aur Customize options rehte hain.' +
      (c.pw ? ' Password daalna padega.' : '') +
      (c.unlock ? ' Page ' + new Date(c.unlock).toLocaleString('en-IN') + ' tak lock rahega aur countdown dikhega.' : '') });

  S.push({ go: 'env', when: 'Tap karte hi (0 se 4 second)', title: '3D lifafa',
    text: 'Lifafa khulta hai, andar se "' + t + '" wala letter nikalta hai aur dil bikhar jaate hain' + (c.music ? '. Gana bhi shuru ho jata hai.' : '.') });

  if (vBefore) S.push({ go: 'video', when: 'Lifafa ke turant baad', title: 'Short video',
    text: 'Poori screen par video chalti hai (Skip button hai). Khatam hote hi ' + (o.cake ? 'cake aata hai.' : 'main page aa jata hai.') });

  if (o.cake) S.push({ go: 'cake', when: vBefore ? 'Video ke baad' : 'Lifafa ke baad', title: 'Cake aur candles',
    text: 'Cake ke saath bear aur panda ke 3D characters. "Phoonk maaro" dabao ya cake par tap karo. Kareeb 8 second me pehle candles bujhti hain, phir cake katta hai, phir aatishbaazi hoti hai.' });

  if (vAfter) S.push({ go: 'video', when: o.cake ? 'Candles bujhane ke baad' : 'Lifafa ke baad', title: 'Short video',
    text: 'Poori screen par video chalti hai (Skip button hai). Khatam hote hi main page aa jata hai.' });

  S.push({ go: 'stage', when: 'Sabse aakhir me (yahin rukta hai)', title: 'Main page',
    text: 'Photo ka 3D card aur ghumta cube. Neeche "' + t + '" aur naam "' + c.name + '".' +
      (isB ? ' Janam tithi aur umar bhi dikhti hai.' : '') +
      ' Message ki ' + c.lines.length + ' lines ek-ek akshar karke likhi jaati hain.' +
      (c.reasons.length ? ' ' + c.reasons.length + ' "wajah" ke flip cards.' : '') +
      (sc ? ' ' + sc + ' yaadon ki photo ka scrapbook.' : '') +
      ' Aakhir me "Send more love", "Dobara dekho" aur WhatsApp buttons.' });

  const names = animList().map(k => ANIMS[k].icon + ' ' + ANIMS[k].label);
  const cu = customEmojis();
  S.push({ go: null, when: 'Shuru se aakhir tak', title: 'Background aur music',
    text: 'Animation: ' + (names.concat(cu.length ? ['apne emoji ' + cu.join(' ')] : []).join(', ') || 'koi nahi') +
      '. Effect: ' + (EFFECT_NAME[c.effect] || 'Normal') + '. ' +
      (c.music ? 'Gana chalega (title bar me Music ON/OFF button).' : 'Abhi koi gana nahi hai.') });
  return S;
}

function renderPreview() {
  const c = CONFIG;
  $('pvSum').textContent = 'Occasion: ' + occ().icon + ' ' + occ().label + '  |  Rishta: ' + (REL_NAME[c.relation] || 'Partner (pyaar)') + '  |  Theme: ' + c.theme;
  const list = $('pvList');
  list.textContent = '';
  previewSteps().forEach((s, i) => {
    const li = document.createElement('li'); li.className = 'pvStep';
    const num = document.createElement('span'); num.className = 'pvNum'; num.textContent = i + 1;
    const body = document.createElement('div');
    const when = document.createElement('p'); when.className = 'pvWhen'; when.textContent = s.when;
    const ti = document.createElement('p'); ti.className = 'pvTitle'; ti.textContent = s.title;
    const tx = document.createElement('p'); tx.className = 'pvText'; tx.textContent = s.text;
    body.append(when, ti, tx);
    if (s.go) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'btn ghost pvGo'; b.textContent = 'Yahan se dekho';
      b.addEventListener('click', () => previewGo(s.go));
      body.append(b);
    }
    li.append(num, body);
    list.append(li);
  });
}

function openPreview() { renderPreview(); $('preview').hidden = false; }
function closePreview() { $('preview').hidden = true; }

// Kisi bhi step se seedha dekho (sab kuch reset karke us jagah se shuru)
function previewGo(id) {
  closePreview();
  replay();
  const prep = () => { $('intro').hidden = true; document.body.classList.add('started', 'busy'); };
  if (id === 'intro') return;
  if (id === 'env') { startSequence(); return; }
  if (id === 'video') {
    if (!CONFIG.video) { showToast('Abhi koi video nahi hai. Customize me video daalo.', 3500); return; }
    prep(); startMusic();
    $('video').src = CONFIG.video;
    startVideo(CONFIG.videoWhen === 'before' ? cakeOrStage : showStage);
    return;
  }
  if (id === 'cake') {
    if (!occ().cake) { showToast('Is occasion me cake nahi aata.', 3500); return; }
    prep(); startMusic(); showCake();
    return;
  }
  if (id === 'stage') { prep(); startMusic(); showStage(); }
}

$('navPreview').addEventListener('click', () => { $('nav').classList.remove('open'); $('navToggle').setAttribute('aria-expanded', 'false'); openPreview(); });
$('pvClose').addEventListener('click', closePreview);
$('pvPlay').addEventListener('click', () => previewGo('env'));
$('preview').addEventListener('click', e => { if (e.target === $('preview')) closePreview(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePreview(); });
$('fMsg').addEventListener('input', () => { msgTouched = true; });
$('fTitle').addEventListener('input', previewLook);
$('fEmoji').addEventListener('input', previewLook);

// Shuru me: share link (#w=...) se khola gaya ho to details link se hi padh lo
async function init() {
  if (isWishHash()) {
    document.body.classList.add('view');      // dekhne wale ko Customize nahi dikhega
    try {
      Object.assign(CONFIG, await decodeHash(location.hash));
      if (CONFIG.pw) {                        // password laga ho to pehle wo poochho
        $('openBtn').hidden = true; $('gate').hidden = false;
        const tryPw = async () => {
          if (await sha256($('gateIn').value) === CONFIG.pw) { $('gate').hidden = true; $('openBtn').hidden = false; }
          else $('gateNote').textContent = 'Password galat hai.';
        };
        $('gateBtn').addEventListener('click', tryPw);
        $('gateIn').addEventListener('keydown', e => { if (e.key === 'Enter') tryPw(); });
      }
    } catch (e) {
      $('openBtn').disabled = true;
      $('introHint').textContent = 'Link adhoora ya galat hai. Bhejne wale se naya link maango.';
    }
  }
  fillLook();
  applyTheme();
  checkLock();
}
init();