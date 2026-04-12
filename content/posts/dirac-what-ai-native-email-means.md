---
title: "dirac: what ai-native email actually means"
date: "2026-03-25"
project: "Dirac"
tags: [dirac, ai, email, product]
summary: "Not 'email with an AI assistant'. Something genuinely different — where the AI is the interface, not a sidebar feature."
---

Every email app shipping in 2025 has the same AI integration: there's a button, you click it, a sidebar opens, you can ask it to summarize your email or write a reply. The AI is a feature bolted onto an existing interface.

That's not what Dirac is.

## The distinction

In a conventional email client, the interface is a list of messages. You navigate it. You perform actions on it. An AI assistant can help you with those actions, but the list is still the fundamental UI model.

In Dirac, the AI is the interface. You don't navigate a list — you interact with your email through conversation and structured extraction. The underlying emails exist, but they're not the surface you work on.

Think of the difference between a filesystem browser and a search engine. Both access the same files. One makes you navigate. One makes you ask.

## What that means concretely

When you open Dirac, you're not looking at an inbox. You're talking to something that understands your inbox.

"What needs my attention today?" gets a ranked answer based on sender relationships, thread age, content signals, and your response patterns — not just unread count.

"Reply to the Peter thread and tell him I'll have the UI done by Friday" drafts and sends. You see the draft before it goes. You can edit it. But the default path is send, not compose-then-send.

"Find every email from the Shopify team from the last three months" returns a structured result, not a search results page.

The AI isn't helping you manage email. It's managing it, with you in the loop.

## The technical reality

This is harder than it sounds for a few reasons:

**Context management.** An inbox is a large, dynamic corpus. You can't put everything in a context window. Dirac uses embeddings to maintain a semantic index of your email, which lets the AI answer questions about your inbox without needing to read every message at query time.

**Trust.** "AI that manages your email" sounds alarming. The right model is: AI proposes, human approves. Drafts are shown before sending. Deletions are surfaced before executing. The AI has opinions but doesn't act unilaterally.

**Privacy.** Email is sensitive. The architecture reflects that — we're not sending raw email content to a third-party API without reason. The embedding and indexing happen in ways that minimize exposure of raw content.

## The launch

April 19. Built with Peter on Next.js, Prisma, and Postgres. The testing site is live — if you want early access, there's an invite code system.

The thing that's going to surprise people about Dirac isn't any specific feature. It's the moment when you realize you've gone ten minutes without opening your inbox and everything is still handled.
