import { motion } from "framer-motion";
import { Ban, Calendar, CheckCircle2, Eye, Mail, MapPin, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VendorProfileResponse } from "../services/api.services";
import { formatDate } from "@/utils/iso-date-format";

interface VendorProfileHeaderProps {
    vendor: VendorProfileResponse;
}

export default function VendorProfileHeader({ vendor }: VendorProfileHeaderProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                    <div className="flex items-start gap-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${"from-amber-500 to-orange-600"} flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0`}
                        >
                            {vendor.name?.charAt(0).toUpperCase()}
                        </motion.div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-white">{vendor.name}</h1>
                                {vendor.vendorInfo.isProfileVerified && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold px-2 py-0.5 rounded-full"
                                    >
                                        <Shield className="w-3 h-3" /> KYC Verified
                                    </motion.span>
                                )}
                                {vendor.vendorInfo.isProfileVerified && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.28 }}
                                        className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold px-2 py-0.5 rounded-full"
                                    >
                                        <CheckCircle2 className="w-3 h-3" /> Approved
                                    </motion.span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs mt-1">
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{vendor.email}</span>
                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{vendor.phone}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vendor.vendorInfo.businessAddress}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Member since {formatDate(vendor.vendorInfo.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
                        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm text-xs gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            View Verification
                        </Button>
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-xs gap-1.5 shadow-lg">
                            <Ban className="w-3.5 h-3.5" />
                            Block Vendor
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
