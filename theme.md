# OSC India - Theme & Design System

This document outlines the core design theme extracted from the existing landing page (`app/globals.css`). We will use this as a reference when building the new pages (Projects, Dashboard, Leaderboard, etc.) to ensure complete visual consistency.

## 1. Overall Aesthetic
The website follows a **Premium Dark Mode** aesthetic. It relies heavily on deep blacks, subtle dark grays for depth (cards/containers), and vibrant neon-orange as the primary brand accent. The overall feel is modern, developer-focused, and sleek.

## 2. Color Palette

### Backgrounds & Surfaces
*   **Main Background (`--bg`):** `#000000` (Pure Black)
*   **Card Background 1 (`--bg-card`):** `#111111` (Very Dark Gray - used for primary cards/sections)
*   **Card Background 2 (`--bg-card2`):** `#161616` (Slightly lighter - used for elevated elements or hover states)

### Brand & Accents
*   **Primary Brand (`--orange`):** `#FF6000` (Vibrant Orange - used for buttons, links, highlights)
*   **Primary Hover (`--orange-dark`):** `#e65600` (Darker orange for button hover states)
*   **Success/Accent (`--green`):** `#22C55E` (Standard Tailwind green - used for status, "live" indicators, or positive stats)
*   **Selection Highlight:** `rgba(255, 96, 0, 0.3)` (A translucent orange when text is highlighted)

### Typography
*   **Primary Text:** `#ffffff` (Pure White - used for headings and main body text)
*   **Secondary Text (`--text-secondary`):** `#9ca3af` (Light Gray - used for subtitles and descriptions)
*   **Muted Text (`--text-muted`):** `#6b7280` (Medium Gray - used for minor details, timestamps, footer links)

### Borders & Dividers
*   **Border (`--border`):** `rgba(255, 255, 255, 0.06)` (Extremely subtle, 6% opacity white. Used to separate cards from the pure black background without creating harsh lines).

## 3. Typography
*   **Primary Font:** `Inter` (Google Fonts), falling back to system sans-serif (`-apple-system, BlinkMacSystemFont, etc.`).
*   **Weights Used:** `400` (Regular), `500` (Medium), `600` (Semi-bold), `700` (Bold), `800` (Extra Bold), `900` (Black).
*   **Styling:** Antialiased font smoothing is enabled for crisp rendering on dark backgrounds.

## 4. UI Elements & Layout Patterns
*   **Scrollbars:** Custom dark scrollbars (`#000000` track, `#262626` thumb) to maintain the dark aesthetic.
*   **Gradients:** Used for fading out backgrounds or creating overlays (e.g., the hero background fades into the black background using a vertical linear gradient).
*   **Responsiveness:** The layout relies heavily on CSS Grid and Flexbox, with strict breakpoints for tablet (`max-width: 900px`), mobile (`max-width: 768px`), and small mobile (`max-width: 480px`).

## Usage in Tailwind
When building new components, we should map these CSS variables to arbitrary Tailwind values or define them in our CSS if they aren't already mapped, for example:
*   `bg-[var(--bg-card)]`
*   `text-[var(--orange)]`
*   `border-[var(--border)]`
