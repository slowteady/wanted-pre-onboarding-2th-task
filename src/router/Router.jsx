import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '../components/layout/issues/Layout';
import Error from '../page/error/Error';
import Issues from '../page/issues/Issues';
import IssuesDetail from '../page/issues/IssuesDetail';
import routerPaths from './routerPaths';

function Router() {
  const routes = useRoutes([
    {
      path: routerPaths.home.path,
      element: <Navigate to={routerPaths.issues.path} replace />,
    },
    {
      path: routerPaths.issues.path,
      element: <Layout />,
      children: [
        { element: <Issues />, index: true },
        {
          path: routerPaths.issuesDetail.path,
          element: <IssuesDetail />,
        },
      ],
    },
    {
      path: routerPaths.errorRedirect.path,
      element: <Navigate to={routerPaths.error.path} replace />,
    },
    {
      path: routerPaths.error.path,
      element: <Error />,
    },
  ]);

  return routes;
}

export default Router;
