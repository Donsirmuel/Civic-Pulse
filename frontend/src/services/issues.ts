import apiClient from './apiClient';
import type { Issue, StatusHistory } from '../types';

export const issuesService = {
  // Get all issues
  getIssues: async (params?: {
    status?: string;
    category?: string;
    state?: string;
    scope?: string;
    ordering?: string;
    search?: string;
  }) => {
    try {
      const response = await apiClient.get<any>('issues/', { params });
      // Handle paginated response from DRF
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      throw new Error('Failed to fetch issues');
    }
  },

  // Get single issue
  getIssue: async (id: number): Promise<Issue> => {
    try {
      const response = await apiClient.get<Issue>(`issues/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch issue');
    }
  },

  // Create issue
  createIssue: async (data: {
    title: string;
    description: string;
    category: string;
    state: string;
    lga: string;
    ward: string;
    scope: string;
    priority?: string;
    image_url?: string;
  }): Promise<Issue> => {
    try {
      const response = await apiClient.post<Issue>('issues/', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create issue');
    }
  },

  // Update issue
  updateIssue: async (id: number, data: Partial<Issue>): Promise<Issue> => {
    try {
      const response = await apiClient.patch<Issue>(`issues/${id}/`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update issue');
    }
  },

  // Update issue status
  updateIssueStatus: async (id: number, status: string, note?: string): Promise<any> => {
    try {
      const response = await apiClient.post(`issues/${id}/update-status/`, {
        status,
        note,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update issue status');
    }
  },

  // Like issue
  likeIssue: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.post(`issues/${id}/like/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to like issue');
    }
  },

  // Upvote issue
  upvoteIssue: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.post(`issues/${id}/upvote/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to upvote issue');
    }
  },

  // Downvote issue
  downvoteIssue: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.post(`issues/${id}/downvote/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to downvote issue');
    }
  },

  // Assign issue
  assignIssue: async (id: number, assignedToId: number): Promise<any> => {
    try {
      const response = await apiClient.post(`issues/${id}/assign/`, {
        assigned_to_id: assignedToId,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to assign issue');
    }
  },

  // Assign issue to me
  assignIssueToMe: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.post(`issues/${id}/assign_to_me/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to assign issue to you');
    }
  },

  // Get dashboard issues (for officials)
  getDashboardIssues: async (params?: {
    status?: string;
    category?: string;
  }): Promise<Issue[]> => {
    try {
      const response = await apiClient.get<any>('issues/dashboard/', { params });
      // Handle paginated response from DRF
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      throw new Error('Failed to fetch dashboard issues');
    }
  },

  // Get status history for issue
  getStatusHistory: async (issueId: number): Promise<StatusHistory[]> => {
    try {
      const response = await apiClient.get<any>('status-history/', {
        params: { issue_id: issueId },
      });
      // Handle paginated response from DRF
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      throw new Error('Failed to fetch status history');
    }
  },
};
