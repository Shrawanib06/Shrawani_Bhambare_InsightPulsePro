import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'admin' | 'analyst' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (googleToken: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

// Mock API calls with a delay to simulate network requests
const mockApiCall = async <T,>(data: T, error?: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(data);
      }
    }, 800);
  });
};

// Create the store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Query the database to find the user by email
          const { data, error: queryError } = await window.ezsite.apis.tablePage(5779, {
            PageNo: 1,
            PageSize: 1,
            Filters: [
            {
              name: "email",
              op: "Equal",
              value: email
            }]

          });

          if (queryError) throw new Error(queryError);

          if (!data || !data.List || data.List.length === 0) {
            throw new Error('Invalid email or password');
          }

          const userData = data.List[0];

          // Check password (in a real app, this would compare hashed passwords)
          if (userData.password_hash !== password) {
            throw new Error('Invalid email or password');
          }

          // Check if email is verified - instead of throwing an error, return an object indicating verification is needed
          if (!userData.is_verified) {
            set({
              isLoading: false,
              error: 'Please verify your email before logging in.'
            });
            // Return a special flag that the login handler can use to redirect
            return { needsVerification: true, email: userData.email };
          }

          // Construct user object for the application
          const response = {
            user: {
              id: userData.ID.toString(),
              email: userData.email,
              name: userData.name,
              role: email.includes('admin') ? 'admin' : email.includes('analyst') ? 'analyst' : 'viewer',
              emailVerified: userData.is_verified,
              createdAt: userData.created_at
            },
            token: 'auth-token-' + Date.now(), // In a real app, this would be a JWT
            refreshToken: 'refresh-token-' + Date.now()
          };

          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false
          });

          console.log(`Login attempt: ${email} - Success`);
        } catch (error) {
          console.log(`Login attempt: ${email} - Failed`);
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          });
        }
      },

      // Register action
      register: async (email: string, name: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Generate a 6-digit verification code
          const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

          // Store user in the database with verification code
          const { error: createError } = await window.ezsite.apis.tableCreate(5779, {
            email,
            name,
            password_hash: password, // In a real app, this would be hashed
            verification_code: verificationCode,
            is_verified: false,
            created_at: new Date().toISOString()
          });

          if (createError) throw new Error(createError);

          // Send verification email
          const { error: emailError } = await window.ezsite.apis.sendEmail({
            from: 'support@ezsite.ai',
            to: [email],
            subject: 'Verify Your InsightPulse Pro Account',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4f46e5;">Welcome to InsightPulse Pro!</h2>
                <p>Thanks for signing up. To complete your registration, please use the verification code below:</p>
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
                  <strong>${verificationCode}</strong>
                </div>
                <p>This code will expire in 30 minutes.</p>
                <p>If you didn't request this verification, please ignore this email.</p>
                <p>Best regards,<br>The InsightPulse Pro Team</p>
              </div>
            `
          });

          if (emailError) throw new Error(emailError);

          set({ isLoading: false });
          console.log(`Registration success: ${email}. Verification email sent.`);
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed'
          });
        }
      },

      // Logout action
      // Google Login action
      googleLogin: async (googleToken: string) => {
        set({ isLoading: true, error: null });
        try {
          // This would normally validate the Google token with Google's API
          // For this implementation, we'll extract the user info from the token (simplified)

          // Parse the token to get email and name (in a real app, you'd verify this token with Google)
          // This is a simplified mock implementation
          const tokenData = JSON.parse(atob(googleToken.split('.')[1]));
          const email = tokenData.email;
          const name = tokenData.name || email.split('@')[0];

          // Check if the user already exists in our database
          const { data, error: queryError } = await window.ezsite.apis.tablePage(5779, {
            PageNo: 1,
            PageSize: 1,
            Filters: [
            {
              name: "email",
              op: "Equal",
              value: email
            }]

          });

          if (queryError) throw new Error(queryError);

          let userData;

          if (!data || !data.List || data.List.length === 0) {
            // User doesn't exist, create a new account
            const { error: createError, data: newUser } = await window.ezsite.apis.tableCreate(5779, {
              email,
              name,
              password_hash: 'google-oauth-' + Date.now(), // Random secure string for OAuth users
              verification_code: '',
              is_verified: true, // Google already verified their email
              created_at: new Date().toISOString()
            });

            if (createError) throw new Error(createError);

            // Get the newly created user (in real app, the create API might return the created object)
            const { data: newUserData, error: newUserError } = await window.ezsite.apis.tablePage(5779, {
              PageNo: 1,
              PageSize: 1,
              Filters: [
              {
                name: "email",
                op: "Equal",
                value: email
              }]

            });

            if (newUserError) throw new Error(newUserError);
            if (!newUserData || !newUserData.List || newUserData.List.length === 0) {
              throw new Error('Failed to create user account');
            }

            userData = newUserData.List[0];
          } else {
            // User exists
            userData = data.List[0];

            // If the user wasn't previously verified through Google, mark them as verified
            if (!userData.is_verified) {
              await window.ezsite.apis.tableUpdate(5779, {
                ID: userData.ID,
                is_verified: true
              });
              userData.is_verified = true;
            }
          }

          // Construct user object for the application
          const response = {
            user: {
              id: userData.ID.toString(),
              email: userData.email,
              name: userData.name,
              role: email.includes('admin') ? 'admin' : email.includes('analyst') ? 'analyst' : 'viewer',
              emailVerified: true,
              createdAt: userData.created_at
            },
            token: 'google-auth-token-' + Date.now(), // In a real app, this would be a JWT
            refreshToken: 'google-refresh-token-' + Date.now()
          };

          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false
          });

          console.log(`Google login success: ${email}`);
        } catch (error) {
          console.error('Google login error:', error);
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Google login failed'
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false
        });
      },

      // Verify Email action
      verifyEmail: async (email: string, otp: string) => {
        set({ isLoading: true, error: null });
        try {
          // Query the database to find the user by email
          const { data, error: queryError } = await window.ezsite.apis.tablePage(5779, {
            PageNo: 1,
            PageSize: 1,
            Filters: [
            {
              name: "email",
              op: "Equal",
              value: email
            }]

          });

          if (queryError) throw new Error(queryError);

          if (!data || !data.List || data.List.length === 0) {
            throw new Error('User not found. Please check your email address.');
          }

          const userData = data.List[0];

          // Verify the OTP
          if (userData.verification_code !== otp) {
            throw new Error('Invalid verification code. Please try again.');
          }

          // Update the user's verification status
          const { error: updateError } = await window.ezsite.apis.tableUpdate(5779, {
            ID: userData.ID,
            is_verified: true
          });

          if (updateError) throw new Error(updateError);

          // If the user is already logged in, update their emailVerified status
          const { user } = get();
          if (user && user.email === email) {
            set({
              user: { ...user, emailVerified: true },
              isLoading: false
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Email verification failed'
          });
        }
      },

      // Reset Password action
      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call to /reset-password
          await mockApiCall({ success: true });

          set({ isLoading: false });
          console.log(`Password reset email sent to: ${email}`);
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Password reset request failed'
          });
        }
      },

      // Confirm Reset Password action
      confirmResetPassword: async (email: string, otp: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call to /reset-password/confirm
          await mockApiCall({ success: true });

          set({ isLoading: false });
          console.log(`Password has been reset for: ${email}`);
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Password reset failed'
          });
        }
      },

      // Update Profile action
      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = get();
          if (!user) throw new Error('Not authenticated');

          // Mock API call to update profile
          await mockApiCall({ success: true });

          set({
            user: { ...user, ...userData },
            isLoading: false
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Profile update failed'
          });
        }
      },

      // Clear error state
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      // Don't persist the loading and error states
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);