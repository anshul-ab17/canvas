"use client";

const ACCENT = "#e03131";
const ACCENT_BORDER = "#fca5a5";

interface Props {
  onLogoClick: () => void;
  onOpenCanvas: () => void;
  onLogout: () => void;
}

export default function DashboardNavbar({ onLogoClick, onOpenCanvas, onLogout }: Props) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 20,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px", pointerEvents: "none",
    }}>
      <div style={{ pointerEvents: "auto" }}>
        <button onClick={onLogoClick} style={{
          background: "white", border: "1px solid #dee2e6", borderRadius: 8,
          padding: "6px 14px", fontSize: 15, fontWeight: 700, color: ACCENT, cursor: "pointer",
        }}>
          ✏️ Canvas
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, pointerEvents: "auto" }}>
        <button onClick={onOpenCanvas} style={{
          background: "white", border: "1px solid #dee2e6", borderRadius: 8,
          padding: "7px 14px", fontSize: 13, color: "#495057", cursor: "pointer",
        }}>
          ← Open Canvas
        </button>
        <button onClick={onLogout} style={{
          background: "white", border: `1px solid ${ACCENT_BORDER}`, borderRadius: 8,
          padding: "7px 14px", fontSize: 13, color: ACCENT, cursor: "pointer",
        }}>
          Sign out
        </button>
      </div>
    </div>
  );
}
