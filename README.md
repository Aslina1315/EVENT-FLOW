# EventFlow – Smart Navigation & Real-Time Crowd Management

> **Smart Cities and Public Safety** · Live at [eventflow-53196192067.asia-south1.run.app](https://eventflow-53196192067.asia-south1.run.app/)

---

## Problem Statement

Managing large crowds at concerts, sports matches, and public gatherings is a persistent safety and experience challenge:

- **High crowd density** causes congestion, delays, and panic risks
- **Poor in-venue navigation** leaves attendees lost and frustrated
- **No real-time visibility** means organizers react to problems too late
- **Fragmented planning** for food, ticketing, and safety increases operational costs

These failures directly impact **public safety and event quality**.

---

## Solution

**EventFlow** is a unified web platform that combines real-time crowd intelligence, smart navigation, and event planning tools into a single interface for both attendees and organizers.

It bridges the gap between disparate event tools by providing:

- Live crowd-density monitoring and visual zone mapping
- AI-powered navigation and safety alert routing
- Integrated event discovery across global venues
- Budget and food-cost estimation for event planning

---

## Features

| Feature | Description |
|---------|-------------|
| 🗺 **Interactive Map** | Real-world venue map (OpenStreetMap/Leaflet) with live crowd-density zones |
| 📊 **Executive Dashboard** | Real-time pulse stats, zone intelligence, and weather sync |
| 🔔 **Alert System** | Priority-tiered safety alerts (critical / warning / info) |
| 🤖 **AI Concierge Chat** | Natural-language crowd guidance and event discovery |
| 🎫 **Global Event Discovery** | Real-world events via Ticketmaster API + curated fallback data |
| 💰 **Budget Planner** | Per-person cost estimation (min / average / max) |
| 🍕 **Food Price Predictor** | Demand-based pricing simulation for event vendors |
| 💳 **Payment Interface** | Simulated booking flow with input validation |
| 👤 **Profile Management** | User profile view and update |
| ⚙️ **Settings Panel** | Theme and notification preferences |
| 🚨 **Emergency SOS Modal** | One-tap emergency broadcast with nearest exit routing |
| 📈 **Analytics Dashboard** | Crowd trends and event performance insights |

---

## Tech Stack

### Frontend
- **React 18** (Vite bundler)
- **Tailwind CSS** – utility-first styling
- **Framer Motion** – page transitions and micro-animations
- **React Router v6** – client-side routing
- **Leaflet / React-Leaflet** – interactive maps
- **Lucide React** – icon library

### Backend
- **Node.js** + **Express.js** – REST API server
- **SQLite** (via `better-sqlite3` / `sqlite`) – local persistent database
- **Axios** – external API calls (Ticketmaster, Open-Meteo weather, Wikipedia)
- **Crypto** (built-in) – SHA-256 password hashing

### Infrastructure & Deployment
- **Google Cloud Run** – containerized production deployment (auto-scaling)
- **GitHub** – source control and CI trigger

---

## Google Services Used

| Service | How It Is Used |
|---------|----------------|
| **Google Cloud Run** | Hosts the full-stack application as a containerized service with automatic HTTPS, zero-downtime deploys, and auto-scaling based on traffic |
| **Google Identity (mocked)** | Auth page demonstrates Google OAuth sign-in flow (mock token stored for demo) |
| **Open-Meteo API** | Real-time weather data displayed on the dashboard (free, no key required) |

---

## Live Application

🌐 **[https://eventflow-53196192067.asia-south1.run.app/](https://eventflow-53196192067.asia-south1.run.app/)**

---

## Repository

https://github.com/Aslina1315/EVENT-FLOW

---

## Local Development

```bash
# Install root dependencies
npm install

# Start the backend (port 3006)
cd server && npm install && node server.js

# Start the frontend (port 5173)
cd client && npm install && npm run dev
```

The frontend dev server proxies `/api/*` requests to the backend automatically via Vite's proxy config.

---

## Testing

```bash
# Backend API tests (Jest + Supertest)
cd server && npm test

# See tests/README.md for full test documentation
```
# EventFlow – Testing Guide

## Overview

EventFlow uses a lightweight, non-breaking testing strategy suited for a
React + Express application. Tests are organized into two layers:

| Layer | Tool | Location |
|-------|------|----------|
| Backend (API) | Node.js built-in `assert` + manual Jest tests | `tests/server/` |
| Frontend (UI logic) | Vitest + React Testing Library | `client/src/__tests__/` |

---

## How to Run Tests

### Backend unit tests
```bash
cd server
npm test
```

### Frontend unit tests
```bash
cd client
npm test
```

---

## What Is Being Tested

### Backend (`server/server.js`)

| Test | Description |
|------|-------------|
| Health endpoint | `GET /api/health` returns `{ status: 'ok' }` |
| Events endpoint | `GET /api/events` returns an array of objects |
| Event shape validation | Each event has `title`, `date`, `location`, `type`, `price` |
| Auth – missing fields | `POST /api/auth/register` with missing fields returns HTTP 400 |
| Auth – invalid login | `POST /api/auth/login` with wrong credentials returns HTTP 401 |
| Chat endpoint | `POST /api/chat` with a message returns a `reply` string |

### Frontend components

| Component | What is checked |
|-----------|-----------------|
| `Auth.jsx` | Form renders; submit with empty fields shows error message |
| `Events.jsx` | Event cards render with correct title and booking button |
| `Dashboard.jsx` | Stats panel shows zone and alert data |
| `EmergencyModal.jsx` | Modal opens/closes; aria-labels are present |

---

## Running a Quick Manual Smoke Test

1. Start the server: `cd server && node server.js`
2. Open the live URL or run `cd client && npm run dev`
3. Verify:
   - [ ] Home page loads without errors
   - [ ] Login with any email/password registers and logs in
   - [ ] Dashboard shows crowd stats and the map
   - [ ] Events page lists events and "Explore" search works
   - [ ] Chat page returns an AI concierge reply
   - [ ] SOS button opens the Emergency modal
   - [ ] Emergency modal can be closed

---

## See Also

- [`server/server.test.js`](../server/server.test.js) — automated API tests
- [`client/src/__tests__/`](../client/src/__tests__/) — component tests


---

## Project Architecture

```
eventflow/
├── client/          # React + Vite frontend
│   └── src/
│       ├── pages/       # Route-level page components
│       ├── components/  # Reusable UI components (layout + ui)
│       └── constants/   # Mock data fallbacks
├── server/          # Express + SQLite backend
│   ├── server.js        # Main API server
│   └── server.test.js   # Jest API tests
└── tests/           # Test documentation & smoke-test guide
```

---

## Assumptions

- Crowd data is **simulated** in the absence of real IoT sensor feeds
- Alerts are generated from predefined seed data and random simulation
- Payment flow is **UI-only** (no real payment gateway connected)
- Profile and settings are stored in the local SQLite database per session
- The Ticketmaster API key is embedded for demo purposes; production use requires a private key via `.env`

---

## Conclusion

EventFlow demonstrates a practical, **full-stack architecture** for real-world crowd management. It combines:

- Strong domain understanding of the problem
- Modern React component patterns with real API integration
- Cloud-native deployment on Google Cloud Run
- A clear roadmap toward production-grade IoT and payment integrations

This project was developed as part of **Virtual Prompt Wars** using the Antigravity AI coding assistant.
