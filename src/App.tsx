import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Serie from "./components/serie/serie";
import Connextion from "./Connexion/Connexion";
import "./App.css";
import Inscription from "./Inscription/Inscription";
import Profil from "./Profil/Profil";

function App() {
  // define your routes here
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serie/:id" element={<Serie />} />
        <Route path="/connexion" element={<Connextion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
