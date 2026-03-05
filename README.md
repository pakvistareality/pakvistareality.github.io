# PakVista Realty - Premium Real Estate Website

A fully responsive, production-ready, static real estate website built with HTML5, CSS3, and vanilla JavaScript. Designed with accessibility (WCAG 2.1 AA compliance) and SEO best practices in mind.

## 🌟 Features

### Design & User Experience
- **Premium WordPress-style design** with luxury real estate aesthetics
- Elegant typography using Google Fonts (Playfair Display, Lato, Montserrat)
- Smooth animations and micro-interactions
- Sticky navigation header
- Mobile-responsive layout (works on all devices)
- Professional color scheme with gold accents

### Pages
1. **Home (index.html)** - Hero section, featured properties, about preview, testimonials
2. **Properties (properties.html)** - Filterable property listings with sort functionality
3. **About (about.html)** - Company story, mission, values, team achievements
4. **Contact (contact.html)** - Accessible contact form, Google Maps integration, FAQs

### Accessibility (WCAG 2.1 AA Compliant)
- ✅ Semantic HTML5 landmarks
- ✅ Proper heading hierarchy (h1-h6)
- ✅ Descriptive alt text for images
- ✅ Skip-to-content link
- ✅ Keyboard navigation support
- ✅ Visible focus states
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ ARIA labels and live regions
- ✅ Form validation with screen reader announcements
- ✅ No motion for users with `prefers-reduced-motion`

### SEO Optimization
- ✅ Semantic HTML structure
- ✅ Page-specific title tags
- ✅ Meta descriptions for each page
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD structured data (Local Business schema)
- ✅ Optimized heading structure
- ✅ Clean, readable URLs

### Interactive Features
- Mobile menu with smooth slide-in animation
- Property filtering by category (Residential, Commercial, Plots)
- Property sorting (Price, Date)
- Animated elements on scroll
- Accessible contact form with validation
- Form submission with success confirmation
- Real-time form validation

## 📁 Project Structure

```
pakvista-realty/
├── index.html          # Home page
├── properties.html     # Properties listing
├── about.html         # About us page
├── contact.html       # Contact page with form
├── styles.css         # Main stylesheet
├── main.js            # JavaScript functionality
└── assets/
    └── images/
        ├── hero.jpg           # Hero section background
        ├── property1.jpg      # Property image 1
        ├── property2.jpg      # Property image 2
        ├── property3.jpg      # Property image 3
        ├── office.jpg         # Office interior image
        └── README.txt         # Image guidelines
```

## 🚀 Deployment on GitHub Pages

### Step 1: Create GitHub Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PakVista Realty website"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/pakvista-realty.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://YOUR-USERNAME.github.io/pakvista-realty/`

## 🖼️ Replacing Placeholder Images

The current SVG placeholders should be replaced with actual property photos:

### Required Images:
1. **hero.jpg** (1920x1080px) - Luxury property exterior
2. **property1.jpg** (800x600px) - Modern villa
3. **property2.jpg** (800x600px) - Commercial building
4. **property3.jpg** (800x600px) - Apartment/residential
5. **office.jpg** (1200x800px) - Office interior

### Free Stock Photo Sources:
- [Unsplash](https://unsplash.com) - Search: "luxury villa", "modern office"
- [Pexels](https://pexels.com) - Search: "real estate", "commercial building"
- [Pixabay](https://pixabay.com) - Search: "luxury home", "office interior"

### Tips:
- Use high-quality, professional photos
- Optimize images before uploading (compress to reduce file size)
- Maintain aspect ratios specified above
- Use WebP format for better performance (optional)

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --primary-gold: #d4af37;
  --primary-dark: #1a2332;
  --accent-teal: #16a085;
  /* ... more colors ... */
}
```

### Content
- **Company Name**: Search and replace "PakVista Realty" in all HTML files
- **Contact Info**: Update phone, email, address in all pages
- **Property Listings**: Edit property cards in `properties.html`
- **Testimonials**: Modify testimonial content in `index.html` and `about.html`

### Typography
Change Google Fonts in HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR-FONT&display=swap" rel="stylesheet">
```

Then update CSS variables:
```css
:root {
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

## 🧪 Testing

### Accessibility Testing
- **WAVE**: [wave.webaim.org](https://wave.webaim.org)
- **axe DevTools**: Browser extension for Chrome/Firefox
- **Keyboard Navigation**: Tab through entire site
- **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)

### Browser Testing
Test on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### Responsive Testing
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-friendly navigation (hamburger menu)
- Touch-optimized buttons and links
- Optimized images for mobile bandwidth
- Stacked layouts on small screens
- Readable text without zooming

## ⚡ Performance Optimization Tips

1. **Compress Images**: Use TinyPNG or ImageOptim
2. **Enable Caching**: Add `.htaccess` for Apache servers
3. **Minify CSS/JS**: Use online tools or build tools
4. **Use CDN**: Consider Cloudflare for faster loading
5. **Lazy Loading**: Already implemented for images

## 🔒 Security Considerations

- All external links use `rel="noopener"` for security
- Form submissions should be handled server-side in production
- Consider adding CAPTCHA for contact form (reCAPTCHA)
- Use HTTPS for production deployment

## 📧 Contact Form Setup

Currently, the form shows a success message (client-side only). For production:

1. **Use a Form Service**:
   - Formspree: formspree.io
   - Netlify Forms: netlify.com/products/forms
   - Google Forms: forms.google.com

2. **Server-Side Processing**:
   - PHP script
   - Node.js + Express
   - Python Flask/Django

3. **Update form action**:
```html
<form action="YOUR-FORM-ENDPOINT" method="POST">
```

## 🌐 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- iOS Safari: iOS 12+
- Chrome Android: Latest

## 📄 License

This project is created for portfolio purposes. Feel free to use and modify for your own real estate business.

## 🤝 Credits

- Design: Inspired by premium WordPress real estate themes
- Fonts: Google Fonts (Playfair Display, Lato, Montserrat)
- Icons: Unicode emoji characters
- Color Palette: Custom luxury real estate theme

## 🐛 Known Issues

- SVG placeholder images should be replaced with actual photos
- Form submission is client-side only (needs backend integration)
- Google Maps iframe uses placeholder coordinates (update for real location)

## 📞 Support

For questions or issues:
- Email: info@pakvistarealty.pk
- Phone: +92 300 7654321
- Address: 45 Blue Area, Islamabad, Pakistan

---

**Built with ❤️ for the Pakistani real estate market**

Last Updated: March 2024
Version: 1.0.0
