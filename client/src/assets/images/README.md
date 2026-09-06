# Adding your own real photos to the landing page

The landing page currently uses safe, dependency-free CSS-drawn illustrations
(no external images) for the hero room and the three project cards. This
guarantees nothing ever breaks or shows a broken-image icon.

If you want to swap in real photos, follow these steps exactly - this uses
**local files**, not hotlinked URLs, so it can never 404 during a demo.

## 1. Get real images
Download (don't hotlink) 4 images you like from a free stock site such as
https://unsplash.com or https://pexels.com:
- one interior/living-room shot -> save as `hero-room.jpg`
- one residential/villa exterior -> save as `project-villa.jpg`
- one modern house exterior -> save as `project-house.jpg`
- one office/workspace interior -> save as `project-studio.jpg`

Put all 4 files directly in this folder: `client/src/assets/images/`.

## 2. Import them in LandingPage.jsx
At the top of `client/src/pages/LandingPage.jsx`, add:

```jsx
import heroRoomImg from '../assets/images/hero-room.jpg';
import villaImg from '../assets/images/project-villa.jpg';
import houseImg from '../assets/images/project-house.jpg';
import studioImg from '../assets/images/project-studio.jpg';
```

## 3. Update the projects array
Replace the `projects` array with:

```jsx
const projects = [
  { title: 'Casa No. 07', type: 'Residential / Interior', image: villaImg },
  { title: 'Northline House', type: 'Architecture / Exterior', image: houseImg },
  { title: 'Monument Studio', type: 'Commercial / Workspace', image: studioImg },
];
```

## 4. Update the project card markup
In the `project-grid` map, replace the illustrated `<div>`s with:

```jsx
<div className="project-image">
  <img src={project.image} alt="" className="project-image__photo" loading="lazy" />
  <div className="project-image__shade" />
  <span className="project-image__tag">{String(index + 1).padStart(2, '0')}</span>
</div>
```

You'll also need to add back `.project-image__photo` and `.project-image__shade`
CSS rules (ask me and I'll write them for the exact photo dimensions you use).

## 5. Update RoomVisual
Replace the `<div className="room-visual">` contents with:

```jsx
<div className="room-visual" aria-hidden="true">
  <img className="room-visual__photo" src={heroRoomImg} alt="" />
  <div className="room-visual__wall" />
  <div className="room-visual__glow" />
  <div className="room-visual__caption">
    <span>AI INTERIOR</span>
    <strong>Concept 04</strong>
  </div>
</div>
```

Because these are **imported local files** (not URLs), Vite bundles them at
build time - there's no network request, no possibility of a 404, and it
works identically offline or on stage at a demo.
