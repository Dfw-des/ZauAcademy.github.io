Project reorganized into `public/` and `public/assets/` for easier local serving.

How to preview locally

- Serve the `public/` directory on port 8000:

```bash
python3 -m http.server 8000 --directory public
# then open http://localhost:8000 in your browser
```

Where files are now
- `public/` — all HTML pages (index.html, about.html, contact.html, etc.)
- `public/assets/css/` — `style.css` and `form.css` (styles used by pages)
- `public/assets/js/` — `Mobile.js` (client JS)
- `images/` — image assets remain at repo root and are referenced by pages via `../images/...`.
- `api/` — serverless functions remain at repo root for Vercel/Netlify style deployment.

Notes:
- If you prefer images inside `public/`, I can copy them into `public/images/` and update references.
- To deploy to Vercel, move the HTML files back to repo root or adjust your build to serve `public/` as static files; the `api/` folder at repo root will be used by Vercel functions.
