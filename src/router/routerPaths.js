const routerPaths = {
  home: { path: '/', name: 'Home' },
  issues: { path: '/issues', name: 'Issues' },
  issuesDetail: { path: '/issues/:id', name: 'IssuesDetail' },
  error: { path: '*', name: 'Error' },
};

export default routerPaths;
