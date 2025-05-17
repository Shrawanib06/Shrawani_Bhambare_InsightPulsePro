import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { verifyEmail, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the email from location state if available
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: number | null = null;

    if (countdown > 0 && !canResend) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, canResend]);

  const handleSubmit = async (e: FormEvent) => {
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

    if (!otp || otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the 6-digit code sent to your email.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await verifyEmail(email, otp);
      toast({
        title: 'Email Verified',
        description: 'Your email has been successfully verified.',
        variant: 'default'
      });
      navigate('/login');
    } catch (error) {








      // Error is handled in the store
    }};const handleResendOtp = async () => {if (!email) {toast({ title: 'Email Required', description: 'Please enter your email address to resend the verification code.', variant: 'destructive'
        });
      return;
    }

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

      // Generate a new verification code
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Update the user's verification code
      const { error: updateError } = await window.ezsite.apis.tableUpdate(5779, {
        ID: userData.ID,
        verification_code: newVerificationCode
      });

      if (updateError) throw new Error(updateError);

      // Send verification email
      const { error: emailError } = await window.ezsite.apis.sendEmail({
        from: 'support@ezsite.ai',
        to: [email],
        subject: 'Your New Verification Code - InsightPulse Pro',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">InsightPulse Pro - New Verification Code</h2>
            <p>You requested a new verification code. Please use the code below:</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
              <strong>${newVerificationCode}</strong>
            </div>
            <p>This code will expire in 30 minutes.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
            <p>Best regards,<br>The InsightPulse Pro Team</p>
          </div>
        `
      });

      if (emailError) throw new Error(emailError);

      toast({
        title: 'Verification Code Sent',
        description: 'A new verification code has been sent to your email.'
      });
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend verification code';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4" data-id="8c8s8hlrh" data-path="src/pages/VerifyEmailPage.tsx">
      <div className="max-w-md w-full space-y-8" data-id="jo21t3gi3" data-path="src/pages/VerifyEmailPage.tsx">
        <div className="text-center" data-id="m09q4a2fq" data-path="src/pages/VerifyEmailPage.tsx">
          <div className="flex justify-center" data-id="nizbsm5pe" data-path="src/pages/VerifyEmailPage.tsx">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-md" data-id="yvb02qakn" data-path="src/pages/VerifyEmailPage.tsx">
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900" data-id="ecbvkq4yc" data-path="src/pages/VerifyEmailPage.tsx">InsightPulse Pro</h1>
          <p className="mt-2 text-gray-600" data-id="dk87n9o1k" data-path="src/pages/VerifyEmailPage.tsx">Verify your email</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to your email address. Enter the code below to verify your account. You only need to verify your email once during account creation.            
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error &&
            <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            }

            <form onSubmit={handleSubmit} className="space-y-6" data-id="y4px8xo1e" data-path="src/pages/VerifyEmailPage.tsx">
              <div className="space-y-2" data-id="sla0e7whn" data-path="src/pages/VerifyEmailPage.tsx">
                <p className="text-sm text-gray-500" data-id="3q9ehbdz9" data-path="src/pages/VerifyEmailPage.tsx">
                  Enter the 6-digit code sent to{' '}
                  <span className="font-medium text-gray-700" data-id="3qd5yqq3g" data-path="src/pages/VerifyEmailPage.tsx">{email || 'your email'}</span>
                </p>
                <div className="flex justify-center" data-id="m5xz3ls0s" data-path="src/pages/VerifyEmailPage.tsx">
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

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}>

                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <div className="flex justify-center" data-id="teb1f9p6j" data-path="src/pages/VerifyEmailPage.tsx">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-gray-600"
                  onClick={handleResendOtp}
                  disabled={!canResend}>

                  {canResend ?
                  'Resend Code' :
                  `Resend code in ${countdown} seconds`}
                </Button>
              </div>
            </form>

            <div className="mt-6 border-t pt-4" data-id="ugh6gtwe9" data-path="src/pages/VerifyEmailPage.tsx">
              <p className="text-center text-sm text-gray-600" data-id="8nbxiu7di" data-path="src/pages/VerifyEmailPage.tsx">
                Back to{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default VerifyEmailPage;