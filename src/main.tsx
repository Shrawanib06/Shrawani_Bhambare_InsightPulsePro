import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize ezsite API object
declare global {
  interface Window {
    ezsite: {
      apis: {
        tablePage: (tableId: number, params: any) => Promise<{ data: any; error: string | null }>;
        tableCreate: (tableId: number, data: any) => Promise<{ error: string | null; data?: any }>;
        tableUpdate: (tableId: number, data: any) => Promise<{ error: string | null }>;
        sendEmail: (params: any) => Promise<{ error: string | null }>;
      };
    };
    mockGoogleLogin?: () => void;
  }
}

// In-memory storage for mock data
const mockStorage = {
  users: [
    {
      ID: 1,
      email: 'admin@example.com',
      name: 'Admin User',
      password_hash: 'password',
      is_verified: true,
      verification_code: '',
      created_at: new Date().toISOString()
    },
    {
      ID: 2,
      email: 'analyst@example.com',
      name: 'Analyst User',
      password_hash: 'password',
      is_verified: true,
      verification_code: '',
      created_at: new Date().toISOString()
    },
    {
      ID: 3,
      email: 'viewer@example.com',
      name: 'Viewer User',
      password_hash: 'password',
      is_verified: true,
      verification_code: '',
      created_at: new Date().toISOString()
    }
  ]
};

// Debug function to log all mock storage state
const logMockState = () => {
  console.log('Current Mock Storage State:', {
    totalUsers: mockStorage.users.length,
    users: mockStorage.users
  });
};

// Mock implementation of ezsite APIs
window.ezsite = {
  apis: {
    tablePage: async (tableId: number, params: any) => {
      console.log('📖 Mock tablePage called with:', { tableId, params });
      await new Promise(resolve => setTimeout(resolve, 500));

      if (params.Filters?.[0]?.name === 'email') {
        const email = params.Filters[0].value;
        const user = mockStorage.users.find(u => u.email === email);
        console.log('📖 User lookup result:', user ? 'Found user' : 'User not found');
        return {
          data: {
            List: user ? [user] : [],
            Total: user ? 1 : 0
          },
          error: null
        };
      }

      return {
        data: {
          List: mockStorage.users,
          Total: mockStorage.users.length
        },
        error: null
      };
    },

    tableCreate: async (tableId: number, data: any) => {
      console.log('📝 Mock tableCreate called with:', { tableId, data });
      
      // Check if email already exists
      if (mockStorage.users.some(u => u.email === data.email)) {
        console.log('❌ Registration failed: Email already exists');
        return { error: 'Email already exists' };
      }

      // Create new user
      const newUser = {
        ID: mockStorage.users.length + 1,
        ...data,
        created_at: new Date().toISOString()
      };

      mockStorage.users.push(newUser);
      console.log('✅ New user created:', { id: newUser.ID, email: newUser.email });
      logMockState();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return { error: null, data: newUser };
    },

    tableUpdate: async (tableId: number, data: any) => {
      console.log('✏️ Mock tableUpdate called with:', { tableId, data });
      
      const userIndex = mockStorage.users.findIndex(u => u.ID === data.ID);
      if (userIndex !== -1) {
        mockStorage.users[userIndex] = {
          ...mockStorage.users[userIndex],
          ...data
        };
        console.log('✅ User updated:', { id: data.ID, updates: data });
        logMockState();
      } else {
        console.log('❌ Update failed: User not found');
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      return { error: null };
    },

    sendEmail: async (params: any) => {
      console.log('📧 Mock sendEmail called with:', params);
      
      let verificationCode = '';
      if (params.html) {
        const match = params.html.match(/strong>\s*(\d{6})\s*</);
        if (match) {
          verificationCode = match[1];
          console.log('🔑 VERIFICATION CODE:', verificationCode);
          console.log('📧 Email sent to:', params.to[0]);
          console.log(`
==========================================================
📨 Email Details:
To: ${params.to[0]}
Subject: ${params.subject}
Verification Code: ${verificationCode}
==========================================================
          `);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      return { error: null };
    }
  }
};

// Log initial state
console.log('🚀 Mock API initialized');
logMockState();

createRoot(document.getElementById("root")!).render(<App />);