---
title: "devlog: setting up the blog"
date: "2025-04-11"
project: "blog.thealxlabs.ca"
tags: [devlog, next.js, setup]
summary: "Built the blog from scratch. Next.js 15, Space Mono, brutalist design system."
---

First devlog entry. The blog is live.

Built with Next.js App Router, MDX for content, Space Mono throughout.
No rounded corners. No compromises.

## What got built

- Next.js App Router scaffold
- `gray-matter` for frontmatter parsing
- `next-mdx-remote` for MDX rendering
- `@tailwindcss/typography` for prose styling, overridden to match the design system
- Auto-post wired into `/usr/local/bin/devlog`

## Design decisions

**Zero border-radius, everywhere.** The `* { border-radius: 0 !important }` override in globals.css ensures nothing sneaks in a rounded corner. Tailwind's `--radius-*` theme vars are all set to `0px`.

**Space Mono for everything.** Not just code blocks — the whole UI. It creates a terminal-like density that suits a dev log.

**`#e8ff47` acid yellow.** Used only for emphasis: active states, hover text, project badges, inline code. Against `#0a0a0a` black it has extreme contrast without being harsh.

## Stack

```
Next.js 16.2.3 (App Router)
Tailwind CSS v4
next-mdx-remote v6 (RSC mode)
gray-matter 4.0.3
reading-time 1.5.0
@tailwindcss/typography 0.5.19
Space Mono (Google Fonts)
```

## Next steps

- [ ] Write more devlogs
- [ ] Add search
- [ ] RSS feed
