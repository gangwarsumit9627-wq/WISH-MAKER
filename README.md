# Wish Maker

Kisi ke liye personal wish website banao: photo, video, gaana, message aur animation ke saath. Bas details bharo, link banao aur WhatsApp par bhej do.

Birthday se shuru kiya tha, ab anniversary, Diwali, Eid, Rakhi, Sorry, Miss You jaise 30+ occasions bhi chalte hain.

**Live demo:** https://superb-douhua-ba9af5.netlify.app/

---

## Kya-kya hai

- **Opening ka surprise:** pehle "Tap karo" screen, phir 3D lifafa khulta hai
- **Cake screen:** bear aur panda ke saath candles bujhao, phir cake kaato
- **Short video:** candle ke baad ya cake se pehle, jab chaho (skip button bhi hai)
- **3D photo card:** mouse ya ungli ke saath tilt hota hai
- **Message:** typing effect ke saath, 5 andaaz me: occasion wala, shayari, emotional, funny, one line
- **Suggest a Message:** idea na aaye to button dabao
- **Reasons cards:** "tumhe kyun pasand ho" wali 4 wajah
- **Memories scrapbook:** apni favourite photos upload karo
- **Music:** apna mp3 upload karo ya link do, Music ON/OFF button bhi hai
- **Animations (25):** udte dil, confetti, gubbare, fireworks, diye, petals, snow, patang, tiranga aur bahut kuch. Apne emoji bhi daal sakte ho
- **7 themes:** Rose, Gold, Midnight blue, Violet, Emerald green, Tricolor (Tiranga), Ruby red. Rishte ke hisaab se theme apne aap badal sakta hai
- **Password lock:** receiver ko password daalna padega (optional)
- **Timer lock:** is time se pehle page nahi khulega. Owner code se tum pehle bhi khol sakte ho
- **Preview:** share karne se pehle dekho ki kab kya aayega
- **Share:** WhatsApp, Telegram, Email ya link copy
- **Age counter:** "kitne din baaki" ya "aaj ka din" wala line apne aap

## Files

```
wish-maker/
├── index.html   # saari screens aur form (Customize drawer)
├── style.css    # design, themes, 3D effects
└── script.js    # poori logic, occasions, animations, share link
```

## Kaise chalayein

1. Teeno files ek hi folder me rakho.
2. `index.html` browser me khol lo. Bas, install kuch nahi karna.
3. Photo, video aur gaana default me isi folder se uthte hain: `photo.jpg`, `video.mp4`, `music.mp3`. Na ho to us part ko skip kar diya jata hai.

## Apni details badalna

`script.js` ke sabse upar `CONFIG` hai. Naam, DOB, photo, theme, message ki lines wahin se badal sakte ho. Footer me jo naam dikhta hai wo `FOOTER_NAME` se aata hai.

Ya phir page par **Customize** dabao aur form se sab bhar do. Draft browser me save rehta hai.

## Share link kaise banta hai

- Saari settings link ke `#` wale hisse me encode hoti hain, koi database nahi chahiye.
- Photo, video, gaana jaisi files **Cloudinary** par upload hoti hain (free account, unsigned preset).
- Agar tum file upload nahi karte aur sirf links dete ho, to Cloudinary ki zarurat nahi.

Apna setup karne ke liye `script.js` me ye do cheezein badlo:

```js
const UPLOAD = { cloudName: 'tumhara-cloud-name', preset: 'tumhara-preset' };
const SITE_URL = 'https://tumhari-site.netlify.app/';
```

Cloudinary me preset banate waqt **Signing mode = Unsigned** rakhna.

## Hosting

Netlify par folder drag and drop karo, free me ho jata hai. Uska link `SITE_URL` me daal do, tabhi share link sahi banega.

## Tech

Plain HTML, CSS aur JavaScript. Koi framework ya library nahi. Fonts: Dancing Script aur Poppins (Google Fonts).

## Limits

- Message max 500 characters
- Reasons max 4, har ek 100 characters
- Scrapbook photos max 5MB each
- Link wali photo, video, gaana tabhi chalenge jab link seedha file tak jaye (Google Drive ke links ko code khud theek kar leta hai)

## Banane wala

Sumit Kumar, Bareilly. BCA student, abhi seekh raha hoon, galti ho to batana 🙂
