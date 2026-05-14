# Nguyen Trong Bach — Portfolio Website

Personal academic and career portfolio for **Nguyen Trong Bach**, an ICT undergraduate at the
University of Science and Technology of Hanoi (USTH), focused on Computer Vision and Applied AI.

**Live site (after deployment):** https://jecxk.github.io/

---

## Tech stack & why

The site is built with **plain HTML, CSS, and JavaScript** — no framework, no build step.

Why this option (over React + Vite + Tailwind):

- **Zero-build deploy on GitHub Pages.** GitHub Pages serves static files directly; with this stack
  the repo *is* the deploy. No `npm install`, no `vite build`, no GitHub Actions to maintain.
- **No toolchain drift.** A vanilla site keeps working for years without dependency updates,
  Node version upgrades, or framework migrations. That matters for a long-lived profile site.
- **Faster first paint.** No JS bundle to download before the page renders.
- **Easier to edit later.** Update text or links by editing `index.html` directly — no rebuild.

The only external dependencies are Google Fonts (Inter + JetBrains Mono), loaded over the public CDN.

---

## Folder structure

```
Web_profile_Bach/
├── index.html                  # Full site — all sections live here
├── css/
│   └── styles.css              # All styling (theme, layout, responsive, animations)
├── js/
│   └── main.js                 # Mobile nav, scroll state, reveal-on-scroll
├── assets/
│   ├── favicon.svg             # "NB" monogram favicon
│   └── Nguyen_Trong_Bach_CV.pdf  # ← Place your CV PDF here (see below)
├── .nojekyll                   # Tells GitHub Pages to skip Jekyll processing
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Run locally

Because everything is static, you can just open the file — but a tiny local server is recommended
so relative paths and `fetch`-style behavior match production.

### Option 1 — Open directly
Double-click `index.html`. It will open in your default browser.

### Option 2 — Python (recommended)
```bash
# from the project folder
python -m http.server 5500
```
Then open <http://localhost:5500/>.

### Option 3 — VS Code Live Server
Install the *Live Server* extension and right-click `index.html` → **Open with Live Server**.

There is **no build step**. Edit, save, refresh.

---

## Add your CV PDF

The "Download CV" buttons and the navbar link to:

```
assets/Nguyen_Trong_Bach_CV.pdf
```

Place your CV at exactly that path and the buttons will work. If you rename the file, also update
the two `href` attributes in `index.html` (search for `Nguyen_Trong_Bach_CV.pdf`).

> Tip: keep the filename consistent so external links you've already shared keep working.

---

## Deploy for free on GitHub Pages

You want the site live at **https://jecxk.github.io/**. That URL is reserved for a special repo
named exactly `jecxk.github.io` (your *user site*). Follow these steps.

### Step 1 — Create the repository
1. Sign in to GitHub as **jecxk**.
2. Click **New repository**.
3. Repository name: `jecxk.github.io` (exactly this, all lowercase).
4. Visibility: **Public**.
5. Do **not** initialize with a README — your local folder already has one.
6. Click **Create repository**.

### Step 2 — Push the project
From a terminal in the `Web_profile_Bach` folder:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/jecxk/jecxk.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `(root)`
3. Click **Save**.
4. Wait ~30–60 seconds. The site will be live at <https://jecxk.github.io/>.

The `.nojekyll` file in the repo prevents GitHub from running Jekyll, so all files (including any
starting with `_`) are served as-is.

### Step 4 — Verify
- Open <https://jecxk.github.io/> in a private window.
- Check that the Download CV button serves your PDF (after you add it).
- Test all project links and the email link.

---

## Update content later

Everything is in **`index.html`** and reads top-to-bottom in the same order as the page.

| To update…                | Edit…                                                                 |
| ------------------------- | --------------------------------------------------------------------- |
| Hero text / headline      | `<section class="hero">` in `index.html`                              |
| About paragraph           | `<section id="about">` in `index.html`                                |
| Education / GPA           | `<section id="education">` in `index.html`                            |
| Master's program info     | `<section id="masters">` in `index.html`                              |
| Research interests        | `<section id="interests">` in `index.html`                            |
| Skills                    | `<section id="skills">` in `index.html`                               |
| **Add a new project**     | Copy any `<article class="project-card">` block in `#projects` and edit |
| Coursework                | `<section id="coursework">` in `index.html`                           |
| Experience / Activities   | `<section id="experience">` and `<section id="activities">`           |
| Contact / LinkedIn        | `<section id="contact">` (replace "To be updated" with your URL)      |
| Theme colors              | `:root` variables at the top of `css/styles.css`                      |
| CV file                   | Replace `assets/Nguyen_Trong_Bach_CV.pdf`                             |

After editing, commit and push:

```bash
git add .
git commit -m "Update projects"
git push
```

GitHub Pages will redeploy automatically in under a minute.

---

## Building (optional)

There is no build step. The repo ships exactly what is served. If you ever want to minify CSS/JS
later you can do so manually, but it's unnecessary for a site this size — the page is already small.

---

## Long-term stability

- **No paid services.** Hosting is GitHub Pages (free for public repos). No backend, no database,
  no Supabase, no Firebase.
- **Contact form** uses a `mailto:` link — no server, no spam farm, no expiring API key.
- **Fonts** are loaded from Google Fonts; if Google Fonts is ever blocked, the site falls back to
  system fonts via the `font-family` chain in `styles.css`.
- **No tracking, no analytics** unless you add them.

---

## License

The source for this site is personal work by Nguyen Trong Bach. You're free to read it for
reference; please don't republish the personal content as your own.

---

## Contact

- **Email:** [Bachnt.23BI14057@usth.edu.vn](mailto:Bachnt.23BI14057@usth.edu.vn)
- **GitHub:** [github.com/jecxk](https://github.com/jecxk)
- **LeetCode:** [leetcode.com/u/jexck_](https://leetcode.com/u/jexck_/)
- **Location:** Hanoi, Vietnam
