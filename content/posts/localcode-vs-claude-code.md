---
title: "localcode vs claude code: why i built my own"
date: "2026-03-20"
project: "LocalCode"
tags: [open-source, cli, ai-tooling, typescript]
summary: "I built an open-source terminal AI coding assistant. Here's what's actually different and what's genuinely harder than it looks."
---

I want to be clear upfront: Claude Code is good. I use it constantly. Building LocalCode wasn't about Claude Code being broken — it was about what open source makes possible that a proprietary tool never can.

## What LocalCode actually is

A TypeScript CLI that runs in your terminal, understands your codebase, and helps you write and debug code. It's installed via npm, works with OpenRouter (so you can swap models), and the full source is on GitHub.

```bash
npm install -g @localcode/cli
localcode
```

No API key tied to one company. No billing page you don't control. No features locked behind a plan.

## The honest comparison

**Where Claude Code wins:**
- The tool use implementation is more mature
- Agentic mode is more reliable (it can run multi-step tasks without going off-rails)
- Computer use
- Anthropic's context window is just bigger right now

**Where LocalCode wins:**
- Open source — you can read every line, fork it, change it, contribute to it
- Model flexibility — swap to GPT-4o, Gemini, Mistral, local Ollama models via OpenRouter
- No subscription required to run it
- The code is yours

**What's genuinely harder than it looks:**
- Tool parsing is messier than you'd think. Models don't always produce clean JSON in tool calls. Robust handling requires actual error recovery, not optimistic parsing.
- Context window management across a large codebase is a real problem. You can't just dump the whole repo in every prompt.
- The REPL loop has to feel fast. If there's lag between a response finishing and the next prompt appearing, the UX feels broken even if the underlying generation is fast.

## The VS Extension

The CLI works. The VS Code extension is where I spent an embarrassing amount of time on packaging issues. Extension manifests are unforgiving — a wrong `engines.vscode` version, a missing icon file, a bad `activationEvents` and the extension just silently doesn't activate.

It's on Open VSX. VS Marketplace is a separate approval queue.

## What's next for LocalCode

The thing that would actually make it compelling is a good agent mode — not just "here's a code completion" but "run tests, see what failed, fix the failure, run again." That loop, driven locally with models you control, is the real unlock.

LocalCode is at `TheLocalCodeTeam` on GitHub. Open issues, open PRs.
