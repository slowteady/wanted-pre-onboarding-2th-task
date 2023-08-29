import { apiClient } from "./apiClient";

export const getIssuesList = (params) => {
  return apiClient.get("", params);
};
