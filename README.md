# FAKEIT — Imposter Party Game

A real-time multiplayer party game where one player is the secret **Imposter** who doesn't know the topic. Everyone else gives clues, debates, and votes to find them out.

Built with plain HTML, CSS, and JavaScript — no backend, no framework, no server costs.

---

## How to Play

1. One player creates a room and shares the 4-letter code or join link
2. Everyone joins the room (3–8 players)
3. The host picks a topic category and starts the game
4. Each player privately sees their role — **Crewmate** sees the secret topic, the **Imposter** doesn't
5. During the discussion phase, everyone chats and gives clues about the topic
6. After discussion, everyone votes for who they think the Imposter is
7. **Crewmates win** if they vote out the Imposter — **Imposter wins** if they survive

---

## Features

- Room creation with a shareable 4-letter code and join link
- Peer-to-peer multiplayer — works locally or over the internet
- Role assignment with animated card flip reveal — each player only sees their own role
- Real-time chat during the discussion phase
- Countdown timer with SVG ring animation
- Voting screen with live vote counts
- Animated result reveal with scoreboard
- Score tracking across multiple rounds
- Custom topic category packs
- Auto-join via URL (`?join=CODE`)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML / CSS / JS | entire frontend — no framework |
| PeerJS (WebRTC) | real-time peer-to-peer multiplayer |
| CSS Custom Properties | theming and design system |
| CSS Grid | responsive layouts |
| SVG | timer ring animation |

---

## Project Structure

```
fakeit-game/
├── index.html   — all screens and HTML structure
├── style.css    — styling, layout, animations
├── game.js      — game logic, networking, PeerJS
└── README.md
```

---

## Running Locally

All three files must be in the same folder. Open with a local server — do not open `index.html` directly via `file://` as browsers will block loading external CSS and JS files.

**Option 1 — VS Code Live Server**
Install the Live Server extension, right-click `index.html` and select "Open with Live Server".

**Option 2 — Python**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

---

## Deployment

The entire game is a static site — deploy by dragging the folder into [Netlify Drop](https://app.netlify.com/drop) and getting a live public URL in seconds. No configuration needed.

Once deployed, the `?join=CODE` deep link works automatically — players who open the link will land directly on the join screen with the room code pre-filled.

---

## Multiplayer Architecture

There is no backend server. Multiplayer is handled entirely via **WebRTC peer-to-peer connections** brokered by PeerJS's free signalling server.

- The **host** owns all game state — roles, topic, votes, scores
- Each guest receives **only their own role** in a personalised message — no player can intercept another player's role
- **Chat messages** are relayed through the host to all other guests
- **Votes** are sent to the host, tallied, and broadcast back as a live update
- The host triggers all phase transitions (discussion start, voting, reveal)

---

## Scoring

| Outcome | Points |
|---|---|
| Crewmate — Imposter voted out | +2 per crewmate |
| Imposter — survives the vote | +3 for the Imposter |

Scores persist across rounds within the same room session.

---

## What I Learned

- WebRTC and peer-to-peer networking with PeerJS
- Host-as-authority pattern for multiplayer game state
- Never broadcasting sensitive data — each player gets only their own personalised payload
- Designing a multi-phase game flow with clean screen transitions
- Real-time chat with a host-relay architecture
- SVG animations, CSS 3D card flips, and responsive layout with CSS Grid
- Tracing bugs to their root cause in data design rather than patching the UI