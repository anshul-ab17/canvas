"use client";
import React, { useState, useEffect } from "react";
import { ACCENT, SectionTag } from "./Common";

export default function HowItWorks({ addReveal }: { addReveal: (el: Element | null) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const steps = [
    {
      num: "01",
      title: "Workflow",
      desc: "Draw shapes your way or let AI generate them for you. Make quick edits, fine-tune details, and build out your ideas.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#9896FF" />
          <circle cx="120" cy="90" r="60" fill="#ffffff" fillOpacity="0.1" />
          <g transform="translate(30, 25)">
            <rect width="180" height="130" rx="8" fill="#1C1A15" stroke="#3A352C" strokeWidth="2" />
            <rect x="20" y="20" width="65" height="36" rx="4" fill="#22201A" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3" />
            <text x="52.5" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Add Shape</text>
            <rect x="95" y="20" width="65" height="36" rx="4" fill="#22201A" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3" />
            <text x="127.5" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Connect</text>
            <rect x="20" y="74" width="140" height="36" rx="4" fill={ACCENT} />
            <text x="90" y="96" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Launch Canvas</text>
          </g>
        </svg>
      )
    },
    {
      num: "02",
      title: "Live Editing",
      desc: "Work together in real-time on the same board. Bring collaborators in and make changes with zero latency.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#39BEB7" />
          <circle cx="120" cy="90" r="60" fill="#ffffff" fillOpacity="0.1" />
          <g transform="translate(30, 25)">
            <rect width="180" height="130" rx="8" fill="#1C1A15" stroke="#3A352C" strokeWidth="2" />
            <circle cx="60" cy="65" r="20" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
            <g transform="translate(85, 45)">
              <path d="M0 0 L15 5 L10 10 L15 15 L12 18 L7 13 L2 18 Z" fill={ACCENT} />
              <rect x="12" y="18" width="46" height="16" rx="2" fill={ACCENT} />
              <text x="35" y="29" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Red John</text>
            </g>
            <rect x="30" y="25" width="120" height="10" rx="2" fill="#22201A" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <rect x="30" y="95" width="120" height="10" rx="2" fill="#22201A" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        </svg>
      )
    },
    {
      num: "03",
      title: "Export & Share",
      desc: "No complicated file setups. Share the room URL to edit, or export to standard PNG/SVG with one click.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#39D1F9" />
          <circle cx="120" cy="90" r="60" fill="#ffffff" fillOpacity="0.1" />
          <g transform="translate(35, 25)">
            <rect width="170" height="130" rx="8" fill="#1C1A15" stroke="#3A352C" strokeWidth="2" />
            <rect x="20" y="25" width="130" height="32" rx="4" fill="#22201A" stroke="#3A352C" strokeWidth="1.5" />
            <text x="85" y="44" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">canvas.new/board-abc</text>
            <rect x="20" y="75" width="60" height="32" rx="4" fill={ACCENT} />
            <text x="50" y="95" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PNG</text>
            <rect x="90" y="75" width="60" height="32" rx="4" fill="#2E8A6A" />
            <text x="120" y="95" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SVG</text>
          </g>
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" style={{ position: "relative", zIndex: 5, padding: "80px 56px", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--paper-2)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .how-container {
          max-width: 990px;
          margin: 0 auto;
        }
        .how-header-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 64px;
          align-items: flex-end;
        }
        @media (min-width: 1024px) {
          .how-header-grid {
            grid-template-columns: 1.2fr 1fr;
          }
        }
        .how-title-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 16px;
          display: block;
        }
        .how-title {
          font-family: 'Oswald', 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(20px, 2.75vw, 42px);
          font-weight: 900;
          line-height: 0.85;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--ink);
        }
        .how-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ink-soft);
          margin: 0;
        }
        .how-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .how-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1024px) {
          .how-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        .how-card {
          border: 1.5px solid var(--ink);
          background: var(--paper-3);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 6px 6px 0 var(--ink);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .how-card:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0 var(--ink);
        }
        .how-card-visual {
          height: 180px;
          overflow: hidden;
          position: relative;
          border-bottom: 1.5px solid var(--ink);
        }
        .how-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .how-card-step {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-soft);
          opacity: 0.6;
        }
        .how-card-title {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: var(--ink);
        }
        .how-card-desc {
          font-size: 14.5px;
          line-height: 1.5;
          color: var(--ink-soft);
          margin: 0;
        }
      ` }} />

      <div className="how-container">
        <SectionTag num="004" label="How it works" addReveal={addReveal} scale={0.8} />

        <div className="how-header-grid">
          <div ref={addReveal} className="reveal">
            <span className="how-title-label">Instant Workflow</span>
            <h2 className="how-title">
              From Idea to Live Diagram, <em style={{ fontStyle: "italic", fontWeight: 900 }}>Instantly.</em>
            </h2>
          </div>
          <p ref={addReveal} className="reveal how-desc">
            Build diagrams your way or let AI generate them for you. Make quick edits, fine-tune details, and{" "}
            <em style={{ fontFamily: "'Caveat',cursive", fontStyle: "normal", fontSize: "1.2em", color: ACCENT }}>collaborate</em>{" "}
            in seconds.
          </p>
        </div>

        <div className="how-grid">
          {steps.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={s.num}
                ref={addReveal}
                className="reveal how-card"
                onMouseEnter={() => {
                  setActiveIndex(i);
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
                style={{
                  opacity: isActive ? 1 : 0.35,
                  transform: isActive ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(0.97)",
                  filter: isActive ? "none" : "grayscale(30%) blur(0.3px)",
                  boxShadow: isActive ? "10px 10px 0 var(--ink)" : "4px 4px 0 var(--ink)",
                  borderColor: isActive ? ACCENT : "var(--ink)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                }}
              >
                <div className="how-card-visual">
                  {s.visual}
                </div>
                <div className="how-card-content">
                  <span className="how-card-step" style={{ color: isActive ? ACCENT : "var(--ink-soft)" }}>Step {s.num}</span>
                  <h3 className="how-card-title">{s.title}</h3>
                  <p className="how-card-desc">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
