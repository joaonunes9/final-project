import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductsPage from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
