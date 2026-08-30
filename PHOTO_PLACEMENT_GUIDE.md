# 📸 Photo Placement Guide for GLAM Website

## 📁 Step 1: Create Images Folder

In your GLAM WEBSITE folder, create a new folder called **`images`**

**Full Path:**
```
C:\Users\yashp\OneDrive\Desktop\GLAM WEBSITE\images\
```

### How to Create:
1. Open File Explorer
2. Navigate to: `C:\Users\yashp\OneDrive\Desktop\GLAM WEBSITE`
3. Right-click → New → Folder
4. Name it: `images`

---

## 📷 Step 2: Add Your Photos

Copy all your real photos into the `images` folder. Here are the **13 photos you need**:

### **Photo List & Recommended Names:**

#### **HOME PAGE** (4 photos)
1. **`glam-office.jpg`** - Office space or team meeting photo (1000×500px)
2. **`partnership-meeting.jpg`** - Business handshake or partnership photo (400×300px)
3. **`strategy-session.jpg`** - Brand strategy or planning meeting (400×300px)
4. **`market-analysis.jpg`** - Market research or global expansion photo (400×300px)

#### **SERVICES PAGE** (1 photo)
5. **`services-banner.jpg`** - Professional consulting or services image (1200×400px)

#### **BRANDS PAGE** (1 photo)
6. **`brand-portfolio.jpg`** - Brand logos collage or product showcase (1200×400px)

#### **ABOUT PAGE** (6 photos)
7. **`global-meetings.jpg`** - International meetings or conferences (600×400px)
8. **`market-discovery.jpg`** - Market visits or retail tours (600×400px)
9. **`exhibitions.jpg`** - Trade shows or exhibition booth (600×400px)
10. **`partner-visits.jpg`** - Factory or partner office visits (600×400px)
11. **`team-photo.jpg`** - GLAM team group photo (600×400px)
12. **`team-culture.jpg`** - Team collaboration or networking (1000×400px)

#### **CONTACT PAGE** (1 photo)
13. **`contact-banner.jpg`** - Office reception or communication theme (1000×350px)

---

## 🔄 Step 3: Replace Placeholder Images in HTML Files

### **Method 1: Quick Find & Replace (Easiest)**

Open each HTML file in a text editor (Notepad, VS Code, etc.) and use Find & Replace:

**Find:** `https://placehold.co/`
**Replace with:** `images/`

Then manually adjust each image filename.

---

### **Method 2: Manual Replacement (Recommended for accuracy)**

#### **A. HOME PAGE (`index.html`)**

**Photo 1 - Office/Team Meeting** (around line 69)
```html
<!-- FIND THIS: -->
<img src="https://placehold.co/1000x500/000000/FF6633?text=GLAM+Office+%7C+Team+Meeting" alt="GLAM Team" style="...">

<!-- REPLACE WITH: -->
<img src="images/glam-office.jpg" alt="GLAM Team" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
```

**Photos 2-4 - Three Grid Images** (around line 213)
```html
<!-- FIND THIS: -->
<img src="https://placehold.co/400x300/000000/FF6633?text=Global+Partnerships" ...>
<img src="https://placehold.co/400x300/1a1a1a/FF8855?text=Brand+Strategy" ...>
<img src="https://placehold.co/400x300/000000/FF6633?text=Market+Expansion" ...>


<!-- REPLACE WITH: -->
<img src="images/partnership-meeting.jpg" alt="Partnership Meeting" style="...">
<img src="images/strategy-session.jpg" alt="Brand Strategy Session" style="...">
<img src="images/market-analysis.jpg" alt="Market Analysis" style="...">
```

---

#### **B. SERVICES PAGE (`services.html`)**

**Photo 5 - Services Banner** (around line 44)
```html
<!-- FIND THIS: -->
<img src="https://placehold.co/1200x400/000000/FF6633?text=Strategic+Brand+Services" ...>

<!-- REPLACE WITH: -->
<img src="images/services-banner.jpg" alt="Our Services" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
```

---

#### **C. BRANDS PAGE (`brands.html`)**

**Photo 6 - Brand Portfolio Banner** (around line 48)
```html
<!-- FIND THIS: -->
<img src="https://placehold.co/1200x400/000000/FF6633?text=Our+Iconic+Brand+Partners" ...>

<!-- REPLACE WITH: -->
<img src="images/brand-portfolio.jpg" alt="Brand Portfolio Banner" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
```

---

#### **D. ABOUT PAGE (`about.html`)**

**Photos 7-11 - Journey Images** (around lines 65-95)
```html
<!-- FIND THESE 5 IMAGES: -->
<img src="https://placehold.co/600x400/000000/FF6633?text=Global+Brand+Meetings" ...>
<img src="https://placehold.co/600x400/1a1a1a/FF8855?text=Market+Research+%26+Discovery" ...>
<img src="https://placehold.co/600x400/000000/FF6633?text=Trade+Shows+%26+Exhibitions" ...>
<img src="https://placehold.co/600x400/1a1a1a/FF8855?text=Factory+%26+Partner+Visits" ...>
<img src="https://placehold.co/600x400/000000/FF6633?text=GLAM+Team+Photo" ...>

<!-- REPLACE WITH: -->
<img src="images/global-meetings.jpg" alt="Global Meetings" style="...">
<img src="images/market-discovery.jpg" alt="Market Discovery" style="...">
<img src="images/exhibitions.jpg" alt="Exhibitions" style="...">
<img src="images/partner-visits.jpg" alt="Partner Visits" style="...">
<img src="images/team-photo.jpg" alt="GLAM Team" style="...">
```

**Photo 12 - Team Culture** (around line 156)
```html
<!-- FIND THIS: -->
<img src="https://placehold.co/1000x400/000000/FF6633?text=GLAM+Global+Team+%7C+Building+Relationships" ...>

<!-- REPLACE WITH: -->
<img src="images/team-culture.jpg" alt="Team Network" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
```

---

#### **E. CONTACT PAGE (`contact.html`)**

**Photo 13 - Contact Banner** (around line 43)
```html
<!-- FIND THIS: -->
<img src="https://placehold.co/1000x350/000000/FF6633?text=Get+In+Touch+With+GLAM" ...>

<!-- REPLACE WITH: -->
<img src="images/contact-banner.jpg" alt="Contact Us" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
```

---

## 📐 Step 4: Image Size Recommendations

### Optimal Dimensions:

| Photo Type | Recommended Size | File Format | Max File Size |
|-----------|-----------------|-------------|---------------|
| Hero/Banner Images | 1200×400px | JPG | 200KB |
| Feature Images | 1000×500px | JPG | 150KB |
| Grid Images | 400×300px | JPG | 80KB |
| Journey Cards | 600×400px | JPG | 100KB |
| Team Photos | 1000×400px | JPG | 150KB |

### ⚡ How to Optimize Image Sizes:
1. Use **TinyPNG.com** or **Compressor.io** to compress images
2. Save as **JPG** (not PNG unless transparent background needed)
3. Keep file sizes under 200KB for fast loading

---

## 🎨 Photo Tips for Professional Look

### What Makes Photos Look Professional:
✅ **Consistent Lighting** - All photos should have similar brightness  
✅ **Similar Color Tone** - Warm or cool tones throughout  
✅ **High Resolution** - Sharp, not blurry or pixelated  
✅ **Professional Setting** - Clean backgrounds, no clutter  
✅ **Real People/Spaces** - Avoid generic stock photos  

### Avoid:
❌ Watermarked stock photos  
❌ Low resolution/pixelated images  
❌ Different color tones (some warm, some cool)  
❌ Overly posed or artificial-looking shots  

---

## 🖼️ Quick Visual Reference

Your folder structure should look like this:

```
GLAM WEBSITE/
├── images/                        ← CREATE THIS FOLDER
│   ├── glam-office.jpg           ← Photo 1: Office/Team
│   ├── partnership-meeting.jpg    ← Photo 2: Partnerships
│   ├── strategy-session.jpg       ← Photo 3: Strategy
│   ├── market-analysis.jpg        ← Photo 4: Market
│   ├── services-banner.jpg        ← Photo 5: Services
│   ├── brand-portfolio.jpg        ← Photo 6: Brands
│   ├── global-meetings.jpg        ← Photo 7: Meetings
│   ├── market-discovery.jpg       ← Photo 8: Discovery
│   ├── exhibitions.jpg            ← Photo 9: Events
│   ├── partner-visits.jpg         ← Photo 10: Partners
│   ├── team-photo.jpg             ← Photo 11: Team
│   ├── team-culture.jpg           ← Photo 12: Culture
│   └── contact-banner.jpg         ← Photo 13: Contact
├── index.html
├── services.html
├── brands.html
├── about.html
├── contact.html
├── styles.css
└── script.js
```

---

## ✅ Quick Checklist

- [ ] Create `images` folder
- [ ] Add all 13 photos to the folder
- [ ] Rename photos to match the guide
- [ ] Open each HTML file
- [ ] Replace placeholder URLs with `images/photo-name.jpg`
- [ ] Save all files
- [ ] Open `index.html` in browser to test
- [ ] Check that all images load correctly
- [ ] Verify images look good on mobile (resize browser)

---

## 🔧 Troubleshooting

### Problem: Images don't show up
**Solution:** Check that:
1. Folder is named exactly `images` (lowercase, no spaces)
2. Photo filenames match exactly (case-sensitive on some servers)
3. Path is `images/photo-name.jpg` (not `Images/` or `/images/`)

### Problem: Images are too large (slow loading)
**Solution:**
1. Compress images using TinyPNG.com
2. Reduce dimensions in photo editor
3. Save as JPG with 80% quality

### Problem: Images look stretched or squished
**Solution:** 
- Keep the `style="..."` attributes as they are
- The `object-fit: cover;` CSS handles cropping automatically

---

## 🎯 After Adding Photos

Once you've added all real photos:
1. The website will look **100% authentic and professional**
2. Your client will see **real brand identity**
3. No more "AI-generated" or generic template feel
4. Ready to deploy to hosting!

---

**Need Help?** Just ask and I can help you with specific image placement or create an automated script to replace all images at once! 📸✨
