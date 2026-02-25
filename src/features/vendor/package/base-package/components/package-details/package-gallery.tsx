import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PackageGalleryProps {
  images?: { url?: string; key?: string }[]; 
}

export function PackageGallery({ images }: PackageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images?.length) return null; 

  const activeImage = images[activeIndex]?.url;

  return (
    <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
      <div className="rounded-xl overflow-hidden border bg-muted aspect-[16/9] max-h-[360px]">
        <img
          src={activeImage}
          alt="Package"
          className="w-full h-full object-cover transition-opacity duration-300"
          key={activeIndex}
        />
      </div>
      <div className="flex gap-2 mt-3">
        {images.map((img, i) => (
          <Button
            key={img.key ?? i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-lg overflow-hidden border-2 transition-all duration-200 w-14 h-14 shrink-0 ${
              i === activeIndex
                ? "border-secondary ring-2 ring-secondary/30"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img.url} alt="" className="w-full h-full object-cover" />
          </Button>
        ))}
      </div>
    </div>
  );
}