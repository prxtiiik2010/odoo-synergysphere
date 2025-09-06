import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Moon, Sun, User, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NotificationsDropdown } from "@/components/features/NotificationsDropdown";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export function Navbar({ isDark, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
  ];

  const isAuthenticated = localStorage.getItem("synergy-auth") === "true";

  const handleLogout = () => {
    localStorage.removeItem("synergy-auth");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 bg-primary-dark rounded-xl px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-lg font-bold text-white">S</span>
            </div>
            <span className="hidden font-bold text-white sm:inline-block">
              SynergySphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <NotificationsDropdown />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/my-tasks")}>
                      My Tasks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/photo-demo")}>
                      Photo Library Demo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/documents")}>
                      Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/analytics")}>
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/time-tracking")}>
                      Time Tracking
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}