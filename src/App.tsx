import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CharactersPage from './pages/CharactersPage'
import EpisodesPage from './pages/EpisodesPage'
import LocationsPage from './pages/LocationsPage'
import CharacterDetailPage from './pages/CharacterDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/characters" replace />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App