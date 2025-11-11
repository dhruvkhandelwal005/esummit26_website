import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import About from "./components/About/About";
import TeamCinematicPage from './components/Teams/TeamCinematicPage'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/sponsors" element={} /> */}
        {/* <Route path="/schedule" element={} /> */}
        <Route path="/teams" element={<TeamCinematicPage /> } />
        {/* <Route path="/contact" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}
