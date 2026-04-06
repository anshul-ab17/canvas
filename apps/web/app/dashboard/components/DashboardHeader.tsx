"use client";

const ACCENT = "#e03131";

interface Props {
  loading: boolean;
  roomCount: number;
  onNewBoard: () => void;
}

export default function DashboardHeader({ loading, roomCount, onNewBoard }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#1e1e1e" }}>My Boards</h1>
        <p style={{ margin: "4px 0 0", color: "#6c757d", fontSize: 14 }}>
          {loading ? "Loading…" : `${roomCount} board${roomCount !== 1 ? "s" : ""}`}
        </p>
      </div>
      <button onClick={onNewBoard} style={{
        background: ACCENT, color: "white", border: "none", borderRadius: 8,
        padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
        boxShadow: "0 2px 8px rgba(224,49,49,0.3)",
      }}>
        + New Board
      </button>
    </div>
  );
}
