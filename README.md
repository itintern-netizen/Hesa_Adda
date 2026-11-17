# Hesa Adda &mdash; Clickable Onboarding Prototype

A lightweight, high-fidelity clickable prototype of the **Hesa Adda** onboarding platform built using **plain HTML, CSS, and vanilla JavaScript**. No frameworks, no build tools, and no backend. Mock data is managed through vanilla JavaScript and persists in the browser via `localStorage`. The only external library used is **Leaflet (via CDN)** for interactive geospatial highway maps.

---

## 🎨 Design System: The Strict 3-Colour Palette

This prototype strictly follows the 3-colour palette rule across every single screen, component, and map element:

```css
:root {
  --yellow: #F2B705;  /* Primary buttons, highlights, active nav, warning SLA timer */
  --black:  #111111;  /* Headings, text, borders, dark cards, overdue SLA timer, approved badge */
  --white:  #FFFFFF;  /* Page background, clean cards, rejected badge */
}
```

* **Fonts (Google Fonts):**
  * Headings, brand wordmark, big numbers, buttons: **"Bricolage Grotesque"** (600, 700, 800)
  * Body, forms, tables: **"Inter"** (400, 500, 600)
  * Type scale with clamp: `H1 clamp(2.75rem, 6vw, 5rem)`, `H2 clamp(2rem, 4vw, 3rem)`, `body 1.0625rem`.
* **Degree Symbol:** Key headings feature the trademark yellow degree symbol: `<span class="deg-sym">°</span>`.
* **Zero Other Colours:** No grey, no red, no green, no blue anywhere.
* **Component Styling:**
  * **Buttons:** 48px height, 8px radius, 2px black border, hard 4px 4px 0 #111 offset shadow on hover with slight translate.
  * **Cards:** 2px black border, 12px radius, hard offset shadow on hover. On black sections: black with 2px yellow border.
  * **Badges & Pills:** Fully rounded (`border-radius: 9999px`), 12px uppercase text, 600 weight.
* **Marquee & Bento:** Full-width CSS infinite scroll marquee strip and bento-style revenue streams grid.
* **48-Hour SLA Timer:**
  * **Normal (>12 hrs left):** White background, black text, black border
  * **Warning (<12 hrs left):** Yellow background, black text
  * **Overdue (>48 hrs):** Black background, white text

---

## 🔐 Robust Hesaathi Session & Login Flow

The authentication flow is completely resilient and free of dead ends:
1. **Mobile Number Step:** Accepts any 10-digit number.
2. **Instant Demo OTP:** Generates a random 6-digit OTP on screen (e.g. `Demo OTP: 482913`), auto-fills the field, and allows immediate resend. Accepts the generated OTP **or ANY 6-digit number** so testing is never blocked.
3. **Smart Session Routing:**
   * **New User:** Prompts a short step for Full Name, Village, and Preferred Language &rarr; opens `apply.html`.
   * **Returning User:** Directly logs in &rarr; resumes draft in `apply.html` or views active application in `status.html`.
4. **Session Storage:** Users stored under `hesa_users`, active session under `hesa_session`. Safe `try/catch` fallbacks prevent blank pages or corrupted states.
5. **Log Out & Reset Demo:** Log out clears only the session; the global footer button **"Reset demo data"** restores initial mock data cleanly.

---

## 📁 File Structure

```
/
├── index.html                 (Landing page with Hero SVG, Marquee, Bento & Roadmap)
├── register.html              (Hesaathi registration with random on-screen OTP & session restore)
├── apply.html                 (4-section application with Leaflet pin drop & draft auto-save)
├── status.html                (Live 48-hour tracker & status state handler)
├── css/
│   └── style.css              (Shared 3-color neo-brutalist stylesheet)
├── js/
│   ├── data.js                (12 sample applications + 3 approved Addas + scoring algorithm)
│   └── app.js                 (LocalStorage repository, session engine, 48h timer ticker)
├── admin/
│   ├── dashboard.html         (Desktop metrics, div bar chart & SLA queue)
│   ├── applications.html      (Applications directory with instant search & filter)
│   ├── application.html       (Detail view: Leaflet street/satellite map, score breakdown, decision)
│   ├── map.html               (Full-screen highway corridor map with layer toggle)
│   └── addas.html             (Approved Addas list with unit setup progress)
├── manager/
│   └── visits.html            (Manager 48h ground inspection checklist & report submission)
└── README.md
```

---

## 🚀 How to Demo the Complete Flow

Open [index.html](index.html) in any modern browser. Use the top **"View As"** bar to jump between roles at any time.

1. **Hesaathi Registration & Application:**
   * Open [index.html](index.html) &rarr; click **"Apply now"**.
   * On [register.html](register.html), type a 10-digit number (e.g. `9848012345`), click **"Send OTP"**.
   * Note the generated demo OTP displayed in the yellow box (auto-filled in the field). Press Enter or click **"Verify & Continue"**.
   * Complete the 4-step wizard with map pin-drop on [apply.html](apply.html) &rarr; land on [status.html](status.html) with the live 48-hour timer.
2. **Manager Ground Visit:**
   * Switch to **Manager** &rarr; open [manager/visits.html](manager/visits.html) &rarr; click a pending visit &rarr; complete the 6-point checklist & submit report.
3. **Admin Review & Approval:**
   * Switch to **Admin** &rarr; inspect [admin/dashboard.html](admin/dashboard.html) and [admin/applications.html](admin/applications.html).
   * Open [admin/application.html](admin/application.html) &rarr; toggle street/satellite map layers &rarr; click yellow **"Approve Application"** to allocate an Adda ID.
   * View the newly deployed unit in [admin/addas.html](admin/addas.html).
