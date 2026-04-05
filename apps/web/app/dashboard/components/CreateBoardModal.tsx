"use client";

const ACCENT = "#e03131";
const ACCENT_BORDER = "#fca5a5";

interface Props {
  newRoomName: string;
  creating: boolean;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function CreateBoardModal({ newRoomName, creating, onChange, onSubmit, onClose }: Props) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{ background: "white", padding: 32, borderRadius: 16, width: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>New Board</h2>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "#6c757d" }}>
          Give your board a unique name to share with collaborators.
        </p>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="text"
            value={newRoomName}
            onChange={e => onChange(e.target.value)}
            placeholder="e.g. product-roadmap"
            autoFocus
            required
            style={{
              padding: "10px 12px", borderRadius: 8, border: "1px solid #dee2e6",
              fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
            }}
            onFocus={e => (e.target.style.borderColor = ACCENT_BORDER)}
            onBlur={e => (e.target.style.borderColor = "#dee2e6")}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" disabled={creating} style={{
              flex: 1, padding: "10px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              background: creating ? "#e9ecef" : ACCENT,
              color: creating ? "#6c757d" : "white",
              border: "none", cursor: creating ? "not-allowed" : "pointer",
            }}>
              {creating ? "Creating…" : "Create Board"}
            </button>
            <button type="button" onClick={onClose} style={{
              padding: "10px 16px", borderRadius: 8, fontSize: 14,
              border: "1px solid #dee2e6", background: "white", cursor: "pointer",
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
