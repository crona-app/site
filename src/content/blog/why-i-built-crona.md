---
title: Why I built Crona
slug: why-i-built-crona
description: Crona started as a collection of Markdown files, JavaScript macros
  and Obsidian dashboards. This is the story of why I turned that setup into a
  local-first work tracker built around a daemon, TUI and CLI.
pubDate: 2026-09-19
updatedDate: 2026-09-19
tags:
  - productivity
  - developer-tools
  - terminal
  - open-source
  - local-first
  - crona
author: Siddharth Mittal
canonicalUrl: https://webxsid.com/writing/why-i-built-crona/
draft: false
---
It started about 10 months ago, end of 2025, however it wasn't a terminal app, or even a programming project.

Back then as I started taking on more responsibilities at my day job, it was getting increasingly difficult to keep track of everything I was working on. Especially being in a remote role, my day was starting to blend together—the day job, personal projects, daily chores and other small things that make up life. 

I did keep a To-Do list fairly regularly but it wasn't enough, I wanted a better picture of my time, what was getting done & what I was neglecting. 

At this point you're probably thinking, "but there are already a million tools out there to solve this problem" & you're right, there are, and I did try a few of them. Some were too simple, others wanted me to adapt the way I worked around the way they thought I should work.

But there was one thing I kept coming back to: I wasn’t particularly comfortable handing over such a detailed record of my life to yet another service.

Tasks themselves might not seem particularly sensitive but over time the data logged could paint a surprisingly detailed picture. What I'm working on, when I'm working my habits, my projects. This might sound paranoid but the more I thought about it the less convinced I got that this data should ever leave my system. 

So I did what any reasonable developer would do and started abusing the one app I knew keeps everything offline—[Obsidian](https://obsidian.md). 

It was the perfect choice at the time, completely local and extensible enough to conjure up macros that suited me. So tasks became `md` files, I spent [days writing macros with JS](https://i.programmerhumor.io/2025/09/faf879eb1af1496e4f029d83409e6bde60d2e2a07cff3c53758cbb7d5b30a13c.png) and building "dashboards" with Dataview & DataviewJS, and it was insanely powerful. 

I had heat maps, trend lines, tables and graphs—powered by a growing pile of Markdown files and a bit of JavaScript. Looking back this was the first primitive version of Crona, it just didn't have a name yet. 

It wasn’t the most efficient system, of course, but I knew that going in. After about a month of using it though, the inefficiencies became impossible to ignore. I was constantly switching between my main work setup and Obsidian just to track things, and as the number of `.md` files grew, the macros started slowing down too.

I could’ve spent some time optimizing this further to tackle the performance issues, but Obsidian was still another app I had to constantly switch to. Most of my work already happened in the terminal, and I realized that’s where the tool needed to live too.

So I went back to the drawing board and started figuring out what a purpose-built version of this system would look like. After some thoughts & discarded ramblings I ended up with three core parts that would become Crona:

1. **The Daemon** — the always-running background layer that owns the data and does the actual work.
2. **The TUI** — the richer, interactive interface for when I actually want to sit down and use Crona.
3. **The CLI** — the quick interaction layer for doing things without leaving whatever I’m already working on.

The idea was simple: Crona should always be there, but I shouldn’t always have to have Crona open.

Daemon was probably the most important piece of this. Timers had to keep ticking, notifications had to fire & data had to be processed regardless of whether I had the interface open. It owned the state and gave everything else a single source of truth.

The TUI and CLI were simply two ways into that same system. The TUI could give me the dashboards, history and richer interactions I had grown used to in Obsidian, while the CLI handled the quick stuff—start something, mark it done, check what’s running and move on. Neither needed to stay open for Crona to keep working.

From v0.0.0 through v1.9.0 (the latest stable at the time of writing), the implementation underneath all of this has changed quite a bit, but that basic split hasn’t.

And that's how, a *slightly* over-engineered collection of Markdown files eventually became the tool I needed: something that stays out of your way, is easily accessible without demanding attention & still tracks virtually everything—without sending that information off to someone else's servers.

Crona has obviously grown much beyond the small tracker I sketched out at the end of 2025. There are more features, a [macOS companion](/mac) and plenty of things I still want to build. But I don't want Crona to become another productivity system that tells you **how** you're supposed to work, so I'm being very careful about what gets added—and whether something should be removed.

I built this because I wanted a record of what I was doing without changing how I was doing it. 

Ten months later, that's still the idea  

[Get started with Crona](/#install) · [GitHub](https://github.com/crona-app/crona) · [Docs](https://docs.crona.work)



---

Originally published on [webxsid.com](https://webxsid.com/writing/why-i-built-crona/)