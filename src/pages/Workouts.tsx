import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { WorkoutCard, Workout } from "@/components/features/workouts/workout-card";
import { mockWorkouts } from "@/data/mock-data";
import { Search, Filter } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Full Body", "Core", "Yoga", "HIIT", "Strength", "Cardio"];
const levels = ["All", "beginner", "intermediate", "advanced"];

const Workouts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const filteredWorkouts = mockWorkouts.filter(workout => {
    const matchesCategory = activeCategory === "All" || workout.category === activeCategory;
    const matchesLevel = activeLevel === "All" || workout.level === activeLevel;
    return matchesCategory && matchesLevel;
  });

  return (
    <PageContainer title="Workouts" subtitle="Find your perfect exercise routine">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input 
            type="text"
            placeholder="Search workouts..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-card text-card-foreground"
          />
        </div>
        
        {/* Category Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Categories</h2>
            <button className="flex items-center gap-1 text-sm text-primary">
              <Filter size={14} />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
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
        
        {/* Level Filter */}
        <div className="space-y-2">
          <h2 className="font-medium">Difficulty Level</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-1.5 rounded-full text-sm capitalize whitespace-nowrap ${
                  activeLevel === level 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/20 text-secondary-foreground"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        {/* Workout List */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredWorkouts.map(workout => (
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Workouts;
