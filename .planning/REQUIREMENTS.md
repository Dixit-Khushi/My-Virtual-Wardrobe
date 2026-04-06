# Requirements — My Virtual Wardrobe (v1.0 MVP)

## Must Have (P0)

1. **Landing / Auth Page**
   - Full-screen background (3D hero aesthetic or video blur)
   - Glassmorphism sign-in card centered on screen
   - "Sign in with Google" button (Firebase Auth)
   - "Enter as Guest" button (loads demo wardrobe)
   - Smooth transition animation into the 3D scene

2. **3D Closet Environment**
   - Warm wooden shelving units left & right (procedural geometry or GLTF)
   - Back wall with neon/holographic glow effect
   - Platform/spotlight for avatar
   - Ambient + directional lighting for fashion-shoot feel

3. **Avatar**
   - GLTF female avatar (Ready Player Me or Mixamo mannequin)
   - Orbit controls for 360° rotation
   - Subtle idle animation (breathing / weight shift)

4. **Clothing Rack System**
   - Category tabs: Tops | Bottoms | Shoes | Accessories
   - 3D clothing cards on rack (texture-mapped with item image)
   - Click card → shows item detail popup (name, brand, color tag)
   - Hover glow effect on cards

5. **Drag & Drop Try-On**
   - Drag item from rack → drop on avatar → item appears on avatar region
   - Visual feedback during drag (item lifts, glows)

6. **Upload Flow**
   - Floating "+" FAB button (bottom-right)
   - Opens modal file picker
   - Uploaded image createss new clothing card on rack

7. **Outfit Drawer**
   - Right-side sliding panel
   - "Saved Looks" list (Date Night, Gym, Work, etc.)
   - Save current outfit button

8. **Top Bar Controls**
   - Share button (top-right)
   - Duplicate/clone look button

## Nice to Have (P1)

- Firestore persistence for saved looks
- Outfit AI suggestions (mocked for v1)
- Season/weather filter on rack
- Color palette extraction from uploaded images

## Out of Scope

- Real cloth physics simulation
- AR try-on (camera overlay)
- Social/follow features
