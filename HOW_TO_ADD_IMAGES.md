# 🖼️ How to Add Your Images - Simple Guide

## Step 1: Create the Images Folder

1. Open File Explorer
2. Go to: `C:\Users\yashp\OneDrive\Desktop\GLAM WEBSITE`
3. Right-click → New → Folder
4. Name it: **`images`** (lowercase, no spaces)

## Step 2: Add Your Photos

Copy all your photos into the `images` folder. You can name them whatever you want for now.

## Step 3: Update the HTML Files

The current design has **placeholder boxes**. You need to add `<img>` tags inside them.

### Example - How It Looks Now (BEFORE):

```html
<figure class="ph r-219" role="img" aria-label="Image placeholder — global brand partnership" style="margin-top:clamp(3rem,6vw,4.5rem)" data-reveal>
  <span class="ph-tag">Image &mdash; Brand Partnership</span>
</figure>
```

### How It Should Look (AFTER):

```html
<figure class="ph r-219" role="img" aria-label="Image placeholder — global brand partnership" style="margin-top:clamp(3rem,6vw,4.5rem)" data-reveal>
  <img src="images/your-photo-name.jpg" alt="Brand Partnership">
</figure>
```

**What changed:** 
- Added `<img src="images/your-photo-name.jpg" alt="Brand Partnership">` 
- Removed the `<span class="ph-tag">` line (you don't need it anymore)

---

## 📍 Where to Find Image Placeholders

### **HOME PAGE (index.html)** - Line 98-100

**FIND THIS:**
```html
<figure class="ph r-219" role="img" aria-label="Image placeholder — global brand partnership" style="margin-top:clamp(3rem,6vw,4.5rem)" data-reveal>
  <span class="ph-tag">Image &mdash; Brand Partnership</span>
</figure>
```

**REPLACE WITH:**
```html
<figure class="ph r-219" role="img" aria-label="Image placeholder — global brand partnership" style="margin-top:clamp(3rem,6vw,4.5rem)" data-reveal>
  <img src="images/office-team.jpg" alt="GLAM Office and Team">
</figure>
```

---

### **SERVICES PAGE (services.html)** - Lines 98-100, 111-113, 124-126, etc.

Each service has a placeholder image. Search for `<figure class="ph"` and add `<img>` tags inside.

**Example:**
```html
<figure class="ph r-43" role="img" aria-label="Image placeholder — brand product" data-reveal>
  <img src="images/brand-licensing.jpg" alt="Brand Licensing">
</figure>
```

---

### **ABOUT PAGE (about.html)** - Lines 126-128, 138-140, 150-152, etc.

The "journey" section has 5 image slots.

**Example:**
```html
<figure class="ph r-32" role="img" aria-label="Image placeholder — global meeting" data-reveal>
  <img src="images/global-meeting.jpg" alt="Global Brand Meeting">
</figure>
```

---

### **BRANDS PAGE (brands.html)** 

This page doesn't have photo placeholders - it just lists brand names. You can skip this page or add a banner image at the top if you want.

---

### **CONTACT PAGE (contact.html)**

No image placeholders on this page either.

---

## 🔍 Quick Way to Find All Placeholders

1. Open any HTML file in Notepad or VS Code
2. Press `Ctrl + F` (Find)
3. Search for: `<figure class="ph`
4. This will highlight every image placeholder
5. Add your `<img>` tag inside each `<figure>` you find

---

## ✅ Final Checklist

- [ ] Created `images` folder in GLAM WEBSITE directory
- [ ] Copied all your photos into the `images` folder
- [ ] Opened `index.html` in Notepad/VS Code
- [ ] Found all `<figure class="ph"` tags
- [ ] Added `<img src="images/photo-name.jpg" alt="Description">` inside each figure
- [ ] Removed the `<span class="ph-tag">` lines
- [ ] Saved the file
- [ ] Opened `index.html` in browser to check

---

## 💡 Pro Tip

**Don't want to edit HTML manually?** 

I can create a version of the HTML files with all the image tags already added. Just tell me:
1. How many photos you have
2. What you want to name them (e.g., photo1.jpg, photo2.jpg, team.jpg, office.jpg, etc.)

And I'll update all the HTML files for you automatically!

---

**Need help?** Just ask and I'll walk you through it step by step! 🚀
