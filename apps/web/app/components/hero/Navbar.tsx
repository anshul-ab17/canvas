"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACCENT, ACCENT4, NavBtn } from "./Common";

interface NavbarProps {
  scrolled: boolean;
  isLoggedIn: boolean;
  darkMode: boolean;
  toggleDark: () => void;
  scrollTo: (id: string) => void;
}

const NavLink = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        fontSize: 15,
        fontWeight: 500,
        cursor: "pointer",
        color: "var(--ink)",
        opacity: 0.85,
        padding: "6px 14px",
        borderRadius: 9999,
        transition: "background-color 0.2s, opacity 0.2s, transform 0.2s",
        fontFamily: "'Inter Tight', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--ink) 6%, transparent)";
        e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.opacity = "0.85";
      }}
    >
      {label}
    </button>
  );
};

const CtaButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        margin: "6px",
        background: ACCENT,
      }}
    >
      {/* Top-Left Bracket */}
      <span
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "12px",
          height: "12px",
          background: `radial-gradient(circle at 100% 100%, transparent 8px, var(--ink) 8.5px)`,
          pointerEvents: "none",
        }}
      />
      {/* Top-Right Bracket */}
      <span
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          width: "12px",
          height: "12px",
          background: `radial-gradient(circle at 0% 100%, transparent 8px, var(--ink) 8.5px)`,
          pointerEvents: "none",
        }}
      />
      {/* Bottom-Left Bracket */}
      <span
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          width: "12px",
          height: "12px",
          background: `radial-gradient(circle at 100% 0%, transparent 8px, var(--ink) 8.5px)`,
          pointerEvents: "none",
        }}
      />
      {/* Bottom-Right Bracket */}
      <span
        style={{
          position: "absolute",
          bottom: "0px",
          right: "0px",
          width: "12px",
          height: "12px",
          background: `radial-gradient(circle at 0% 0%, transparent 8px, var(--ink) 8.5px)`,
          pointerEvents: "none",
        }}
      />

      <button
        onClick={onClick}
        style={{
          background: ACCENT,
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          width: "220px",
          height: "46px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 700,
          fontSize: 12.5,
          letterSpacing: "0.02em",
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    </div>
  );
};

export default function Navbar({ scrolled, isLoggedIn, darkMode, toggleDark, scrollTo }: NavbarProps) {
  const router = useRouter();

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      width: "100%",
      background: "var(--paper)",
      transition: "background-color 0.3s, border-color 0.3s",
    }}>
      <div style={{
        maxWidth: 990,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 56px",
        borderBottom: "none",
      }}>
        {/* Brand Logo */}
        <button onClick={() => router.push("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: 22,
            color: "var(--ink)",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.01em"
          }}
        >
          <img src="/canvas.svg" alt="Canvas Logo" style={{ width: 28, height: 28, objectFit: "contain", transform: "translateY(-1px)" }} />
          Canvas
        </button>

        {/* Navigation Links */}
        <nav className="nav-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <NavLink label="Peek" onClick={() => scrollTo("peek")} />
          <NavLink label="How it works" onClick={() => scrollTo("how-it-works")} />
          <NavLink label="FAQ" onClick={() => scrollTo("faq")} />
        </nav>

        {/* Actions & Toggles */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* Theme switcher */}
          <button
            className="theme-toggle"
            onClick={toggleDark}
            title="Toggle theme"
            aria-label="Toggle dark mode"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid var(--ink)",
              background: "transparent",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "var(--ink)",
              transition: "transform 0.3s, background 0.3s"
            }}
          >
            {darkMode
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            }
          </button>

          {/* Action button */}
          {isLoggedIn
            ? <CtaButton label="Dashboard" onClick={() => router.push("/dashboard")} />
            : <CtaButton label="Sign In" onClick={() => router.push("/signin")} />}
        </div>
      </div>
    </header>
  );
}
