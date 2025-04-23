
import { useState } from "react";
import { Suggestion } from "./suggestion-card";
import { SuggestionsList } from "./suggestions-list";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function HabitSuggestions() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get the current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log("Sending request to Gemini API");
      
      const response = await fetch("https://yuecjlxdznlhsejjdfhy.functions.supabase.co/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": session ? `Bearer ${session.access_token}` : "",
        },
        body: JSON.stringify({
          prompt: "Generate 3 habit suggestions that would be beneficial for a person's wellbeing. Format them as JSON with: id (string), title (short name for habit), description (short description of why this habit is beneficial), type (set to 'habit'), and action (set to 'Add This Habit'). Make them realistic, achievable daily habits.",
          history: []
        })
      });
      
      console.log("Received response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API error:", errorData);
        setError("Failed to connect to AI service. Please try again later.");
        throw new Error("Failed to fetch suggestions");
      }
      
      const data = await response.json();
      console.log("Parsed response:", data);
      
      if (data.error) {
        setError("AI service error: " + data.error);
        throw new Error(data.error);
      }
      
      // Parse the response text to extract the JSON content
      try {
        // The AI sometimes wraps the JSON in code blocks or other text
        const jsonMatch = data.result.match(/```json\n([\s\S]*?)\n```/) || 
                          data.result.match(/```\n([\s\S]*?)\n```/) ||
                          data.result.match(/(\[[\s\S]*?\])/);
                          
        const jsonContent = jsonMatch ? jsonMatch[1] : data.result;
        const parsed = JSON.parse(jsonContent);
        setSuggestions(parsed);
        setShowSuggestions(true);
        setError(null);
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError);
        console.log("Raw response:", data.result);
        setError("Could not process AI response. Please try again.");
        toast.error("The AI response couldn't be processed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error fetching AI suggestions:", error);
      toast.error("Couldn't connect to the AI service. Please try again later.");
      setError(error.message || "Connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = (suggestion: Suggestion) => {
    toast.success(`"${suggestion.title}" has been added to your habits.`);
    // Here you would normally add the habit to your habits list
    setShowSuggestions(false);
  };

  const handleRetry = () => {
    fetchSuggestions();
  };

  return (
    <div className="space-y-4">
      {!showSuggestions ? (
        <div>
          <Button 
            onClick={fetchSuggestions} 
            variant="outline" 
            className="w-full gap-2 border-dashed"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Generating suggestions...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="text-primary" />
                <span>AI Habit Ideas</span>
              </>
            )}
          </Button>
          
          {error && (
            <div className="mt-2 p-2 bg-destructive/10 text-destructive text-sm rounded-md">
              <p className="font-medium">Error: {error}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRetry} 
                className="mt-1 gap-1"
                disabled={loading}
              >
                <RefreshCw size={14} />
                <span>Retry</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">AI Suggested Habits</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
                disabled={loading}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSuggestions(false)}
              >
                Hide
              </Button>
            </div>
          </div>
          <SuggestionsList 
            suggestions={suggestions} 
            onAction={handleAddHabit}
          />
        </div>
      )}
    </div>
  );
}
