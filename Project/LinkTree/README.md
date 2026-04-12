# 🌐 Link Tree

A clean, modern, and responsive **Link Tree profile page** built with HTML, CSS, and JavaScript. It lets you organize and share all your important links in one place — perfect as a digital visiting card.

---

## ✨ Features

* 📱 Fully responsive (mobile, tablet, desktop)
* 👤 Profile section (avatar, bio, quick stats)
* 🔗 Beautiful link cards with icons & descriptions
* ⚡ Dynamic link loading from `links.json` (no HTML editing needed)
* 📷 QR code generation with SVG download
* 🖨️ Printable QR for business cards, posters, and more

---

## 📁 Project Structure

```text
LinkTree/
├── index.html      # Main HTML file
├── style.css       # Styling
├── script.js       # Logic (links + QR code)
├── links.json      # Your links data
└── img/            # Icons and images
```

---

## 📸 Screenshots

### 🔹 Preview 

<p align="center">
  <img src="img/@Screenshot1.png" width="250" />
  <img src="img/@Screenshot2.png" width="250" />
</p>

## ➕ How to Add a New Link

1. Open **`links.json`**
2. Add a new object like this:

```json
{
  "Name": "Facebook",
  "description": "Follow updates and posts",
  "URL": "https://facebook.com/yourprofile",
  "Icon": "img/facebook.svg"
}
```

3. Add it inside the array:

```json
[
  {
    "Name": "Facebook",
    "description": "Follow updates and posts",
    "URL": "https://facebook.com/yourprofile",
    "Icon": "img/facebook.svg"
  },
  {
    "Name": "LinkedIn",
    "description": "Professional profile",
    "URL": "https://linkedin.com/in/yourprofile",
    "Icon": "img/linkedin.svg"
  }
]
```

4. Save the file
5. Refresh your browser — done ✅

> ⚠️ Make sure the icon file exists in the `img/` folder or update the path.

---

## 📷 QR Code Feature

* Automatically generates a QR code for your page
* Download as **SVG** (high quality for printing)
* Perfect for:

  * Business cards
  * Posters
  * Stickers
  * Event badges

👉 When scanned, it opens your Link Tree instantly.

---

## 🚀 Going Live

### 🔧 Run Locally (Recommended)

```bash
python3 -m http.server 8000
```

Then open:
👉 http://localhost:8000

---

### 🌍 Deploy Online

You can host it easily on:

* GitHub Pages
* Netlify
* Vercel

After deployment:

1. Copy your live URL
2. Generate QR code
3. Print & share 🚀

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* JSON

---

## 💡 Tips

* No need to edit HTML — just update `links.json`
* Keep icons optimized (SVG preferred)
* Use short descriptions for better UI
* Test responsiveness on mobile

---

## 📌 Future Ideas (Optional Improvements)

* Dark / Light mode toggle 🌙
* Analytics (click tracking)
* Theme customization
* Drag & reorder links
* Social share buttons

---

## 📄 License

This project is open-source and free to use.

---

## ❤️ Support

If you like this project, consider giving it a ⭐ on GitHub!
