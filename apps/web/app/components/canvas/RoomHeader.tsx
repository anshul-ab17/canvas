"use client";

interface Props {
  slug: string;
  onBack: () => void;
}

export default function RoomHeader({ slug, onBack }: Props) {
  return (
    <div style={{ position: "fixed", top: 16, left: 16, zIndex: 10 }}>
      <button onClick={onBack} style={{
        background: "white", border: "1px solid #dee2e6", borderRadius: 8,
        padding: "6px 12px", fontSize: 13, color: "#495057", cursor: "pointer",
      }}>
        ← {slug}
      </button>
    </div>
  );
}
