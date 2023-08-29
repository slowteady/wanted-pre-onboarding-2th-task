import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import IssuesList from "../page/IssuesList";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} replace />
      <Route path="/list" element={<IssuesList />} />
    </Routes>
  );
}

export default Router;
