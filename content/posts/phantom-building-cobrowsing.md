---
title: "phantom: building a co-browsing chrome extension"
date: "2026-04-01"
project: "phantom"
tags: [webrtc, chrome-extension, typescript, real-time]
summary: "Designing a Chrome extension where two people can see each other's cursors on any website — no accounts, no servers, no trace left."
---

The problem is simple: sometimes you need to see exactly what someone else is looking at. Not a screenshot. Not a Loom. The actual page, their actual cursor, in real time.

That's phantom. "See exactly what they see."

## The core constraint

No accounts. No sign-up flow. No server that stores session data. A phantom is present without belonging — that's the name's whole point.

Two people share a 6-character room code. They both install the extension. They join the same room. They see each other's cursors on whatever website they're both on. When they leave, nothing persists.

## Why WebRTC

The initial instinct is WebSocket — everyone knows WebSocket, it's easy to reason about. But WebSocket means your cursor data flows through a server on every update, which means latency, cost, and a server that has to be always-on and handle load.

WebRTC gives you a direct peer-to-peer data channel once the connection is established. The cursor at 30fps never touches a server. The signaling server (pure Node.js with `ws`) is only needed for the handshake — offer, answer, ICE candidates. After that, it's out of the picture.

```
User A → [signaling] → User B
              ↓
    RTCDataChannel established
              ↓
User A cursor → User B (direct, no server)
```

## The rendering problem

You can't modify the host page's DOM. If phantom adds elements to the page, it might break layout, trigger React re-renders, interfere with the site's own CSS. The host site must be completely unaware that phantom exists.

Solution: Shadow DOM. Cursor elements are rendered inside a shadow root attached to `document.body`. They're visually present but completely isolated from the host page's styles and scripts. The site never sees them.

```typescript
const shadow = document.body.attachShadow({ mode: 'closed' })
// Cursor elements live here — invisible to the host page
```

## The stack

- **Vite + vite-plugin-web-extension** — best MV3 build tooling available
- **TypeScript** throughout
- **Framer Motion** for cursor interpolation (smooth movement, not teleporting)
- **ws** on the signaling server — no framework overhead
- **Render** for the signaling server — free tier handles it fine

## Where it is

Fully spec'd. Brand guide, 43-task RICE-scored backlog, sprint plan, UX architecture — all written. Build hasn't started yet.

The first task is `T-INF-001: scaffold the repo with Vite + vite-plugin-web-extension`. Everything cascades from there: signaling server, WebRTC connection module, cursor rendering, Chrome store submission.

The thing that'll be satisfying about phantom isn't the code — it's the moment where you join a room and you see someone else's cursor appear on your screen, moving in real time on the same page you're both looking at. No friction. No accounts. Just presence.

That moment is worth building toward.
