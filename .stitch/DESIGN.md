# Design System: Scrapbook Maximalism Presentation

## 1. Visual Theme & Atmosphere
A highly tactile, vibrant, and skeuomorphic interface blending physical scrapbook elements (clipboards, sticky notes, torn paper, lanyards) with playful digital geometry (glowing orbs, Google Labs-style blobs). The atmosphere is energetic, chaotic yet structured, and unapologetically bold, utilizing realistic spring physics to make the UI feel like a living collage.

## 2. Color Palette & Roles
- **Canvas Cream** (#F9F6EE) — Primary background surface, reminiscent of textured paper
- **Charcoal Ink** (#111111) — Primary text, deep contrast for stark readability
- **Highlighter Yellow** (#F9E728) — Primary accent for sticky notes and text highlights
- **Neon Pink** (#FF5964) — Secondary accent for sticky notes and alert states
- **Vibrant Blue** (#35A7FF) — Tertiary accent for info states and glowing orbs
- **Mint Green** (#38B000) — Success states and geometric blob elements
- **Whisper Shadow** (rgba(0,0,0,0.2)) — Deep, hard offset shadows for skeuomorphic depth

## 3. Typography Rules
- **Display:** "Outfit" — Massive, stark, track-tight sans-serif for striking headlines.
- **Serif Accent:** "Instrument Serif" — Elegant serif used selectively for subheadings or quotes to contrast the massive sans.
- **Body:** "Inter" — Clean, legible sans-serif for paragraph text.
- **Handwritten:** "Caveat" — Used strictly for annotations, sticky notes, and tape labels.

## 4. Component Stylings
* **Sticky Notes:** Square or slightly rectangular cards, slightly rotated (-3deg to 3deg). Solid vibrant background colors. Deep, hard offset shadow (8px 8px 0px rgba(0,0,0,0.2)). Minimal border radius (2px).
* **Buttons:** Tactile pill-shapes or rough rectangles resembling cut paper. Heavy drop shadow. Realistic push-down effect on active state (shadow disappears, button translates down).
* **Images (Polaroids):** Encased in thick white borders with a subtle yellowish tint. Taped to the background using a translucent CSS `::before` pseudo-element.
* **Background Elements:** Large, floating SVG blobs, squiggles, and glowing orbs placed asymmetrically behind the main content.

## 5. Layout Principles
Grid-first responsive architecture but heavily relies on deliberate asymmetry. Elements intentionally overlap slightly (e.g., a sticky note overlapping a graph). High variance in sizing. Strict mobile-first collapse for smaller screens.

## 6. Motion & Interaction
Realistic spring physics for all interactions (stiffness: 100, damping: 15). Sticky notes flutter and snap into place on mount. Hovering over tactile elements triggers a slight rotation and shadow expansion. Continuous slow floating animations for background geometric blobs.

## 7. Anti-Patterns (Banned)
No generic flat design cards. No subtle, diffused soft shadows (use hard, offset shadows). No pure black (#000000). No corporate "clean" minimalism. No generic AI copywriting. No 3-column equal grids without overlapping chaos.
