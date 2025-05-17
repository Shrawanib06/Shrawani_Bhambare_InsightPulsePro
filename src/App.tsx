import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UserManagementPage from "./pages/UserManagementPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route
          path="/dashboard"
          element={
          <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
          } />

          
          <Route
          path="/analytics"
          element={
          <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
          } />

          
          <Route
          path="/admin/users"
          element={
          <ProtectedRoute allowedRoles={['admin']}>
                <UserManagementPage />
              </ProtectedRoute>
          } />

          
          <Route
          path="/profile"
          element={
          <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
          } />

          
          <Route
          path="/settings"
          element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
                <SettingsPage />
              </ProtectedRoute>
          } />

          
          {/* Redirect /admin to /admin/users */}
          <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;