import { useState } from 'react';
import { Settings, Save, Database, Globe, Clock, BellRing, Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SettingsPage = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();

  // Check if the user has appropriate role to access this page
  const hasAccess = user && (user.role === 'admin' || user.role === 'analyst');

  // Theme settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteTitle: 'InsightPulse Pro',
    siteDescription: 'Advanced analytics dashboard for business intelligence',
    timezone: 'UTC-5', // Eastern Time
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  // Export settings state
  const [exportSettings, setExportSettings] = useState({
    defaultFormat: 'csv',
    includeHeaders: true,
    autoExport: false,
    exportSchedule: 'weekly'
  });

  // API settings state
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
    rateLimiting: true,
    maxRequestsPerMinute: 60,
    logApiCalls: true
  });

  // Handle form submissions
  const handleSaveSettings = (settingType: string) => {
    toast({
      title: 'Settings Saved',
      description: `Your ${settingType} settings have been updated successfully.`
    });
  };

  // Go to access denied page if the user doesn't have the required role
  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]" data-id="2tnt6hg2q" data-path="src/pages/SettingsPage.tsx">
          <Alert variant="destructive">
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access the settings page. Please contact an administrator.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>);

  }

  return (
    <DashboardLayout>
      <div className="space-y-8" data-id="wu9fn83hx" data-path="src/pages/SettingsPage.tsx">
        <div data-id="8w9yb525x" data-path="src/pages/SettingsPage.tsx">
          <h1 className="text-2xl font-bold tracking-tight" data-id="qidqbv0d4" data-path="src/pages/SettingsPage.tsx">Settings</h1>
          <p className="text-muted-foreground" data-id="6pma46bhu" data-path="src/pages/SettingsPage.tsx">
            Configure your dashboard and system preferences.
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure basic settings for your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4" data-id="jvskx4c5f" data-path="src/pages/SettingsPage.tsx">
                  <div className="space-y-2" data-id="e1tjiu77r" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input
                      id="siteTitle"
                      value={generalSettings.siteTitle}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteTitle: e.target.value })} />

                  </div>
                  
                  <div className="space-y-2" data-id="w7ua6job9" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })} />

                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4" data-id="14thz86qu" data-path="src/pages/SettingsPage.tsx">
                  <h3 className="text-lg font-medium" data-id="gnxmv1uak" data-path="src/pages/SettingsPage.tsx">Regional Settings</h3>
                  
                  <div className="space-y-2" data-id="73gxada3w" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}>

                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                        <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                        <SelectItem value="UTC-6">UTC-6 (Central Time)</SelectItem>
                        <SelectItem value="UTC-7">UTC-7 (Mountain Time)</SelectItem>
                        <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                        <SelectItem value="UTC+1">UTC+1 (Central European Time)</SelectItem>
                        <SelectItem value="UTC+8">UTC+8 (China/Singapore)</SelectItem>
                        <SelectItem value="UTC+9">UTC+9 (Japan)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2" data-id="cqz24a0uv" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={generalSettings.dateFormat}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, dateFormat: value })}>

                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2" data-id="00zyqq014" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <RadioGroup
                      id="timeFormat"
                      value={generalSettings.timeFormat}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, timeFormat: value })}
                      className="flex gap-4">

                      <div className="flex items-center space-x-2" data-id="4r39du1ed" data-path="src/pages/SettingsPage.tsx">
                        <RadioGroupItem value="12h" id="12h" />
                        <Label htmlFor="12h">12-hour (AM/PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2" data-id="ln4rtnz9p" data-path="src/pages/SettingsPage.tsx">
                        <RadioGroupItem value="24h" id="24h" />
                        <Label htmlFor="24h">24-hour</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => handleSaveSettings('general')}>

                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Export Settings */}
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Export Settings
                </CardTitle>
                <CardDescription>
                  Configure how data is exported from the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4" data-id="d4iuohzrh" data-path="src/pages/SettingsPage.tsx">
                  <div className="space-y-2" data-id="i5q07vqd3" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="defaultFormat">Default Export Format</Label>
                    <Select
                      value={exportSettings.defaultFormat}
                      onValueChange={(value) => setExportSettings({ ...exportSettings, defaultFormat: value })}>

                      <SelectTrigger id="defaultFormat">
                        <SelectValue placeholder="Select export format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2" data-id="ta4tv87j1" data-path="src/pages/SettingsPage.tsx">
                    <div data-id="26vnknvoj" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="includeHeaders">Include Headers</Label>
                      <p className="text-sm text-muted-foreground" data-id="phytwhzus" data-path="src/pages/SettingsPage.tsx">
                        Include column headers in exported data
                      </p>
                    </div>
                    <Switch
                      id="includeHeaders"
                      checked={exportSettings.includeHeaders}
                      onCheckedChange={(checked) =>
                      setExportSettings({ ...exportSettings, includeHeaders: checked })
                      } />

                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4" data-id="h3szhqc7c" data-path="src/pages/SettingsPage.tsx">
                  <h3 className="text-lg font-medium" data-id="wawhvomuu" data-path="src/pages/SettingsPage.tsx">Automated Exports</h3>
                  
                  <div className="flex items-center justify-between space-x-2" data-id="k8znsv4qf" data-path="src/pages/SettingsPage.tsx">
                    <div data-id="l37hk05kt" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="autoExport">Schedule Exports</Label>
                      <p className="text-sm text-muted-foreground" data-id="590bbubgb" data-path="src/pages/SettingsPage.tsx">
                        Automatically export analytics data on a schedule
                      </p>
                    </div>
                    <Switch
                      id="autoExport"
                      checked={exportSettings.autoExport}
                      onCheckedChange={(checked) =>
                      setExportSettings({ ...exportSettings, autoExport: checked })
                      } />

                  </div>
                  
                  {exportSettings.autoExport &&
                  <div className="space-y-2" data-id="1y8htavk8" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="exportSchedule">Export Frequency</Label>
                      <Select
                      value={exportSettings.exportSchedule}
                      onValueChange={(value) => setExportSettings({ ...exportSettings, exportSchedule: value })}>

                        <SelectTrigger id="exportSchedule">
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly (Mondays)</SelectItem>
                          <SelectItem value="monthly">Monthly (1st of the month)</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1" data-id="6c6cc3fga" data-path="src/pages/SettingsPage.tsx">
                        Exports will be sent to the email address associated with your account.
                      </p>
                    </div>
                  }
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => handleSaveSettings('export')}>

                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* API Settings */}
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  API Settings
                </CardTitle>
                <CardDescription>
                  Manage API access and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTitle>Admin access required</AlertTitle>
                  <AlertDescription>
                    These settings require administrator privileges to modify. Changes may affect API access for all users.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4" data-id="l9aie4woz" data-path="src/pages/SettingsPage.tsx">
                  <div className="space-y-2" data-id="wtxj4ln44" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex space-x-2" data-id="bqmyf043z" data-path="src/pages/SettingsPage.tsx">
                      <Input
                        id="apiKey"
                        type="password"
                        value={apiSettings.apiKey}
                        onChange={(e) => setApiSettings({ ...apiSettings, apiKey: e.target.value })}
                        className="font-mono" />

                      <Button variant="outline" onClick={() => {
                        toast({
                          title: 'New API Key Generated',
                          description: 'A new API key has been generated. Make sure to save your changes.'
                        });
                        setApiSettings({
                          ...apiSettings,
                          apiKey: `sk_test_${Math.random().toString(36).substring(2, 15)}`
                        });
                      }}>
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1" data-id="t98ltym7w" data-path="src/pages/SettingsPage.tsx">
                      Keep this key secure. This key provides full access to your API.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4" data-id="uubgm15f6" data-path="src/pages/SettingsPage.tsx">
                  <h3 className="text-lg font-medium" data-id="qtgfz7b3x" data-path="src/pages/SettingsPage.tsx">Rate Limiting</h3>
                  
                  <div className="flex items-center justify-between space-x-2" data-id="8d4ruizo2" data-path="src/pages/SettingsPage.tsx">
                    <div data-id="2kwd40k90" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="rateLimiting">Enable Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground" data-id="ngsh613t2" data-path="src/pages/SettingsPage.tsx">
                        Limit the number of API requests per minute
                      </p>
                    </div>
                    <Switch
                      id="rateLimiting"
                      checked={apiSettings.rateLimiting}
                      onCheckedChange={(checked) =>
                      setApiSettings({ ...apiSettings, rateLimiting: checked })
                      } />

                  </div>
                  
                  {apiSettings.rateLimiting &&
                  <div className="space-y-2" data-id="5w54m8eoj" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="maxRequestsPerMinute">Max Requests Per Minute</Label>
                      <Input
                      id="maxRequestsPerMinute"
                      type="number"
                      min={10}
                      max={1000}
                      value={apiSettings.maxRequestsPerMinute}
                      onChange={(e) => setApiSettings({
                        ...apiSettings,
                        maxRequestsPerMinute: parseInt(e.target.value) || 60
                      })} />

                    </div>
                  }
                  
                  <div className="flex items-center justify-between space-x-2" data-id="3fp6xm4i2" data-path="src/pages/SettingsPage.tsx">
                    <div data-id="pa8bm1ukj" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="logApiCalls">Log API Calls</Label>
                      <p className="text-sm text-muted-foreground" data-id="qh1zq5tm5" data-path="src/pages/SettingsPage.tsx">
                        Keep a record of all API requests for monitoring
                      </p>
                    </div>
                    <Switch
                      id="logApiCalls"
                      checked={apiSettings.logApiCalls}
                      onCheckedChange={(checked) =>
                      setApiSettings({ ...apiSettings, logApiCalls: checked })
                      } />

                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => handleSaveSettings('API')}>

                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BellRing className="mr-2 h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4" data-id="7i0pxwp72" data-path="src/pages/SettingsPage.tsx">
                  <h3 className="text-lg font-medium" data-id="dwsxf8ec6" data-path="src/pages/SettingsPage.tsx">Theme</h3>
                  
                  <div className="grid grid-cols-3 gap-4" data-id="34a8zbcne" data-path="src/pages/SettingsPage.tsx">
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                      theme === 'light' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'hover:bg-gray-50'}`
                      }
                      onClick={() => setTheme('light')} data-id="2pwddschf" data-path="src/pages/SettingsPage.tsx">

                      <Sun className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium" data-id="jqbvteom6" data-path="src/pages/SettingsPage.tsx">Light</div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                      theme === 'dark' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'hover:bg-gray-50'}`
                      }
                      onClick={() => setTheme('dark')} data-id="ihonvfdz2" data-path="src/pages/SettingsPage.tsx">

                      <Moon className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium" data-id="0xpgh7rdn" data-path="src/pages/SettingsPage.tsx">Dark</div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                      theme === 'system' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'hover:bg-gray-50'}`
                      }
                      onClick={() => setTheme('system')} data-id="n0at6h90s" data-path="src/pages/SettingsPage.tsx">

                      <Monitor className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium" data-id="vw4y4d9g7" data-path="src/pages/SettingsPage.tsx">System</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4" data-id="gu9883ak8" data-path="src/pages/SettingsPage.tsx">
                  <h3 className="text-lg font-medium" data-id="4a3by7rei" data-path="src/pages/SettingsPage.tsx">Accessibility</h3>
                  
                  <div className="flex items-center justify-between space-x-2" data-id="q7eld8wui" data-path="src/pages/SettingsPage.tsx">
                    <div data-id="hkv28r8qa" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="highContrast">High Contrast Mode</Label>
                      <p className="text-sm text-muted-foreground" data-id="w6focg3wr" data-path="src/pages/SettingsPage.tsx">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch id="highContrast" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2" data-id="ltaea4ca6" data-path="src/pages/SettingsPage.tsx">
                    <div data-id="15y1t1lyc" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="reducedMotion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground" data-id="q1somxz63" data-path="src/pages/SettingsPage.tsx">
                        Minimize animations and transitions
                      </p>
                    </div>
                    <Switch id="reducedMotion" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2" data-id="zsdyqghco" data-path="src/pages/SettingsPage.tsx">
                    <div data-id="nurlo4r0h" data-path="src/pages/SettingsPage.tsx">
                      <Label htmlFor="largeText">Larger Text</Label>
                      <p className="text-sm text-muted-foreground" data-id="khana4fdu" data-path="src/pages/SettingsPage.tsx">
                        Increase text size throughout the dashboard
                      </p>
                    </div>
                    <Switch id="largeText" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => handleSaveSettings('appearance')}>

                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>);

};

export default SettingsPage;