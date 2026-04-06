"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../lib/config";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardHeader from "./components/DashboardHeader";
import RoomsGrid from "./components/RoomsGrid";
import CreateBoardModal from "./components/CreateBoardModal";
import { Room } from "./components/RoomCard";

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) { router.push("/signin"); return; }
    fetchRooms();
  }, [router]);

  async function fetchRooms() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/rooms`, {
        headers: { authorization: localStorage.getItem("token") || "" },
      });
      const data = await res.json();
      if (data.rooms) setRooms(data.rooms);
    } finally {
      setLoading(false);
    }
  }

  async function createRoom(e: React.FormEvent) {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch(`${API_URL}/room`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") || "" },
        body: JSON.stringify({ name: newRoomName.trim() }),
      });
      const data = await res.json();
      if (!data.message) {
        setNewRoomName("");
        setShowCreate(false);
        fetchRooms();
      }
    } finally {
      setCreating(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  function closeModal() {
    setShowCreate(false);
    setNewRoomName("");
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }}>
      <DashboardNavbar
        onLogoClick={() => router.push("/")}
        onOpenCanvas={() => router.push("/")}
        onLogout={logout}
      />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "100px 24px 60px" }}>
        <DashboardHeader
          loading={loading}
          roomCount={rooms.length}
          onNewBoard={() => setShowCreate(true)}
        />
        <RoomsGrid
          loading={loading}
          rooms={rooms}
          onRoomClick={slug => router.push(`/room/${slug}`)}
          onNewBoard={() => setShowCreate(true)}
        />
      </div>

      {showCreate && (
        <CreateBoardModal
          newRoomName={newRoomName}
          creating={creating}
          onChange={setNewRoomName}
          onSubmit={createRoom}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
