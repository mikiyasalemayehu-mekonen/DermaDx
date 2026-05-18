# DermaDx Progressive Web Application (PWA) Setup Guide

Your application has been successfully configured as a Progressive Web Application! Here's what has been set up and what you need to do to complete it.

## ✅ What's Been Configured

### 1. **Manifest File** (`public/manifest.json`)
- Defines app metadata (name, description, icons, theme colors)
- Specifies how the app appears when installed on home screens
- Includes icon references for different devices

### 2. **Service Worker** (`public/sw.js`)
- Enables offline functionality
- Implements intelligent caching strategies:
  - **NetworkFirst** for API calls and HTML pages (check network first, fall back to cache)
  - **CacheFirst** for static assets (images, fonts, CSS, JS)
- Automatically registers and activates

### 3. **PWA Components**
- **PWAInstall.tsx**: Displays install prompt when appropriate
- **ServiceWorkerRegister.tsx**: Registers the service worker on app load

### 4. **Metadata & PWA Headers**
- Web app manifest link
- Apple web app meta tags
- Theme colors
- Proper viewport configuration

## 📋 TODO: Complete Your PWA

### Step 1: Generate App Icons
Create PWA icons at the following sizes and save them to `public/`:

| Filename | Size | Purpose |
|----------|------|---------|
| `icon-192x192.png` | 192×192 | Home screen icon (regular) |
| `icon-512x512.png` | 512×512 | Splash screen (regular) |
| `icon-maskable-192.png` | 192×192 | Home screen icon (maskable) |
| `icon-maskable-512.png` | 512×512 | Splash screen (maskable) |
| `screenshot-1.png` | 540×720 | Mobile screenshot |
| `screenshot-2.png` | 1280×720 | Desktop screenshot |

**Tools to generate icons:**
- [PWA Manifest Generator](https://www.pwabuilder.com/)
- [Icon Generator](https://www.favicon-generator.org/)
- [Maskable Icon Editor](https://maskable.app/)

### Step 2: Update manifest.json
Replace placeholder values in `public/manifest.json`:
- Update `icons` array with your generated icon paths
- Add your actual website URL to `start_url` and `scope`
- Customize colors (`background_color`, `theme_color`)
- Update `screenshots` with actual screenshot paths

### Step 3: Restore Google Fonts (Optional)
If you have internet access in your build environment:

Edit `app/layout.tsx`:
```typescript
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

// Update className in html element:
// className={cn("h-full antialiased scroll-smooth", "font-sans", geist.variable)}
```

### Step 4: Update robots.txt
Replace `yoursite.com` in `public/robots.txt` with your actual domain.

## 🚀 Building & Deployment

### Development
```bash
npm run dev
```
Service Worker is disabled in development mode (as configured).

### Production Build
```bash
npm run build
npm start
```

**Important**: Your app uses Next.js Turbopack by default. If you encounter build issues, you can use webpack:
```bash
npm run build -- --webpack
```

## 🧪 Testing Your PWA

### Chrome DevTools
1. Open DevTools (F12)
2. Go to **Application** tab
3. Check **Manifest** section to verify manifest.json loaded
4. Check **Service Workers** section to see registration status
5. Check **Storage** → **Cache Storage** to see cached assets

### Installation Testing
1. **Desktop (Chrome)**: Click install icon in address bar
2. **Mobile (Chrome/Safari)**: Use "Add to Home Screen"
3. **iOS Safari**: Tap Share → Add to Home Screen

### Offline Testing
1. Load the app online first (to cache assets)
2. Go to DevTools → Application → Service Workers
3. Check "Offline" checkbox
4. Navigate around - most pages should work offline
5. API calls will fail gracefully with cached data if available

## 🔧 Service Worker Caching Strategies

Your service worker implements:

```javascript
// API calls: NetworkFirst (10 second timeout)
// If network fails, shows cached response

// Static assets: CacheFirst  
// Uses cached version, updates in background

// HTML pages: NetworkFirst
// Always tries network first for fresh content
```

## 📱 PWA Features Enabled

✅ Installable on home screen  
✅ App mode (without browser UI)  
✅ Offline functionality  
✅ Background sync support  
✅ Push notifications ready (optional)  
✅ Adaptive icon support  
✅ Dark mode ready  

## 🎯 Next Steps (Optional Enhancements)

1. **Add Status Bar Styling** - Customize status bar appearance
2. **Add Shortcuts** - Quick launch actions from home screen
3. **Add Share Target** - Enable sharing to your app
4. **Add Badge Support** - Show notification badges
5. **Add Periodic Sync** - Background periodic updates
6. **Analytics** - Track PWA installations

## 📚 Resources

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [PWABuilder](https://www.pwabuilder.com/)
- [Web.dev - PWA Guide](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Service Worker not registering | Check browser console for errors. Ensure `public/sw.js` exists. |
| Icons not showing | Verify icon files exist in `public/` with correct filenames. |
| Offline pages not showing | Clear cache in DevTools and reload the app. |
| Build fails with Google Fonts | Either get internet access or use system fonts as currently configured. |

---

**Your DermaDx app is now PWA-enabled! 🎉**
