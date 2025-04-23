
import { useState } from "react";
import { CheckCircle, Circle, MoreVertical, Trophy } from "lucide-react";
import { BadgeStreak } from "@/components/ui/badge-streak";
import { cn } from "@/lib/utils";

export interface Habit {
  id: string;
  name: string;
  description?: string;
  streak: number;
  frequencyType: "daily" | "weekly" | "custom";
  frequencyCount: number;
  completedToday: boolean;
  category?: string;
}

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
}

export function HabitList({ habits, onToggleHabit }: HabitListProps) {
  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitItem 
          key={habit.id} 
          habit={habit} 
          onToggleHabit={onToggleHabit} 
        />
      ))}
    </div>
  );
}

function HabitItem({ habit, onToggleHabit }: { habit: Habit, onToggleHabit: (habitId: string) => void }) {
  const handleToggle = () => {
    onToggleHabit(habit.id);
  };

  const getCategoryColor = (category?: string) => {
    const categoryColors: Record<string, string> = {
      "health": "bg-primary",
      "fitness": "bg-accent",
      "learning": "bg-secondary",
      "mindfulness": "bg-warning",
      "productivity": "bg-success",
    };
    
    return categoryColors[category || ""] || "bg-muted";
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border bg-card">
      <button 
        onClick={handleToggle} 
        className="shrink-0"
      >
        {habit.completedToday ? (
          <CheckCircle className="h-6 w-6 text-success" />
        ) : (
          <Circle className="h-6 w-6 text-muted-foreground" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium truncate">{habit.name}</h3>
          {habit.category && (
            <span className={cn("w-2 h-2 rounded-full", getCategoryColor(habit.category))} />
          )}
        </div>
        {habit.description && (
          <p className="text-xs text-muted-foreground truncate">{habit.description}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {habit.streak > 0 && (
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-warning" />
            <BadgeStreak count={habit.streak} size="sm" variant={habit.streak > 7 ? "success" : "default"} />
          </div>
        )}
        <button className="p-1">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
