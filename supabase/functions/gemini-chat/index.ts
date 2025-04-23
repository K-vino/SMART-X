
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
// Update to use the correct API version and model
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, history } = await req.json();

    // Format history according to Gemini API
    const contents = [
      ...(Array.isArray(history)
        ? history.map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }]
          }))
        : []),
      { role: "user", parts: [{ text: prompt }] },
    ];

    // Check if prompt contains habit suggestions request
    const isHabitRequest = prompt.toLowerCase().includes("habit suggestion") || 
                          prompt.toLowerCase().includes("habit idea");
    
    // Adjust configuration based on request type
    const generationConfig = {
      temperature: isHabitRequest ? 0.7 : 0.6,
      topK: 1,
      topP: 1,
      maxOutputTokens: isHabitRequest ? 1024 : 512, // More tokens for habit suggestions
    };

    const body = JSON.stringify({
      contents,
      generationConfig
    });

    console.log(`Sending request to Gemini API with ${contents.length} messages`);
    console.log(`Using API URL: ${GEMINI_API_URL}`);
    
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API error:", err);
      return new Response(JSON.stringify({ error: err }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    console.log("Received response from Gemini API:", JSON.stringify(data).substring(0, 200) + "...");
    
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from model.";

    console.log("Successful response from Gemini API");
    
    return new Response(JSON.stringify({ result: aiText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error in gemini-chat function:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
