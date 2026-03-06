# VDD Website - Hostinger Deployment Guide

## 🚀 Quick Deployment Steps

### 1. **Download the Deployment Package**
- **File**: `vdd-website-hostinger-deploy.zip`
- **Location**: Root directory of your project
- **Size**: Contains all production-ready files

### 2. **Hostinger Upload Process**

#### Option A: File Manager (Recommended)
1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to `public_html` directory**
4. **Delete old website files** (backup first if needed)
5. **Upload `vdd-website-hostinger-deploy.zip`**
6. **Extract the zip file** in `public_html`
7. **Move all files from `dist` folder to root** if needed

#### Option B: FTP Upload
1. **Use FTP client** (FileZilla, WinSCP, etc.)
2. **Connect to your Hostinger FTP**
3. **Navigate to `public_html`**
4. **Upload all files from the `dist` folder**

### 3. **File Structure After Upload**
```
public_html/
├── index.html          (Main entry point)
├── vite.svg           (Favicon)
├── assets/
│   ├── index-CmR_BpSY.js    (Main JavaScript bundle)
│   └── index-DL-rv0M5.css   (Styles)
├── images/
│   ├── about/
│   ├── hero/
│   ├── journey/
│   ├── menu/
│   ├── offers/
│   └── logo-circle.png
└── videos/
    ├── about/
    └── menu/
```

## ✅ **New Features Deployed**

### 🎯 **Outlet-Specific Menu Redirects**
- **Patia Shop**: `https://vddynasty.petpooja.com/menu`
- **VDD KV Branch**: `https://vdumplingdynasty.petpooja.com/menu`

### 🏪 **Outlet Selection Modal**
- **Appears when**: User clicks any menu/order button
- **Options**: Choose between Patia and Kalinganagar outlets
- **Redirect**: Automatically opens correct external menu website

### 📱 **Updated Buttons**
All these buttons now open the outlet selection modal:
- Header "Menu" link
- Header "Order Now" button (desktop & mobile)
- Hero "Explore the Menu" button
- Menu Teaser "See Full Menu" button
- Menu Section "See All Dishes" button
- Menu Section "View Full Menu" button

## 🔧 **Technical Details**

### **Build Information**
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 3.3.5
- **Icons**: Lucide React 0.510.0
- **Build Size**: 
  - CSS: 27.71 kB (gzipped: 5.24 kB)
  - JS: 261.33 kB (gzipped: 75.91 kB)

### **Browser Compatibility**
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🌐 **Domain Configuration**

### **DNS Settings** (if needed)
- Ensure your domain points to Hostinger servers
- Wait for DNS propagation (up to 24 hours)

### **SSL Certificate**
- Enable SSL in Hostinger control panel
- Force HTTPS redirect for security

## 🧪 **Testing After Deployment**

### **Functionality Tests**
1. ✅ **Homepage loads correctly**
2. ✅ **All images display properly**
3. ✅ **Menu buttons open outlet modal**
4. ✅ **Outlet selection redirects to correct websites**
5. ✅ **Mobile responsiveness works**
6. ✅ **Contact form displays (with technical difficulty popup)**

### **External Links Test**
- **Patia**: Click outlet modal → Select Patia → Should open `vddynasty.petpooja.com/menu`
- **Kalinganagar**: Click outlet modal → Select KV → Should open `vdumplingdynasty.petpooja.com/menu`

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Images Not Loading**
- Check file paths in `images/` folder
- Ensure case-sensitive filenames match

#### **CSS Not Applied**
- Verify `assets/index-DL-rv0M5.css` exists
- Check browser cache (Ctrl+F5)

#### **JavaScript Errors**
- Check browser console for errors
- Verify `assets/index-CmR_BpSY.js` exists

#### **Modal Not Opening**
- Check browser console for JavaScript errors
- Ensure all files uploaded correctly

## 📞 **Support**

If you encounter any issues:
1. **Check browser console** for error messages
2. **Verify all files uploaded** correctly
3. **Clear browser cache** and test again
4. **Test on different browsers**

## 🎉 **Deployment Complete!**

Your VDD website is now live with:
- ✅ Outlet-specific menu redirects
- ✅ Interactive outlet selection modal
- ✅ All menu buttons properly configured
- ✅ Mobile-responsive design
- ✅ Production-optimized performance

**Next Steps**: Test all functionality and share the website URL!
