
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (isLoginMode) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: email.split("@")[0] } } });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <form className="bg-card border p-8 rounded-xl shadow w-full max-w-[360px] space-y-5" onSubmit={handleAuth}>
        <h2 className="font-bold text-2xl mb-2">{isLoginMode ? "Login" : "Create Account"}</h2>
        <div>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoFocus
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        {error && <div className="text-destructive text-sm">{error}</div>}
        <button className="w-full bg-primary text-white rounded py-2 font-semibold mt-2 hover:bg-primary/90 transition-colors" disabled={loading}>
          {loading ? "Loading..." : isLoginMode ? "Login" : "Sign Up"}
        </button>
        <div className="text-center text-sm pt-3">
          {isLoginMode ? (
            <>
              Don&apos;t have an account?{" "}
              <button type="button" className="text-primary" onClick={() => setIsLoginMode(false)}>Sign Up</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" className="text-primary" onClick={() => setIsLoginMode(true)}>Login</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
