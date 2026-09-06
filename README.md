# ATELIER — AI Interior & Building Design

A redesigned continuation of the previous Phase 2/3 project with a cinematic, agency-style ATELIER landing page.

## What was retained
- Existing React/Vite client
- Existing Express/MongoDB server
- Existing authentication flow
- Existing project CRUD and dashboard
- Existing project details flow
- Existing environment structure

## New in this version
- Cinematic ATELIER opening sequence
- Large editorial typography
- Architectural/AI visual treatment
- Animated blueprint drawing
- Scroll reveal animations
- Project showcase
- Capabilities section
- Process section
- Responsive mobile layout
- Reduced-motion accessibility support

## Run

### Client
```bash
cd client
npm install
npm run dev
```

### Server
```bash
cd server
npm install
npm run dev
```

Copy `.env.example` to `.env` and use the same values from your working Phase 2 setup.

## Note
The landing page is intentionally original: it takes inspiration from premium design-agency pacing and typography, while using ATELIER's own content, structure, visuals and branding.

### Landing imagery
The landing page uses remote Unsplash images that are marked free to use under the Unsplash License on their source pages. If you prefer fully local assets, download those images into `client/public/images` and change the `src` paths in `LandingPage.jsx`.
