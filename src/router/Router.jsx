import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Issues from '../page/issues/Issues';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} replace />
      <Route path="/list" element={<Issues />} />
    </Routes>
  );
}

export default Router;
