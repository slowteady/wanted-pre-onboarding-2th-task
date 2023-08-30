const routerPaths = {
  home: { path: '/', name: 'Home' },
  issues: { path: '/issues', name: 'Issues' },
  issuesDetail: { path: '/issues/:id', name: 'IssuesDetail' },
  errorRedirect: { path: '*', name: 'ErrorRedirect' },
  error: { path: '/error', name: 'Error' },
};

export default routerPaths;
