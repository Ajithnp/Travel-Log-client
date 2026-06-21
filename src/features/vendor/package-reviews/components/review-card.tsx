import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ZoomIn } from "lucide-react";
import { StarRating } from "@/components/common/start-rating";
import { Lightbox } from "./image-light-box";
import { useState } from "react";
import type { VendorPackageReviewResponseDto } from "../services/api.services";
import { format } from "date-fns";

type IReview = VendorPackageReviewResponseDto;

export function ReviewCard({ review, index }: { review: IReview; index: number }) {
  const [lightbox, setLightbox] = useState<{ open: boolean; start: number }>({ open: false, start: 0 });

  return (
    <>
      <motion.div
        custom={index}
        variants={{
          hidden: { opacity: 0, y: 18 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.38, delay: i * 0.06, ease: "easeOut" },
          }),
        }}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-white border-gray-200 hover:shadow-md hover:border-gray-300 transition-all">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9 flex-shrink-0">
                  <AvatarFallback className={`$text-white text-xs font-bold`}>
                    {review.userName.charAt(0).toUpperCase() + review.userName.charAt(1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">{review.userName}</span>
                  </div>
                  <span className="text-xs text-gray-400">{format(new Date(review.createdAt), "dd MMM yyyy")}</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-xs font-medium bg-blue-500 text-white flex-shrink-0`}
              >
                {review.packageName}
              </Badge>
            </div>
            <div className="mt-3">
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">{review.text}</p>
            {review.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {review.images.map((img, i) => (
                  <motion.button
                    key={img.url}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setLightbox({ open: true, start: i })}
                    className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0"
                  >
                    <img
                      src={img.url}
                      alt={'Image'}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {lightbox.open && (
          <Lightbox
            images={review.images.filter((img) => !!img.url).map((img, i) => ({ id: i, url: img.url as string, alt: "Review Image" }))}
            startIdx={lightbox.start}
            onClose={() => setLightbox({ open: false, start: 0 })}
          />
        )}
      </AnimatePresence>
    </>
  );
}