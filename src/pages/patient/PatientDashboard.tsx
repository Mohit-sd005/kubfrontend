import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarPlus, FileText, Calendar } from 'lucide-react';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto p-6 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight">
              🧑‍⚕️ Patient Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your appointments and medical history with ease
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-green-600 shadow-md hover:shadow-lg transition-all">
            <Link to="/patient/appointments/new">
              <CalendarPlus className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
          </Button>
        </div>

        {/* Stats Section */}
        <DashboardStats />

        {/* Quick Access Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Upcoming Appointments */}
          <Card className="group shadow-card hover:shadow-xl transition-all rounded-2xl border border-blue-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
              </div>
              <CardDescription>Check and manage your scheduled visits</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/patient/appointments">View Appointments</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Medical Records */}
          <Card className="group shadow-card hover:shadow-xl transition-all rounded-2xl border border-green-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Medical Records</CardTitle>
              </div>
              <CardDescription>Access and review your medical history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/patient/records">View Records</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="group shadow-card hover:shadow-xl transition-all rounded-2xl border border-purple-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
                  <CalendarPlus className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </div>
              <CardDescription>Fast access to common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/patient/appointments/new">Book New Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/patient/appointments">Reschedule Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
