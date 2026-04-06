"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import rough from "roughjs";
import { STORAGE_KEY } from "../types";
import { drawSelectionOverlay } from "../canvasUtils";
import { renderElement } from "../renderElement";
import { useCanvasStyle } from "./useCanvasStyle";
import { useCanvasHistory } from "./useCanvasHistory";
import { useZoomPan } from "./useZoomPan";
import { useAiDiagram } from "./useAiDiagram";
import { useGuestDrawing } from "./useGuestDrawing";

export function useGuestCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const style = useCanvasStyle();
  const hist = useCanvasHistory();
  const zoom = useZoomPan(canvasRef, () => hist.setElements(prev => [...prev]));
  const ai = useAiDiagram({ elementsRef: hist.elementsRef, pushHistory: hist.pushHistory, setElements: hist.setElements });
  const draw = useGuestDrawing({
    canvasRef,
    elementsRef: hist.elementsRef,
    setElements: hist.setElements,
    pushHistory: hist.pushHistory,
    panOffsetRef: zoom.panOffsetRef,
    zoomRef: zoom.zoomRef,
    isPanningRef: zoom.isPanningRef,
    panStartRef: zoom.panStartRef,
    setPanOffset: zoom.setPanOffset,
    setIsPanning: zoom.setIsPanning,
    strokeColorRef: style.strokeColorRef,
    bgColorRef: style.bgColorRef,
    strokeWidthRef: style.strokeWidthRef,
    roughnessRef: style.roughnessRef,
    opacityRef: style.opacityRef,
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const els = JSON.parse(saved);
        if (els.length > 0) {
          hist.setElements(els);
          hist.setHistory([[], els]);
          hist.setHistoryIdx(1);
        }
      }
    } catch {}
    setIsSignedIn(!!localStorage.getItem("token"));
    ai.setUserApiKey(localStorage.getItem("canvas_api_key") ?? "");
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(hist.elements)); } catch {}
  }, [hist.elements, loaded]);

  // Canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const rc = rough.canvas(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gridSize = 40 * zoom.zoom;
    const ox = ((zoom.panOffset.x % gridSize) + gridSize) % gridSize;
    const oy = ((zoom.panOffset.y % gridSize) + gridSize) % gridSize;
    ctx.strokeStyle = "#e9ecef";
    ctx.lineWidth = 1;
    for (let x = ox - gridSize; x < canvas.width + gridSize; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = oy - gridSize; y < canvas.height + gridSize; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    ctx.save();
    ctx.translate(zoom.panOffset.x, zoom.panOffset.y);
    ctx.scale(zoom.zoom, zoom.zoom);
    hist.elements.forEach(el =>
      renderElement(rc, ctx, el, imageCacheRef.current, () => hist.setElements(prev => [...prev]))
    );
    if (draw.drawingElementRef.current) renderElement(rc, ctx, draw.drawingElementRef.current, imageCacheRef.current);
    ctx.restore();

    if (draw.selectedId) {
      const sel = hist.elements.find(e => e.id === draw.selectedId);
      if (sel) drawSelectionOverlay(ctx, sel, zoom.panOffset, zoom.zoom);
    }
  }, [hist.elements, zoom.panOffset, zoom.zoom, draw.selectedId]);

  function clearCanvas() {
    if (!confirm("Clear all elements?")) return;
    hist.setElements([]);
    draw.setSelectedId(null);
    hist.pushHistory([]);
  }

  function downloadCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const cursor =
    draw.currentTool === "hand" ? (zoom.isPanning ? "grabbing" : "grab") :
    draw.currentTool === "eraser" ? "cell" :
    draw.currentTool === "text" ? "text" :
    draw.currentTool === "selection" ? draw.canvasCursor : "crosshair";

  const textScreenX = draw.textInput ? draw.textInput.x * zoom.zoom + zoom.panOffset.x : 0;
  const textScreenY = draw.textInput ? draw.textInput.y * zoom.zoom + zoom.panOffset.y : 0;

  return {
    canvasRef,
    fileInputRef: draw.fileInputRef,
    // style
    strokeColor: style.strokeColor, setStrokeColor: style.setStrokeColor,
    bgColor: style.bgColor, setBgColor: style.setBgColor,
    strokeWidth: style.strokeWidth, setStrokeWidth: style.setStrokeWidth,
    roughness: style.roughness, setRoughness: style.setRoughness,
    opacity: style.opacity, setOpacity: style.setOpacity,
    // history
    history: hist.history, historyIdx: hist.historyIdx,
    undo: hist.undo, redo: hist.redo,
    // zoom
    zoom: zoom.zoom, isPanning: zoom.isPanning,
    doZoom: zoom.doZoom,
    // drawing
    currentTool: draw.currentTool, handleToolChange: draw.handleToolChange,
    selectedId: draw.selectedId,
    textInput: draw.textInput, setTextInput: draw.setTextInput,
    onMouseDown: draw.onMouseDown, onMouseMove: draw.onMouseMove, onMouseUp: draw.onMouseUp,
    commitText: draw.commitText, onTextBoxDragStart: draw.onTextBoxDragStart,
    deleteSelected: draw.deleteSelected, handleImageUpload: draw.handleImageUpload,
    // ai
    showAiModal: ai.showAiModal, setShowAiModal: ai.setShowAiModal,
    aiPrompt: ai.aiPrompt, setAiPrompt: ai.setAiPrompt,
    aiMode: ai.aiMode, setAiMode: ai.setAiMode,
    aiLoading: ai.aiLoading, aiError: ai.aiError,
    userApiKey: ai.userApiKey, setUserApiKey: ai.setUserApiKey,
    showApiKey: ai.showApiKey, setShowApiKey: ai.setShowApiKey,
    generateDiagram: ai.generateDiagram,
    // misc
    isSignedIn, copied,
    clearCanvas, downloadCanvas, copyLink,
    cursor, textScreenX, textScreenY,
    goToDashboard: () => router.push("/dashboard"),
    goToSignIn: () => router.push("/signin"),
  };
}
