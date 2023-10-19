import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./components/home";

import "./App.css";

function App() {
  // define your routes here
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
