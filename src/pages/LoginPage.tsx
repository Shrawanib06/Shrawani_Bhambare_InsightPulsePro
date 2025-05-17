import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

// Mock function to simulate Google OAuth - in a real implementation, you would use the Google OAuth API
const initGoogleAuth = (onSuccess: (googleToken: string) => void) => {
  // This would normally initialize the Google OAuth client
  console.log('Google OAuth initialized');

  // Exposing the mock login function to the window for demo purposes
  window.mockGoogleLogin = () => {
    // Create a mock token with user data (in a real app, this would come from Google)
    const mockPayload = {
      email: 'user@gmail.com',
      name: 'Google User',
      picture: 'https://i.pravatar.cc/150?img=3'
    };

    // Create a very simple mock JWT structure (header.payload.signature)
    const mockToken = [
    btoa(JSON.stringify({ alg: 'none' })),
    btoa(JSON.stringify(mockPayload)),
    'mock-signature'].
    join('.');

    onSuccess(mockToken);
  };
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin, isLoading, error, clearError } = useAuthStore();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // Initialize Google OAuth when component mounts
  useEffect(() => {
    initGoogleAuth(handleGoogleLogin);
    return () => {
      // Cleanup
      if (window.mockGoogleLogin) {
        delete window.mockGoogleLogin;
      }
    };
  }, []);

  const handleGoogleLogin = async (googleToken: string) => {
    setIsGoogleLoading(true);
    try {
      await googleLogin(googleToken);
      navigate(from, { replace: true });
    } catch (error) {



      // Error is handled in the store
    } finally {setIsGoogleLoading(false);}};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both email and password.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const result = await login(email, password);

      // Check if the login function returned a needsVerification flag
      if (result && result.needsVerification) {
        // Redirect to verification page with the email
        navigate('/verify-email', { state: { email: result.email } });
        toast({
          title: 'Verification Required',
          description: 'Please verify your email to continue.',
          variant: 'default'
        });
      } else if (!error) {
        // Normal login success flow - only navigate if there's no error
        navigate(from, { replace: true });
      }
    } catch (error) {

      // Error is handled in the store
    }};

  // For demo purposes, let's add quick login buttons
  const quickLogin = async (role: 'admin' | 'analyst' | 'viewer') => {
    const emails = {
      admin: 'admin@example.com',
      analyst: 'analyst@example.com',
      viewer: 'viewer@example.com'
    };

    setEmail(emails[role]);
    setPassword('password');

    try {
      const result = await login(emails[role], 'password');

      // Handle verification requirement for quick login too
      if (result && result.needsVerification) {
        navigate('/verify-email', { state: { email: result.email } });
        toast({
          title: 'Verification Required',
          description: 'Please verify your email to continue.',
          variant: 'default'
        });
      } else if (!error) {
        // Normal login success flow
        navigate(from, { replace: true });
      }
    } catch (error) {

      // Error is handled in the store
    }};

  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4" data-id="95k1elzyi" data-path="src/pages/LoginPage.tsx">
      <div className="max-w-md w-full space-y-8" data-id="b7v1u5i3r" data-path="src/pages/LoginPage.tsx">
        <div className="text-center" data-id="8e63xjkw7" data-path="src/pages/LoginPage.tsx">
          <div className="flex justify-center" data-id="ogfn4jhdc" data-path="src/pages/LoginPage.tsx">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-md" data-id="pzotrdk1i" data-path="src/pages/LoginPage.tsx">
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900" data-id="x9w2sb5bv" data-path="src/pages/LoginPage.tsx">InsightPulse Pro</h1>
          <p className="mt-2 text-gray-600" data-id="q2qzdr77v" data-path="src/pages/LoginPage.tsx">Your analytics dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>}

            <form onSubmit={handleSubmit} className="space-y-4" data-id="uenut6409" data-path="src/pages/LoginPage.tsx">
              <div className="space-y-2" data-id="itsgxaj5b" data-path="src/pages/LoginPage.tsx">
                <Label htmlFor="email">Email</Label>
                <div className="relative" data-id="t7elzfjmx" data-path="src/pages/LoginPage.tsx">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                autoComplete="email" />

                </div>
              </div>

              <div className="space-y-2" data-id="swrj7z8nn" data-path="src/pages/LoginPage.tsx">
                <div className="flex items-center justify-between" data-id="g9xbybcp1" data-path="src/pages/LoginPage.tsx">
                  <Label htmlFor="password">Password</Label>
                  <Link
                  to="/reset-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500">

                    Forgot password?
                  </Link>
                </div>
                <div className="relative" data-id="dosmi9evy" data-path="src/pages/LoginPage.tsx">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  autoComplete="current-password" />

                  <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}>

                    {showPassword ?
                  <EyeOff className="h-4 w-4 text-gray-400" /> :

                  <Eye className="h-4 w-4 text-gray-400" />
                  }
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2" data-id="kkjkz360o" data-path="src/pages/LoginPage.tsx">
                <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) =>
                setRememberMe(checked === true)
                } />

                <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" data-id="8em2w8gx8" data-path="src/pages/LoginPage.tsx">

                  Remember me
                </label>
              </div>

              <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}>

                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="relative mt-4" data-id="uba0un3l3" data-path="src/pages/LoginPage.tsx">
                <div className="absolute inset-0 flex items-center" data-id="bk7y5f5ci" data-path="src/pages/LoginPage.tsx">
                  <span className="w-full border-t border-gray-300" data-id="vuqmi374g" data-path="src/pages/LoginPage.tsx"></span>
                </div>
                <div className="relative flex justify-center text-sm" data-id="ibqaziygl" data-path="src/pages/LoginPage.tsx">
                  <span className="px-2 bg-white text-gray-500" data-id="3edssa93w" data-path="src/pages/LoginPage.tsx">Or continue with</span>
                </div>
              </div>
              
              <Button
              type="button"
              variant="outline"
              className="w-full mt-4 flex items-center justify-center gap-2"
              onClick={() => window.mockGoogleLogin && window.mockGoogleLogin()}
              disabled={isLoading || isGoogleLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" data-id="o0ofyp615" data-path="src/pages/LoginPage.tsx">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" data-id="w49qf5fke" data-path="src/pages/LoginPage.tsx" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" data-id="hvh9txnpx" data-path="src/pages/LoginPage.tsx" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" data-id="d5alze16c" data-path="src/pages/LoginPage.tsx" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" data-id="whhl88o27" data-path="src/pages/LoginPage.tsx" />
                </svg>
                {isGoogleLoading ? 'Signing in with Google...' : 'Sign in with Google'}
              </Button>
            </form>

            <div className="mt-4" data-id="nd8takhco" data-path="src/pages/LoginPage.tsx">
              <p className="text-center text-sm text-gray-600" data-id="ta5l02aqe" data-path="src/pages/LoginPage.tsx">
                Don't have an account?{' '}
                <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500">

                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6" data-id="psuy3aqkw" data-path="src/pages/LoginPage.tsx">
              <p className="text-center text-sm text-gray-500 mb-2" data-id="61kvpbvy3" data-path="src/pages/LoginPage.tsx">Demo quick access:</p>
              <div className="grid grid-cols-3 gap-2" data-id="43k8e9dcp" data-path="src/pages/LoginPage.tsx">
                <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin')}
                disabled={isLoading}>

                  Admin
                </Button>
                <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin('analyst')}
                disabled={isLoading}>

                  Analyst
                </Button>
                <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin('viewer')}
                disabled={isLoading}>

                  Viewer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;

};

// Add TypeScript interface to extend Window
declare global {
  interface Window {
    mockGoogleLogin?: () => void;
  }
}

export default LoginPage;