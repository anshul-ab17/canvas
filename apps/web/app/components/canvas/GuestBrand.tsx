import Link from "next/link";
import { ACCENT } from "./types";

export default function GuestBrand() {
  return (
    <Link href="/" style={{ position: "fixed", top: 16, left: 16, zIndex: 10, textDecoration: "none" }}>
      <div style={{
        background: "var(--paper-3, #FBF8F1)",
        border: "1.5px solid var(--ink, #15130F)",
        borderRadius: 10,
        padding: "7px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "3px 3px 0 #F97316",
        cursor: "pointer",
        transition: "transform 0.2s"
      }}>
        <img src="/canvas.svg" alt="Canvas" style={{ height: 20, objectFit: "contain" }} />
      </div>
    </Link>
  );
}
