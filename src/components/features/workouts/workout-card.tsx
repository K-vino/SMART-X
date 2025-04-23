
import { PlayCircle, Clock, Calendar } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";
import { cn } from "@/lib/utils";

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  imageUrl?: string;
  targetMuscles?: string[];
}

interface WorkoutCardProps {
  workout: Workout;
  onClick?: () => void;
  className?: string;
}

export function WorkoutCard({ workout, onClick, className }: WorkoutCardProps) {
  const levelColor = {
    beginner: "bg-success text-success-foreground",
    intermediate: "bg-warning text-warning-foreground",
    advanced: "bg-destructive text-destructive-foreground",
  };

  return (
    <FeatureCard
      title={workout.name}
      description={workout.description}
      className={cn("cursor-pointer", className)}
      variant="outline"
      action={
        <button className="p-2 rounded-full bg-primary/10 text-primary">
          <PlayCircle size={20} />
        </button>
      }
      onClick={onClick}
    >
      <div className="relative h-32 w-full rounded-md overflow-hidden mb-3">
        <img
          src={workout.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
          alt={workout.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <span className={cn("text-xs px-2 py-1 rounded-full", levelColor[workout.level])}>
            {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{workout.duration} min</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{workout.category}</span>
        </div>
      </div>
    </FeatureCard>
  );
}
