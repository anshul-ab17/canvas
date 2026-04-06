"use client";
import { AiMode, ACCENT, ACCENT_LIGHT, ACCENT_BORDER } from "./types";

interface Props {
  aiMode: AiMode;
  aiPrompt: string;
  aiLoading: boolean;
  aiError: string;
  userApiKey: string;
  showApiKey: boolean;
  onModeChange: (m: AiMode) => void;
  onPromptChange: (v: string) => void;
  onGenerate: () => void;
  onClose: () => void;
  onApiKeyChange: (k: string) => void;
  onToggleShowApiKey: () => void;
  onClearApiKey: () => void;
}

export default function AiModal({
  aiMode, aiPrompt, aiLoading, aiError, userApiKey, showApiKey,
  onModeChange, onPromptChange, onGenerate, onClose, onApiKeyChange, onToggleShowApiKey, onClearApiKey,
}: Props) {
  const disabled = aiLoading || !aiPrompt.trim();

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 16, width: 480, boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>
          {aiMode === "flowchart" ? " Text to Flowchart" : " Text to Diagram"}
        </h2>
        <p style={{ margin: "0 0 20px", color: "#6c757d", fontSize: 13 }}>
          {aiMode === "flowchart"
            ? "Describe a process or workflow. AI generates a flowchart."
            : "Describe any diagram — architecture, mind map, org chart, network, etc."}
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {(["diagram", "flowchart"] as AiMode[]).map(m => (
            <button key={m} onClick={() => onModeChange(m)} style={{
              flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 13, fontWeight: 500,
              background: aiMode === m ? ACCENT : "white",
              color: aiMode === m ? "white" : "#495057",
              border: `1px solid ${aiMode === m ? ACCENT : "#dee2e6"}`,
              cursor: "pointer", transition: "all 0.15s",
            }}>
              {m === "diagram" ? "✦ Diagram" : "⬡ Flowchart"}
            </button>
          ))}
        </div>

        <textarea
          value={aiPrompt}
          onChange={e => onPromptChange(e.target.value)}
          placeholder={aiMode === "flowchart"
            ? "e.g. User login: start → enter credentials → validate → if valid show dashboard, else show error → end"
            : "e.g. Microservices with API gateway, auth service, user service and PostgreSQL"}
          rows={4}
          onKeyDown={e => e.key === "Enter" && e.ctrlKey && onGenerate()}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #dee2e6", fontSize: 13, resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", outline: "none" }}
        />
        {aiError && <p style={{ color: ACCENT, fontSize: 13, margin: "8px 0 0" }}>{aiError}</p>}

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={onGenerate} disabled={disabled} style={{
            flex: 1, padding: "10px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
            background: disabled ? "#e9ecef" : ACCENT,
            color: disabled ? "#6c757d" : "white",
            border: "none", cursor: disabled ? "not-allowed" : "pointer",
          }}>
            {aiLoading ? "Generating…" : "Generate (Ctrl+Enter)"}
          </button>
          <button onClick={onClose} style={{ padding: "10px 16px", borderRadius: 8, fontSize: 14, border: "1px solid #dee2e6", background: "white", cursor: "pointer" }}>
            Cancel
          </button>
        </div>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f1f3f5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#495057" }}>OpenRouter API Key</label>
            <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ACCENT, textDecoration: "none" }}>
              Get a free key →
            </a>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <input
              type={showApiKey ? "text" : "password"}
              value={userApiKey}
              onChange={e => onApiKeyChange(e.target.value)}
              placeholder="sk-or-v1-…  (optional — uses server key if blank)"
              style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid #dee2e6", fontSize: 12, outline: "none", fontFamily: "monospace" }}
            />
            <button type="button" onClick={onToggleShowApiKey}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #dee2e6", background: "white", cursor: "pointer", fontSize: 13 }}>
              {showApiKey ? "xx" : "👁"}
            </button>
            {userApiKey && (
              <button type="button" onClick={onClearApiKey}
                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #dee2e6", background: "white", cursor: "pointer", fontSize: 13, color: ACCENT }}>
                ✕
              </button>
            )}
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 11, color: "#999" }}>
            Saved in your browser only. Sent directly to OpenRouter, nowhere else.
          </p>
        </div>
      </div>
    </div>
  );
}
