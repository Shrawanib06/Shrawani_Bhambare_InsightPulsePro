import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Home,
  ChevronDown } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMobileScreen } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  path: string;
  label: string;
  icon: JSX.Element;
  roles: string[];
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  const isMobile = useMobileScreen();
  const [open, setOpen] = useState(false);

  const navigationItems: MenuItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <Home className="mr-2 h-4 w-4" />,
    roles: ['admin', 'analyst', 'viewer']
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
    roles: ['admin', 'analyst', 'viewer']
  },
  {
    path: '/admin/users',
    label: 'User Management',
    icon: <Users className="mr-2 h-4 w-4" />,
    roles: ['admin']
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: <User className="mr-2 h-4 w-4" />,
    roles: ['admin', 'analyst', 'viewer']
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: <Settings className="mr-2 h-4 w-4" />,
    roles: ['admin', 'analyst']
  }];


  // Filter navigation items based on user role
  const filteredItems = navigationItems.filter((item) =>
  user && item.roles.includes(user.role)
  );

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.'
    });
  };

  const getInitials = (name: string) => {
    return name.
    split(' ').
    map((part) => part[0]).
    join('').
    toUpperCase().
    substring(0, 2);
  };

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="6g01iydst" data-path="src/components/layouts/DashboardLayout.tsx">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30" data-id="1504udn0w" data-path="src/components/layouts/DashboardLayout.tsx">
        <div className="flex items-center" data-id="gml7fuk5x" data-path="src/components/layouts/DashboardLayout.tsx">
          {isMobile &&
          <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <div className="p-6 border-b border-gray-100" data-id="dxhs2jjk9" data-path="src/components/layouts/DashboardLayout.tsx">
                  <div className="flex items-center justify-between" data-id="luggapz7z" data-path="src/components/layouts/DashboardLayout.tsx">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1 rounded" data-id="fz344ltvu" data-path="src/components/layouts/DashboardLayout.tsx">
                        <BarChart3 className="h-5 w-5" />
                      </span>
                      <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600" data-id="0tfl7jzs7" data-path="src/components/layouts/DashboardLayout.tsx">
                        InsightPulse Pro
                      </span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-6rem)]">
                  <div className="py-4" data-id="lk7rph5pc" data-path="src/components/layouts/DashboardLayout.tsx">
                    <nav className="space-y-1 px-2" data-id="rzl319q50" data-path="src/components/layouts/DashboardLayout.tsx">
                      {filteredItems.map((item) =>
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActiveLink(item.path) ?
                      'bg-blue-50 text-blue-600' :
                      'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                      }>

                          {item.icon}
                          {item.label}
                        </Link>
                    )}
                    </nav>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          }

          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1 rounded" data-id="lksf0dsm3" data-path="src/components/layouts/DashboardLayout.tsx">
              <BarChart3 className="h-5 w-5" />
            </span>
            <span className="font-bold text-lg hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600" data-id="hpbstt05p" data-path="src/components/layouts/DashboardLayout.tsx">
              InsightPulse Pro
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-2" data-id="p6x6calch" data-path="src/components/layouts/DashboardLayout.tsx">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" data-id="kfr6y64t0" data-path="src/components/layouts/DashboardLayout.tsx"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 flex items-center space-x-2 p-1 pr-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                  <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start text-sm" data-id="ken16migu" data-path="src/components/layouts/DashboardLayout.tsx">
                  <span className="font-medium" data-id="hqf6wc4bj" data-path="src/components/layouts/DashboardLayout.tsx">{user?.name}</span>
                  <span className="text-xs text-gray-500 capitalize" data-id="339efgtf2" data-path="src/components/layouts/DashboardLayout.tsx">{user?.role}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1" data-id="8zsdct9zt" data-path="src/components/layouts/DashboardLayout.tsx">
        {/* Sidebar - Desktop only */}
        {!isMobile &&
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block" data-id="wxnt2c89p" data-path="src/components/layouts/DashboardLayout.tsx">
            <nav className="py-4 px-4 space-y-1" data-id="upiwzn8xx" data-path="src/components/layouts/DashboardLayout.tsx">
              {filteredItems.map((item) =>
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActiveLink(item.path) ?
              'bg-blue-50 text-blue-600' :
              'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
              }>

                  {item.icon}
                  {item.label}
                </Link>
            )}
            </nav>
          </aside>
        }

        {/* Main Content */}
        <main className="flex-1 overflow-auto" data-id="8yzycjs2f" data-path="src/components/layouts/DashboardLayout.tsx">
          <div className="container mx-auto py-6 px-4 max-w-7xl" data-id="g693ta50e" data-path="src/components/layouts/DashboardLayout.tsx">
            {children}
          </div>
        </main>
      </div>
    </div>);

};

export default DashboardLayout;