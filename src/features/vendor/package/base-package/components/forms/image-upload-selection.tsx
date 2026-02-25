
import type React from "react"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { IPackageImage } from "@/types/types"
import { nanoid } from "nanoid"

interface ImageUploadSectionProps {
  images: IPackageImage[]
  onImagesChange: (images: IPackageImage[]) => void
  error?: string
}

export function ImageUploadSection({ images, onImagesChange, error }: ImageUploadSectionProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  //==================================
  console.log('images:::', images)

  //=================================
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === "dragenter" || e.type === "dragover")
  }, [])

  const processFiles = useCallback(
    (files: FileList) => {
      const newImages: IPackageImage[] = []

      for (let i = 0; i < files.length && images.length + newImages.length < 20; i++) {
        const file = files[i]
        if (file.type.startsWith("image/")) {
          newImages.push({
            key: nanoid(),
            url: URL.createObjectURL(file),
            file: file,
            status: "PENDING_UPLOAD",
          });
        }
      }
      onImagesChange([...images, ...newImages])
    },
    [images, onImagesChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)
      processFiles(e.dataTransfer.files)
    },
    [processFiles],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files)
      }
    },
    [processFiles],
  )
  //======================================
  // const removeImage = useCallback((index: number) => {
  //     onImagesChange(images.filter((_,i) => i !== index))
  //   },
  //   [images, onImagesChange],
  // )

  const removeImage = useCallback((imageKey: string) => {
    const updatedImages = images.map((img) =>
      img.key === imageKey
        ? { ...img, status: "REMOVED" as const }
        : img
    )

    onImagesChange(updatedImages)
  }, [images, onImagesChange])


  //==========================================
  const isValid = images.length >= 4

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-semibold text-foreground mb-2">
          Package Images
          <span className="text-destructive ml-1">*</span>
          <span className="text-xs text-muted-foreground font-normal ml-2">({images.length}/4 minimum)</span>
        </Label>
      </div>

      {/* Upload Area */}
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-all",
          isDragActive ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:border-primary/50",
        )}
      >
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Drag images here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">Maximum 20 images, minimum 4 required</p>
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive">
          {error}
        </motion.p>
      )}

      {/* Image Preview Grid */}
      <AnimatePresence mode="popLayout">
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {images.filter(image => image.status !== "REMOVED").map((image) => (
              <motion.div
                key={image.key}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={`Package preview `}
                  className="w-full h-full object-cover"
                />  
                <Button
                  onClick={() => removeImage(image.key)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                  type="button"
                  aria-label="Remove image"
                >
                  <X className="w-5 h-5 text-white" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State Message */}
      {images.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs p-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200"
        >
          📸 You need to upload at least 4 images to create your package
        </motion.div>
      )}

      {/* Status Badge */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-xs p-3 rounded-lg",
            isValid
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200",
          )}
        >
          {isValid
            ? `✓ ${images.length} images uploaded - ready to proceed`
            : `${4 - images.length} more image${4 - images.length !== 1 ? "s" : ""} needed`}
        </motion.div>
      )}
    </div>
  )
}
