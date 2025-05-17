import { create } from 'zustand';
import { User, Role } from './authStore';

export interface LoginLog {
  id: string;
  userId: string;
  email: string;
  timestamp: string;
  success: boolean;
  ipAddress: string;
  userAgent: string;
}

interface UserState {
  users: User[];
  loginLogs: LoginLog[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchUsers: () => Promise<void>;
  fetchLoginLogs: () => Promise<void>;
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUserRole: (id: string, role: Role) => Promise<void>;
  selectUser: (id: string | null) => void;
  clearError: () => void;
}

// Mock API call
const mockApiCall = async <T,>(data: T, delay: number = 800): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Generate mock users
const generateMockUsers = (count: number = 20): User[] => {
  const roles: Role[] = ['admin', 'analyst', 'viewer'];
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const id = `user-${i + 1}`;
    const role = roles[i % roles.length];

    users.push({
      id,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      role,
      emailVerified: Math.random() > 0.2, // 80% chance of being verified
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return users;
};

// Generate mock login logs
const generateMockLoginLogs = (users: User[], count: number = 100): LoginLog[] => {
  const logs: LoginLog[] = [];

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const success = Math.random() > 0.1; // 90% success rate

    logs.push({
      id: `log-${i + 1}`,
      userId: user.id,
      email: user.email,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
      success,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
  }

  // Sort by timestamp (newest first)
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loginLogs: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  // Fetch all users
  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, we'd make an API call to fetch users
      const mockUsers = await mockApiCall(generateMockUsers());

      set({ users: mockUsers, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users'
      });
    }
  },

  // Fetch login logs
  fetchLoginLogs: async () => {
    set({ isLoading: true, error: null });

    try {
      // Get users first if not already loaded
      let users = get().users;
      if (users.length === 0) {
        users = generateMockUsers();
      }

      // In a real app, we'd make an API call to fetch login logs
      const mockLogs = await mockApiCall(generateMockLoginLogs(users));

      set({ loginLogs: mockLogs, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch login logs'
      });
    }
  },

  // Create a new user
  createUser: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, we'd make an API call to create a user
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString()
      };

      await mockApiCall({ success: true });

      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create user'
      });
    }
  },

  // Update a user
  updateUser: async (id, userData) => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, we'd make an API call to update a user
      await mockApiCall({ success: true });

      set((state) => ({
        users: state.users.map((user) =>
        user.id === id ? { ...user, ...userData } : user
        ),
        isLoading: false
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update user'
      });
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, we'd make an API call to delete a user
      await mockApiCall({ success: true });

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to delete user'
      });
    }
  },

  // Update a user's role
  updateUserRole: async (id, role) => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, we'd make an API call to update a user's role
      await mockApiCall({ success: true });

      set((state) => ({
        users: state.users.map((user) =>
        user.id === id ? { ...user, role } : user
        ),
        isLoading: false
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update user role'
      });
    }
  },

  // Select a user for viewing/editing
  selectUser: (id) => {
    if (id === null) {
      set({ selectedUser: null });
      return;
    }

    const user = get().users.find((u) => u.id === id) || null;
    set({ selectedUser: user });
  },

  // Clear error state
  clearError: () => set({ error: null })
}));