
import { PageContainer } from "@/components/layout/page-container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Plus, Dumbbell, ListChecks, BookOpen, Calendar, Bell } from "lucide-react";

const Add = () => {
  const addOptions = [
    {
      title: "New Habit",
      description: "Create a daily or weekly habit to track",
      icon: <ListChecks className="h-5 w-5 text-primary" />,
      href: "/habits"
    },
    {
      title: "Quick Workout",
      description: "Start a workout session now",
      icon: <Dumbbell className="h-5 w-5 text-accent" />,
      href: "/workouts"
    },
    {
      title: "Learning Goal",
      description: "Add something new to learn",
      icon: <BookOpen className="h-5 w-5 text-secondary" />,
      href: "#"
    },
    {
      title: "Schedule Activity",
      description: "Plan a future activity or event",
      icon: <Calendar className="h-5 w-5 text-success" />,
      href: "#"
    },
    {
      title: "Custom Reminder",
      description: "Set a one-time or recurring reminder",
      icon: <Bell className="h-5 w-5 text-warning" />,
      href: "#"
    }
  ];

  return (
    <PageContainer title="Add New" subtitle="What would you like to create?">
      <div className="grid gap-4">
        {addOptions.map((option, index) => (
          <FeatureCard
            key={index}
            title={option.title}
            description={option.description}
            icon={option.icon}
            className="cursor-pointer"
            onClick={() => window.location.href = option.href}
            action={
              <div className="w-8 h-8 rounded-full bg-background border flex items-center justify-center">
                <Plus size={16} className="text-primary" />
              </div>
            }
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Add;
