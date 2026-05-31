import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  X,
  ImagePlus,
  Trash2,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { RATING_COLORS, STAR_FILL } from "@/lib/constants/ui/mapping-ui";
import { overlayVariants, reviewModalVariants, reviewSuccessVariants } from "@/animation/variants";

const RATING_LABELS = ["Terrible", "Poor", "Average", "Good", "Excellent"];

type PhotoPreview = 
{
  file: File;
  url: string;
  name: string;
  id: string;

 };

type Errors = 
{
    rating?: string;
    review?: string;
    photos?: string;
};


function StarRating({
  value,
  hover,
  onRate,
  onHover,
  onLeave,
  error,
}: {
  value: number;
  hover: number;
  onRate: (v: number) => void;
  onHover: (v: number) => void;
  onLeave: () => void;
  error?: string;
}) {
  const active = hover || value;
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
        Your Rating <span className="text-red-400">*</span>
      </label>
      <div className="flex items-center gap-1 sm:gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button
            key={n}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRate(n)}
            onMouseEnter={() => onHover(n)}
            onMouseLeave={onLeave}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 sm:w-9 sm:h-9 transition-all duration-100 ${
                n <= active
                  ? (STAR_FILL[active - 1] ?? "fill-slate-200 text-slate-200")
                  : "fill-slate-100 text-slate-200"
              }`}
            />
          </motion.button>
        ))}
        <AnimatePresence mode="wait">
          {active > 0 && (
            <motion.span
              key={active}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.15 }}
              className={`ml-2 text-sm font-semibold ${RATING_COLORS[active - 1]}`}
            >
              {RATING_LABELS[active - 1]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1 text-xs text-red-500 mt-1.5 overflow-hidden"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PhotoUpload({
  photos,
  onAdd,
  onRemove,
  error,
}: {
  photos: PhotoPreview[];
  onAdd: (files: FileList) => void;
  onRemove: (id: string) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Photos <span className="text-slate-400 font-normal normal-case">(optional · max 2)</span>
        </label>
        <span className="text-xs text-slate-400">{photos.length}/2</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <AnimatePresence>
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-200 group flex-shrink-0"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onRemove(photo.id)}
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {photos.length < 2 && (
          <motion.button
            type="button"
            onClick={() => inputRef.current?.click()}
            whileTap={{ scale: 0.97 }}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all duration-200 flex-shrink-0 `}
          >
            <ImagePlus className={`w-5 h-5 text-slate-400`} />
            <span className={`text-[10px] font-medium text-center leading-tight`}>Add photo</span>
          </motion.button>
        )}
      </div>

      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> e.target.files && onAdd(e.target.files)}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1 text-xs text-red-500 mt-1.5 overflow-hidden"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={reviewSuccessVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center py-10 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
        className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 ring-4 ring-emerald-100"
      >
        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-lg font-bold text-slate-900 mb-1"
      >
        Review Submitted!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-sm text-slate-500 mb-6 max-w-xs"
      >
        Thanks for your feedback. Your review will be visible after a quick check.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Button
          onClick={onClose}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-9 rounded-lg text-sm font-semibold"
        >
          Done
        </Button>
      </motion.div>
    </motion.div>
  );
}

interface ReviewProps {
    open: boolean;
    onClose: () => void;
    packageTittle: string;
    onSubmit: (data: { rating: number; review: string; photos: File[] }) => void;
    isSubmitting?: boolean;
    isSuccess?: boolean;
}

export default function ReviewModal({open, onClose, packageTittle, onSubmit, isSubmitting, isSuccess}: ReviewProps) {
 
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  const MAX_CHARS = 500;

  const validate = (): boolean => {
    const errs: Errors = {};
    if (rating === 0) errs.rating = "Please select a rating.";
    if (review.trim().length < 10)
      errs.review = "Review must be at least 10 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddPhotos = (files: FileList) => {
    const remaining = 2 - photos.length;
    if (remaining <= 0) return;
    const newPhotos: PhotoPreview[] = [];
    Array.from(files)
      .slice(0, remaining)
      .forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        newPhotos.push({
          id: `${Date.now()}-${Math.random()}`,
          url: URL.createObjectURL(file),
          name: file.name,
          file,
        });
      });
    setPhotos((prev) => [...prev, ...newPhotos]);
    setErrors((e) => ({ ...e, photos: undefined }));
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => {
      const p = prev.find((ph) => ph.id === id);
      if (p) URL.revokeObjectURL(p.url);
      return prev.filter((ph) => ph.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
        rating,
        review,
        photos: photos.map(p => p.file)
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setRating(0);
      setHover(0);
      setReview("");
      setPhotos([]);
      setErrors({});
      onClose()
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/40 flex items-center justify-center p-4">
      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              variants={reviewModalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden max-h-[92dvh] flex flex-col"
            >
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-5 sm:px-6 pt-3 sm:pt-5 pb-4 flex-shrink-0">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    Write a Review
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {packageTittle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <Separator />
              <div className="overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SuccessState onClose={handleClose} />
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="px-5 sm:px-6 py-5 space-y-5 sm:space-y-6"
                    >
                      {/* Star Rating */}
                      <StarRating
                        value={rating}
                        hover={hover}
                        onRate={(v) => {
                          setRating(v);
                          setErrors((e) => ({ ...e, rating: undefined }));
                        }}
                        onHover={setHover}
                        onLeave={() => setHover(0)}
                        error={errors.rating}
                      />

                      {/* Review Text */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Your Review <span className="text-red-400">*</span>
                          </label>
                          <span className={`text-xs font-medium ${review.length > MAX_CHARS * 0.9 ? "text-amber-500" : "text-slate-400"}`}>
                            {review.length}/{MAX_CHARS}
                          </span>
                        </div>
                        <div className="relative">
                          <textarea
                            value={review}
                            onChange={(e) => {
                              if (e.target.value.length <= MAX_CHARS) {
                                setReview(e.target.value);
                                if (e.target.value.trim().length >= 10)
                                  setErrors((err) => ({ ...err, review: undefined }));
                              }
                            }}
                            placeholder="Share the details of your experience — what made it memorable, what could be improved..."
                            rows={4}
                            className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 leading-relaxed bg-slate-50/60 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                              errors.review
                                ? "border-red-300 focus:ring-red-200"
                                : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-300"
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.review && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex items-center gap-1 text-xs text-red-500 mt-1.5 overflow-hidden"
                            >
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {errors.review}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Photo Upload */}
                      <PhotoUpload
                        photos={photos}
                        onAdd={handleAddPhotos}
                        onRemove={handleRemovePhoto}
                        error={errors.photos}
                      />

                      <div className="pt-1 pb-1">
                        <Separator className="mb-5" />
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[11px] text-slate-400 leading-tight hidden sm:block">
                            Reviews are public and help other travellers make better decisions.
                          </p>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleClose}
                              className="flex-1 sm:flex-none h-9 rounded-lg text-sm border-slate-200 text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 sm:flex-none h-9 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2 shadow-sm shadow-indigo-200 disabled:opacity-70"
                            >
                              <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                  <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                  >
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Submitting…
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    Submit Review
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}