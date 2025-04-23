
import { Habit } from "@/components/features/habit-tracker/habit-list";
import { Suggestion } from "@/components/features/ai-assistant/suggestion-card";
import { Workout } from "@/components/features/workouts/workout-card";

// Mock Habits
export const mockHabits: Habit[] = [
  {
    id: "h1",
    name: "Morning Meditation",
    description: "10 minutes of mindfulness",
    streak: 12,
    frequencyType: "daily",
    frequencyCount: 1,
    completedToday: true,
    category: "mindfulness"
  },
  {
    id: "h2",
    name: "Read a Book",
    description: "20 pages minimum",
    streak: 5,
    frequencyType: "daily",
    frequencyCount: 1,
    completedToday: false,
    category: "learning"
  },
  {
    id: "h3",
    name: "Workout Session",
    description: "Full body or cardio",
    streak: 0,
    frequencyType: "weekly",
    frequencyCount: 3,
    completedToday: false,
    category: "fitness"
  },
  {
    id: "h4",
    name: "Drink Water",
    description: "8 glasses daily",
    streak: 8,
    frequencyType: "daily",
    frequencyCount: 1,
    completedToday: true,
    category: "health"
  },
  {
    id: "h5",
    name: "Journal Entry",
    description: "Record thoughts and progress",
    streak: 3,
    frequencyType: "daily",
    frequencyCount: 1,
    completedToday: false,
    category: "productivity"
  }
];

// Mock AI Suggestions
export const mockSuggestions: Suggestion[] = [
  {
    id: "s1",
    title: "Time for a workout!",
    description: "You haven't completed your fitness goal for today. A quick 15-min session could help.",
    type: "workout",
    action: "View workout options",
    actionUrl: "/workouts"
  },
  {
    id: "s2",
    title: "Learning suggestion",
    description: "Based on your interests, we found an article about productivity hacks you might enjoy.",
    type: "learning",
    action: "Read article",
    actionUrl: "/learn"
  },
  {
    id: "s3",
    title: "Habit reminder",
    description: "Don't forget to journal tonight before bed. You're on a 3-day streak!",
    type: "habit",
    action: "Mark as done",
  }
];

// Mock Workouts
export const mockWorkouts: Workout[] = [
  {
    id: "w1",
    name: "Morning Energy Boost",
    description: "Quick workout to energize your day",
    duration: 15,
    level: "beginner",
    category: "Full Body",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop"
  },
  {
    id: "w2",
    name: "Core Strength Builder",
    description: "Focus on abdominal and lower back",
    duration: 25,
    level: "intermediate",
    category: "Core",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop"
  },
  {
    id: "w3",
    name: "Relaxing Yoga Flow",
    description: "Gentle stretching and breathing",
    duration: 30,
    level: "beginner",
    category: "Yoga",
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop"
  },
  {
    id: "w4",
    name: "High Intensity Intervals",
    description: "Maximum calorie burn in minimum time",
    duration: 20,
    level: "advanced",
    category: "HIIT",
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop"
  }
];

// Dashboard Stats
export const dashboardStats = {
  completedToday: 2,
  totalHabits: 5,
  currentStreak: 5
};
