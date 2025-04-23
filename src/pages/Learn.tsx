
import { useRef, useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Using the fully qualified URL for the edge function
const GEMINI_EDGE_FUNCTION_URL = "https://yuecjlxdznlhsejjdfhy.functions.supabase.co/gemini-chat";

interface ChatMsg {
  role: "user" | "model";
  content: string;
}

export default function Learn() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { user } = useUser();
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    
    const prompt = input;
    setInput("");
    setHistory((h) => [...h, { role: "user", content: prompt }]);
    setLoading(true);
    setApiError(null);

    try {
      // Get the current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log("Sending request to Gemini API");
      
      const resp = await fetch(GEMINI_EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": session ? `Bearer ${session.access_token}` : "",
        },
        body: JSON.stringify({
          prompt,
          history
        })
      });
      
      console.log("Response status:", resp.status);
      
      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        console.error("Gemini API error:", errorData);
        toast.error("Failed to get a response from Gemini");
        setApiError("Connection error. The AI service may be unavailable.");
        setHistory((h) => [...h, { role: "model", content: "Sorry, I couldn't process your request at the moment. Please try again later." }]);
      } else {
        const data = await resp.json();
        console.log("Response data:", data);
        
        if (data.error) {
          setApiError(`Service error: ${data.error}`);
          setHistory((h) => [...h, { role: "model", content: "Sorry, there was an error processing your request. Please try again." }]);
        } else {
          setHistory((h) => [...h, { role: "model", content: data.result || "No answer." }]);
          setApiError(null);
        }
      }
    } catch (err: any) {
      console.error("Error calling Gemini API:", err);
      toast.error("Error connecting to AI assistant");
      setApiError("Connection error. Please check your network and try again.");
      setHistory((h) => [...h, { role: "model", content: "Error: " + (err?.message || "Unknown error occurred") }]);
    }
    
    setLoading(false);

    // Scroll to bottom
    setTimeout(() => {
      chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, 100);
  };

  const handleRetry = () => {
    setApiError(null);
    if (history.length > 0 && history[history.length - 1].role === "user") {
      const lastUserMessage = history[history.length - 1].content;
      setHistory(h => h.slice(0, -1));
      setInput(lastUserMessage);
    }
  };

  return (
    <PageContainer title="Learn with AI" subtitle="Ask anything, powered by Gemini">
      <div className="flex flex-col gap-4 max-w-xl mx-auto h-[70vh]">
        {apiError && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="shrink-0 mt-0.5" size={16} />
            <div className="flex-1">
              <p className="text-sm font-medium">{apiError}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 gap-1 text-destructive" 
                onClick={handleRetry}
              >
                <RefreshCw size={14} />
                <span>Retry</span>
              </Button>
            </div>
          </div>
        )}
        
        <div
          ref={chatRef}
          className="flex-1 bg-muted rounded-lg p-4 space-y-3 overflow-auto border"
          style={{ minHeight: 300, maxHeight: 400 }}
        >
          {history.length === 0 && (
            <div className="text-muted-foreground text-center">Ask anything to get started!</div>
          )}
          {history.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                m.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <span
                className={`px-3 py-2 rounded-lg max-w-xs ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground border"
                }`}
                style={{ whiteSpace: "pre-line" }}
              >
                {m.content}
              </span>
              <span className="text-xs mt-1 text-muted-foreground">
                {m.role === "user" ? "You" : "Gemini"}
              </span>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSend}
          className="flex gap-2 items-center bg-background border rounded-lg px-2 py-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
            placeholder="Enter your question..."
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            variant="default"
            size="sm"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </div>
    </PageContainer>
  );
}
