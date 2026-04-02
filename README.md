# Ideal Institute of Technology — Website

> A modern, high-converting website for [Ideal Institute of Technology](https://iitnj.edu), a nonprofit 501(c)(3) career school in Pleasantville, NJ.

🔗 **Live Site:** [shubhangi-srivastava.github.io/iitnj-website](https://shubhangi-srivastava.github.io/iitnj-website/)

![Dark Navy Theme](https://img.shields.io/badge/theme-dark%20navy-0a1628) ![Vanilla JS](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-gold) ![Tests](https://img.shields.io/badge/tests-69%20passing-brightgreen)

---

## ✨ Features

### Design & UX
- **Dark navy + gold** color scheme — premium, institutional feel
- **Cursor glow** — radial gradient follows mouse movement
- **Film grain overlay** — subtle SVG noise texture
- **Scroll progress bar** — gold gradient tracks page scroll
- **3D card tilt** — perspective transforms on hover (pillar cards)
- **Smooth scroll** — anchor links with eased scrolling
- **Mobile-first responsive** — breakpoints at 1024px, 768px, 480px

### Sections (20+)
| Section | Layout Style |
|---------|-------------|
| Hero | Animated word reveal + rotating career paths + floating orbs |
| Mega Stats | Scramble counter animation (500+, 10+, 15+, 6) |
| Partners | Accreditation logo strip |
| About | Editorial split (text + image) + 4 numbered pillars |
| Programs | Filter tabs + sidebar-icon cards (16 programs) |
| Earn While You Learn | Philosophy section + 6 enterprise grid + info cards |
| Campus Gallery | Bento mosaic grid with hover effects |
| Social Enterprises | Compact 2-column list (8 student-run businesses) |
| Meet the Team | Horizontal scroll strip (15 team members) |
| News & Events | Featured article with bg image + 4 side stack |
| Reviews | Pull quote + dual infinite marquee (12 real Google reviews) |
| FAQ | Accordion with smooth expand/collapse (6 questions) |
| Financial Aid | Aid options list + spinning border CTA box |
| How to Apply | 3-step visual flow |
| Contact | Info + enrollment form with program dropdown |

### Conversion Features
- 🔥 **Top urgency banner** — "Spring 2026 Enrollment Open — Limited Spots"
- 📋 **Lead capture popup** — appears after 2 min with email capture
- 📞 **Click-to-call** — phone link under contact form
- 📍 **Google Maps** — directions link in footer
- ⬆️ **Back to top** — floating button on scroll
- 💬 **Hero reassurance** — "No experience needed · Financial aid available"

## 🛠 Tech Stack

**Zero dependencies** — single `index.html` file with all CSS & JS inline.

| Technology | Usage |
|-----------|-------|
| HTML5 | Semantic structure |
| CSS3 | Custom properties, Grid, Flexbox, Glassmorphism, Keyframe animations |
| Vanilla JavaScript | Intersection Observer, scroll events, DOM manipulation |
| Google Fonts | Space Grotesk (headings) + Inter (body) |

### CSS Techniques
- CSS Custom Properties (`:root` theme system)
- CSS Grid (bento gallery, programs, pillars, enterprise list)
- Glassmorphism (`backdrop-filter: blur`)
- Gradient text (`background-clip: text`)
- Conic gradient border animation
- Film grain (SVG `feTurbulence`)
- Infinite marquee (CSS `@keyframes`)
- Scroll-snap (team strip, gallery)

### JS Techniques
- Intersection Observer (scroll reveals, counter trigger)
- Scramble counter (random → settle animation)
- Cursor glow (`mousemove` radial gradient)
- 3D tilt (`perspective` + `rotateX/Y`)
- FAQ accordion (`max-height` transition)
- Program filter tabs (`classList.toggle`)
- Timed popup (`setTimeout` + `sessionStorage`)
- Top banner scroll-away

## 🧪 Testing

**69 tests** across 11 Playwright spec files:

```bash
# Install test dependencies
npm install
npx playwright install chromium

# Start local server
npx serve . -p 8181 &

# Run tests
npx playwright test --reporter=html
```

| Test Suite | Tests | Coverage |
|-----------|-------|---------|
| Navigation | 5 | Nav links, scroll, hamburger, anchors |
| Hero | 5 | Headline, badge, CTAs, social proof |
| Programs | 6 | 16 cards, filter tabs, Spanish note |
| Reviews | 5 | Pull quote, marquees, Google badge |
| FAQ | 5 | Open/close, single-open, toggle |
| Contact Form | 5 | Validation, submission, fields |
| Accessibility | 5 | Alt text, labels, meta tags |
| Layout | 7 | Banner, footer, progress bar, links |
| All Sections | 10 | Every section renders correctly |
| Popup | 6 | Timing, close, email, submit |
| Negative | 10 | Console errors, invalid inputs, broken images, rapid clicks, extreme viewports |

## 🚀 Deployment

Hosted on **GitHub Pages** with automatic deploys via GitHub Actions.

Every `git push` to `main` triggers a deploy workflow.

```bash
# Make changes
edit index.html

# Push to deploy
git add . && git commit -m "Update" && git push
```

Site updates in ~1 minute.

## 📁 Project Structure

```
iitnj-website-html/
├── index.html              # The entire website (single file)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deploy workflow
├── tests/                  # Playwright test suite (11 files)
│   ├── navigation.spec.ts
│   ├── hero.spec.ts
│   ├── programs.spec.ts
│   ├── reviews.spec.ts
│   ├── faq.spec.ts
│   ├── contact-form.spec.ts
│   ├── accessibility.spec.ts
│   ├── layout.spec.ts
│   ├── sections.spec.ts
│   ├── popup.spec.ts
│   └── negative.spec.ts
├── playwright.config.ts
├── .gitignore
└── README.md
```

## 📄 About the Business

**Ideal Institute of Technology** is a nonprofit 501(c)(3) career school in Pleasantville, NJ dedicated to transforming lives through education.

- 📍 1000 West Washington Ave, Pleasantville, NJ 08232
- 📞 (609) 495-1700
- ✉️ admissions@iitnj.edu
- 🌐 [iitnj.edu](https://iitnj.edu)

**Programs:** IT, Construction Trades, Entrepreneurship, Creative Arts
**Philosophy:** "Earn While You Learn" — students work in 6 real enterprises while studying

---

Built with ❤️ by [Shubhangi Srivastava](https://github.com/Shubhangi-Srivastava)
