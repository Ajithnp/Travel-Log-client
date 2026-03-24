import { useState } from "react";

type ImageGalleryProps = {
  images: { key: string; url?: string }[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || null);

  return (
    <div className="relative w-full space-y-3">

      {/* Main Image */}
      <div className="relative w-full h-56 sm:h-72 lg:h-96 rounded-xl overflow-hidden">
        <img
          src={activeImage?.url}
          alt="Package"
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={`Thumbnail ${i + 1}`}
            onClick={() => setActiveImage(img)}
            className={`shrink-0 w-14 h-14 rounded-lg object-cover cursor-pointer border-2 transition-all duration-200
              ${activeImage?.key === img.key
                ? "border-primary scale-105 opacity-100"
                : "border-transparent opacity-60 hover:opacity-90"
              }`}
          />
        ))}
      </div>

    </div>
  );
}