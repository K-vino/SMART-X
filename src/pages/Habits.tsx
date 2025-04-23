
import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { HabitList, Habit } from "@/components/features/habit-tracker/habit-list";
import { AddHabit } from "@/components/features/habit-tracker/add-habit";
import { mockHabits } from "@/data/mock-data";
import { CalendarIcon, ListFilter } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HabitSuggestions } from "@/components/features/ai-assistant/habit-suggestions";

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
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
  
  const categories = ["All", "health", "fitness", "learning", "mindfulness", "productivity"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredHabits = habits.filter(habit => 
    activeCategory === "All" || habit.category === activeCategory
  );
  
  // Calculate stats
  const totalHabits = filteredHabits.length;
  const completedHabits = filteredHabits.filter(h => h.completedToday).length;
  const incompleteHabits = totalHabits - completedHabits;

  return (
    <PageContainer title="Habits" subtitle="Track your daily progress">
      <div className="space-y-6">
        {/* Date Selector */}
        <div className="flex items-center justify-between bg-card rounded-lg p-3 border">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-background">
            &lt;
          </button>
          
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} className="text-primary" />
            <span className="font-medium">Today</span>
          </div>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-background">
            &gt;
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold">{totalHabits}</p>
          </div>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-xl font-bold text-success">{completedHabits}</p>
          </div>
          
          <div className="bg-card border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-xl font-bold">{incompleteHabits}</p>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Categories</h2>
            <button className="flex items-center gap-1 text-sm text-primary">
              <ListFilter size={14} />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm capitalize whitespace-nowrap ${
                  activeCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/20 text-secondary-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* AI Habit Suggestions */}
        <HabitSuggestions />
        
        {/* Habits List */}
        <div className="space-y-3">
          <HabitList habits={filteredHabits} onToggleHabit={handleToggleHabit} />
          <AddHabit />
        </div>
      </div>
    </PageContainer>
  );
};

export default Habits;
