import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} replace />
      <Route path="/read/:id" element={<Navigate to="/read" />} />
    </Routes>
  );
}

export default Router;
