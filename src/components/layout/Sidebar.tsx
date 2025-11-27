import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  FileText,
  Users,
  LogOut,
  Stethoscope,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNavItems = () => {
    if (!user) return [];

    const baseItems = [
      { label: "Dashboard", path: `/${user.role}`, icon: Stethoscope },
    ];

    switch (user.role) {
      case "PATIENT":
        return [
          ...baseItems,
          { label: "Appointments", path: "/patient/appointments", icon: CalendarDays },
          { label: "Medical Records", path: "/patient/records", icon: FileText },
        ];
      case "DOCTOR":
        return [
          ...baseItems,
          { label: "Appointments", path: "/doctor/appointments", icon: CalendarDays },
          { label: "Patients", path: "/doctor/patients", icon: Users },
          { label: "Medical Records", path: "/doctor/records", icon: FileText },
        ];
      case "ADMIN":
        return [
          ...baseItems,
          { label: "Users", path: "/admin/users", icon: Users },
          { label: "Appointments", path: "/admin/appointments", icon: CalendarDays },
          { label: "Medical Records", path: "/admin/records", icon: FileText },
        ];
      default:
        return baseItems;
    }
  };

  if (!isAuthenticated) return null; // don’t show sidebar if not logged in

  const navItems = getNavItems();

  return (
    <aside className="w-64 h-screen bg-background border-r border-border shadow-md flex flex-col">
      {/* User Info */}
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
