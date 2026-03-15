"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Room { id: number; slug: string; createdAt: string; adminId: string; }

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) { router.push("/signin"); return; }
    fetchRooms();
  }, [router]);

  async function fetchRooms() {
    const res = await fetch("http://localhost:3002/rooms", {
      headers: { authorization: localStorage.getItem("token") || "" },
    });
    const data = await res.json();
    if (data.rooms) setRooms(data.rooms);
  }

  async function createRoom(e: React.FormEvent) {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("http://localhost:3002/room", {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") || "" },
        body: JSON.stringify({ name: newRoomName.trim() }),
      });
      const data = await res.json();
      if (!data.message) {
        setNewRoomName(""); setShowCreate(false);
        fetchRooms();
      }
    } finally { setCreating(false); }
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#e03131" }}>✏️ Canvas — My Boards</h1>
          <p style={{ margin: "4px 0 0", color: "#6c757d", fontSize: 14 }}>Create and join collaborative drawing rooms</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setShowCreate(true)} className="btn btn-primary">+ New Board</button>
          <button onClick={logout} className="btn btn-outline">Sign out</button>
        </div>
      </div>

      {showCreate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", padding: 32, borderRadius: 16, width: 400, boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 20 }}>Create New Board</h2>
            <form onSubmit={createRoom} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input type="text" value={newRoomName} onChange={e => setNewRoomName(e.target.value)} placeholder="Board name (e.g. my-board)" required />
              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" disabled={creating} className="btn btn-primary" style={{ flex: 1 }}>
                  {creating ? "Creating..." : "Create Board"}
                </button>
                <button type="button" onClick={() => setShowCreate(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {rooms.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#6c757d" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎨</div>
          <p style={{ fontSize: 18, fontWeight: 500, margin: "0 0 8px" }}>No boards yet</p>
          <p style={{ fontSize: 14, margin: "0 0 24px" }}>Create your first collaborative drawing board</p>
          <button onClick={() => setShowCreate(true)} className="btn btn-primary">Create Board</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {rooms.map(room => (
            <div key={room.id} onClick={() => router.push(`/room/${room.slug}`)}
              style={{ background: "white", border: "1px solid #e9ecef", borderRadius: 12, padding: 24, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
              <div style={{ width: 40, height: 40, background: "#f1f0ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 20 }}>🎨</div>
              <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600 }}>{room.slug}</h3>
              <p style={{ margin: 0, fontSize: 12, color: "#6c757d" }}>
                {new Date(room.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
