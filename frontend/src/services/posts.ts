import apiClient from './apiClient';
import type{ Post } from '../types';

export const postsService = {
  // Get all posts
  getPosts: async (params?: {
    ordering?: string;
    search?: string;
  }): Promise<Post[]> => {
    try {
      const response = await apiClient.get<any>('posts/', { params });
      // Handle paginated response from DRF
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },

  // Get single post
  getPost: async (id: number): Promise<Post> => {
    try {
      const response = await apiClient.get<Post>(`posts/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch post');
    }
  },

  // Create post
  createPost: async (data: {
    content: string;
    image_url?: string;
    scope?: string;
  }): Promise<Post> => {
    try {
      const response = await apiClient.post<Post>('posts/', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post');
    }
  },

  // Update post
  updatePost: async (id: number, data: Partial<Post>): Promise<Post> => {
    try {
      const response = await apiClient.patch<Post>(`posts/${id}/`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  },

  // Delete post
  deletePost: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`posts/${id}/`);
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  },

  // Like post
  likePost: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.post(`posts/${id}/like/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to like post');
    }
  },

  // Unlike post
  unlikePost: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.post(`posts/${id}/unlike/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to unlike post');
    }
  },
};
