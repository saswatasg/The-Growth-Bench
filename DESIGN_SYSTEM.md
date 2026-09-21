# THE GROWTH BENCH — DESIGN SYSTEM

## Brand Identity

| Element | Value |
|---------|-------|
| Brand name | The Growth Bench |
| Tagline | Full-stack growth partner for D2C brands |
| Logo (light bg) | `logo.png` — black icon mark |
| Logo (dark bg) | Apply CSS `filter: invert(1)` via `.logo-dark` class |
| Primary CTA | "Book a Free Audit Call" |

---

## Color Palette

### Core Colors

| Token | Hex | RGB | Tailwind | Usage |
|-------|-----|-----|----------|-------|
| `ink` | `#111111` | 17,17,17 | `bg-ink text-ink` | Primary text, CTAs, dark backgrounds, brand color |
| `canvas` | `#ffffff` | 255,255,255 | `bg-canvas text-canvas` | Page backgrounds, light surfaces |
| `soft-cloud` | `#f5f5f5` | 245,245,245 | `bg-soft-cloud` | Secondary surfaces, card backgrounds, input backgrounds |

### Neutral Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `charcoal` | `#39393b` | Softer body text (rarely used) |
| `ash` | `#4b4b4d` | Disabled/low-emphasis text (rarely used) |
| `mute` | `#707072` | Subtitles, secondary metadata, footer links |
| `stone` | `#767676` | Inverse secondary on dark surfaces |
| `hairline` | `#cacacb` | 1px dividers, borders |
| `hairline-soft` | `#e5e5e5` | Softer borders, input borders |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `sale` | `#d30005` | Error, destructive, sale prices |
| `success` | `#007d48` | Confirmation, positive metrics, checkmarks |
| `info` | `#1151ff` | Informational links |

### shadcn/ui CSS Variables (HSL)

```css
--background: 0 0% 100%;
--foreground: 0 0% 7%;
--primary: 0 0% 7%;
--primary-foreground: 0 0% 100%;
--secondary: 0 0% 96%;
--secondary-foreground: 0 0% 7%;
--muted: 0 0% 96%;
--muted-foreground: 0 0% 44%;
--accent: 0 0% 7%;
--accent-foreground: 0 0% 100%;
--destructive: 0 84% 51%;
--destructive-foreground: 0 0% 100%;
--border: 0 0% 90%;
--input: 0 0% 90%;
--ring: 0 0% 7%;
```

---

## Typography

### Font Families

| Token | Font | Fallback | Usage |
|-------|------|----------|-------|
| `font-display` | Bebas Neue | Anton, sans-serif | Headlines, display text |
| `font-body` | Inter | Helvetica Neue, Arial, sans-serif | Body text, UI |
| `font-mono` | JetBrains Mono | monospace | Code, IDs, technical text |

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `text-display-xl` | 72px | 500 | 0.9 | 0 | Hero headlines (desktop only) |
| `text-display-lg` | 64px | 500 | 0.9 | 0 | Hero headlines |
| `text-display-md` | 48px | 500 | 1.0 | 0 | Page titles, section headers |
| `text-heading-xl` | 40px | 500 | 1.1 | -0.01em | Section headers |
| `text-heading-lg` | 28px | 500 | 1.2 | 0 | Subsection headers |
| `text-heading-md` | 20px | 500 | 1.3 | 0 | Card titles |
| `text-body-lg` | 18px | 400 | 1.5 | 0 | Large body text |
| `text-body-md` | 16px | 400 | 1.5 | 0 | Default body text |
| `text-body-sm` | 14px | 400 | 1.5 | 0 | Small body text |
| `text-button-md` | 15px | 500 | 1.0 | 0 | Button text |
| `text-button-sm` | 13px | 500 | 1.0 | 0 | Small button text |
| `text-caption-md` | 14px | 500 | 1.5 | 0 | Captions |
| `text-caption-sm` | 12px | 500 | 1.5 | 0 | Small captions |
| `text-label-xs` | 12px | 600 | 1.0 | 0.05em | Labels, eyebrow text |

### Responsive Pattern
- Hero headlines: `text-display-md md:text-display-lg lg:text-display-xl`
- Section headers: `text-heading-xl md:text-display-md`
- Mobile minimum: `text-heading-xl` (40px) for headers, `text-body-sm` (14px) for body

---

## Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `none` | 0px | `rounded-none` | Cards, containers, rectangular elements |
| `sm` | 18px | `rounded-sm` | Inline blocks, small containers |
| `md` | 24px | `rounded-md` | Search pills, inputs |
| `lg` | 30px | `rounded-lg` | CTAs, buttons (pill shape), modals |
| `full` | 9999px | `rounded-full` | Circles, pill buttons, badges, avatars |

**Pattern**: Cards = `rounded-none` (sharp). Buttons = `rounded-full` (pill). Inputs = `rounded-lg`.

---

## Spacing

### Base Unit: 4px

All spacing values are multiples of 4px.

### Section Padding

| Context | Mobile | Desktop | Tailwind |
|---------|--------|---------|----------|
| Hero sections | 60px | 120px | `py-[60px] md:py-[120px]` |
| Content sections | 48px | 100px | `py-[48px] md:py-[100px]` |
| Compact sections | 40px | 50px | `py-[40px] md:py-[50px]` |

### Container

```css
.container-site {
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px; /* px-5 */
  padding-right: 20px;
  max-width: 1440px;
}
@media (min-width: 768px) {
  .container-site {
    padding-left: 32px; /* px-8 */
    padding-right: 32px;
  }
}
```

---

## Components

### Buttons

**Variants:**

| Variant | Style | Tailwind |
|---------|-------|----------|
| Default | Black bg, white text | `bg-ink text-canvas hover:bg-ink/90` |
| Outline | Bordered, white bg | `border border-hairline bg-canvas text-ink hover:bg-soft-cloud` |
| Secondary | Gray bg | `bg-soft-cloud text-ink hover:bg-hairline` |
| Ghost | Transparent | `text-ink hover:bg-soft-cloud` |
| Link | Underline | `text-ink underline-offset-4 hover:underline` |

**Sizes:**

| Size | Height | Padding | Font Size | Tailwind |
|------|--------|---------|-----------|----------|
| sm | 36px | 16px horizontal | 13px | `h-9 px-4 text-xs rounded-full` |
| md/default | 40px | 20px horizontal | 15px | `h-10 px-5 py-2 rounded-full` |
| lg | 48px | 32px horizontal | 16px | `h-12 px-8 text-base rounded-full` |
| icon | 40px | — | — | `h-10 w-10 rounded-full` |

All buttons are pill-shaped (`rounded-full`).

### Cards

```
p-6 border border-hairline-soft bg-canvas
```

- Flat, no shadow
- 1px border in `hairline-soft` (#e5e5e5)
- White background
- No border-radius (sharp corners)
- Hover: `hover:border-ink`

### Section Headers (Eyebrow Pattern)

```jsx
<span className="text-label-xs text-mute uppercase tracking-wider">Eyebrow</span>
<h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Heading</h2>
<p className="text-body-md text-mute mt-4 max-w-xl mx-auto leading-relaxed">Body text</p>
```

- Eyebrow: 12px, uppercase, muted, letter-spacing 0.05em
- Heading: Bebas Neue, 40px→48px responsive
- Body: Inter, 16px, muted, max-width 576px

### Form Inputs

```
w-full px-3 py-2 text-body-sm bg-soft-cloud border border-hairline-soft focus:outline-none focus:border-ink transition-colors
```

### Focus States

```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40
```

### Dividers

- Standard: `border-t border-hairline-soft`
- Dark bg: `border-t border-stone/10`
- Accent: `border-l-4 border-ink` (blockquote style)

---

## Layout Patterns

### Section Backgrounds

Alternating pattern: `bg-canvas` → `bg-soft-cloud` → `bg-canvas` → `bg-ink`

### Standard Section

```jsx
<section className="bg-[color] py-[60px] md:py-[120px]">
  <div className="container-site">
    <div className="text-center mb-10">
      <span className="text-label-xs text-mute uppercase tracking-wider">Eyebrow</span>
      <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Heading</h2>
    </div>
    {/* content */}
  </div>
</section>
```

### Two-Column Grid

```jsx
<div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
  {/* left column */}
  {/* right column */}
</div>
```

### Three-Column Grid

```jsx
<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
  {/* 3 cards */}
</div>
```

### Four-Column Grid

```jsx
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 4 cards */}
</div>
```

---

## Motion / Animation

### Presets

| Preset | Duration | Easing | Usage |
|--------|----------|--------|-------|
| `fadeUp` | 0.5s | custom | Scroll-triggered section reveals |
| `fadeIn` | 0.5s | custom | Simple fade in |
| `staggerContainer` | — | — | Parent for staggered children |
| `staggerChild` | 0.4s | custom | Individual staggered item |
| `scaleIn` | 0.5s | custom | Scale up reveal |
| `slideFromLeft` | 0.5s | custom | Slide from left |
| `slideFromRight` | 0.5s | custom | Slide from right |

### Pattern

```jsx
<motion.section {...fadeUp} className="...">
  <motion.div {...staggerContainer}>
    {items.map((item) => (
      <motion.div key={item} {...staggerChild}>
        {/* content */}
      </motion.div>
    ))}
  </motion.div>
</motion.section>
```

---

## Logo Usage

| Location | File | Size | CSS |
|----------|------|------|-----|
| Header | `/logo.png` | `h-12 w-auto` | Default (black on transparent) |
| Footer | `/logo.png` | `h-12 w-auto logo-dark` | `filter: invert(1)` for white on dark |
| Favicon | `/favicon.svg` | 32x32 | SVG with `prefers-color-scheme` for dark mode |

---

## Responsive Breakpoints

| Breakpoint | Tailwind | Usage |
|------------|----------|-------|
| Mobile | default | 0–639px |
| Tablet | `sm:` | 640px+ |
| Desktop | `md:` | 768px+ |
| Large | `lg:` | 1024px+ |

---

## Accessibility

- All images: `alt` attribute required
- All icon-only buttons: `aria-label` required
- Interactive elements: `focus-visible:ring-2 focus-visible:ring-ink/40`
- Color contrast: `text-mute` (#707072) on `bg-canvas` (#fff) = 4.6:1 (AA)
- Color contrast: `text-stone` (#767676) on `bg-ink` (#111) = 4.9:1 (AA)
- Minimum touch target: 44×44px
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables animations

---

## File Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui primitives (button, input, dialog, etc.)
│   ├── home/        # Homepage-specific components
│   ├── training/    # Training portal components
│   ├── assessment/  # Exam components
│   └── *.jsx        # Shared components (Header, Footer, Layout, etc.)
├── pages/           # Route pages
├── lib/             # Utilities, constants, business logic
├── context/         # React contexts
├── data/            # Static data (testimonials)
├── content/         # Blog content
└── config/          # Route configuration
```
