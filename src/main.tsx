import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Local webfonts (no CDN) — Uesaka DS: Barlow (EN heading), Noto Sans JP
// (JP body fallback for non-Mac), Roboto Mono.
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/700.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/500.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/roboto-mono/400.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/jobList.css'
import './styles/states.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
