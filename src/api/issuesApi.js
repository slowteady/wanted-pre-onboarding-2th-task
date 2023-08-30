import { apiClient } from './apiClient';

export const getIssuesList = (params) => {
  return apiClient.get('', params);
};

export const getIssuesDetail = (id) => {
  return apiClient.get(`/${id}`);
};
