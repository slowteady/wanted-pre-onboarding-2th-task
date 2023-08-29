import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import IssuesList from "../page/IssuesList";
import IssuesRead from "../page/IssuesRead";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} replace />
      <Route path="/list" element={<IssuesList />} />
      <Route path="/read/:id" element={<IssuesRead />} />
    </Routes>
  );
}

export default Router;
