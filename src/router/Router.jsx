import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Error from '../page/error/Error';
import Issues from '../page/issues/Issues';
import routerPaths from './routerPaths';

function Router() {
  return (
    <Routes>
      <Route path={routerPaths.home.path} element={<Navigate to={routerPaths.issues.path} />} replace />
      <Route path={routerPaths.errorRedirect.path} element={<Navigate to={routerPaths.error.path} />} replace />
      <Route path={routerPaths.issues.path} element={<Issues />} />
      <Route path={routerPaths.issuesDetail.path} element={<Issues />} />
      <Route path={routerPaths.error.path} element={<Error />} />
    </Routes>
  );
}

export default Router;
