import React, { useState } from 'react';
import { motion, } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import type { IVendorInfo } from '@/types/IVendorInfo';
import FullScreenImageViewer from '@/components/shared/modal/FullScreenImageViewer';
import { memo} from 'react';
import { Loading } from '@/components/ui/loading';
interface VendorDetailsModalProps {
  vendor: IVendorInfo | null;
  open: boolean;
  signedUrls: string[];
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

const VendorDetailsModal: React.FC<VendorDetailsModalProps> = ({
  vendor,
  open,
  onOpenChange,
  signedUrls,
  isLoading
}) => {
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!vendor) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setFullScreenOpen(false)
    setSelectedImageIndex(null)
  };




  const images = signedUrls?.filter(Boolean) || [];

  if (isLoading) {
    <Loading variant='spinner' text='Loading...' fullscreen />
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-table-border shadow-dropdown">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <img
                src={signedUrls[1]}
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p className="text-foreground">{vendor.businessAddress}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    {/* <p className="text-foreground leading-relaxed">{vendor.description}</p> */}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">GSTIN</label>
                    <p className="text-foreground">{vendor.GSTIN}</p>
                  </div>
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
                  {[
                    { title: "Business Licence" },
                    { title: "Profile Logo" },
                    { title: "Business PAN" },
                    { title: "Owner Identity" },
                  ].map(({ title }, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative group cursor-pointer flex flex-col items-center"
                      onClick={() => handleImageClick(index)} // 👈 open full screen
                    >
                      <div className="relative w-full">
                        <img
                          src={images[index]} // ✅ use presigned URL
                          alt={title}
                          className="w-full h-32 object-cover rounded-lg shadow-card transition-smooth"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-lg transition-smooth flex items-center justify-center">
                          <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-smooth" />
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-center text-muted-foreground font-medium">
                        {title}
                      </p>
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
                  <div className="mt-2 md:mt-3 flex md:justify-start justify-center md:ml-0 -ml-2">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200
                      ${vendor.status === "Approved"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : vendor.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${vendor.status === "Approved"
                          ? "bg-green-600"
                          : vendor.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-600"
                          }`}
                      ></span>
                      {vendor.status}
                    </span>
                  </div>

                  {vendor.reasonForReject && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Reason for rejection</label>
                      <p className="text-foreground">{vendor.reasonForReject}</p>
                    </div>
                  )}
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
      {fullScreenOpen && (
        <FullScreenImageViewer
          images={images}
          currentIndex={selectedImageIndex}
          open={fullScreenOpen}
          onClose={handleCloseFullScreen}
        />
      )}


    </>
  );
};

export default memo(VendorDetailsModal);