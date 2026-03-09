# CLAUDE.md — SEO Tag Generator

This file provides context for Claude AI when working on this repository.

## Project Overview

**SEO Tag Generator** is a React-based tool that uses the Claude API to generate Hebrew SEO tags in real time.

Built by [Syrup Digital Media](https://syrup.co.il) for the Israeli market.

## What It Does

- Input: a Hebrew keyword
- Output: optimized Title (50-60 chars), Meta Description (150-158 chars), and H1 tag
- Live character count with green/yellow/red indicators
- One-click copy for each field
- RTL (right-to-left) Hebrew UI

## Tech Stack

- **React** (JSX, hooks)
- **Claude API** (`claude-sonnet-4-20250514`) via `fetch` — no SDK
- **Heebo** font (Google Fonts) for Hebrew support
- No backend — runs entirely in the browser

## SEO Rules (Israeli Market)

| Tag | Length | Notes |
|-----|--------|-------|
| Title | 50–60 chars | Include keyword + brand with ` - ` separator |
| Meta Description | 150–158 chars | Include CTA, mention keyword naturally |
| H1 | up to 70 chars | Must contain the main keyword |

## Project Structure

```
seo-tag-generator/
├── src/
│   └── SEOGenerator.jsx   # Main component
├── CLAUDE.md              # This file
└── README.md              # Hebrew documentation
```

## Development Notes

- The Claude API key is injected at runtime by the claude.ai artifacts environment — no `.env` file needed for that context
- For standalone deployment (Vite/CRA), add your key to `.env` as `VITE_ANTHROPIC_API_KEY`
- The prompt instructs Claude to return **JSON only** — no markdown fences

## Owner

Eric Basiches / Syrup Digital Media Ltd.
