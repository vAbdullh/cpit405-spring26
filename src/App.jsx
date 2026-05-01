import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import RecipeDetails from './pages/RecipeDetails'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="recipe/:id" element={<RecipeDetails />} />
      </Route>
    </Routes>
  )
}

export default App
