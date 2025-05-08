
"use client";
import { useEffect } from "react";

export default function ImageModal({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    >
      <img src={imageUrl} alt="Full view" className="max-w-full max-h-full object-contain" />
    </div>
  );
}
