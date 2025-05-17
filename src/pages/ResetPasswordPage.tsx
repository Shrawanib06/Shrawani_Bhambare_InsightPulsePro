import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'request' | 'verify' | 'success'>('request');
  const { resetPassword, confirmResetPassword, isLoading, error, clearError } = useAuthStore();
  const { toast } = useToast();

  const handleRequestReset = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await resetPassword(email);
      setStep('verify');
      toast({
        title: 'Reset Code Sent',
        description: 'We\'ve sent a 6-digit code to your email. Check your inbox.'
      });
    } catch (error) {








      // Error is handled in the store
    }};const handleConfirmReset = async (e: FormEvent) => {e.preventDefault();clearError();if (!otp || otp.length !== 6) {toast({
        title: 'Invalid Code',
        description: 'Please enter the 6-digit code sent to your email.',
        variant: 'destructive'
      });
      return;
    }

    if (!newPassword) {
      toast({
        title: 'Password Required',
        description: 'Please enter a new password.',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords Don\'t Match',
        description: 'The password and confirmation don\'t match.',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await confirmResetPassword(email, otp, newPassword);
      setStep('success');
      toast({
        title: 'Password Reset Complete',
        description: 'Your password has been successfully reset.'
      });
    } catch (error) {








      // Error is handled in the store
    }};return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4" data-id="m9s834q0v" data-path="src/pages/ResetPasswordPage.tsx">
      <div className="max-w-md w-full space-y-8" data-id="bv4lmpk9t" data-path="src/pages/ResetPasswordPage.tsx">
        <div className="text-center" data-id="ojhw9563z" data-path="src/pages/ResetPasswordPage.tsx">
          <div className="flex justify-center" data-id="nqzltqj5q" data-path="src/pages/ResetPasswordPage.tsx">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-md" data-id="9u878k0v2" data-path="src/pages/ResetPasswordPage.tsx">
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900" data-id="mp1syqtcz" data-path="src/pages/ResetPasswordPage.tsx">InsightPulse Pro</h1>
          <p className="mt-2 text-gray-600" data-id="bcxraon88" data-path="src/pages/ResetPasswordPage.tsx">Reset your password</p>
        </div>

        {step === 'request' && <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a code to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>}

              <form onSubmit={handleRequestReset} className="space-y-4" data-id="ptab7w3oe" data-path="src/pages/ResetPasswordPage.tsx">
                <div className="space-y-2" data-id="uwo5vc37w" data-path="src/pages/ResetPasswordPage.tsx">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative" data-id="1ue24cp00" data-path="src/pages/ResetPasswordPage.tsx">
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

                <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}>

                  {isLoading ? 'Sending reset code...' : 'Send reset code'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="link" asChild>
                <Link to="/login">Back to login</Link>
              </Button>
            </CardFooter>
          </Card>
      }

        {step === 'verify' &&
      <Card>
            <CardHeader>
              <CardTitle>Verify Your Identity</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to {email} and set your new password
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error &&
          <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
          }

              <form onSubmit={handleConfirmReset} className="space-y-4" data-id="txnz98ptg" data-path="src/pages/ResetPasswordPage.tsx">
                <div className="space-y-2" data-id="gwjvnxaph" data-path="src/pages/ResetPasswordPage.tsx">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="flex justify-center mb-4" data-id="ovs0emh48" data-path="src/pages/ResetPasswordPage.tsx">
                    <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                  autoComplete="one-time-code">

                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="space-y-2" data-id="4xizhbg3e" data-path="src/pages/ResetPasswordPage.tsx">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password" />

                </div>

                <div className="space-y-2" data-id="ha9br7jdy" data-path="src/pages/ResetPasswordPage.tsx">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password" />

                </div>

                <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}>

                  {isLoading ? 'Resetting password...' : 'Reset password'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="link" onClick={() => setStep('request')}>
                Start over
              </Button>
              <Button variant="link" asChild>
                <Link to="/login">Back to login</Link>
              </Button>
            </CardFooter>
          </Card>
      }

        {step === 'success' &&
      <Card>
            <CardHeader>
              <CardTitle>Password Reset Complete</CardTitle>
              <CardDescription>
                Your password has been successfully reset
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-green-100 p-3 text-green-600" data-id="70rz67zwb" data-path="src/pages/ResetPasswordPage.tsx">
                <ArrowRight className="h-6 w-6" />
              </div>
              <p className="text-center" data-id="xvl39021b" data-path="src/pages/ResetPasswordPage.tsx">
                You can now log in to your account with your new password.
              </p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link to="/login">Go to login</Link>
              </Button>
            </CardContent>
          </Card>
      }
      </div>
    </div>;

};

export default ResetPasswordPage;