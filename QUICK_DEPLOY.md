#  Quick Deployment Checklist - Render

## Fast Track (5 minutes)

### Backend Deployment
1. **Render Dashboard** → New + → Web Service
2. **Settings**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   OPENWEATHER_API_KEY=your_key_here
   ```
4. **Deploy** → Copy Backend URL

### Frontend Deployment
1. **Render Dashboard** → New + → Static Site
2. **Settings**:
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
4. **Deploy** → Done! 🎉

---

## 📝 Important Notes

- ✅ Backend URL format: `https://your-service.onrender.com`
- ✅ Frontend URL format: `https://your-static-site.onrender.com`
- ⚠️ Free tier: Services spin down after 15 min (first request = slow)
- 🔄 Auto-deploys on git push

---

See `DEPLOYMENT.md` for detailed instructions.

