# Taskly Todo Web App ✅

> Your quiet place to get things done.

A clean, minimal to-do web app built with vanilla HTML, CSS, and JavaScript — no frameworks, no bloat.

🔗 **Live Demo:** [https://todo-web-app-two-pi.vercel.app/](https://todo-web-app-two-pi.vercel.app/)

---

## Features

- ➕ **Add tasks** instantly with a click or by pressing `Enter`
- ✅ **Mark tasks complete** with an animated checkbox
- 🗑️ **Delete tasks** individually or clear all completed at once
- 🔍 **Filter by** All / Pending / Done
- 📊 **Live stats** — total, pending, and done counts update in real time
- 💾 **Persistent storage** — tasks are saved to `localStorage` and survive page refreshes
- 🎨 **Dark mode UI** with a gradient aesthetic and smooth animations
- 🔒 **XSS-safe** — user input is escaped before rendering

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, animations, gradients) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts |
| Storage | `localStorage` |
| Hosting | [Vercel](https://vercel.com) |

---

## Getting Started

No build tools or dependencies required.

```bash
# Clone the repo
git clone https://github.com/your-username/todo-web-app.git

# Open in browser
cd todo-web-app
open index.html
```

Or just drag `index.html` into your browser.

---

## Project Structure

```
todo-web-app/
├── index.html   # App markup & layout
├── style.css    # All styling (dark theme, animations)
├── app.js       # Task logic, state management, localStorage
└── README.md
```

---

## How It Works

- Tasks are stored as an array of objects `{ id, text, done, ts }` in `localStorage`
- Each task gets a unique ID using `Date.now()` + random string
- The UI re-renders fully on every state change (add, toggle, delete, filter)
- Task removal has a 240ms slide-out animation before the DOM update

---

## Screenshots

<img src="Screenshot/todoweb.png" width="300" />

---

## License

[MIT](LICENSE)
