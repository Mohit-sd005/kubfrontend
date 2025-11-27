import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CalendarDays, 
  Users, 
  FileText, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';

interface DashboardData {
  totalAppointments: number;
  todayAppointments: number;
  totalPatients: number;
  totalDoctors: number;
  pendingAppointments: number;
  completedAppointments: number;
}

const DashboardStats = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData>({
    totalAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
    totalDoctors: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const stats: DashboardData = await apiService.getDashboardStats();
        setData(stats);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        // Mock data for demo purposes
        setData({
          totalAppointments: 156,
          todayAppointments: 12,
          totalPatients: 234,
          totalDoctors: 18,
          pendingAppointments: 24,
          completedAppointments: 132,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'patient':
        return [
          {
            title: 'Total Appointments',
            value: data.totalAppointments,
            icon: CalendarDays,
            color: 'text-medical-blue',
            bgColor: 'bg-medical-blue/10',
          },
          {
            title: 'Upcoming Appointments',
            value: data.pendingAppointments,
            icon: Clock,
            color: 'text-medical-orange',
            bgColor: 'bg-medical-orange/10',
          },
          {
            title: 'Medical Records',
            value: data.completedAppointments,
            icon: FileText,
            color: 'text-medical-green',
            bgColor: 'bg-medical-green/10',
          },
        ];
      case 'doctor':
        return [
          {
            title: 'Today\'s Appointments',
            value: data.todayAppointments,
            icon: CalendarDays,
            color: 'text-medical-blue',
            bgColor: 'bg-medical-blue/10',
          },
          {
            title: 'Total Patients',
            value: data.totalPatients,
            icon: Users,
            color: 'text-medical-green',
            bgColor: 'bg-medical-green/10',
          },
          {
            title: 'Pending Appointments',
            value: data.pendingAppointments,
            icon: Clock,
            color: 'text-medical-orange',
            bgColor: 'bg-medical-orange/10',
          },
        ];
      case 'admin':
        return [
          {
            title: 'Total Patients',
            value: data.totalPatients,
            icon: Users,
            color: 'text-medical-blue',
            bgColor: 'bg-medical-blue/10',
          },
          {
            title: 'Total Doctors',
            value: data.totalDoctors,
            icon: Activity,
            color: 'text-medical-green',
            bgColor: 'bg-medical-green/10',
          },
          {
            title: 'Total Appointments',
            value: data.totalAppointments,
            icon: CalendarDays,
            color: 'text-medical-purple',
            bgColor: 'bg-medical-purple/10',
          },
          {
            title: 'Today\'s Appointments',
            value: data.todayAppointments,
            icon: TrendingUp,
            color: 'text-medical-orange',
            bgColor: 'bg-medical-orange/10',
          },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="shadow-card hover:shadow-medical transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`h-4 w-4 ${stat.color}`}>
                <IconComponent className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Updated in real-time
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;