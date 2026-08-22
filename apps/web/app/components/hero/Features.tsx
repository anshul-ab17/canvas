"use client";
import React from "react";
import { SectionTag, ACCENT } from "./Common";

export default function Features({ addReveal }: { addReveal: (el: Element | null) => void }) {
  const features = [
    {
      num: "F.01",
      title: "Real-time collab",
      body: "Live cursors and shared state. Multiple editors on the same board feel instant.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="driver-card-svg">
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#1C1A15" stroke="#3A352C" strokeWidth="2" />
          <rect x="45" y="60" width="50" height="40" rx="4" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
          <circle cx="140" cy="80" r="15" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M95 80 H125" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.3" />
          <g transform="translate(65, 80)">
            <path d="M0 0 L15 5 L10 10 L15 15 L12 18 L7 13 L2 18 Z" fill={ACCENT} />
            <rect x="12" y="18" width="38" height="16" rx="2" fill={ACCENT} />
            <text x="31" y="29" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Sarah</text>
          </g>
          <g transform="translate(115, 105)">
            <path d="M0 0 L15 5 L10 10 L15 15 L12 18 L7 13 L2 18 Z" fill="#3D6BE5" />
            <rect x="12" y="18" width="34" height="16" rx="2" fill="#3D6BE5" />
            <text x="29" y="29" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Alex</text>
          </g>
        </svg>
      )
    },
    {
      num: "F.02",
      title: "Roughness slider",
      body: "Pick the exact level of 'I drew this in a meeting' — from architect to napkin.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="driver-card-svg">
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#1C1A15" stroke="#3A352C" strokeWidth="2" />
          <circle cx="65" cy="80" r="24" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
          <text x="65" y="122" fill="#9797A5" fontSize="9" fontFamily="monospace" textAnchor="middle">Architect</text>
          <path d="M125 80 C125 65, 135 56, 150 56 C165 56, 174 68, 174 80 C174 92, 162 104, 150 104 C135 104, 125 95, 125 80 Z" fill="none" stroke="#ffffff" strokeWidth="2" />
          <text x="150" y="122" fill="#9797A5" fontSize="9" fontFamily="monospace" textAnchor="middle">Napkin</text>
          <rect x="40" y="150" width="120" height="4" rx="2" fill="#3A352C" />
          <circle cx="130" cy="152" r="8" fill={ACCENT} />
        </svg>
      )
    },
    {
      num: "F.03",
      title: "AI diagram gen",
      body: "Describe a flow in plain text. Get a ready-to-edit diagram on the canvas.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="driver-card-svg">
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#1C1A15" stroke="#3A352C" strokeWidth="2" />
          <rect x="35" y="45" width="130" height="24" rx="4" fill="#22201A" stroke={ACCENT} strokeWidth="1.5" />
          <text x="45" y="60" fill={ACCENT} fontSize="9" fontWeight="bold" fontFamily="monospace">draw flowchart...</text>
          <path d="M148 40 L150 46 L156 48 L150 50 L148 56 L146 50 L140 48 L146 46 Z" fill="#F2B84B" />
          <rect x="45" y="105" width="40" height="22" rx="3" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
          <rect x="115" y="90" width="40" height="22" rx="3" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
          <rect x="115" y="120" width="40" height="22" rx="3" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
          <path d="M85 116 L100 116 L100 101 L112 101" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
          <path d="M85 116 L100 116 L100 131 L112 131" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
        </svg>
      )
    },
    {
      num: "F.04",
      title: "Guest canvas",
      body: "No signup required. Open a blank canvas, share the URL, start drawing.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="driver-card-svg">
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#1C1A15" stroke="#3A352C" strokeWidth="2" />
          <rect x="35" y="45" width="130" height="110" rx="4" fill="#22201A" stroke="#3A352C" strokeWidth="1.5" />
          <circle cx="45" cy="53" r="3" fill="#E84A3F" />
          <circle cx="55" cy="53" r="3" fill="#F2B84B" />
          <circle cx="65" cy="53" r="3" fill="#2E8A6A" />
          <rect x="80" y="50" width="75" height="6" rx="2" fill="#1C1A15" />
          <rect x="45" y="80" width="110" height="48" rx="6" fill="#1C1A15" stroke="#ffffff" strokeWidth="1.5" />
          <text x="55" y="98" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">canvas.new/room</text>
          <rect x="55" y="108" width="55" height="12" rx="2" fill={ACCENT} />
          <text x="82" y="117" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Share Link</text>
          <path d="M125 98 C125 95, 133 95, 133 98 H138 C138 93, 120 93, 120 98 Z" fill="#ffffff" fillOpacity="0.7" />
        </svg>
      )
    },
  ];

  return (
    <section style={{ position: "relative", zIndex: 5, padding: "80px 56px", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--paper)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .features-container {
          max-width: 990px;
          margin: 0 auto;
        }
        .features-header-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 64px;
          align-items: flex-end;
        }
        @media (min-width: 1024px) {
          .features-header-grid {
            grid-template-columns: 1.2fr 1fr;
          }
        }
        .features-title-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 16px;
          display: block;
        }
        .features-title {
          font-family: 'Oswald', 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(20px, 3.25vw, 42px);
          font-weight: 900;
          line-height: 0.85;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--ink);
        }
        .features-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ink-soft);
          margin: 0;
        }
        .features-driver-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .features-driver-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .features-driver-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .driver-card {
          background: #000016;
          border-radius: 12px;
          padding: 16px;
          padding-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          cursor: pointer;
          position: relative;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transform: translateY(60px) scale(0.96);
          transition: 
            opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
            transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
            background-color 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .driver-card.in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .driver-card:hover {
          background-color: ${ACCENT};
        }
        .driver-card-img-wrapper {
          position: relative;
          aspect-ratio: 1 / 1;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
        }
        .driver-card-svg {
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .driver-card:hover .driver-card-svg {
          transform: scale(1.05);
        }
        .driver-card-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          color: #ffffff;
        }
        .driver-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .animation-text-container {
          overflow: hidden;
          height: 28px;
        }
        .animation-text {
          display: block;
          position: relative;
          height: 28px;
          line-height: 28px;
          margin: 0;
          font-family: 'Oswald', 'Impact', 'Arial Narrow', sans-serif;
          font-size: 24px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .animation-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 100%;
          color: #ffffff;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .animation-text span {
          display: block;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .driver-card:hover .animation-text span {
          transform: translateY(-100%);
        }
        .driver-card:hover .animation-text::after {
          transform: translateY(-100%);
        }
        .animation-icon {
          display: inline-flex;
          overflow: hidden;
          width: 24px;
          height: 24px;
          position: relative;
        }
        .animation-icon .arrow-1 {
          width: 24px;
          height: 24px;
          fill: #ffffff;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .animation-icon .arrow-2 {
          position: absolute;
          left: -24px;
          width: 24px;
          height: 24px;
          fill: #ffffff;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .driver-card:hover .animation-icon .arrow-1 {
          transform: translateX(24px);
        }
        .driver-card:hover .animation-icon .arrow-2 {
          transform: translateX(24px);
        }
        .driver-card-body {
          font-size: 14.5px;
          line-height: 1.5;
          opacity: 0.8;
          margin: 0;
          color: #e2e2e9;
        }
      ` }} />

      <div className="features-container">
        <SectionTag num="002" label="Features" addReveal={addReveal} scale={0.8} />
        
        <div className="features-header-grid">
          <div ref={addReveal} className="reveal">
            <span className="features-title-label">Primitive Tools</span>
            <h2 className="features-title">Built for teams</h2>
          </div>
          <p ref={addReveal} className="reveal features-desc">
            Every feature earns its place. The primitives a{" "}
            <em style={{ fontFamily: "'Caveat',cursive", fontStyle: "normal", fontSize: "1.2em", color: ACCENT }}>sharp</em>{" "}
            team needs to think out loud, together.
          </p>
        </div>

        <div className="features-driver-grid">
          {features.map((f, i) => (
            <div 
              key={f.num} 
              ref={addReveal} 
              className="reveal driver-card"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="driver-card-img-wrapper">
                {f.visual}
              </div>
              
              <div className="driver-card-content">
                <div className="driver-card-header">
                  <div className="animation-text-container">
                    <h3 className="animation-text" data-text={f.title}>
                      <span>{f.title}</span>
                    </h3>
                  </div>
                  <div className="animation-icon">
                    <svg className="arrow-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                    </svg>
                    <svg className="arrow-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                    </svg>
                  </div>
                </div>
                <p className="driver-card-body">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
