import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, FileText, Calendar, Plus } from 'lucide-react';

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight">
              👨‍⚕️ Doctor Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your patients, appointments, and medical records efficiently
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-purple-600 shadow-md hover:shadow-lg transition-all">
            <Link to="/doctor/records/new">
              <Plus className="mr-2 h-5 w-5" />
              Add Medical Record
            </Link>
          </Button>
        </div>

        {/* Stats Section */}
        <DashboardStats />

        {/* Quick Actions Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Appointments Card */}
          <Card className="group shadow-card hover:shadow-xl transition-all rounded-2xl border border-blue-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Today's Appointments</CardTitle>
              </div>
              <CardDescription>Stay updated with today’s schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/doctor/appointments">View Appointments</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Patients Card */}
          <Card className="group shadow-card hover:shadow-xl transition-all rounded-2xl border border-green-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Patients</CardTitle>
              </div>
              <CardDescription>Manage and monitor your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/doctor/patients">View Patients</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Medical Records Card */}
          <Card className="group shadow-card hover:shadow-xl transition-all rounded-2xl border border-purple-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Medical Records</CardTitle>
              </div>
              <CardDescription>Access and update patient history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/doctor/records">View Records</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
