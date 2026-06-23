# Jamaica Rose Lumauig Portfolio

A responsive personal portfolio website for Jamaica Rose Lumauig, a mobile application developer focused on Flutter, Android, Kotlin, Firebase, and REST API integrations.

## Overview

This portfolio presents:

- A dark futuristic visual style with grid background and purple glow accents
- A homepage hero with branded artwork and developer summary
- A projects page with clickable project cards and a screenshot modal
- An experience page with a career timeline
- An about/contact page with biography and contact details

## Pages

- `index.html` - homepage and featured work
- `projects.html` - project showcase and detail modal
- `experience.html` - work history and timeline
- `about.html` - background, contact links, and current role

## Assets

The site uses local branding and illustration assets from the `assets/` folder:

- `assets/logo.png`
- `assets/navlogo.png`
- `assets/jam.png`
- `assets/vcast.png`
- `assets/kchat.png`
- `assets/jamils.png`
- `assets/cook.png`
- `assets/note.png`

## Features

- Responsive layout for desktop and mobile
- Animated hero section
- Sticky navigation with branded logo
- Interactive project detail modal
- Screenshot support for both local assets and remote image links
- Scroll reveal and subtle motion effects

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Running Locally

This is a static site, so you can open `index.html` directly in a browser.

If you prefer to serve it locally:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Customization

Common places to update content:

- `index.html` - hero copy and featured sections
- `projects.html` - project cards and labels
- `about.html` - biography and contact info
- `experience.html` - career timeline
- `script.js` - project modal data and screenshot sources
- `style.css` - colors, layout, spacing, and animations

## Notes

- Some project screenshots use external image URLs.
- You can swap any screenshot in `script.js` with a local file in `assets/` if you want the portfolio to be fully self-contained.

