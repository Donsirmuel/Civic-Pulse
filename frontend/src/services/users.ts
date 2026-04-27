import apiClient from './apiClient';
import type{ User, UserProfile, OfficialMetrics, OfficialJurisdiction } from '../types';

let currentUserInFlight: Promise<User> | null = null;
const USER_UPDATED_EVENT_NAME = 'civic-user-updated';

function persistCurrentUser(user: User, notify = true): User {
  localStorage.setItem('currentUser', JSON.stringify(user));
  if (notify && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(USER_UPDATED_EVENT_NAME, { detail: user }));
  }
  return user;
}

function readCurrentUserFromStorage(): User | null {
  const stored = localStorage.getItem('currentUser');
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export const usersService = {
  // Get all users
  getUsers: async (params?: { search?: string }): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/users/', { params });
      return response.data;
    } catch {
      throw new Error('Failed to fetch users');
    }
  },

  // Get single user
  getUser: async (id: number): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/users/${id}/`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch user');
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const cached = readCurrentUserFromStorage();
    if (cached) return cached;

    if (currentUserInFlight) return currentUserInFlight;

    currentUserInFlight = (async () => {
      try {
        const response = await apiClient.get<User>('/users/me/');
        return persistCurrentUser(response.data, false);
      } finally {
        currentUserInFlight = null;
      }
    })();

    try {
      return await currentUserInFlight;
    } catch {
      throw new Error('Failed to fetch current user');
    }
  },

  setCurrentUser: (user: User): User => persistCurrentUser(user),

  getUserUpdatedEventName: (): string => USER_UPDATED_EVENT_NAME,

  updateCurrentUser: async (data: Partial<User>): Promise<User> => {
    try {
      const current = await usersService.getCurrentUser();
      const response = await apiClient.patch<User>(`/users/${current.id}/`, data);
      const merged = { ...current, ...response.data };
      return persistCurrentUser(merged);
    } catch {
      throw new Error('Failed to update current user');
    }
  },

  // Get user metrics
  getUserMetrics: async (userId: number): Promise<OfficialMetrics> => {
    try {
      const response = await apiClient.get<OfficialMetrics>(`/users/${userId}/metrics/`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch user metrics');
    }
  },
};

export const profilesService = {
  // Get all profiles
  getProfiles: async (): Promise<UserProfile[]> => {
    try {
      const response = await apiClient.get<UserProfile[]>('/profiles/');
      return response.data;
    } catch {
      throw new Error('Failed to fetch profiles');
    }
  },

  // Get single profile
  getProfile: async (id: number): Promise<UserProfile> => {
    try {
      const response = await apiClient.get<UserProfile>(`/profiles/${id}/`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch profile');
    }
  },

  // Get current user profile
  getCurrentProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get<UserProfile>('/profiles/me/');
      return response.data;
    } catch {
      throw new Error('Failed to fetch current profile');
    }
  },

  // Update profile
  updateProfile: async (id: number, data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const response = await apiClient.patch<UserProfile>(`/profiles/${id}/`, data);
      return response.data;
    } catch {
      throw new Error('Failed to update profile');
    }
  },

  // Create profile
  createProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const response = await apiClient.post<UserProfile>('/profiles/', data);
      return response.data;
    } catch {
      throw new Error('Failed to create profile');
    }
  },
};

export const jurisdictionService = {
  // Get all jurisdictions
  getJurisdictions: async (): Promise<OfficialJurisdiction[]> => {
    try {
      const response = await apiClient.get<OfficialJurisdiction[]>('/jurisdictions/');
      return response.data;
    } catch {
      throw new Error('Failed to fetch jurisdictions');
    }
  },

  // Get single jurisdiction
  getJurisdiction: async (id: number): Promise<OfficialJurisdiction> => {
    try {
      const response = await apiClient.get<OfficialJurisdiction>(`/jurisdictions/${id}/`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch jurisdiction');
    }
  },

  // Get current user's jurisdiction
  getMyJurisdiction: async (): Promise<OfficialJurisdiction> => {
    try {
      const response = await apiClient.get<OfficialJurisdiction>('/jurisdictions/me/');
      return response.data;
    } catch {
      throw new Error('Failed to fetch your jurisdiction');
    }
  },

  // Create jurisdiction
  createJurisdiction: async (data: Partial<OfficialJurisdiction>): Promise<OfficialJurisdiction> => {
    try {
      const response = await apiClient.post<OfficialJurisdiction>('/jurisdictions/', data);
      return response.data;
    } catch {
      throw new Error('Failed to create jurisdiction');
    }
  },

  // Update jurisdiction
  updateJurisdiction: async (id: number, data: Partial<OfficialJurisdiction>): Promise<OfficialJurisdiction> => {
    try {
      const response = await apiClient.patch<OfficialJurisdiction>(`/jurisdictions/${id}/`, data);
      return response.data;
    } catch {
      throw new Error('Failed to update jurisdiction');
    }
  },
};
