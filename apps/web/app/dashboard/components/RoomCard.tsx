"use client";
import { useState } from "react";

const ACCENT = "#e03131";
const ACCENT_BORDER = "#fca5a5";

export interface Room {
  id: number;
  slug: string;
  createdAt: string;
  adminId: string;
}

const CARD_COLORS = ["#fff5f5", "#f0fff4", "#eff6ff", "#fefce8", "#faf5ff"];
const CARD_ICONS = ["✏️", "🎨", "📐", "🖊️", "🗂️"];

interface Props {
  room: Room;
  onClick: () => void;
}

export default function RoomCard({ room, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const idx = room.id % 5;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        border: `1px solid ${hovered ? ACCENT_BORDER : "#e9ecef"}`,
        borderRadius: 12, padding: 24, cursor: "pointer", transition: "all 0.15s",
        boxShadow: hovered ? "0 4px 20px rgba(224,49,49,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: CARD_COLORS[idx], border: `1px solid ${hovered ? ACCENT_BORDER : "#e9ecef"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 14, fontSize: 22, transition: "all 0.15s",
      }}>
        {CARD_ICONS[idx]}
      </div>
      <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: "#1e1e1e" }}>
        {room.slug}
      </h3>
      <p style={{ margin: 0, fontSize: 12, color: "#adb5bd" }}>
        {new Date(room.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </p>
      {hovered && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f1f3f5" }}>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 500 }}>Open board →</span>
        </div>
      )}
    </div>
  );
}
