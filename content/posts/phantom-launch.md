---
title: "phantom: Building Real-Time Co-Browsing with WebRTC"
date: "2026-04-13"
project: "phantom"
tags: [webrtc, chrome-extension, typescript, real-time, open-source]
summary: "Designing a Chrome extension where two people can see each other's cursors on any website — no accounts, no servers, no trace left. Here's how it works."
---

## The Problem

You're helping someone debug their code. They're describing what's happening but you can't see it. You ask them to share their screen but they don't know how. You ask them to take a screenshot but that's not enough.

You need to see **exactly** what they see. Their cursor. What they're hovering over. Where they're stuck.

That's phantom.

> "See exactly what they see."

## The Constraint

No accounts. No sign-up flow. No server that stores session data.

A phantom is present without belonging — it exists in the moment but leaves no trace.

Two people share a 6-character room code. They both install the extension. They join the same room. They see each other's cursors on whatever website they're both on. When they leave, nothing persists.

## Why WebRTC

The initial instinct is WebSocket — everyone knows WebSocket, it's easy to reason about. But WebSocket means your cursor data flows through a server on every update, which means:

- **Latency** — Every cursor position goes through a middleman
- **Cost** — Server bandwidth for every frame
- **Availability** — Server must be always-on, handle load
- **Persistence** — Server stores session data (violates the constraint)

WebRTC gives you a **direct peer-to-peer data channel** once the connection is established. The cursor at 30fps never touches a server. The signaling server (pure Node.js with `ws`) is only needed for the handshake:

```
User A → [signaling] → User B
              ↓
    RTCDataChannel established
              ↓
User A cursor → User B (direct, no server)
```

After the initial handshake, it's pure P2P. Zero server involvement. Zero data persistence.

## The Rendering Problem

You can't modify the host page's DOM. If phantom adds elements to the page, it might:

- Break layout
- Trigger React re-renders
- Intervene with the site's own CSS
- Get cleaned up by the site's JavaScript

The host site must be completely unaware that phantom exists.

### Solution: Shadow DOM

Cursor elements are rendered inside a shadow root attached to `document.body`. They're visually present but completely isolated from the host page's styles and scripts.

```typescript
const shadow = document.body.attachShadow({ mode: 'closed' })
// Cursor elements live here — invisible to the host page
```

The shadow root creates a completely separate DOM tree. Styles from the host page don't apply. Scripts from the host page can't touch it. It's invisible to the website but visible to the user.

## The Stack

- **Vite + vite-plugin-web-extension** — Best MV3 build tooling available
- **TypeScript** — Throughout
- **Framer Motion** — Cursor interpolation (smooth movement, not teleporting)
- **ws** — Signaling server, no framework overhead
- **Render** — Free tier handles it fine

## Cursor Interpolation

Raw cursor updates are jerky. 30fps means 33ms between frames. That's visible lag.

Framer Motion handles interpolation — it smooths the path between cursor positions so movement looks natural even with network jitter.

```typescript
<motion.div
  animate={{ x: targetX, y: targetY }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

## The Room Code Problem

6 characters. 36^6 = 2 billion possible combinations. That's enough for accidental collisions to be essentially impossible, but short enough to share verbally.

```
Room: X7K2P9
```

Two people. One code. Done.

## Current Status

**Fully spec'd.** Brand guide, 43-task RICE-scored backlog, sprint plan, UX architecture — all written.

**Build not started yet.**

The first task is `T-INF-001: scaffold the repo with Vite + vite-plugin-web-extension`. Everything cascades from there:

1. Scaffold repo
2. Signaling server
3. WebRTC connection module
4. Cursor rendering
5. Shadow DOM integration
6. Room code generation
7. Chrome store submission

## Why This Matters

The future of debugging isn't screen sharing. It's not Loom videos. It's not async screenshots.

It's **presence** — the ability to see exactly what someone else sees, in real time, with zero friction.

No accounts. No setup. No trace left behind.

That's phantom.

---

*phantom is open source. Built by TheAlxLabs.*