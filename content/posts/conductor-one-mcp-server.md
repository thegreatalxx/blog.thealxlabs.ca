---
title: "conductor: one mcp server, 255+ tools"
date: "2026-04-06"
project: "Conductor"
tags: [mcp, ai-tooling, typescript, open-source]
summary: "Why I built a single MCP server to replace all the others, what 'the Stripe of MCP' actually means, and where it's headed."
---

Most people using Claude Desktop or Cursor have the same setup problem: one MCP server for GitHub, another for Notion, another for the shell, another for their database. Four processes. Four config blocks. Four things that can silently break at 2am.

Conductor is the answer to that problem.

## What it is

One MCP server. You connect it once to your AI client, configure which tools you want, and it handles everything else. GitHub, Docker, shell access, databases, web search, Todoist — all through a single connection.

```bash
npm install -g @useconductor/conductor
conductor init
```

That's it. The AI client gets one config block. You get everything.

## Why "the Stripe of MCP"

Stripe didn't invent payments. What they did was take a fragmented, painful process and make it one coherent API that developers actually wanted to use. You didn't integrate ten payment processors — you integrated Stripe.

Conductor is that for AI tool access. Instead of maintaining ten MCP server integrations, you maintain one. Conductor handles the routing, the credential storage (AES-256-GCM encrypted, machine-derived key), the circuit breakers, the retry logic, and the audit trail.

## What's real in v2.2.0

Everything. No stubs.

- **255+ tools** across GitHub, shell, databases, web, files, and more
- **Encrypted credential storage** — secrets never sit in plain config files
- **SHA-256 chained audit log** — every tool call recorded, tamper-evident
- **Circuit breakers** on every tool — one broken integration doesn't cascade
- **Plugin marketplace** at `useconductor/conductor-plugins`
- **Published on npm** as `@useconductor/conductor`

The MCP server is built on the official `@modelcontextprotocol/sdk`. The earlier version hand-parsed JSON-RPC — I replaced that entirely. Standard transport, standard protocol, zero custom parsing.

## The hard part

CI. GitHub Actions kept failing on the npm publish step. After several rounds of debugging token scopes and workflow YAML, I force-merged. Sometimes that's the right call — the code was correct, the pipeline wasn't.

The auto-publish workflow is now stable: tag a release, npm gets updated automatically.

## What's next

The plugin system is the leverage point. Right now you install plugins from the marketplace. Next: a hosted tier (Conductor as a service) so you don't run anything locally. And an interactive install script that lets you pick plugins during onboarding rather than editing config files.

The goal is that you configure your AI tools once and never think about it again.

---

**Links:** [npm](https://npmjs.com/package/@useconductor/conductor) · [GitHub](https://github.com/useconductor/conductor)
