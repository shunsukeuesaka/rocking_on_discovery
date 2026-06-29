import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Local webfonts (no CDN) — Uesaka DS: Barlow Condensed (EN heading), Noto Sans JP
// (JP body fallback for non-Mac), Roboto Mono.
import '@fontsource/barlow-condensed/400.css'
import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/500.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/roboto-mono/400.css'

// Single consolidated stylesheet for all screens (tokens + every section),
// adopted wholesale from the handoff. `states.css` adds the loading/empty/error
// styles that aren't in the prototype.
import './styles/prototype.css'
import './styles/states.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
