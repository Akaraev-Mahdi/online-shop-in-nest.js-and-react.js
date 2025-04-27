import { BrowserRouter } from 'react-router-dom'
import AppRouter from './component/AppRouter.js'
import Header from './component/Header/Header.js'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
