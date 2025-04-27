import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import App from './App.js'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App/>
    </Provider>
)
