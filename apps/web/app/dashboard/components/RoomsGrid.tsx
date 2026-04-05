"use client";
import RoomCard, { Room } from "./RoomCard";

const ACCENT = "#e03131";

interface Props {
  loading: boolean;
  rooms: Room[];
  onRoomClick: (slug: string) => void;
  onNewBoard: () => void;
}

export default function RoomsGrid({ loading, rooms, onRoomClick, onNewBoard }: Props) {
  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  };

  if (loading) {
    return (
      <div style={grid}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ background: "white", border: "1px solid #e9ecef", borderRadius: 12, padding: 24, height: 120, opacity: 0.5 }} />
        ))}
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div style={{
        background: "white", border: "1px solid #e9ecef", borderRadius: 16,
        padding: "80px 24px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <p style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px", color: "#1e1e1e" }}>No boards yet</p>
        <p style={{ fontSize: 14, margin: "0 0 28px", color: "#6c757d" }}>
          Create a board to start collaborating in real-time
        </p>
        <button onClick={onNewBoard} style={{
          background: ACCENT, color: "white", border: "none", borderRadius: 8,
          padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
        }}>
          + Create your first board
        </button>
      </div>
    );
  }

  return (
    <div style={grid}>
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} onClick={() => onRoomClick(room.slug)} />
      ))}
    </div>
  );
}
