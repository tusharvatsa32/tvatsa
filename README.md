# tvatsa

My personal webpage: a single static page (HTML, CSS and a little JavaScript) with no build step.

## Editing

- `index.html` holds all the content. Search for `TODO` to find placeholders (LinkedIn URL, email, resume, experience).
- To add a project, copy one `<a class="card">` block and set `data-tags` to any of `llm nlp vision speech dl`.
- `style.css` has the colors at the top, for light and dark mode.
- Drop a `resume.pdf` in the repo root to make the Resume link work.

Preview locally with `python3 -m http.server` and open http://localhost:8000.

## Deploying

`.github/workflows/pages.yml` publishes the site on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The site is then served at https://tusharvatsa32.github.io/tvatsa/.
