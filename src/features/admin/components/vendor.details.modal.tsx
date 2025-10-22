import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { IVendorInfo } from '@/types/IVendorInfo';


interface VendorDetailsModalProps {
  vendor: IVendorInfo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FullScreenImageViewerProps {
  images: string[];
  currentIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({
  images,
  currentIndex,
  open,
  onOpenChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  useEffect(() => {
    if (open) {
     setActiveIndex(currentIndex)
   }
 },[currentIndex, open])
  

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Main image */}
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={images[activeIndex]}
              alt={`Vendor image ${activeIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Image navigation thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveIndex(index)}
                      className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-smooth ${
                        index === activeIndex ? 'border-primary' : 'border-white/30'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const VendorDetailsModal: React.FC<VendorDetailsModalProps> = ({
  vendor,
  open,
  onOpenChange,
}) => {
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  

  if (!vendor) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setFullScreenOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-table-border shadow-dropdown">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <img
                src={vendor.profileLogo}
                alt={vendor.name}
                className="w-12 h-12 rounded-full object-cover shadow-card"
              />
              {vendor.name} - Vendor Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-2">
            {/* Basic Information */}
            <Card className="p-6 bg-premium-background border-table-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                    <p className="text-foreground font-medium">{vendor.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground">{vendor.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-foreground font-mono">{vendor.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Owner Name</label>
                    <p className="text-foreground">{vendor.contactPersonName}</p>
                  </div>
                </div>
              </motion.div>
            </Card>

            {/* Address & Description */}
            <Card className="p-6 bg-premium-background border-table-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="text-foreground">{vendor.businessAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  {/* <p className="text-foreground leading-relaxed">{vendor.description}</p> */}
                </div>
              </motion.div>
            </Card>

            {/* Gallery */}
            <Card className="p-6 bg-premium-background border-table-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-foreground">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[vendor.businessLicence,vendor.profileLogo,vendor.businessPan,vendor.ownerIdentity].map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative group cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={image}
                        alt={`Vendor image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-card transition-smooth"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-lg transition-smooth flex items-center justify-center">
                        <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-smooth" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Card>

            {/* Status */}
            <Card className="p-6 bg-premium-background border-table-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center justify-between"
              >
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        vendor.status === 'Pending'
                          ? 'bg-success/10 text-success border border-success/20'
                          : 'bg-destructive/10 text-destructive border border-destructive/20'
                      }`}
                    >
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                  <p className="text-foreground">{vendor.createdAt}</p>
                </div>
              </motion.div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <FullScreenImageViewer
        images={[vendor.businessLicence,vendor.profileLogo,vendor.businessPan,vendor.ownerIdentity]}
        currentIndex={selectedImageIndex}
        open={fullScreenOpen}
        onOpenChange={setFullScreenOpen}
      />
    </>
  );
};