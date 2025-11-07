import axios from 'axios';

// Use VITE_API_URL if set (for production builds without proxy), otherwise use /api (for dev/proxy)
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface User {
  id: string;
  name: string;
}

export interface Attendance {
  id: string;
  name: string;
  is_attending: number;
}

export interface Option {
  id: string;
  name: string;
  added_by: string;
  added_by_name: string;
  section: string;
  vote_count: number;
  total_attending: number;
}

export const api = {
  // Users
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE}/users`);
    return response.data;
  },

  // Attendance
  getAttendance: async () => {
    const response = await axios.get(`${API_BASE}/attendance`);
    return response.data;
  },

  updateAttendance: async (userId: string, isAttending: boolean) => {
    const response = await axios.post(`${API_BASE}/attendance`, {
      userId,
      isAttending,
    });
    return response.data;
  },

  // Options
  getOptions: async () => {
    const response = await axios.get(`${API_BASE}/options`);
    return response.data;
  },

  addOption: async (name: string, addedBy: string, section: string) => {
    const response = await axios.post(`${API_BASE}/options`, {
      name,
      addedBy,
      section,
    });
    return response.data;
  },

  // Votes
  getUserVotes: async (userId: string) => {
    const response = await axios.get(`${API_BASE}/votes/${userId}`);
    return response.data;
  },

  submitVotes: async (userId: string, optionIds: string[]) => {
    const response = await axios.post(`${API_BASE}/votes`, {
      userId,
      optionIds,
    });
    return response.data;
  },
};

