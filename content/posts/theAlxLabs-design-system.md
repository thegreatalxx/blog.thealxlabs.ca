---
title: "the theAlxLabs design system"
date: "2026-03-15"
tags: [design, css, brutalism, theAlxLabs]
summary: "Black background. Acid yellow. Space Mono. Zero border-radius. The system I apply to everything I build and why brutalism is the right call for developer tools."
---

Every project I ship looks the same. That's on purpose.

`#0a0a0a` background. `#e8ff47` accent. Space Mono for everything. Zero border-radius anywhere. It's a design system in the original sense — a set of rules that create visual coherence across surfaces without requiring design decisions at every step.

## The rules

**Background: `#0a0a0a`**
Not `#000000`. Pure black looks wrong on screens — there's no such thing as a perfectly black pixel on OLED at high brightness. `#0a0a0a` is black enough to read as black while being slightly more honest.

**Accent: `#e8ff47`**
Acid yellow. It has a practical advantage beyond aesthetics: extreme contrast against `#0a0a0a` without being harsh. White against black is 21:1 contrast ratio — technically accessible, but visually fatiguing over long sessions. `#e8ff47` is closer to 17:1 but reads as "highlight" rather than "default text," which means your eye goes to it without strain.

**Font: Space Mono**
Space Mono for everything. Not just code blocks — headings, body text, labels, everything. Most design systems use a display font for headings, a sans-serif for body, and a monospace for code. That's three decisions per component. Space Mono collapses it to one. It also creates a consistent terminal-like density across UIs, which is appropriate for developer tools.

**Zero border-radius**
```css
*, *::before, *::after {
  border-radius: 0 !important;
}
```
This is a hard override, not a suggestion. Nothing gets rounded corners. Not buttons, not input fields, not cards, not modals. Rounded corners signal approachability and softness — correct for consumer apps, wrong for tools. A terminal has no rounded corners. Neither does this.

## What it looks like in practice

Hover states: background flips to `#e8ff47`, text flips to `#0a0a0a`. The element inverts. It's instant — no transition, no animation. The click target snaps.

Borders: `1px solid #222` at rest. `1px solid #e8ff47` on hover or focus. Nothing thicker.

Code blocks: `background: #111`, `border: 1px solid #222`, Space Mono. Inline code: `background: #111`, `color: #e8ff47`. No border-radius.

Blockquotes: `border-left: 2px solid #e8ff47`, `background: #111`. No rounded corners, no padding tricks.

## Why not something more interesting

The system isn't trying to be interesting. It's trying to be invisible — consistent enough that you stop noticing it and notice the content instead. Design decisions that call attention to themselves are failures.

The acid yellow is the one moment of personality. Everything else is infrastructure.

## CSS reset

```css
* {
  border-radius: 0 !important;
  font-family: "Space Mono", ui-monospace, monospace;
}

::selection {
  background: #e8ff47;
  color: #0a0a0a;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #e8ff47; }
```

The scrollbar matters. It's a small thing that makes the system feel complete.
