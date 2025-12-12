// src/components/shared/modal/FullScreenImageViewer.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ReactDOM from "react-dom";

interface FullScreenImageViewerProps {
  images: string[];
  currentIndex: number | null;
  open: boolean;
  onClose: () => void;
}

const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({
  images,
  currentIndex,
  open,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(currentIndex);

  const handleClose = () => {
    setActiveIndex(null);
    onClose()
  };
  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-[10000] bg-black/50 border-white/20 text-white hover:bg-black/70 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Main image */}
            {activeIndex !== null && (
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[activeIndex]}
                alt={`Image ${activeIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            )}

            {/* Thumbnails */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default FullScreenImageViewer;
