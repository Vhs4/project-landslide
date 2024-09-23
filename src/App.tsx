import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MapaDesenho from './Pages/MapaDesenho/MapaDesenho'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MapaDesenho />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
