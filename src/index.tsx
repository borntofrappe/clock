/* @refresh reload */
import { render } from 'solid-js/web'
import "./styles/index.css"

import App from './App'

// @ts-ignore
import SW_URL from 'service-worker:./service-worker/index.js'

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(SW_URL);
}

const root = document.getElementById('root')

render(() => <App />, root!)
