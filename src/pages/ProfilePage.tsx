import { useState, useEffect, FormEvent } from 'react';
import { User, Shield, Key, Mail, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ProfilePage = () => {
  const { user, updateProfile, isLoading, error, clearError } = useAuthStore();
  const { toast } = useToast();

  // Form state for profile information
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });

  // Form state for security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Form state for notification preferences
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    activityDigest: true,
    securityAlerts: true
  });

  // Initialize form with user data when it becomes available
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  // Handle profile update form submission
  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!profileData.name) {
      toast({
        title: 'Validation Error',
        description: 'Name is required.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await updateProfile({ name: profileData.name });
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.'
      });
    } catch (error) {








      // Error is handled in the store
    }}; // Handle password change form submission
  const handlePasswordChange = async (e: FormEvent) => {e.preventDefault();clearError(); // Validate password fields
    if (!securityData.currentPassword) {toast({
        title: 'Current Password Required',
        description: 'Please enter your current password.',
        variant: 'destructive'
      });
      return;
    }

    if (!securityData.newPassword) {
      toast({
        title: 'New Password Required',
        description: 'Please enter a new password.',
        variant: 'destructive'
      });
      return;
    }

    if (securityData.newPassword.length < 8) {
      toast({
        title: 'Password Too Short',
        description: 'New password must be at least 8 characters long.',
        variant: 'destructive'
      });
      return;
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      toast({
        title: 'Passwords Don\'t Match',
        description: 'New password and confirmation do not match.',
        variant: 'destructive'
      });
      return;
    }

    // In a real app, this would call an API to change the password
    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully.'
    });

    // Reset form
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  // Handle notification settings update
  const handleNotificationUpdate = async (e: FormEvent) => {
    e.preventDefault();

    // In a real app, this would call an API to update notification settings
    toast({
      title: 'Preferences Updated',
      description: 'Your notification preferences have been saved.'
    });
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name.
    split(' ').
    map((part) => part[0]).
    join('').
    toUpperCase().
    substring(0, 2);
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]" data-id="jnvr3vvif" data-path="src/pages/ProfilePage.tsx">
          <Alert>
            <AlertTitle>Not authenticated</AlertTitle>
            <AlertDescription>
              You need to be logged in to view your profile.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>);

  }

  return (
    <DashboardLayout>
      <div className="space-y-8" data-id="ia4p843tv" data-path="src/pages/ProfilePage.tsx">
        <div data-id="0hdalifuo" data-path="src/pages/ProfilePage.tsx">
          <h1 className="text-2xl font-bold tracking-tight" data-id="pbluypa51" data-path="src/pages/ProfilePage.tsx">Your Profile</h1>
          <p className="text-muted-foreground" data-id="8syo7zcz4" data-path="src/pages/ProfilePage.tsx">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8" data-id="89qz5zr99" data-path="src/pages/ProfilePage.tsx">
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your personal information and status
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              
              <h3 className="text-xl font-semibold" data-id="heygc9fxp" data-path="src/pages/ProfilePage.tsx">{user.name}</h3>
              <p className="text-sm text-muted-foreground mb-2" data-id="1yxgxwi94" data-path="src/pages/ProfilePage.tsx">{user.email}</p>
              
              <Badge className="mb-4 capitalize" variant="outline">
                <Shield className="mr-1 h-3 w-3" />
                {user.role}
              </Badge>
              
              <div className="w-full space-y-2 mt-4" data-id="vtcxx8gzm" data-path="src/pages/ProfilePage.tsx">
                <div className="flex justify-between items-center p-2 rounded-md bg-gray-50" data-id="265j0lulg" data-path="src/pages/ProfilePage.tsx">
                  <span className="text-sm font-medium" data-id="hziasnh3i" data-path="src/pages/ProfilePage.tsx">Email Verification</span>
                  <div className="flex items-center" data-id="g4bzovnez" data-path="src/pages/ProfilePage.tsx">
                    {user.emailVerified ?
                    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge> :

                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Unverified
                      </Badge>
                    }
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-gray-50" data-id="fbh2s5jc0" data-path="src/pages/ProfilePage.tsx">
                  <span className="text-sm font-medium" data-id="7it8hjsef" data-path="src/pages/ProfilePage.tsx">Account Created</span>
                  <span className="text-sm" data-id="f55o40fl3" data-path="src/pages/ProfilePage.tsx">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex-1" data-id="q43gjnj7u" data-path="src/pages/ProfilePage.tsx">
            <Tabs defaultValue="profile">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <div className="mt-6" data-id="gv570cl0r" data-path="src/pages/ProfilePage.tsx">
                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {error &&
                      <Alert variant="destructive" className="mb-4">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      }
                      
                      <form id="profile-form" onSubmit={handleProfileUpdate} data-id="bih76fdmq" data-path="src/pages/ProfilePage.tsx">
                        <div className="space-y-4" data-id="eyaiwae6i" data-path="src/pages/ProfilePage.tsx">
                          <div className="space-y-2" data-id="moign2m98" data-path="src/pages/ProfilePage.tsx">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative" data-id="mcsgga1jh" data-path="src/pages/ProfilePage.tsx">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="name"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className="pl-10" />

                            </div>
                          </div>
                          
                          <div className="space-y-2" data-id="tcl7msmos" data-path="src/pages/ProfilePage.tsx">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative" data-id="xlho9tibt" data-path="src/pages/ProfilePage.tsx">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="email"
                                value={profileData.email}
                                disabled
                                className="pl-10" />

                            </div>
                            <p className="text-xs text-muted-foreground" data-id="czxuh7pk7" data-path="src/pages/ProfilePage.tsx">
                              Email address cannot be changed. Contact support for assistance.
                            </p>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        type="submit"
                        form="profile-form"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        disabled={isLoading}>

                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Update your password and security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form id="security-form" onSubmit={handlePasswordChange} data-id="uvge4lrlp" data-path="src/pages/ProfilePage.tsx">
                        <div className="space-y-4" data-id="vqvyo66pt" data-path="src/pages/ProfilePage.tsx">
                          <h3 className="text-lg font-medium" data-id="nuawgnvec" data-path="src/pages/ProfilePage.tsx">Change Password</h3>
                          
                          <div className="space-y-2" data-id="1z3v95j80" data-path="src/pages/ProfilePage.tsx">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative" data-id="0kv2mgsbx" data-path="src/pages/ProfilePage.tsx">
                              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="currentPassword"
                                type="password"
                                value={securityData.currentPassword}
                                onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                                className="pl-10" />

                            </div>
                          </div>
                          
                          <div className="space-y-2" data-id="w3dimq2lt" data-path="src/pages/ProfilePage.tsx">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative" data-id="tmbnwyk4c" data-path="src/pages/ProfilePage.tsx">
                              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="newPassword"
                                type="password"
                                value={securityData.newPassword}
                                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                                className="pl-10" />

                            </div>
                            <p className="text-xs text-muted-foreground" data-id="1ql8xotv0" data-path="src/pages/ProfilePage.tsx">
                              Password must be at least 8 characters long.
                            </p>
                          </div>
                          
                          <div className="space-y-2" data-id="10qjo4l9m" data-path="src/pages/ProfilePage.tsx">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative" data-id="k3veeqase" data-path="src/pages/ProfilePage.tsx">
                              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="confirmPassword"
                                type="password"
                                value={securityData.confirmPassword}
                                onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                className="pl-10" />

                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div className="space-y-4" data-id="vqoeysk0r" data-path="src/pages/ProfilePage.tsx">
                          <h3 className="text-lg font-medium" data-id="3i9r2f6xc" data-path="src/pages/ProfilePage.tsx">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between" data-id="y04uk4lqn" data-path="src/pages/ProfilePage.tsx">
                            <div data-id="lgcsv2cod" data-path="src/pages/ProfilePage.tsx">
                              <p className="font-medium" data-id="goyro9422" data-path="src/pages/ProfilePage.tsx">Authenticator App</p>
                              <p className="text-sm text-muted-foreground" data-id="9tpjd0e1n" data-path="src/pages/ProfilePage.tsx">
                                Use an authenticator app to generate one-time codes
                              </p>
                            </div>
                            <Button variant="outline">Set up</Button>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        type="submit"
                        form="security-form"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">

                        <Save className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Notifications Tab */}
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive notifications and updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form id="notifications-form" onSubmit={handleNotificationUpdate} data-id="ua20y03rf" data-path="src/pages/ProfilePage.tsx">
                        <div className="space-y-6" data-id="oheltmr08" data-path="src/pages/ProfilePage.tsx">
                          <div className="space-y-4" data-id="4opo2xjvj" data-path="src/pages/ProfilePage.tsx">
                            <div className="flex items-center justify-between" data-id="xb2x7ils9" data-path="src/pages/ProfilePage.tsx">
                              <div data-id="u42qg2bew" data-path="src/pages/ProfilePage.tsx">
                                <p className="font-medium" data-id="g2vt86qv8" data-path="src/pages/ProfilePage.tsx">Email Notifications</p>
                                <p className="text-sm text-muted-foreground" data-id="5wdgxzcxi" data-path="src/pages/ProfilePage.tsx">
                                  Receive notifications via email
                                </p>
                              </div>
                              <Switch
                                checked={notificationSettings.emailNotifications}
                                onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                                } />

                            </div>
                            
                            <div className="flex items-center justify-between" data-id="iv9vacfgu" data-path="src/pages/ProfilePage.tsx">
                              <div data-id="k6vzxtbj0" data-path="src/pages/ProfilePage.tsx">
                                <p className="font-medium" data-id="iot3kn7e2" data-path="src/pages/ProfilePage.tsx">Marketing Emails</p>
                                <p className="text-sm text-muted-foreground" data-id="q6frbr8xv" data-path="src/pages/ProfilePage.tsx">
                                  Receive marketing and promotional emails
                                </p>
                              </div>
                              <Switch
                                checked={notificationSettings.marketingEmails}
                                onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                                } />

                            </div>
                            
                            <div className="flex items-center justify-between" data-id="s0aqnizvr" data-path="src/pages/ProfilePage.tsx">
                              <div data-id="me9fpo1ps" data-path="src/pages/ProfilePage.tsx">
                                <p className="font-medium" data-id="w18rviwtp" data-path="src/pages/ProfilePage.tsx">Activity Digest</p>
                                <p className="text-sm text-muted-foreground" data-id="1r955ca2k" data-path="src/pages/ProfilePage.tsx">
                                  Weekly summary of your account activity
                                </p>
                              </div>
                              <Switch
                                checked={notificationSettings.activityDigest}
                                onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, activityDigest: checked })
                                } />

                            </div>
                            
                            <div className="flex items-center justify-between" data-id="2fxixibi4" data-path="src/pages/ProfilePage.tsx">
                              <div data-id="x4pptf3q3" data-path="src/pages/ProfilePage.tsx">
                                <p className="font-medium" data-id="g8zd6xo28" data-path="src/pages/ProfilePage.tsx">Security Alerts</p>
                                <p className="text-sm text-muted-foreground" data-id="igoo7l8lj" data-path="src/pages/ProfilePage.tsx">
                                  Important security-related notifications
                                </p>
                              </div>
                              <Switch
                                checked={notificationSettings.securityAlerts}
                                onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, securityAlerts: checked })
                                } />

                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        type="submit"
                        form="notifications-form"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">

                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>);

};

export default ProfilePage;