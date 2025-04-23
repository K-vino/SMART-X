
import { Award, CircleCheck, CircleDashed } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

interface TodayProgressProps {
  completedCount: number;
  totalCount: number;
  currentStreak: number;
}

export function TodayProgress({ 
  completedCount, 
  totalCount,
  currentStreak 
}: TodayProgressProps) {
  const progressPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        title="Today's Progress"
        value={`${progressPercentage}%`}
        description={`${completedCount}/${totalCount} completed`}
        icon={completedCount === totalCount ? <CircleCheck className="h-5 w-5"/> : <CircleDashed className="h-5 w-5"/>}
        variant={progressPercentage >= 75 ? "success" : "default"}
      />
      
      <StatCard
        title="Current Streak"
        value={currentStreak}
        description="Keep it going!"
        icon={<Award className="h-5 w-5"/>}
        variant="warning"
      />
    </div>
  );
}
