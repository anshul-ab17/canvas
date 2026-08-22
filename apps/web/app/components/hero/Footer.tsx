"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ACCENT, AMBER } from "./Common";

export default function Footer() {
  const router = useRouter();
  const [btnHov, setBtnHov] = useState(false);

  return (
    <footer style={{ background: "var(--footer-bg)", color: "var(--footer-text)", padding: "80px 56px 40px", fontFamily: "'Inter Tight', sans-serif", position: "relative", zIndex: 10 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          max-width: 990px;
          margin: 0 auto;
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.2fr 2fr;
          }
        }
        .footer-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 640px) {
          .footer-cols {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        .footer-menu-item {
          display: block;
          color: var(--footer-text);
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }
        .footer-menu-item:hover {
          color: ${ACCENT};
        }
        .footer-socials {
          display: flex;
          gap: 24px;
          align-items: center;
          margin-top: 32px;
          margin-bottom: 48px;
        }
        .social-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .social-icon:hover {
          transform: translateY(-2px);
          filter: brightness(1.2) sepia(1) saturate(10000%) hue-rotate(345deg);
        }
        .footer-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          border-top: 1px solid var(--footer-border);
          padding-top: 40px;
          max-width: 1320px;
          margin: 40px auto 0;
        }
        @media (min-width: 1024px) {
          .footer-bottom-grid {
            grid-template-columns: 1fr 1.2fr;
          }
        }
        .lang-links {
          display: flex;
          gap: 16px;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.1em;
        }
        .lang-link {
          color: var(--footer-text);
          text-decoration: none;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }
        .lang-link.active {
          opacity: 1;
          font-weight: 600;
        }
        .lang-link:hover {
          opacity: 1;
          color: ${ACCENT};
        }
        .copyright-text {
          opacity: 0.4;
          font-size: 14.5px;
          line-height: 1.5;
        }
        .copyright-text a {
          color: var(--footer-text);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .copyright-text a:hover {
          color: ${ACCENT};
        }
        .footer-btn {
          background: ${ACCENT};
          color: #ffffff;
          border: 1.5px solid ${ACCENT};
          padding: 16px 26px;
          font-family: 'Inter Tight', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          box-shadow: 6px 6px 0 rgba(255, 255, 255, 0.15);
          width: fit-content;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .footer-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 rgba(255, 255, 255, 0.25);
        }
      ` }} />
      
      <div className="footer-grid">
        {/* Left Side Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div 
            onClick={() => router.push("/")}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <img src="/canvas.svg" alt="Canvas" style={{ height: 40, objectFit: "contain" }} />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
              Stop drawing in <em style={{ fontStyle: "italic", color: ACCENT, fontWeight: 400 }}>PowerPoint.</em>
            </h3>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                margin: "6px",
                width: "fit-content",
              }}
              onMouseEnter={() => setBtnHov(true)}
              onMouseLeave={() => setBtnHov(false)}
            >
              {/* Top-Left Bracket */}
              <span
                style={{
                  position: "absolute", top: -4, left: -4, width: 16, height: 16,
                  pointerEvents: "none",
                  transition: "transform 0.2s ease",
                  transform: btnHov ? "scale(0.85)" : "scale(1)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="16" cy="16" r="9" fill="#E84A3F"/><circle cx="16" cy="16" r="5" fill="#F97316"/></svg>
              </span>
              {/* Top-Right Bracket */}
              <span
                style={{
                  position: "absolute", top: -4, right: -4, width: 16, height: 16,
                  pointerEvents: "none",
                  transition: "transform 0.2s ease",
                  transform: btnHov ? "scale(0.85)" : "scale(1)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="0" cy="16" r="9" fill="#E84A3F"/><circle cx="0" cy="16" r="5" fill="#F97316"/></svg>
              </span>
              {/* Bottom-Left Bracket */}
              <span
                style={{
                  position: "absolute", bottom: -4, left: -4, width: 16, height: 16,
                  pointerEvents: "none",
                  transition: "transform 0.2s ease",
                  transform: btnHov ? "scale(0.85)" : "scale(1)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="16" cy="0" r="9" fill="#E84A3F"/><circle cx="16" cy="0" r="5" fill="#F97316"/></svg>
              </span>
              {/* Bottom-Right Bracket */}
              <span
                style={{
                  position: "absolute", bottom: -4, right: -4, width: 16, height: 16,
                  pointerEvents: "none",
                  transition: "transform 0.2s ease",
                  transform: btnHov ? "scale(0.85)" : "scale(1)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#0f0f1f" rx="2"/><circle cx="0" cy="0" r="9" fill="#E84A3F"/><circle cx="0" cy="0" r="5" fill="#F97316"/></svg>
              </span>

              <button
                onClick={() => router.push("/canvas")}
                style={{
                  background: "#F97316",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  width: "220px",
                  height: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "opacity 0.2s, transform 0.1s",
                  transform: btnHov ? "scale(0.98)" : "scale(1)",
                }}
              >
                Open a new canvas
              </button>
            </div>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: AMBER }}>
              no signup, no template, just paper
            </span>
          </div>
        </div>

        {/* Right Side Columns */}
        <div>
          <div className="footer-cols">
            <div>
              <a href="/canvas" className="footer-menu-item">Canvas</a>
              <a href="/dashboard" className="footer-menu-item">Dashboard</a>
              <a href="/signin" className="footer-menu-item">Sign In</a>
            </div>
            <div>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-menu-item">GitHub</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24, color: "var(--footer-social)", transition: "transform 0.3s, color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = ACCENT} onMouseLeave={(e) => e.currentTarget.style.color = "var(--footer-social)"}>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24, color: "var(--footer-social)", transition: "transform 0.3s, color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = ACCENT} onMouseLeave={(e) => e.currentTarget.style.color = "var(--footer-social)"}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" title="Discord">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24, color: "var(--footer-social)", transition: "transform 0.3s, color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = ACCENT} onMouseLeave={(e) => e.currentTarget.style.color = "var(--footer-social)"}>
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24, color: "var(--footer-social)", transition: "transform 0.3s, color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = ACCENT} onMouseLeave={(e) => e.currentTarget.style.color = "var(--footer-social)"}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="footer-bottom-grid" style={{ display: "block", borderTop: "1px solid var(--footer-border)", paddingTop: 40, maxWidth: 990, margin: "40px auto 0" }}>
        <div className="copyright-text" style={{ textAlign: "center" as const }}>
          <p style={{ margin: "0 0 8px" }}>
            © 2026 Canvas · open source · MIT. All rights reserved.
          </p>
          <p style={{ margin: 0, opacity: 0.7 }}>
            made with — and on — Canvas. Designed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
