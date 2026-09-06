# Landfairy Global Investment Ltd — Landing Page

Rebrand of the site from "vredezara" to **Landfairy Global Investment Ltd**,
based on the two company-profile PDFs supplied by the client.

## What changed

- **Copy & structure**: every section now reflects Landfairy's real
  services, work history, contact details, and CAC registration (RC
  8189342). Services grew from 3 to the client's actual 5 offerings.
  "Philosophy" became an About section built from the company's real
  Vision, Mission and Core Values.
- **Projects**: `project_showcase.tsx` now lists the real entries from the
  Work Experience table (Golden Park Estate, Adebambo Residence, Urban
  Homes, Mayfair Gardens Estate, Smith Hills Schools) plus Precious Estate,
  which appears in the portfolio photos but not the table. Categories are
  now Estate / Residential / Institutional.
- **Images**: extracted directly from the two PDFs with `pdfimages` and
  saved as compressed JPEGs under `public/images/`. See "Image sourcing"
  below for exactly which photo is used where.
- **Logo**: `public/logo.png`, `public/logo-mark.png`, `public/logo.svg`,
  `public/logo-mark.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png`
  and `public/favicon.ico` are now generated directly from the client's
  real logo (`logo.jpeg`), untouched — only resized/reformatted per file,
  never redrawn or recolored. The `.svg` files are the exact same raster
  artwork embedded inside an SVG container (not a vector redraw), so they
  render identically to the `.png` versions. Because the real logo is a
  dense, square badge (icon + "Landfairy Global" wordmark + tagline all
  in one image), `Navigation` and `Footer` now show it at a larger square
  size (64–80px) than a typical wide logo would need — small print like
  "Horticulture - Landscaping" won't be crisply legible at nav-bar scale,
  which is an inherent tradeoff of this logo's design, not a bug. If the
  client can supply a simplified icon-only or wordmark-only variant for
  small UI contexts, that would read better in the nav bar and favicon.
- **SEO**: `layout.tsx` now has a full metadata block (title template,
  description, keywords, Open Graph, Twitter card, canonical URL) plus a
  `LocalBusiness`/`HomeAndConstructionBusiness` JSON-LD block with the
  real address, phone, email and service list. Added `app/sitemap.ts` and
  `app/robots.ts` (Next.js special files — no extra packages needed).
  All of this assumes the production domain is `https://www.landfairy.com`
  (from the PDF's contact block) — update `SITE_URL` in `layout.tsx`,
  `sitemap.ts`, and `robots.ts` if that's not the final domain.

## Image sourcing (what's real vs. placeholder)

| File | Source | Used for |
|---|---|---|
| `portfolio/golden-park-estate-ajah.jpg` | PDF photo, captioned "Golden Park estate Ajah" | Golden Park Estate project card |
| `portfolio/precious-estate-ido-ibadan.jpg` | PDF photo, captioned "Precious estate, Ido, Ibadan" | Precious Estate project card |
| `portfolio/adebambo-residence-eleyele-ibadan.jpg` | PDF photo, captioned "Adebambo residence, Eleyele, Ibadan" | Adebambo Residence project card |
| `portfolio/urban-homes.jpg` | PDF photo (uncaptioned estate road, grouped near the Adebambo photos) | Urban Homes project card — illustrative, not a confirmed 1:1 match |
| `editorial/garden-walkway.jpg` | PDF photo carrying a small "LL" watermark — the one clearly Landfairy's own photography | About section image |
| `hero/hero-background.jpg` | PDF photo (unwatermarked, generic garden stock) | Hero background |

Two named projects — **Mayfair Gardens Estate** and **Smith Hills
Schools** — had no matching photo in either PDF, so their cards render an
honest "Photography coming soon" placeholder instead of a mismatched
image. Two other PDF images (a square perennial-border shot in each file)
were dropped as redundant, generic stock photography.

## A deliberate choice on Testimonials

The PDFs' "References" section lists three real people with phone
numbers, not written testimonial quotes. I didn't invent quotes and put
them in these real people's mouths — that would misrepresent them on a
live public site. Instead, `testimonials.tsx` is now an honest **References**
carousel showing name, organisation/position, and relationship (sourced
directly from the PDF), with a line noting full contact details are
shared with prospective clients on request. Their phone numbers are
intentionally **not** published on the site. If the client can get actual
written quotes from these (or other) clients, swap them back into
quote-card form.

## Data conflicts between the two PDFs

The two source PDFs disagree slightly (Golden Park Estate's year is 2019
in one and 2020 in the other; the RC registration date and business
activity list only appear in one). I used the more complete/detailed PDF
(`Landfairy_global_investment_ltd_profile...pdf`) as the source of truth
throughout. Worth double-checking these against the client's current
records before publishing.

## Install

```bash
npm install framer-motion react-icons nodemailer
npm install -D @types/nodemailer
```

Tailwind v4 and `next/font/google` ship with a standard Next.js 15
install already, matching your current project setup.

## Contact form (sends real email via Gmail SMTP)

`app/api/contact/route.ts` is a Next.js API route that sends the contact
form through Nodemailer over SMTP. `contact.tsx` posts to it and shows a
real loading/success/error state.

1. Copy `.env.example` to `.env.local` and fill in real values.
   `.env.local` is gitignored by default — **never commit it**.
2. `SMTP_PASS` must be a Gmail **App Password**, not the account's normal
   login password (Gmail SMTP rejects the regular password once 2-Step
   Verification is on, which it needs to be to generate an App Password
   in the first place). Generate one at
   [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   with 2-Step Verification enabled on `landfairyproperties@gmail.com`.
3. `CONTACT_TO_EMAIL` is optional — it's where submissions land. Leave it
   unset and it defaults to `SMTP_FROM_EMAIL`.
4. In production (Vercel, etc.), set the same variables in your hosting
   provider's environment variable settings — `.env.local` only works
   locally.
5. There's a hidden honeypot field (`company`) in the form for basic bot
   filtering — no extra dependency, just silently drops submissions that
   fill it in.

If you'd rather not run your own SMTP relay long-term (Gmail SMTP caps
around 500 sends/day and can have deliverability quirks), swapping the
`sendMail` call in `route.ts` for [Resend](https://resend.com) later is a
small, contained change — everything else stays the same.

## Before deploying

1. Logo is now the client's real file — no action needed unless you want
   a simplified icon-only variant for the nav bar/favicon (see note above).
2. Replace the Instagram/Facebook URLs in `footer.tsx` with the client's
   real profile links (currently placeholder `instagram.com` /
   `facebook.com`).
3. Confirm `SITE_URL` in `layout.tsx`, `sitemap.ts`, and `robots.ts`
   matches the real production domain.
4. Set the SMTP environment variables (see "Contact form" above) in your
   hosting provider's dashboard.
5. Higher-resolution photography for the hero background and project
   cards would help — the extracted PDF images are usable but modest
   cards would help — the extracted PDF images are usable but modest
   resolution (largest is ~1060px wide).
   