import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./Pages/CategoriesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
