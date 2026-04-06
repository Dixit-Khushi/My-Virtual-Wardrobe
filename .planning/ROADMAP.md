# ROADMAP — My Virtual Wardrobe

## Milestone 1: 3D Virtual Wardrobe MVP

### Phase 1 — Project Scaffold & Design System
**Goal:** Vite+React+Tailwind running; global design tokens, fonts, color palette set.
- 1.1 Init Vite React project, install all dependencies
- 1.2 Configure Tailwind with custom design tokens (palette, fonts, shadows)
- 1.3 Set up folder structure: components/, scenes/, store/, hooks/, assets/

### Phase 2 — Landing & Auth Page
**Goal:** Glassmorphism landing page with Google Sign-In + Guest mode entry.
- 2.1 Landing page layout with full-screen gradient background
- 2.2 Glassmorphism auth card (sign-in + guest mode buttons)
- 2.3 Firebase Auth integration (Google provider)
- 2.4 Animated transition into 3D scene on auth success

### Phase 3 — 3D Closet Environment
**Goal:** Immersive 3D room with shelving, lighting, platform, neon back wall.
- 3.1 R3F canvas + camera + OrbitControls setup
- 3.2 Wooden shelving units (left/right walls using procedural BoxGeometry)
- 3.3 Back wall holographic/neon glow effect (shader/mesh + post-processing)
- 3.4 Floor platform + lighting rig (ambient + key + fill + rim)

### Phase 4 — Avatar Integration
**Goal:** 3D mannequin/avatar in scene center with idle animation and orbit.
- 4.1 Load GLTF avatar (fallback procedural mannequin if no asset)
- 4.2 AnimationMixer idle loop
- 4.3 Avatar spotlight & shadow

### Phase 5 — Clothing Rack System
**Goal:** 3D clothing cards on racks, category tabs, click-to-detail.
- 5.1 Category tab UI (Tops/Bottoms/Shoes/Accessories)
- 5.2 3D clothing rack geometry (horizontal rod + hangers)
- 5.3 Clothing cards (PlaneGeometry textured with item images) with hover glow
- 5.4 Item detail popup on click (card name, color tag, try-on CTA)

### Phase 6 — Drag-and-Drop Try-On & Upload
**Goal:** Drag items from rack to avatar; upload new items via "+" button.
- 6.1 Drag from rack → avatar drop zone (Three.js DragControls + raycasting)
- 6.2 Visual try-on state on avatar (overlay texture/decal)
- 6.3 Floating "+" FAB button
- 6.4 File upload modal → generates new clothing card

### Phase 7 — Outfit Drawer & Action Bar
**Goal:** Right-side saved looks panel, share/duplicate top bar.
- 7.1 Sliding outfit drawer panel
- 7.2 Save current look functionality
- 7.3 Share button (Web Share API) + Duplicate look
- 7.4 Pre-loaded demo looks for guest mode

### Phase 8 — Polish & Responsive
**Goal:** Animations, micro-interactions, mobile layout, performance.
- 8.1 Page transition animations (GSAP or Framer Motion)
- 8.2 Loading screen with progress bar
- 8.3 Mobile layout adjustments
- 8.4 Performance audit (texture compression, lazy loading, suspense)
