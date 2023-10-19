import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/home/home";
import Serie from "./components/serie/serie";

import "./App.css";

function App() {
  // define your routes here
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/serie/:id" element={<Serie />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
