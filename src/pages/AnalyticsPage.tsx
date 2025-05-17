import { useEffect, useState } from 'react';
import {
  BarChart3,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown } from
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'@/components/ui/table';
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from
'recharts';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAnalyticsStore } from '@/store/analyticsStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addDays, format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

// Type definition for the analytics metrics
interface MetricOption {
  value: string;
  label: string;
  color?: string;
}

const AnalyticsPage = () => {
  const {
    data,
    filters,
    isLoading,
    fetchAnalytics,
    updateFilters
  } = useAnalyticsStore();

  // State for date range picker
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: filters.dateRange.from,
    to: filters.dateRange.to
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const [sortConfig, setSortConfig] = useState<{key: string;direction: 'asc' | 'desc';}>({
    key: 'date',
    direction: 'desc'
  });

  // Available metrics
  const metricOptions: MetricOption[] = [
  { value: 'pageViews', label: 'Page Views', color: '#818cf8' },
  { value: 'uniqueVisitors', label: 'Unique Visitors', color: '#2563eb' },
  { value: 'bounceRate', label: 'Bounce Rate', color: '#ef4444' },
  { value: 'averageSessionDuration', label: 'Avg. Session Duration', color: '#f59e0b' },
  { value: 'conversions', label: 'Conversions', color: '#22c55e' },
  { value: 'revenue', label: 'Revenue', color: '#0891b2' }];


  // Selected metrics for charts
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
  'pageViews',
  'uniqueVisitors',
  'bounceRate']
  );

  useEffect(() => {
    // Fetch analytics data when component mounts
    fetchAnalytics();
  }, [fetchAnalytics]);

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

  // Handle metric selection changes
  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
      setSelectedMetrics([...selectedMetrics, metric]);
    } else {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    }
  };

  // Sort table data
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' ?
      aValue.localeCompare(bValue) :
      bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ?
      aValue - bValue :
      bValue - aValue;
    }

    return 0;
  });

  // Format values for display
  const formatValue = (key: string, value: number) => {
    switch (key) {
      case 'bounceRate':
        return `${(value * 100).toFixed(1)}%`;
      case 'averageSessionDuration':
        return `${value}s`;
      case 'revenue':
        return `$${value.toLocaleString()}`;
      default:
        return value.toLocaleString();
    }
  };

  // Mock export data function
  const handleExportData = () => {
    alert('Data export functionality would be implemented here in a real app.');
  };

  // Generate pie chart data
  const pieChartData = [
  { name: 'Desktop', value: Math.floor(Math.random() * 5000) + 5000 },
  { name: 'Mobile', value: Math.floor(Math.random() * 4000) + 3000 },
  { name: 'Tablet', value: Math.floor(Math.random() * 1500) + 500 }];


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <DashboardLayout>
      <div className="space-y-8" data-id="n6pumwq0b" data-path="src/pages/AnalyticsPage.tsx">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0" data-id="7j0u61ojd" data-path="src/pages/AnalyticsPage.tsx">
          <div data-id="fjl5yr9kp" data-path="src/pages/AnalyticsPage.tsx">
            <h1 className="text-2xl font-bold tracking-tight" data-id="1i9edmygo" data-path="src/pages/AnalyticsPage.tsx">Analytics</h1>
            <p className="text-muted-foreground" data-id="9ovv011lt" data-path="src/pages/AnalyticsPage.tsx">
              Detailed analysis of your performance metrics.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2" data-id="rush44fc5" data-path="src/pages/AnalyticsPage.tsx">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-full md:w-auto">

                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange.from ?
                  dateRange.to ?
                  <>
                        {format(dateRange.from, 'LLL dd, y')} -{' '}
                        {format(dateRange.to, 'LLL dd, y')}
                      </> :

                  format(dateRange.from, 'LLL dd, y') :


                  <span data-id="4h4o912rk" data-path="src/pages/AnalyticsPage.tsx">Pick a date</span>
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
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Metrics
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-4">
                <div className="space-y-3" data-id="gqsfngiz8" data-path="src/pages/AnalyticsPage.tsx">
                  <h4 className="font-medium" data-id="ap8f4wezn" data-path="src/pages/AnalyticsPage.tsx">Select Metrics</h4>
                  {metricOptions.map((metric) =>
                  <div key={metric.value} className="flex items-center space-x-2" data-id="ecwongl0q" data-path="src/pages/AnalyticsPage.tsx">
                      <Checkbox
                      id={`metric-${metric.value}`}
                      checked={selectedMetrics.includes(metric.value)}
                      onCheckedChange={(checked) =>
                      handleMetricChange(metric.value, checked === true)
                      } />

                      <Label
                      htmlFor={`metric-${metric.value}`}
                      className="text-sm font-normal cursor-pointer">

                        {metric.label}
                      </Label>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={handleExportData}>

              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => fetchAnalytics()}
              disabled={isLoading}>

              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Metrics Trends</CardTitle>
                <CardDescription>
                  Performance metrics over the selected time period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {isLoading ?
                <div className="flex items-center justify-center h-full" data-id="o0wjcs9no" data-path="src/pages/AnalyticsPage.tsx">
                    <Skeleton className="h-full w-full" />
                  </div> :

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      axisLine={false} />

                      <YAxis
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      axisLine={false} />

                      <Tooltip />
                      <Legend />
                      {selectedMetrics.map((metric, index) => {
                      const metricInfo = metricOptions.find((m) => m.value === metric);
                      return (
                        <Line
                          key={metric}
                          type="monotone"
                          dataKey={metric}
                          name={metricInfo?.label || metric}
                          stroke={metricInfo?.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }} />);


                    })}
                    </LineChart>
                  </ResponsiveContainer>
                }
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-id="n99jc40f4" data-path="src/pages/AnalyticsPage.tsx">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Conversions</CardTitle>
                  <CardDescription>
                    Revenue and conversion correlation
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  {isLoading ?
                  <div className="flex items-center justify-center h-full" data-id="k1n7ckolv" data-path="src/pages/AnalyticsPage.tsx">
                      <Skeleton className="h-full w-full" />
                    </div> :

                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.slice(-10)}>
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
                        dataKey="revenue"
                        name="Revenue"
                        fill="#0891b2"
                        radius={[4, 4, 0, 0]} />

                        <Bar
                        yAxisId="right"
                        dataKey="conversions"
                        name="Conversions"
                        fill="#22c55e"
                        radius={[4, 4, 0, 0]} />

                      </BarChart>
                    </ResponsiveContainer>
                  }
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Traffic by Device</CardTitle>
                  <CardDescription>
                    Distribution of visitors by device type
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  {isLoading ?
                  <div className="flex items-center justify-center h-full" data-id="iedcenvh4" data-path="src/pages/AnalyticsPage.tsx">
                      <Skeleton className="h-full w-full" />
                    </div> :

                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>

                          {pieChartData.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        )}
                        </Pie>
                        <Tooltip formatter={(value) => value.toLocaleString()} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  }
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Detailed Tab */}
          <TabsContent value="detailed" className="space-y-4">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Detailed Analytics Data</CardTitle>
                <CardDescription>
                  Day-by-day breakdown of all metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ?
                <div className="space-y-2" data-id="yl3s4w8qp" data-path="src/pages/AnalyticsPage.tsx">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div> :

                <div className="rounded-md border" data-id="81j3oc90h" data-path="src/pages/AnalyticsPage.tsx">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead
                          className="cursor-pointer"
                          onClick={() => requestSort('date')}>

                            <div className="flex items-center space-x-1" data-id="n6cr2weiy" data-path="src/pages/AnalyticsPage.tsx">
                              <span data-id="nib9bpmxc" data-path="src/pages/AnalyticsPage.tsx">Date</span>
                              {sortConfig.key === 'date' && (
                            sortConfig.direction === 'asc' ?
                            <ArrowUp className="h-3 w-3" /> :

                            <ArrowDown className="h-3 w-3" />)

                            }
                            </div>
                          </TableHead>
                          {metricOptions.map((metric) =>
                        <TableHead
                          key={metric.value}
                          className="cursor-pointer"
                          onClick={() => requestSort(metric.value)}>

                              <div className="flex items-center space-x-1" data-id="wsl7vuc8j" data-path="src/pages/AnalyticsPage.tsx">
                                <span data-id="anmfr9ua7" data-path="src/pages/AnalyticsPage.tsx">{metric.label}</span>
                                {sortConfig.key === metric.value && (
                            sortConfig.direction === 'asc' ?
                            <ArrowUp className="h-3 w-3" /> :

                            <ArrowDown className="h-3 w-3" />)

                            }
                              </div>
                            </TableHead>
                        )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedData.map((row) =>
                      <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            {metricOptions.map((metric) =>
                        <TableCell key={metric.value}>
                                {formatValue(metric.value, row[metric.value as keyof typeof row] as number)}
                              </TableCell>
                        )}
                          </TableRow>
                      )}
                      </TableBody>
                    </Table>
                  </div>
                }
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="c1rqnbsp5" data-path="src/pages/AnalyticsPage.tsx">
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Demographics</CardTitle>
                  <CardDescription>
                    Age and gender distribution
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  {isLoading ?
                  <div className="flex items-center justify-center h-full" data-id="tfva02wa5" data-path="src/pages/AnalyticsPage.tsx">
                      <Skeleton className="h-full w-full" />
                    </div> :

                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                      data={[
                      { age: '18-24', male: 20, female: 15, other: 5 },
                      { age: '25-34', male: 35, female: 25, other: 10 },
                      { age: '35-44', male: 25, female: 30, other: 8 },
                      { age: '45-54', male: 15, female: 20, other: 5 },
                      { age: '55-64', male: 10, female: 15, other: 3 },
                      { age: '65+', male: 5, female: 10, other: 2 }]
                      }>

                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="male" name="Male" fill="#0891b2" />
                        <Bar dataKey="female" name="Female" fill="#d946ef" />
                        <Bar dataKey="other" name="Other" fill="#a1a1aa" />
                      </BarChart>
                    </ResponsiveContainer>
                  }
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>
                    Top visitor countries
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  {isLoading ?
                  <div className="flex items-center justify-center h-full" data-id="6n0eax7v3" data-path="src/pages/AnalyticsPage.tsx">
                      <Skeleton className="h-full w-full" />
                    </div> :

                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                      layout="vertical"
                      data={[
                      { country: 'United States', visitors: 10500 },
                      { country: 'United Kingdom', visitors: 5300 },
                      { country: 'Canada', visitors: 4200 },
                      { country: 'Germany', visitors: 3700 },
                      { country: 'Australia', visitors: 2900 },
                      { country: 'France', visitors: 2400 },
                      { country: 'India', visitors: 2100 },
                      { country: 'Brazil', visitors: 1800 }]
                      }>

                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" />
                        <YAxis dataKey="country" type="category" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar
                        dataKey="visitors"
                        name="Visitors"
                        fill="#6366f1"
                        radius={[0, 4, 4, 0]} />

                      </BarChart>
                    </ResponsiveContainer>
                  }
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    How users find your platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  {isLoading ?
                  <div className="flex items-center justify-center h-full" data-id="3tqwj0qmp" data-path="src/pages/AnalyticsPage.tsx">
                      <Skeleton className="h-full w-full" />
                    </div> :

                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                      data={[
                      { source: 'Direct', visitors: 4200, percentage: 30 },
                      { source: 'Search Engines', visitors: 5600, percentage: 40 },
                      { source: 'Social Media', visitors: 2100, percentage: 15 },
                      { source: 'Referrals', visitors: 1400, percentage: 10 },
                      { source: 'Email', visitors: 700, percentage: 5 }]
                      }>

                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="source" />
                        <YAxis yAxisId="left" />
                        <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={(value) => `${value}%`} />

                        <Tooltip />
                        <Legend />
                        <Bar
                        yAxisId="left"
                        dataKey="visitors"
                        name="Visitors"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]} />

                        <Bar
                        yAxisId="right"
                        dataKey="percentage"
                        name="Percentage"
                        fill="#0ea5e9"
                        radius={[4, 4, 0, 0]} />

                      </BarChart>
                    </ResponsiveContainer>
                  }
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>);

};

export default AnalyticsPage;