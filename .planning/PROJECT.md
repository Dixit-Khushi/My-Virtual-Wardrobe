# My Virtual Wardrobe

## What This Is

A **gravity-defying 3D Virtual Wardrobe** web app built with React + React Three Fiber.
Users enter a fully immersive 3D closet environment, view a styled avatar in the center,
browse clothes on 3D racks, drag items onto the avatar, build outfit collections, and
sign in with Google to persist their wardrobe across sessions.

## Core Value

Make getting dressed feel like playing in a luxury showroom — no flat images, no scroll lists.
A living 3D space that makes fashion discovery joyful and personal.

## Stack

- **Framework:** React 18 + Vite
- **3D Engine:** React Three Fiber (R3F) + @react-three/drei
- **Styling:** Tailwind CSS (overlaid on canvas for UI chrome)
- **Auth:** Firebase Authentication (Google Sign-In + Guest mode)
- **State:** Zustand
- **Drag-and-Drop:** @dnd-kit/core + Three.js DragControls
- **3D Assets:** GLTF/GLB avatar from Ready Player Me; procedural clothing cards

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page with glassmorphism sign-in card + Google OAuth + Guest mode
- [ ] 3D closet scene with wooden shelving environment (sides + back wall)
- [ ] Centered female avatar on platform with 360° orbit controls
- [ ] 3D clothing racks with category tabs (Tops, Bottoms, Shoes, Accessories)
- [ ] Clickable clothing items (cards + hanging items) on racks
- [ ] Drag-and-drop to try items on the avatar
- [ ] Floating "+" button → file uploader → adds new card to rack
- [ ] Right-side outfit drawer ("Saved Looks" panel)
- [ ] Neon/holographic background effect behind avatar
- [ ] Share and duplicate action buttons (top-right)
- [ ] Mobile-responsive layout

### Out of Scope (v1)

- Real AI image segmentation — placeholder card images used
- Backend API / database — Firebase only for auth; Firestore for look persistence in v2
- Physical simulation of cloth draping

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React Three Fiber over vanilla Three.js | JSX component model, better ecosystem, hooks | — Pending |
| Vite over CRA | Speed, modern ESM, no eject | — Pending |
| Tailwind for UI chrome | Utility-first overlaid on canvas, not fighting 3D | — Pending |
| Firebase Auth | Fastest Google OAuth, free tier generous | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-04-06 after initialization*
