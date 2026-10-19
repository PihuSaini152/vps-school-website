# VPS School Website Starter

इस ZIP में React + Vite frontend, Express backend और MySQL का starter setup है। Pages अभी placeholders हैं; final design हम step-by-step बनाएँगे।

## शुरू करने से पहले
- Node.js 20.19+ या 22.12+ install होना चाहिए।
- ZIP extract करके folder VS Code में खोलें।
- अपने असली school logo को `client/public/Logo.PNG` में कॉपी करें। Logo image ZIP में शामिल नहीं है।
- पुराने project को अभी delete/overwrite न करें।

## Frontend चलाएँ
VS Code Terminal:
```powershell
cd client
npm install
npm run dev
```
खोलें: http://localhost:5173

## Backend चलाएँ
VS Code में दूसरा Terminal:
```powershell
cd server
npm install
copy .env.example .env
npm run dev
```
Health check: http://localhost:5000/api/health

## MySQL (admission form save करने के लिए)
1. XAMPP में MySQL start करें।
2. phpMyAdmin में `server/database/schema.sql` import करें।
3. `server/.env` में database settings जाँचें।
Health API MySQL के बिना भी चलेगी, लेकिन form submission के लिए DB चाहिए।

## Important
- दोनों terminals खुले रखें: एक client, दूसरा server.
- Admin page अभी placeholder है, secure login नहीं है. Public launch से पहले authentication और admin features बनेंगे।
- School की असली जानकारी क्लाइंट से verify करके ही publish करें।
