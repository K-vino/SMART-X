
import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { HabitList } from "@/components/features/habit-tracker/habit-list";
import { AddHabit } from "@/components/features/habit-tracker/add-habit";
import { SuggestionsList } from "@/components/features/ai-assistant/suggestions-list";
import { WorkoutCard } from "@/components/features/workouts/workout-card";
import { TodayProgress } from "@/components/sections/today-progress";
import { mockHabits, mockSuggestions, mockWorkouts, dashboardStats } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Habit } from "@/components/features/habit-tracker/habit-list";
import { HabitSuggestions } from "@/components/features/ai-assistant/habit-suggestions";

const Index = () => {
  const [habits, setHabits] = useState(mockHabits);
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleToggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completedToday: !habit.completedToday }
        : habit
    ));
  };

  const handleAddHabit = (newHabit: Habit) => {
    setHabits(prevHabits => [newHabit, ...prevHabits]);
  };

  const completedCount = habits.filter(h => h.completedToday).length;
  
  return (
    <PageContainer 
      title="Dashboard" 
      subtitle="Let's build some smart habits"
    >
      <div className="space-y-6">
        <TodayProgress 
          completedCount={completedCount}
          totalCount={habits.length}
          currentStreak={dashboardStats.currentStreak}
        />
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Smart Suggestions</h2>
          <SuggestionsList 
            suggestions={mockSuggestions.slice(0, 2)} 
          />
          <div className="text-right mt-2">
            <Link to="/suggestions" className="text-xs text-primary font-medium">
              View all suggestions
            </Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Today's Habits</h2>
          <HabitList 
            habits={habits.slice(0, 3)} 
            onToggleHabit={handleToggleHabit} 
          />
          <div className="mt-3">
            <AddHabit onHabitAdded={handleAddHabit} />
          </div>
          <div className="mt-4">
            <HabitSuggestions />
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Recommended Workouts</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mockWorkouts.slice(0, 2).map((workout) => (
              <WorkoutCard 
                key={workout.id} 
                workout={workout} 
              />
            ))}
          </div>
          <div className="text-right mt-2">
            <Link to="/workouts" className="text-xs text-primary font-medium">
              View all workouts
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
