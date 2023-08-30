import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Error from '../page/error/Error';
import Issues from '../page/issues/Issues';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/issues" />} replace />
      <Route path="/issues" element={<Issues />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default Router;
