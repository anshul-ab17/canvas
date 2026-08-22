"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "../lib/config";

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/dashboard");
    if (searchParams.get("expired") === "1") {
      setError("Your session expired. Please sign in again.");
    }
  }, [router, searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = mode === "signup" ? { username, password, name } : { username, password };
      const res = await fetch(`${API_URL}/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "var(--surface)",
      padding: 40, borderRadius: 18, boxShadow: "var(--shadow-lg)", width: 440,
      border: "1.5px solid var(--border)"
    }}>
      <img src="/canvas.svg" alt="Canvas" style={{ height: 44, objectFit: "contain", marginBottom: 8 }} />
      <p style={{ margin: "0 0 32px", color: "var(--text-muted)", fontSize: 14, fontFamily: "'Inter Tight', sans-serif" }}>Sign in to collaborate in real-time</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 28, background: "var(--bg)", padding: 6, borderRadius: 12, border: "1.5px solid var(--border)" }}>
        {(["signin", "signup"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{
            flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 12, fontWeight: 700,
            background: mode === m ? "var(--surface)" : "transparent",
            color: mode === m ? "var(--text)" : "var(--text-muted)",
            boxShadow: mode === m ? "var(--shadow-sm)" : "none",
            transition: "all 0.15s", border: "none", cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em"
          }}>
            {m === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {mode === "signup" && (
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>Display Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required 
              style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", outline: "none", transition: "border-color 0.2s", fontFamily: "'Inter Tight', sans-serif" }} />
          </div>
        )}
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="min 8 characters" required minLength={8}
            autoComplete="username"
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", outline: "none", fontFamily: "'Inter Tight', sans-serif" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="min 8 characters" required minLength={8}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", outline: "none", fontFamily: "'Inter Tight', sans-serif" }} />
        </div>
        {error && <p style={{ color: "#ff5f56", fontSize: 13, fontWeight: 600, margin: 0 }}>{error}</p>}
        <div style={{ position: "relative", marginTop: 12 }}>
          {/* Top-Left */}
          <span style={{ position: "absolute", top: -4, left: -4, width: 16, height: 16, pointerEvents: "none", zIndex: 1 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="16" cy="16" r="9" fill="#E84A3F"/><circle cx="16" cy="16" r="5" fill="#F97316"/></svg>
          </span>
          {/* Top-Right */}
          <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, pointerEvents: "none", zIndex: 1 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="0" cy="16" r="9" fill="#E84A3F"/><circle cx="0" cy="16" r="5" fill="#F97316"/></svg>
          </span>
          {/* Bottom-Left */}
          <span style={{ position: "absolute", bottom: -4, left: -4, width: 16, height: 16, pointerEvents: "none", zIndex: 1 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="16" cy="0" r="9" fill="#E84A3F"/><circle cx="16" cy="0" r="5" fill="#F97316"/></svg>
          </span>
          {/* Bottom-Right */}
          <span style={{ position: "absolute", bottom: -4, right: -4, width: 16, height: 16, pointerEvents: "none", zIndex: 1 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="0" cy="0" r="9" fill="#E84A3F"/><circle cx="0" cy="0" r="5" fill="#F97316"/></svg>
          </span>
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "14px", borderRadius: 6, fontSize: 13, fontWeight: 800,
            background: "#F97316", color: "#ffffff", border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, transition: "transform 0.2s",
            fontFamily: "'Inter Tight', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em"
          }}>
            {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </form>

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <button onClick={() => router.push("/")} style={{
          background: "none", border: "none", color: "#adb5bd", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline"
        }}>
          Continue drawing as guest
        </button>
      </div>
    </div>
  );
}
