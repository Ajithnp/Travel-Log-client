import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  User,
  CreditCard,
  Landmark,
  Hash,
  FileText,
  Image as ImageIcon,
  Shield,
  CheckCircle2,
  Clock,
  XCircle,
  ZoomIn,
  X,
  BadgeCheck,
  Building,
  FileBadge,
  IdCard,
  type LucideIcon,
} from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { IVendorInfo } from "@/types/IVendorInfo";
import type { SignedUrlViewResponseType } from "@/types/signed-urls";
import { Loader } from "@/components/common/loader";

interface VendorDetailsModalProps {
  vendor: IVendorInfo | null;
  open: boolean;
  signedUrls: SignedUrlViewResponseType[];
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

const documents = [
  {
    title: "Business Licence",
    icon: FileBadge,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    title: "Business PAN",
    icon: IdCard,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    title: "Owner Identity",
    icon: FileText,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    title: "Profile Logo",
    icon: ImageIcon,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
];

const statusConfig = {
  Approved: {
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    glow: "shadow-emerald-100",
  },
  UnderReview: {
    icon: Clock,
    className: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    glow: "shadow-amber-100",
  },
  Rejected: {
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    glow: "shadow-red-100",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function VendorVerificationModal({
  vendor,
  isLoading,
  onOpenChange,
  open,
  signedUrls,
}: VendorDetailsModalProps) {
  const [docOpen, setDocOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const status = statusConfig[vendor?.status as keyof typeof statusConfig];

  const images = signedUrls?.filter(Boolean) || [];

  const handleDocClick = (url: string) => {
    setSelectedImage(url);
    setDocOpen(true);
  };

  if (isLoading) return <Loader />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogContent className="max-w-3xl w-full p-0 overflow-hidden bg-white border-0 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.18),0_8px_24px_-8px_rgba(0,0,0,0.08)] rounded-3xl"> */}
        <DialogContent className="w-[95vw] sm:w-full max-w-3xl p-0 overflow-hidden bg-white border-0 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.18),0_8px_24px_-8px_rgba(0,0,0,0.08)] rounded-3xl">
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
            {/* Decorative orbs */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-violet-400/20 rounded-full blur-lg" />

            <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-5">
              <DialogTitle className="sr-only">
                Vendor Verification Details
              </DialogTitle>
              {/* <div className="flex items-start justify-between gap-4"> */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                      <BadgeCheck className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      {/* <h2 className="text-3xl font-bold text-white leading-tight"> */}
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight break-words">
                        {vendor?.name}
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-white/75 text-sm font-medium">
                        {vendor?.email}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span className="text-white/75 text-sm font-medium">
                        {vendor?.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-lg ${status.className}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`}
                    />
                    {vendor?.status}
                  </span>
                  <span className="text-white/60 text-sm font-medium">
                     {vendor?.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <ScrollArea className="max-h-[60vh]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-5 space-y-4"
            >
              {/* Block 1: Business Details */}
              <motion.div variants={sectionVariants}>
                <Card3D>
                  <SectionHeader
                    icon={Building}
                    label="Business Details"
                    gradient="from-violet-500 to-purple-600"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                      icon={Building2}
                      label="Business Name"
                      value={vendor?.name || ""}
                    />
                    <div className="sm:col-span-2">
                      <InfoRow
                        icon={MapPin}
                        label="Business Address"
                        value={vendor?.businessAddress || ""}
                      />
                    </div>
                    <InfoRow
                      icon={Hash}
                      label="GSTIN"
                      value={vendor?.GSTIN || ""}
                      mono
                    />

                  </div>
                </Card3D>
              </motion.div>

              {/* Block 2: Contact Information */}
              <motion.div variants={sectionVariants}>
                <Card3D>
                  <SectionHeader
                    icon={Phone}
                    label="Contact Information"
                    gradient="from-blue-500 to-cyan-500"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                      icon={User}
                      label="Contact Person"
                      value={vendor?.contactPersonName || ""}
                    />
                    <InfoRow
                      icon={Mail}
                      label="Email Address"
                      value={vendor?.email || ""}
                    />
                    <InfoRow
                      icon={Phone}
                      label="Primary Phone"
                      value={vendor?.phone || ""}
                      mono
                    />
                  </div>
                </Card3D>
              </motion.div>

              {/* Block 3: Bank Account Details */}
              <motion.div variants={sectionVariants}>
                <Card3D>
                  <SectionHeader
                    icon={Landmark}
                    label="Bank Account Details"
                    gradient="from-emerald-500 to-teal-500"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                      icon={Landmark}
                      label="Bank Name"
                      value={vendor?.bankName || ""}
                    />
                    <InfoRow
                      icon={Building2}
                      label="Branch"
                      value={vendor?.branch || ""}
                    />
                    <InfoRow
                      icon={User}
                      label="Account Holder"
                      value={vendor?.accountHolderName || ""}
                    />
                    <InfoRow
                      icon={Hash}
                      label="Account Number"
                      value={vendor?.accountNumber || ""}
                      mono
                    />
                    <InfoRow
                      icon={CreditCard}
                      label="IFSC Code"
                      value={vendor?.ifsc || ""}
                      mono
                    />
                  </div>
                  {/* Bank badge */}
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                        Verified & Secure
                      </p>
                    </div>
                    <BadgeCheck className="w-5 h-5 text-emerald-500 ml-auto flex-shrink-0" />
                  </div>
                </Card3D>
              </motion.div>

              {/* Block 4: Documents */}
              <motion.div variants={sectionVariants}>
                <Card3D>
                  <SectionHeader
                    icon={FileText}
                    label="Documents"
                    gradient="from-amber-500 to-orange-500"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {documents.map((doc, i) => (
                      <DocumentCard
                        key={doc.title}
                        doc={doc}
                        index={i}
                        onClick={() => handleDocClick(images[i]?.url)}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-[11px] text-amber-700 font-medium">
                      {vendor?.reasonForReject && (
                        <>
                        <span className="text-sm">Reasson for Reject: </span>
                        <span className="text-destructive text-xs font-semibold">{ vendor.reasonForReject}</span>
                        </>
                      )}
                    </p>
                    <CheckCircle2 className="w-4 h-4 text-amber-500 ml-auto flex-shrink-0" />
                  </div>
                </Card3D>
              </motion.div>
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Document Viewer */}
      <AnimatePresence>
        {docOpen && (
          <Dialog open={docOpen} onOpenChange={setDocOpen}>
            <DialogContent className="max-w-7xl p-0 overflow-hidden bg-black rounded-xl">
              <DialogTitle className="sr-only">Document preview</DialogTitle>

              <div className="relative">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Document preview"
                    className="w-full max-h-[90vh] object-contain cursor-zoom-in"
                  />
                )}

                <button
                  onClick={() => setDocOpen(false)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function DocumentCard({
  doc,
  index,
  onClick,
}: {
  doc: (typeof documents)[0];
  index: number;
  onClick: () => void;
}) {
  const Icon = doc.icon;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl border ${doc.border} ${doc.bg} cursor-pointer transition-all duration-200 w-full shadow-sm hover:shadow-md`}
    >
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/20" />
      <div className="flex items-center gap-1">
        <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">
          {doc.title}
        </span>
      </div>
      <div
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${doc.color} opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        <ZoomIn className="w-2.5 h-2.5 text-white" />
        <span className="text-[9px] text-white font-bold uppercase tracking-wider">
          View
        </span>
      </div>
    </motion.button>
  );
}

function SectionHeader({
  icon: Icon,
  label,
  gradient,
}: {
  icon: LucideIcon;
  label: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div
        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md flex-shrink-0`}
      >
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">
        {label}
      </h3>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-100 to-transparent ml-1" />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 group">
      {Icon && (
        <div className="w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
          <Icon className="w-3.5 h-3.5 text-gray-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm text-gray-800 font-medium leading-snug break-words ${mono ? "font-mono" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function Card3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08),0_1px_4px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12),0_2px_8px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-white to-gray-50/40 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
