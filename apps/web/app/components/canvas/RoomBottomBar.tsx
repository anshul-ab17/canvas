"use client";
import { ACCENT } from "./types";

interface Props {
  historyIdx: number;
  historyLength: number;
  copied: boolean;
  connected: boolean;
  slug: string;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onDownload: () => void;
  onCopyLink: () => void;
}

export default function RoomBottomBar({
  historyIdx, historyLength, copied, connected, slug,
  onUndo, onRedo, onClear, onDownload, onCopyLink,
}: Props) {
  const sep = <div style={{ width: 1, height: 24, background: "#dee2e6" }} />;
  const btnBase: React.CSSProperties = { borderRadius: 6, border: "1px solid #dee2e6", background: "white" };

  return (
    <div style={{
      position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)",
      background: "white", borderRadius: 12, padding: "8px 12px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.15)", display: "flex", gap: 8, zIndex: 10, alignItems: "center",
    }}>
      <button onClick={onUndo} disabled={historyIdx === 0} title="Undo (Ctrl+Z)"
        style={{ ...btnBase, width: 32, height: 32, fontSize: 14, opacity: historyIdx === 0 ? 0.4 : 1 }}>↩</button>
      <button onClick={onRedo} disabled={historyIdx >= historyLength - 1} title="Redo"
        style={{ ...btnBase, width: 32, height: 32, fontSize: 14, opacity: historyIdx >= historyLength - 1 ? 0.4 : 1 }}>↪</button>
      {sep}
      <button onClick={onClear} title="Clear canvas"
        style={{ ...btnBase, width: 32, height: 32, fontSize: 14, color: ACCENT }}>🗑</button>
      {sep}
      <button onClick={onDownload} title="Download as PNG"
        style={{ ...btnBase, padding: "6px 12px", fontSize: 13, color: "#495057" }}>⬇ Download</button>
      {sep}
      <button onClick={onCopyLink}
        style={{ ...btnBase, padding: "6px 12px", fontSize: 13, background: copied ? "#2f9e44" : "white", color: copied ? "white" : "#495057", transition: "all 0.2s" }}>
        {copied ? "✓ Copied!" : "🔗 Share"}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: connected ? "#2f9e44" : ACCENT }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: connected ? "#2f9e44" : ACCENT }} />
        {connected ? "Live" : "Offline"}
      </div>
    </div>
  );
}
