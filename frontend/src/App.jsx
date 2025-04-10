import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductsPage from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
