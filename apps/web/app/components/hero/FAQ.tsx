"use client";
import { useState, useEffect, useRef } from "react";
import { ACCENT, INK, INK_SOFT, SectionTag } from "./Common";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Will Canvas work with my existing tools?",
    a: "Yes! Canvas supports seamless exports to PNG, SVG, and JSON. You can copy drawings directly to your clipboard and paste them into Slack, Figma, GitHub, or your code editor with no loss of detail.",
  },
  {
    q: "How is Canvas different from Excalidraw or Miro?",
    a: "Canvas is built specifically for software engineering teams. It loads in under 100ms, requires no sign-up to start sketching, and features a local-first architecture alongside custom AI diagram generation that understands database schemas, cloud infrastructure, and workflows.",
  },
  {
    q: "Can I use Canvas for live team collaboration?",
    a: "Absolutely. Canvas features real-time multiplayer synchronization, live cursor tracking, and instant guest sharing links. Just copy the URL, send it to your team, and start sketching together instantly.",
  },
  {
    q: "Is my diagram data private and secure?",
    a: "Yes. Canvas is local-first by default, storing your boards securely in your browser's local storage. When you invite others to collaborate, the sync connections are encrypted. We never inspect or sell your diagram data.",
  },
  {
    q: "Is Canvas free?",
    a: "Yes! Canvas is entirely free to use for individuals and small groups with unlimited local boards. We plan to offer self-hosted enterprise packages with SSO and team directory features in the future.",
  },
];

const SlideButton = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const maxOffset = 212; // 260 width - 40 handle - 8 padding

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX - offsetX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    let newOffset = clientX - startXRef.current;
    if (newOffset < 0) newOffset = 0;
    if (newOffset > maxOffset) newOffset = maxOffset;
    setOffsetX(newOffset);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (offsetX >= maxOffset * 0.9) {
      setOffsetX(maxOffset);
      window.location.href = "/canvas";
    } else {
      setOffsetX(0);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handleEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, offsetX]);

  return (
    <div
      style={{
        width: 260,
        height: 48,
        background: ACCENT,
        borderRadius: 24,
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(232, 74, 63, 0.2)",
        userSelect: "none",
        cursor: "pointer",
      }}
      onClick={() => {
        window.location.href = "/canvas";
      }}
    >
      <span
        style={{
          width: "100%",
          textAlign: "center",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "'Inter Tight', sans-serif",
          pointerEvents: "none",
          paddingLeft: 30,
        }}
      >
        Open a new canvas
      </span>

      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          handleStart(e.clientX);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          if (e.touches[0]) handleStart(e.touches[0].clientX);
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isDragging ? "grabbing" : "grab",
          position: "absolute",
          left: 4,
          transform: `translateX(${offsetX}px)`,
          transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          color: "#15130F",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        &gt;
      </div>
    </div>
  );
};

export default function FAQ({ addReveal }: { addReveal: (el: Element | null) => void }) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section id="faq" style={{ position: "relative", zIndex: 5, padding: "80px 56px", background: "var(--paper, #ffffff)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .faq-container {
          max-width: 990px;
          margin: 0 auto;
        }
        .faq-header-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 48px;
          align-items: end;
        }
        @media (min-width: 768px) {
          .faq-header-grid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 48px;
          }
        }
        .faq-title-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${ACCENT};
          display: block;
          margin-bottom: 12px;
        }
        .faq-title {
          font-family: 'Oswald', 'Impact', 'Arial Narrow', sans-serif;
          font-size: clamp(19px, 2.25vw, 32px);
          font-weight: 900;
          line-height: 0.85;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--ink);
        }
        .faq-title em {
          font-style: italic;
          font-weight: 900;
        }
        .faq-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ink-soft);
          margin: 0;
        }
        
        /* Two column layout container */
        .faq-panel-wrap {
          display: grid;
          grid-template-columns: 1fr;
          border: 2px solid var(--ink);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 8px 8px 0 var(--ink);
          margin-top: 32px;
        }
        @media (min-width: 1024px) {
          .faq-panel-wrap {
            grid-template-columns: 1.15fr 1.85fr;
          }
        }

        /* Left Questions Column */
        .faq-questions-col {
          background: #0A0A0C; /* matches Leclerc dark aesthetic */
          padding: 0;
          display: flex;
          flex-direction: column;
          border-bottom: 2px solid var(--ink);
        }
        @media (min-width: 1024px) {
          .faq-questions-col {
            border-bottom: none;
            border-right: 2px solid var(--ink);
          }
        }
        .faq-inside-heading {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          color: #ffffff;
          padding: 32px 32px 16px 32px;
          margin: 0;
          font-weight: 500;
        }
        .faq-q-list {
          display: flex;
          flex-direction: column;
        }
        .faq-q-btn {
          background: none;
          border: none;
          text-align: left;
          font-family: 'Inter Tight', sans-serif;
          font-size: 16.5px;
          font-weight: 600;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.65);
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 16px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .faq-q-btn:last-child {
          border-bottom: none;
        }
        .faq-q-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.04);
        }
        .faq-q-btn.active {
          color: ${ACCENT};
          background: rgba(255, 255, 255, 0.06);
        }

        /* Right Answers Column */
        .faq-answers-col {
          background: var(--paper-2, #F4EFE6);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 380px;
        }
        .faq-answer-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 16px;
          gap: 16px;
        }
        .faq-answer-title {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 500;
          color: var(--ink);
          margin: 0;
        }
        .faq-selected-q-label {
          font-size: 13px;
          color: var(--ink-soft);
          font-weight: 600;
          text-align: right;
          opacity: 0.8;
          max-width: 60%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .faq-answer-card {
          background: var(--paper, #ffffff);
          border: 2px solid var(--ink);
          border-radius: 12px;
          padding: 28px;
          box-shadow: 4px 4px 0 var(--ink);
          flex-grow: 1;
          display: flex;
          align-items: center;
        }
        .faq-answer-text {
          font-size: 16px;
          line-height: 1.6;
          color: var(--ink-soft);
          margin: 0;
        }
      ` }} />

      <div className="faq-container">
        <SectionTag num="005" label="FAQ" addReveal={addReveal} scale={0.8} />

        <div className="faq-header-grid">
          <div ref={addReveal} className="reveal">
            <span className="faq-title-label">Common Questions</span>
            <h2 className="faq-title">Good <em>questions.</em></h2>
          </div>
          <p ref={addReveal} className="reveal faq-desc">
            Quick{" "}
            <em style={{ fontFamily: "'Caveat',cursive", fontStyle: "normal", fontSize: "1.2em", color: ACCENT }}>answers</em>{" "}
            to the most common questions about Canvas, team collaboration, security, and pricing.
          </p>
        </div>

        <div ref={addReveal} className="reveal">
          <div className="faq-panel-wrap">
            {/* Left Column (Questions) */}
            <div className="faq-questions-col">
              <h3 className="faq-inside-heading">Questions</h3>
              <div className="faq-q-list">
                {FAQS.map((faq, i) => (
                  <button
                    key={i}
                    className={`faq-q-btn${activeIdx === i ? " active" : ""}`}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column (Answers) */}
            <div className="faq-answers-col">
              <div className="faq-answer-header">
                <h3 className="faq-answer-title">Answer</h3>
                <span className="faq-selected-q-label">
                  {FAQS[activeIdx]?.q}
                </span>
              </div>
              <div className="faq-answer-card">
                <p className="faq-answer-text">
                  {FAQS[activeIdx]?.a}
                </p>
              </div>
            </div>
          </div>

          {/* Start Drawing CTA */}
          <div style={{ marginTop: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, margin: 0, color: "var(--ink)", lineHeight: 1.1 }}>
              Start <em style={{ fontStyle: "italic", fontWeight: 400 }}>drawing.</em>
            </h3>
            <SlideButton />
          </div>
        </div>
      </div>
    </section>
  );
}
