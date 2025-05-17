import { useEffect, useState } from 'react';
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  RefreshCw,
  UserPlus,
  Check,
  X,
  ShieldAlert,
  UserCog,
  Trash2,
  AlertTriangle } from
'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from
'@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useUserStore } from '@/store/userStore';
import { User, Role } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';

const UserManagementPage = () => {
  const {
    users,
    loginLogs,
    selectedUser,
    isLoading,
    error,
    fetchUsers,
    fetchLoginLogs,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole,
    selectUser
  } = useUserStore();

  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Form states for add user
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'viewer' as Role,
    emailVerified: true
  });

  // Current tab
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
    fetchLoginLogs();
  }, [fetchUsers, fetchLoginLogs]);

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Handle adding a new user
  const handleAddUser = async () => {
    if (!newUserData.name || !newUserData.email) {
      toast({
        title: 'Validation Error',
        description: 'Name and email are required.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await createUser(newUserData);
      setShowAddUserDialog(false);
      resetNewUserForm();
      toast({
        title: 'User Created',
        description: 'New user has been created successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create user',
        variant: 'destructive'
      });
    }
  };

  // Handle updating a user's role
  const handleUpdateRole = async (userId: string, role: Role) => {
    try {
      await updateUserRole(userId, role);
      toast({
        title: 'Role Updated',
        description: 'User role has been updated successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update role',
        variant: 'destructive'
      });
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      setShowDeleteDialog(false);
      selectUser(null);
      toast({
        title: 'User Deleted',
        description: 'User has been deleted successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete user',
        variant: 'destructive'
      });
    }
  };

  // Reset new user form
  const resetNewUserForm = () => {
    setNewUserData({
      name: '',
      email: '',
      role: 'viewer',
      emailVerified: true
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.
    split(' ').
    map((part) => part[0]).
    join('').
    toUpperCase().
    substring(0, 2);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8" data-id="xe7uvwwe3" data-path="src/pages/UserManagementPage.tsx">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0" data-id="2piy4w819" data-path="src/pages/UserManagementPage.tsx">
          <div data-id="ka3rwfogp" data-path="src/pages/UserManagementPage.tsx">
            <h1 className="text-2xl font-bold tracking-tight" data-id="mjda10s1x" data-path="src/pages/UserManagementPage.tsx">User Management</h1>
            <p className="text-muted-foreground" data-id="60gv1ecl1" data-path="src/pages/UserManagementPage.tsx">
              Manage user accounts and access permissions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2" data-id="s8hohhi8h" data-path="src/pages/UserManagementPage.tsx">
            <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account. The user will receive an email with login instructions.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4" data-id="b6ecj6nzb" data-path="src/pages/UserManagementPage.tsx">
                  <div className="space-y-2" data-id="vxnwdhz0f" data-path="src/pages/UserManagementPage.tsx">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUserData.name}
                      onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                      placeholder="John Doe" />

                  </div>
                  
                  <div className="space-y-2" data-id="4jkpm1eku" data-path="src/pages/UserManagementPage.tsx">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                      placeholder="john@example.com" />

                  </div>
                  
                  <div className="space-y-2" data-id="3opjr6xfo" data-path="src/pages/UserManagementPage.tsx">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUserData.role}
                      onValueChange={(value) => setNewUserData({ ...newUserData, role: value as Role })}>

                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600"
                    onClick={handleAddUser}
                    disabled={isLoading}>

                    {isLoading ? 'Creating...' : 'Create User'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                fetchUsers();
                fetchLoginLogs();
              }}
              disabled={isLoading}>

              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="login-logs">Login Logs</TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>
                  Manage all user accounts and their permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 mb-4" data-id="uzae88wk6" data-path="src/pages/UserManagementPage.tsx">
                  <div className="relative flex-1" data-id="t1ulyezx4" data-path="src/pages/UserManagementPage.tsx">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10" />

                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error &&
                <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                }

                {isLoading ?
                <div className="space-y-2" data-id="ysaba5ibu" data-path="src/pages/UserManagementPage.tsx">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div> :

                <div className="rounded-md border" data-id="0jjc7bnh5" data-path="src/pages/UserManagementPage.tsx">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length === 0 ?
                      <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No users found
                            </TableCell>
                          </TableRow> :

                      filteredUsers.map((user) =>
                      <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3" data-id="rz0cm3w5o" data-path="src/pages/UserManagementPage.tsx">
                                  <Avatar>
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                  </Avatar>
                                  <div data-id="8g0vsnmlb" data-path="src/pages/UserManagementPage.tsx">
                                    <p className="font-medium" data-id="oxpiv66m5" data-path="src/pages/UserManagementPage.tsx">{user.name}</p>
                                    <p className="text-sm text-muted-foreground" data-id="1hy05pgks" data-path="src/pages/UserManagementPage.tsx">{user.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                            variant="outline"
                            className={`
                                    ${user.role === 'admin' ? 'border-red-200 bg-red-50 text-red-700' :
                            user.role === 'analyst' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                            'border-gray-200 bg-gray-50 text-gray-700'}
                                  `}>

                                  {user.role === 'admin' &&
                            <ShieldAlert className="mr-1 h-3 w-3" />
                            }
                                  {user.role === 'analyst' &&
                            <UserCog className="mr-1 h-3 w-3" />
                            }
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {user.emailVerified ?
                          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                                    <Check className="mr-1 h-3 w-3" />
                                    Verified
                                  </Badge> :

                          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                                    <X className="mr-1 h-3 w-3" />
                                    Unverified
                                  </Badge>
                          }
                              </TableCell>
                              <TableCell>
                                {new Date(user.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                onClick={() => {
                                  alert('Edit user details would be implemented here');
                                }}>

                                      Edit details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                    <DropdownMenuItem
                                disabled={user.role === 'admin'}
                                onClick={() => handleUpdateRole(user.id, 'admin')}>

                                      Set as Admin
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                disabled={user.role === 'analyst'}
                                onClick={() => handleUpdateRole(user.id, 'analyst')}>

                                      Set as Analyst
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                disabled={user.role === 'viewer'}
                                onClick={() => handleUpdateRole(user.id, 'viewer')}>

                                      Set as Viewer
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  selectUser(user.id);
                                  setShowDeleteDialog(true);
                                }}>

                                      Delete user
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                      )
                      }
                      </TableBody>
                    </Table>
                  </div>
                }
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Login Logs Tab */}
          <TabsContent value="login-logs" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Login Activity</CardTitle>
                <CardDescription>
                  View all login attempts across the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4" data-id="3tdwy3wgt" data-path="src/pages/UserManagementPage.tsx">
                  <div className="relative flex-1" data-id="hsrdaybhy" data-path="src/pages/UserManagementPage.tsx">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10" />

                  </div>
                </div>

                {isLoading ?
                <div className="space-y-2" data-id="73t0zjs9x" data-path="src/pages/UserManagementPage.tsx">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div> :

                <div className="rounded-md border" data-id="7jn1yjn1d" data-path="src/pages/UserManagementPage.tsx">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>IP Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loginLogs.
                      filter((log) =>
                      log.email.toLowerCase().includes(searchTerm.toLowerCase())
                      ).
                      slice(0, 20) // Limit the number of logs shown
                      .map((log) =>
                      <TableRow key={log.id}>
                              <TableCell>{log.email}</TableCell>
                              <TableCell>{formatDate(log.timestamp)}</TableCell>
                              <TableCell>
                                {log.success ?
                          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                                    <Check className="mr-1 h-3 w-3" />
                                    Success
                                  </Badge> :

                          <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                                    <X className="mr-1 h-3 w-3" />
                                    Failed
                                  </Badge>
                          }
                              </TableCell>
                              <TableCell>{log.ipAddress}</TableCell>
                            </TableRow>
                      )}
                      </TableBody>
                    </Table>
                  </div>
                }
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser &&
          <div className="py-4" data-id="4jnj8xmk1" data-path="src/pages/UserManagementPage.tsx">
              <div className="flex items-center space-x-3" data-id="qzlijlyoi" data-path="src/pages/UserManagementPage.tsx">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{getInitials(selectedUser.name)}</AvatarFallback>
                </Avatar>
                <div data-id="yc88ij3r1" data-path="src/pages/UserManagementPage.tsx">
                  <p className="font-medium" data-id="gmdybtr6g" data-path="src/pages/UserManagementPage.tsx">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground" data-id="4guj1f1s2" data-path="src/pages/UserManagementPage.tsx">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          }
          
          <Alert variant="destructive" className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Deleting this user will remove all of their data and access rights.
            </AlertDescription>
          </Alert>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={isLoading}>

              {isLoading ? 'Deleting...' : 'Delete User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>);

};

export default UserManagementPage;