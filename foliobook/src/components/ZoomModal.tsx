import React from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  caption?: string;
}

export const ZoomModal: React.FC<ZoomModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  caption,
}) => {
  const [scale, setScale] = React.useState<number>(1);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const buttons = Array.from(
        dialog.querySelectorAll<HTMLButtonElement>("button"),
      );
      const first = buttons[0],
        last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen]);

  if (!isOpen || !imageSrc) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.35, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.35, 0.7));
  const handleReset = () => setScale(1);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Manga panel zoom"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none animate-in fade-in duration-200"
    >
      {/* Top Bar with Controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl flex items-center justify-between px-4 py-3 bg-stone-900/90 rounded-xl border border-stone-800"
      >
        <span className="text-xs font-manga-tech uppercase tracking-wider text-amber-500 font-bold truncate">
          {caption || "Manga Panel Inspection"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-manga-tech"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-stone-700 mx-1" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white transition-colors"
            title="Close Zoom"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex-1 w-full max-w-5xl flex items-center justify-center overflow-auto p-4"
      >
        <img
          src={imageSrc}
          alt={caption || "Zoomed manga panel"}
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.2s ease-out",
          }}
          className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl border border-stone-800"
        />
      </div>

      {/* Caption footer */}
      {caption && (
        <div className="text-center text-xs font-dialogue text-stone-400 max-w-lg pb-2">
          {caption}
        </div>
      )}
    </div>
  );
};
