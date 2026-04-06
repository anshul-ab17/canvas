"use client";
import { ACCENT, TextInputState } from "./types";

interface Props {
  textInput: TextInputState;
  textScreenX: number;
  textScreenY: number;
  strokeWidth: number;
  strokeColor: string;
  onChange: (value: string) => void;
  onCommit: () => void;
  onCancel: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

export default function TextEditor({
  textInput, textScreenX, textScreenY, strokeWidth, strokeColor,
  onChange, onCommit, onCancel, onDragStart,
}: Props) {
  return (
    <div style={{
      position: "fixed", left: textScreenX, top: textScreenY,
      zIndex: 200, minWidth: 120, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", borderRadius: 6, overflow: "hidden",
    }}>
      <div
        onMouseDown={onDragStart}
        style={{
          background: ACCENT, padding: "3px 8px", cursor: "move",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 11, color: "white", userSelect: "none",
        }}
      >
        <span>drag to move</span>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={onCommit} style={{ background: "rgba(255,255,255,0.25)", border: "none", color: "white", borderRadius: 3, padding: "1px 6px", cursor: "pointer", fontSize: 12 }}>✓</button>
          <button onClick={onCancel} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 3, padding: "1px 6px", cursor: "pointer", fontSize: 12 }}>✕</button>
        </div>
      </div>
      <textarea
        autoFocus
        value={textInput.value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Escape") onCancel();
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onCommit(); }
        }}
        placeholder="Type… (Enter to place)"
        style={{
          display: "block", width: "100%", minWidth: 160, minHeight: 48,
          padding: "8px 10px", border: "none", borderTop: "1px dashed #e9ecef",
          background: "white", resize: "both", outline: "none",
          fontSize: `${16 + strokeWidth * 2}px`, color: strokeColor,
          fontFamily: '"Segoe UI", sans-serif', boxSizing: "border-box",
        }}
      />
    </div>
  );
}
