import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store, {persistor} from './store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.js'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
)
