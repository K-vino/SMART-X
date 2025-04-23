import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { 
  BarChart, 
  Settings, 
  ChevronRight, 
  Moon, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { BadgeStreak } from "@/components/ui/badge-streak";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("Alex Johnson");
  const [goal, setGoal] = useState("Build healthy habits");
  const [isEditing, setIsEditing] = useState(false);
  
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const menuItems = [
    {
      icon: <BarChart className="h-5 w-5 text-primary" />,
      label: "Statistics",
      href: "#"
    },
    {
      icon: <Bell className="h-5 w-5 text-warning" />,
      label: "Notifications",
      href: "#"
    },
    {
      icon: <Moon className="h-5 w-5 text-secondary" />,
      label: "Dark Mode",
      href: "#",
      isToggle: true
    },
    {
      icon: <Shield className="h-5 w-5 text-success" />,
      label: "Privacy",
      href: "#"
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-muted-foreground" />,
      label: "Help & Support",
      href: "#"
    },
    {
      icon: <LogOut className="h-5 w-5 text-destructive" />,
      label: "Logout",
      href: "#"
    }
  ];
  
  const handleEditProfile = () => {
    if (isEditing) {
      // Save changes
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
  
  return (
    <PageContainer title="Profile" subtitle="Your personal settings">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-card border rounded-xl p-6 flex flex-col items-center relative">
          <button 
            onClick={handleEditProfile}
            className="absolute right-4 top-4 text-primary text-sm font-medium"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          
          <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-primary">
              {name.split(' ').map(part => part[0]).join('')}
            </span>
          </div>
          
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold text-center bg-transparent border-b border-primary/30 outline-none w-full max-w-[200px]"
            />
          ) : (
            <h2 className="text-xl font-bold">{name}</h2>
          )}
          
          {isEditing ? (
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="text-sm text-muted-foreground text-center bg-transparent border-b border-primary/30 outline-none w-full max-w-[200px] mt-1"
            />
          ) : (
            <p className="text-sm text-muted-foreground">{goal}</p>
          )}
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">42</span>
              <span className="text-xs text-muted-foreground">Habits</span>
            </div>
            
            <div className="h-8 border-r border-border"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">86%</span>
              <span className="text-xs text-muted-foreground">Complete</span>
            </div>
            
            <div className="h-8 border-r border-border"></div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold">12</span>
                <BadgeStreak count={12} size="sm" variant="success" />
              </div>
              <span className="text-xs text-muted-foreground">Streak</span>
            </div>
          </div>
        </div>
        
        {/* Settings Menu */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              
              {item.isToggle ? (
                <div className="w-10 h-6 rounded-full bg-primary/20 relative">
                  <div className="absolute w-4 h-4 rounded-full bg-primary top-1 left-1"></div>
                </div>
              ) : (
                <ChevronRight size={18} className="text-muted-foreground" />
              )}
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            SMART X App Version 1.0.0
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
