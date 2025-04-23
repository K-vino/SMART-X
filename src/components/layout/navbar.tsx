
import { Home, Calendar, PlusSquare, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: typeof Home;
  label: string;
  href: string;
}

export function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: Calendar,
      label: "Schedule",
      href: "/schedule",
    },
    {
      icon: PlusSquare,
      label: "Add",
      href: "/add",
    },
    {
      icon: BookOpen,
      label: "Learn",
      href: "/learn",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => (
          <NavbarItem 
            key={item.href} 
            {...item} 
            active={currentPath === item.href || 
              (item.href === "/schedule" && currentPath === "/habits")}
          />
        ))}
      </div>
    </div>
  );
}

function NavbarItem({ icon: Icon, label, href, active }: NavItem & { active: boolean }) {
  return (
    <Link
      to={href}
      className={cn(
        "flex flex-col items-center justify-center px-2 py-1 rounded-md transition-colors",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-primary"
      )}
    >
      <Icon size={22} className={cn(active ? "text-primary" : "text-muted-foreground")} />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}
