import { useEffect, useState } from 'react';
import {
  BarChart3,
  Users,
  ArrowUp,
  ArrowDown,
  Clock,
  DollarSign,
  Activity,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  Calendar } from
'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import {
  Line,
  Bar,
  ComposedChart,
  LineChart,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area } from
'recharts';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAnalyticsStore } from '@/store/analyticsStore';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const {
    data,
    realtimeData,
    filters,
    isLoading,
    fetchAnalytics,
    updateFilters,
    startRealtimeUpdates,
    stopRealtimeUpdates
  } = useAnalyticsStore();

  // State for date range picker
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');

  // Calculate stats from data
  const totalPageViews = data.reduce((sum, item) => sum + item.pageViews, 0);
  const totalVisitors = data.reduce((sum, item) => sum + item.uniqueVisitors, 0);
  const avgBounceRate = data.reduce((sum, item) => sum + item.bounceRate, 0) / (data.length || 1);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  // Previous period data for comparison (mocked for simplicity)
  const prevTotalPageViews = totalPageViews * 0.85;
  const prevTotalVisitors = totalVisitors * 0.9;
  const prevAvgBounceRate = avgBounceRate * 1.1;
  const prevTotalRevenue = totalRevenue * 0.8;

  // Calculate percentage changes
  const pageViewsChange = (totalPageViews - prevTotalPageViews) / prevTotalPageViews * 100;
  const visitorsChange = (totalVisitors - prevTotalVisitors) / prevTotalVisitors * 100;
  const bounceRateChange = (avgBounceRate - prevAvgBounceRate) / prevAvgBounceRate * 100;
  const revenueChange = (totalRevenue - prevTotalRevenue) / prevTotalRevenue * 100;

  useEffect(() => {
    // Fetch analytics data when component mounts
    fetchAnalytics();

    // Start realtime updates
    startRealtimeUpdates();

    // Clean up when component unmounts
    return () => {
      stopRealtimeUpdates();
    };
  }, [fetchAnalytics, startRealtimeUpdates, stopRealtimeUpdates]);

  // Handle date range selection
  const handleDateRangeChange = (range: {from: Date;to: Date;}) => {
    setDateRange(range);
    updateFilters({ dateRange: range });
    setCalendarOpen(false);
  };

  // Handle predefined time range selection
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);

    let from = new Date();
    const to = new Date();

    switch (value) {
      case '7d':
        from = addDays(to, -7);
        break;
      case '30d':
        from = addDays(to, -30);
        break;
      case '90d':
        from = addDays(to, -90);
        break;
      case '1y':
        from = addDays(to, -365);
        break;
      default:
        from = addDays(to, -30);
    }

    setDateRange({ from, to });
    updateFilters({ dateRange: { from, to } });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8" data-id="3ty70kclo" data-path="src/pages/DashboardPage.tsx">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0" data-id="n4sfrw0lx" data-path="src/pages/DashboardPage.tsx">
          <div data-id="u4425skl9" data-path="src/pages/DashboardPage.tsx">
            <h1 className="text-2xl font-bold tracking-tight" data-id="j0vahgezk" data-path="src/pages/DashboardPage.tsx">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground" data-id="a811dmfll" data-path="src/pages/DashboardPage.tsx">
              Here's an overview of your analytics dashboard.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2" data-id="pucstk4tf" data-path="src/pages/DashboardPage.tsx">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal sm:w-auto w-full">

                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange.from ?
                  dateRange.to ?
                  <>
                        {format(dateRange.from, 'LLL dd, y')} -{' '}
                        {format(dateRange.to, 'LLL dd, y')}
                      </> :

                  format(dateRange.from, 'LLL dd, y') :


                  <span data-id="ga6tcxya1" data-path="src/pages/DashboardPage.tsx">Pick a date</span>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      handleDateRangeChange({ from: range.from, to: range.to });
                    }
                  }}
                  numberOfMonths={2} />

              </PopoverContent>
            </Popover>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="sm:w-[150px] w-full">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => fetchAnalytics()}
              disabled={isLoading}>

              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Real-time Stats */}
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-600" />
              Real-time Activity
            </CardTitle>
            <CardDescription>
              Live data as of {new Date(realtimeData.lastUpdated).toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="u5fqmmvng" data-path="src/pages/DashboardPage.tsx">
              <div className="flex items-center bg-white p-4 rounded-lg border border-blue-100 shadow-sm" data-id="5m100eyhr" data-path="src/pages/DashboardPage.tsx">
                <div className="p-2 rounded-full bg-blue-100 text-blue-700 mr-4" data-id="9wr6f7np3" data-path="src/pages/DashboardPage.tsx">
                  <Users className="h-5 w-5" />
                </div>
                <div data-id="uwiojnq7q" data-path="src/pages/DashboardPage.tsx">
                  <p className="text-sm font-medium text-gray-500" data-id="m1br88iel" data-path="src/pages/DashboardPage.tsx">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="22yetm9wa" data-path="src/pages/DashboardPage.tsx">{realtimeData.activeUsers}</p>
                </div>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg border border-blue-100 shadow-sm" data-id="8s75j4916" data-path="src/pages/DashboardPage.tsx">
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-700 mr-4" data-id="jrypg0srt" data-path="src/pages/DashboardPage.tsx">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div data-id="fmloqtz4z" data-path="src/pages/DashboardPage.tsx">
                  <p className="text-sm font-medium text-gray-500" data-id="q3q8p5ray" data-path="src/pages/DashboardPage.tsx">Pages / Minute</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="kx4qbpo4b" data-path="src/pages/DashboardPage.tsx">{realtimeData.pagesPerMinute}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-id="achejqvhd" data-path="src/pages/DashboardPage.tsx">
          {/* Page Views */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ?
              <Skeleton className="h-8 w-full mb-2" /> :

              <>
                  <div className="text-2xl font-bold" data-id="7tv9sriyh" data-path="src/pages/DashboardPage.tsx">{totalPageViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground" data-id="43mvohxel" data-path="src/pages/DashboardPage.tsx">
                    <span
                    className={`inline-flex items-center ${
                    pageViewsChange >= 0 ?
                    'text-green-600' :
                    'text-red-600'}`
                    } data-id="sny3ehgyx" data-path="src/pages/DashboardPage.tsx">

                      {pageViewsChange >= 0 ?
                    <ArrowUp className="mr-1 h-4 w-4" /> :

                    <ArrowDown className="mr-1 h-4 w-4" />
                    }
                      {Math.abs(pageViewsChange).toFixed(1)}%
                    </span>{' '}
                    from previous period
                  </p>
                </>
              }
            </CardContent>
          </Card>

          {/* Unique Visitors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ?
              <Skeleton className="h-8 w-full mb-2" /> :

              <>
                  <div className="text-2xl font-bold" data-id="5g31lyoyd" data-path="src/pages/DashboardPage.tsx">{totalVisitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground" data-id="cuuias3i9" data-path="src/pages/DashboardPage.tsx">
                    <span
                    className={`inline-flex items-center ${
                    visitorsChange >= 0 ?
                    'text-green-600' :
                    'text-red-600'}`
                    } data-id="v1nh89sbx" data-path="src/pages/DashboardPage.tsx">

                      {visitorsChange >= 0 ?
                    <ArrowUp className="mr-1 h-4 w-4" /> :

                    <ArrowDown className="mr-1 h-4 w-4" />
                    }
                      {Math.abs(visitorsChange).toFixed(1)}%
                    </span>{' '}
                    from previous period
                  </p>
                </>
              }
            </CardContent>
          </Card>

          {/* Bounce Rate */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ?
              <Skeleton className="h-8 w-full mb-2" /> :

              <>
                  <div className="text-2xl font-bold" data-id="kv2pom6vx" data-path="src/pages/DashboardPage.tsx">{(avgBounceRate * 100).toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground" data-id="s82dpnv9o" data-path="src/pages/DashboardPage.tsx">
                    <span
                    className={`inline-flex items-center ${
                    bounceRateChange <= 0 ?
                    'text-green-600' :
                    'text-red-600'}`
                    } data-id="hzfasbs4g" data-path="src/pages/DashboardPage.tsx">

                      {bounceRateChange <= 0 ?
                    <ArrowDown className="mr-1 h-4 w-4" /> :

                    <ArrowUp className="mr-1 h-4 w-4" />
                    }
                      {Math.abs(bounceRateChange).toFixed(1)}%
                    </span>{' '}
                    from previous period
                  </p>
                </>
              }
            </CardContent>
          </Card>

          {/* Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ?
              <Skeleton className="h-8 w-full mb-2" /> :

              <>
                  <div className="text-2xl font-bold" data-id="s0u9qlkdb" data-path="src/pages/DashboardPage.tsx">${totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground" data-id="l3t9h5krw" data-path="src/pages/DashboardPage.tsx">
                    <span
                    className={`inline-flex items-center ${
                    revenueChange >= 0 ?
                    'text-green-600' :
                    'text-red-600'}`
                    } data-id="da75t46k4" data-path="src/pages/DashboardPage.tsx">

                      {revenueChange >= 0 ?
                    <ArrowUp className="mr-1 h-4 w-4" /> :

                    <ArrowDown className="mr-1 h-4 w-4" />
                    }
                      {Math.abs(revenueChange).toFixed(1)}%
                    </span>{' '}
                    from previous period
                  </p>
                </>
              }
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2" data-id="aff42aecl" data-path="src/pages/DashboardPage.tsx">
          {/* Traffic Overview */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>
                Page views and unique visitors over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {isLoading ?
              <div className="flex items-center justify-center h-full" data-id="vrd9aa8vp" data-path="src/pages/DashboardPage.tsx">
                  <Skeleton className="h-full w-full" />
                </div> :

              <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={false} />

                    <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={false} />

                    <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={false} />

                    <Tooltip />
                    <Legend />
                    <Bar
                    yAxisId="left"
                    dataKey="pageViews"
                    name="Page Views"
                    fill="#818cf8"
                    radius={[4, 4, 0, 0]} />

                    <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="uniqueVisitors"
                    name="Unique Visitors"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }} />

                  </ComposedChart>
                </ResponsiveContainer>
              }
            </CardContent>
          </Card>

          {/* Conversion Metrics */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Conversion Metrics</CardTitle>
              <CardDescription>Bounce rate and conversions over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {isLoading ?
              <div className="flex items-center justify-center h-full" data-id="pbx97jtjk" data-path="src/pages/DashboardPage.tsx">
                  <Skeleton className="h-full w-full" />
                </div> :

              <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={false} />

                    <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={false}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`} />

                    <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={false} />

                    <Tooltip />
                    <Legend />
                    <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="bounceRate"
                    name="Bounce Rate"
                    stroke="#ef4444"
                    fill="#fee2e2"
                    strokeWidth={2}
                    formatter={(value) => `${(value * 100).toFixed(1)}%`} />

                    <Bar
                    yAxisId="right"
                    dataKey="conversions"
                    name="Conversions"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]} />

                  </ComposedChart>
                </ResponsiveContainer>
              }
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end" data-id="l5lm7epny" data-path="src/pages/DashboardPage.tsx">
          <Button variant="outline" className="flex items-center" onClick={() => navigate('/analytics')}>
            View detailed analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>);

};

export default DashboardPage;