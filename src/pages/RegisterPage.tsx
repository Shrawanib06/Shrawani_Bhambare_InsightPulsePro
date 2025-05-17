import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields.',
        variant: 'destructive'
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match.',
        variant: 'destructive'
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Validation Error',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await register(email, name, password);
      toast({
        title: 'Registration Successful',
        description: 'Please check your email to verify your account.'
      });
      navigate('/verify-email', { state: { email } });
    } catch (error) {








      // Error is handled in the store
    }};return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4" data-id="kw9dxfa1v" data-path="src/pages/RegisterPage.tsx">
      <div className="max-w-md w-full space-y-8" data-id="c0de6l7ru" data-path="src/pages/RegisterPage.tsx">
        <div className="text-center" data-id="rk1khzu39" data-path="src/pages/RegisterPage.tsx">
          <div className="flex justify-center" data-id="1ies97aso" data-path="src/pages/RegisterPage.tsx">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-md" data-id="gcwqruics" data-path="src/pages/RegisterPage.tsx">
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900" data-id="yrkt6an8j" data-path="src/pages/RegisterPage.tsx">InsightPulse Pro</h1>
          <p className="mt-2 text-gray-600" data-id="wbjd98tzr" data-path="src/pages/RegisterPage.tsx">Sign up for your analytics dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details to create your account. A verification code will be sent to your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>}

            <form onSubmit={handleSubmit} className="space-y-4" data-id="5ss4ttuht" data-path="src/pages/RegisterPage.tsx">
              <div className="space-y-2" data-id="lf7iypvlq" data-path="src/pages/RegisterPage.tsx">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative" data-id="pzl3kw2df" data-path="src/pages/RegisterPage.tsx">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="name" type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  autoComplete="name" />

                </div>
              </div>

              <div className="space-y-2" data-id="cjb5scyqg" data-path="src/pages/RegisterPage.tsx">
                <Label htmlFor="email">Email</Label>
                <div className="relative" data-id="f3uwa4iet" data-path="src/pages/RegisterPage.tsx">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  autoComplete="email" />

                </div>
              </div>

              <div className="space-y-2" data-id="iq8lhwhti" data-path="src/pages/RegisterPage.tsx">
                <Label htmlFor="password">Password</Label>
                <div className="relative" data-id="2kyco5cld" data-path="src/pages/RegisterPage.tsx">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  autoComplete="new-password" />

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

              <div className="space-y-2" data-id="0rf8edj5o" data-path="src/pages/RegisterPage.tsx">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative" data-id="ium92h6sw" data-path="src/pages/RegisterPage.tsx">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  autoComplete="new-password" />

                </div>
              </div>

              <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}>

                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="mt-4" data-id="d53awl2h5" data-path="src/pages/RegisterPage.tsx">
              <p className="text-center text-sm text-gray-600" data-id="o511dehb0" data-path="src/pages/RegisterPage.tsx">
                Already have an account?{' '}
                <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500">

                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;

};

export default RegisterPage;