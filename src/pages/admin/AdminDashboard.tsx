// src/pages/admin/AdminDashboard.tsx

import DashboardStats from "@/components/dashboard/DashboardStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, FileText, Calendar, Settings, Activity } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const cards = [
    {
      title: "User Management",
      desc: "Manage patients and doctors",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      link: "/admin/users",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Appointments",
      desc: "View all system appointments",
      icon: <Calendar className="h-6 w-6 text-green-500" />,
      link: "/admin/appointments",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Medical Records",
      desc: "Access all medical records",
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      link: "/admin/records",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "System Settings",
      desc: "Configure system parameters",
      icon: <Activity className="h-6 w-6 text-orange-500" />,
      link: "/admin/settings",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-6 py-12">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Welcome, Admin 👋
          </h1>
          <p className="mt-2 text-blue-100">
            Manage users, appointments, and system settings all in one place.
          </p>
          <div className="mt-4">
            <Link to="/admin/users">
              <Button className="bg-white text-indigo-700 font-semibold shadow hover:bg-gray-100">
                <Settings className="mr-2 h-4 w-4" />
                Manage System
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto p-6 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <DashboardStats />
        </motion.div>

        {/* Cards Section */}
        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="relative overflow-hidden shadow-lg group border-none">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-10 group-hover:opacity-20 transition-all pointer-events-none`}
                />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {card.icon}
                    <span>{card.title}</span>
                  </CardTitle>
                  <CardDescription>{card.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={card.link}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:border-indigo-500 group-hover:text-indigo-600"
                    >
                      Go to {card.title}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
