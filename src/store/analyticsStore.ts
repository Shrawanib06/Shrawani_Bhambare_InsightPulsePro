import { create } from 'zustand';

export interface AnalyticsFilter {
  dateRange: {
    from: Date;
    to: Date;
  };
  metrics: string[];
  dimensions: string[];
  segments: string[];
}

export interface AnalyticsData {
  id: string;
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  averageSessionDuration: number;
  conversions: number;
  revenue: number;
}

interface AnalyticsState {
  data: AnalyticsData[];
  realtimeData: {
    activeUsers: number;
    pagesPerMinute: number;
    lastUpdated: string;
  };
  filters: AnalyticsFilter;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchAnalytics: (filters?: Partial<AnalyticsFilter>) => Promise<void>;
  startRealtimeUpdates: () => void;
  stopRealtimeUpdates: () => void;
  updateFilters: (filters: Partial<AnalyticsFilter>) => void;
  clearError: () => void;
}

// Mock WebSocket connection
let websocketInterval: number | null = null;

// Helper to get random data for demo purposes
const getRandomData = (days: number = 30): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      id: `data-${i}`,
      date: date.toISOString().split('T')[0],
      pageViews: Math.floor(Math.random() * 10000) + 1000,
      uniqueVisitors: Math.floor(Math.random() * 5000) + 500,
      bounceRate: Math.random() * 0.7 + 0.1,
      averageSessionDuration: Math.floor(Math.random() * 300) + 30,
      conversions: Math.floor(Math.random() * 100) + 10,
      revenue: Math.floor(Math.random() * 10000) + 1000
    });
  }

  return data;
};

// Mock API call
const mockApiCall = async <T,>(data: T, delay: number = 800): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  data: [],
  realtimeData: {
    activeUsers: 0,
    pagesPerMinute: 0,
    lastUpdated: new Date().toISOString()
  },
  filters: {
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date()
    },
    metrics: ['pageViews', 'uniqueVisitors', 'bounceRate'],
    dimensions: ['date'],
    segments: []
  },
  isLoading: false,
  error: null,

  // Fetch analytics data based on filters
  fetchAnalytics: async (filters?: Partial<AnalyticsFilter>) => {
    set({ isLoading: true, error: null });

    try {
      // Update filters if provided
      if (filters) {
        set((state) => ({
          filters: { ...state.filters, ...filters }
        }));
      }

      // In a real app, we'd send the filters to the API
      const currentFilters = filters ? { ...get().filters, ...filters } : get().filters;

      // Calculate the number of days in the selected date range
      const from = currentFilters.dateRange.from;
      const to = currentFilters.dateRange.to;
      const days = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // Get mock data based on date range
      const mockData = await mockApiCall(getRandomData(days));

      set({ data: mockData, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch analytics data'
      });
    }
  },

  // Start realtime updates using a simulated WebSocket connection
  startRealtimeUpdates: () => {
    if (websocketInterval) return; // Already running

    // Simulate WebSocket messages with random data
    websocketInterval = window.setInterval(() => {
      set({
        realtimeData: {
          activeUsers: Math.floor(Math.random() * 500) + 100,
          pagesPerMinute: Math.floor(Math.random() * 1000) + 100,
          lastUpdated: new Date().toISOString()
        }
      });
    }, 5000); // Update every 5 seconds
  },

  // Stop realtime updates
  stopRealtimeUpdates: () => {
    if (websocketInterval) {
      clearInterval(websocketInterval);
      websocketInterval = null;
    }
  },

  // Update filters
  updateFilters: (filters: Partial<AnalyticsFilter>) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters
      }
    }));

    // Fetch analytics with the new filters
    get().fetchAnalytics();
  },

  // Clear error state
  clearError: () => set({ error: null })
}));