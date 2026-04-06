"use client";
import { Tool, ACCENT, ACCENT_LIGHT, ACCENT_BORDER } from "./types";

interface ToolDef {
  id: Tool;
  icon: string;
  label: string;
}

interface Props {
  tools: ToolDef[];
  currentTool: Tool;
  onToolChange: (t: Tool) => void;
  onImageInsert?: () => void;
}

export default function ToolBar({ tools, currentTool, onToolChange, onImageInsert }: Props) {
  return (
    <div style={{
      position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)",
      background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(24px)",
      borderRadius: 16, padding: "8px 12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)", display: "flex", gap: 6, zIndex: 10,
      border: "1px solid rgba(255,255,255,0.4)"
    }}>
      <style>{`
        .tool-btn:hover { background: #f1f3f5 !important; border-color: #dee2e6 !important; color: #1e1e1e !important; }
        .tool-btn-active:hover { background: ${ACCENT_LIGHT} !important; border-color: ${ACCENT_BORDER} !important; color: ${ACCENT} !important; }
      `}</style>
      {tools.map(t => (
        <button
          key={t.id}
          onClick={() => onToolChange(t.id)}
          title={t.label}
          className={currentTool === t.id ? "tool-btn-active" : "tool-btn"}
          style={{
            width: 36, height: 36, borderRadius: 8, fontSize: 15,
            background: currentTool === t.id ? ACCENT_LIGHT : "transparent",
            color: currentTool === t.id ? ACCENT : "#495057",
            border: currentTool === t.id ? `1px solid ${ACCENT_BORDER}` : "1px solid transparent",
            transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}
        >
          {t.icon}
        </button>
      ))}
      {onImageInsert && (
        <>
          <div style={{ width: 1, background: "#dee2e6", margin: "4px 2px" }} />
          <button
            onClick={onImageInsert}
            title="Insert image"
            className="tool-btn"
            style={{
              width: 36, height: 36, borderRadius: 8, fontSize: 15,
              background: "transparent", color: "#495057", border: "1px solid transparent",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            🖼
          </button>
        </>
      )}
    </div>
  );
}
