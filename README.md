# Sea Star Villa — Website Redesign

A modern redesign of [seastarjamaica.com](https://www.seastarjamaica.com/) — the site for
Sea Star, an ultra-luxurious five-bedroom waterfront villa on the world-famous Blue Lagoon
strip in Port Antonio, Portland, Jamaica.

## What's here

A fast, dependency-free static site (plain HTML/CSS/JS — no build step):

- **Hero** — full-screen, with availability CTA
- **The Villa** — intro and key stats (5 bedrooms, 12 guests, staff of 3, 10-guest whirlpool)
- **Rooms** — all five bedrooms with bed configurations and features
- **Amenities** — sea deck, Tiki hut, whirlpool, chef/butler/housekeeper, kayaks, BBQ, parking
- **Experiences** — Blue Lagoon, Rio Grande rafting, San San Beach, Reach Falls
- **Gallery** — six-tile masonry layout
- **Rates** — low/high season minimum stays (4–5 and 7 nights)
- **Contact** — enquiry form with dates and party size

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

1. **Photos** — all imagery is currently tasteful gradient placeholders. Swap in real villa
   photography by setting `background-image: url(...)` on the classes marked with
   "placeholder" comments in `css/style.css` (hero, room cards, experience cards, gallery tiles).
2. **Contact details** — the email `bookings@seastarjamaica.com` is a placeholder; replace it
   in `index.html` (contact section and form `action`) with the villa's real booking email
   and add a phone/WhatsApp number. For a proper form backend, point the form at a service
   like Formspree instead of `mailto:`.
3. **Rates** — add actual nightly rates to the rate cards if desired.

## Deploying

It's a static site — host it anywhere: GitHub Pages, Netlify, Cloudflare Pages, or upload
the files to the existing SiteGround hosting.
