# Sea Star Villa — Website Redesign

A modern redesign of [seastarjamaica.com](https://www.seastarjamaica.com/) — the site for
Sea Star, an ultra-luxurious five-bedroom waterfront villa on the world-famous Blue Lagoon
strip in Port Antonio, Portland, Jamaica.

## What's here

A fast, dependency-free static site (plain HTML/CSS/JS — no build step):

All copy, room details, rates, testimonials and contact details were sourced from the
live site (and its public listings):

- **Hero** — full-screen, "Get away to paradise" tagline with availability CTA
- **The Villa** — intro and key stats (5 bedrooms, 12 guests, staff of 3, 10-guest whirlpool)
- **Rooms** — the five named bedrooms: Sand Dollar (master), Cool Breeze, Sea Surf,
  Sunrise and Paradise Cove, with real bed/bathroom configurations
- **Amenities** — sea deck & Tiki hut, 10-guest whirlpool, chef with 10-seat formal dining
  and candlelit outdoor dining, butler & housekeeper, kayaks & floats, A/C, WiFi,
  full kitchen, washer/dryer, BBQ, parking for five
- **Experiences** — Blue Lagoon, Monkey Island, Frenchman's Cove, Reach Falls,
  San San & Boston Beach, Somerset Falls
- **Guest book** — six real testimonials from the current site
- **Gallery** — six-tile masonry layout
- **Rates** — real rates: $1,500/night (Apr 15–Dec 14), $1,700/night (Dec 15–Apr 14),
  $13,000 Christmas/New Year's week (Dec 25–Jan 1), with minimum stays and house policies
- **Contact** — address (Blue Lagoon, Portland, Jamaica, W.I.), phone +1 (876) 383-8337,
  reservations@seastarjamaica.com, Facebook & Instagram, plus an enquiry form

Design: lagoon teal + warm sand + antique gold palette, Cormorant Garamond display type with
Jost body text, scroll-reveal animations (respects `prefers-reduced-motion`), sticky frosted
nav, fully responsive with a mobile menu.

## Run locally

No build needed — open `index.html` in a browser, or serve it:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Before going live

1. **Photos** — all imagery is currently tasteful gradient placeholders (the live site's photo
   downloads are blocked by its bot protection, so they couldn't be copied automatically).
   The originals live on the current site under `uploads/1/` (e.g. `uploads/1/1000.JPG` …
   `1160.JPG`) — copy them from the hosting account and set `background-image: url(...)` on
   the classes marked with "placeholder" comments in `css/style.css` (hero, room cards,
   experience cards, gallery tiles).
2. **Form backend** — the enquiry form currently uses `mailto:`; point it at a service like
   Formspree (or a small PHP handler on the existing SiteGround hosting) for reliable delivery.
3. **Rates** — dates/prices were taken from the live site's 2025–26 season table; update
   yearly as needed.

## Deploying

It's a static site — host it anywhere: GitHub Pages, Netlify, Cloudflare Pages, or upload
the files to the existing SiteGround hosting.
