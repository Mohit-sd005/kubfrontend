import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  FileText,
  Users,
  LogOut,
  User,
  Stethoscope,
} from "lucide-react";

const Navbar = () => {
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
      case "patient":
        return [
          ...baseItems,
          {
            label: "Appointments",
            path: "/patient/appointments",
            icon: CalendarDays,
          },
          { label: "Medical Records", path: "/patient/records", icon: FileText },
        ];
      case "doctor":
        return [
          ...baseItems,
          {
            label: "Appointments",
            path: "/doctor/appointments",
            icon: CalendarDays,
          },
          { label: "Patients", path: "/doctor/patients", icon: Users },
          { label: "Medical Records", path: "/doctor/records", icon: FileText },
        ];
      case "admin":
        return [
          ...baseItems,
          { label: "Users", path: "/admin/users", icon: Users },
          {
            label: "Appointments",
            path: "/admin/appointments",
            icon: CalendarDays,
          },
          { label: "Medical Records", path: "/admin/records", icon: FileText },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-background border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-primary">
            HealthCare Pro
          </Link>

          <div className="flex items-center space-x-6">
            {/* Navigation links */}
            <div className="hidden md:flex space-x-4">
              {isAuthenticated &&
                navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={item.path}
                      asChild
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <Link to={item.path}>
                        <IconComponent className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
            </div>

            {/* Welcome & User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full px-2"
                  >
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      👋 Welcome,{" "}
                      <span className="text-primary font-semibold">
                        {user?.name || "User"}
                      </span>
                    </span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <span className="text-gray-600">👋 Welcome, User</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
