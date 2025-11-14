# health-goals

A lightweight personal health and wellness tracker (static SPA).

Features
- Track daily water intake with quick-add buttons and custom ml entry.
- Log meals with calories and view total daily calories.
- Record activities/workouts with duration and calories burned.
- Set custom daily goals (water, calories).
- Data persists locally using `localStorage` (no backend required).

Colors & design
- Fresh green accent with calming white/card backgrounds to keep the UI relaxing and readable.

Usage
1. Open `index.html` in a browser (double-click or serve it). No build step required.

Optional (serve locally with a simple HTTP server):
```
# Python 3
python3 -m http.server 8000

# Or with Node (if you have http-server)
npx http-server -c-1 .
```

Files added
- `index.html` — the single-page app UI
- `styles.css` — color scheme and layout
- `app.js` — client logic and persistence

Next steps (ideas)
- Add nutrition database lookup (external API) for automatic macros.
- Add graphs for trends and weekly summaries.
- Add authentication and remote persistence (server + DB).

License: See `LICENSE`
