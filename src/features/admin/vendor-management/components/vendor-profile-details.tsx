import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { VendorProfileResponse } from "../services/api.services";
import { fadeUp } from "@/animation/variants";
import { Badge } from "@/components/ui/badge";
import { getMemberDuration } from "@/utils/get-vendor-duration";


interface VendorProfileDetailsProps {
    vendor: VendorProfileResponse;
}

export default function VendorProfileDetails({ vendor }: VendorProfileDetailsProps) {
    const { memberSince, duration } = getMemberDuration(vendor.vendorInfo.createdAt)
    return (
        <>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3 pt-5 px-5">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-blue-500 rounded-full" />
                            <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Account Information</CardTitle>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs text-slate-500">Active vendor · <span className="font-semibold text-slate-700">Member since {memberSince}</span> · {duration}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                        <InfoRow label="Business Name" value={vendor.name} highlight />
                        <InfoRow label="Contact Person" value={vendor.vendorInfo.contactPersonName} />
                        <InfoRow label="Email" value={vendor.email} />
                        <InfoRow label="Phone" value={vendor.phone} />
                        <InfoRow label="Location" value={vendor.vendorInfo.businessAddress} />
                        <InfoRow
                            label="Verification Status"
                            value={
                                <span className={`inline-flex items-center gap-1 ${vendor.vendorInfo.isProfileVerified ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"} px-2 py-0.5 rounded-full text-xs font-semibold border ${vendor.vendorInfo.isProfileVerified ? "border-emerald-200" : "border-red-200"}`}>
                                    <CheckCircle2 className="w-3 h-3" /> {vendor.vendorInfo.isProfileVerified ? "Verified" : "Not Verified"}
                                </span>
                            }
                        />
                        <InfoRow
                            label="Account Status"
                            value={
                                <span className={`inline-flex items-center gap-1 ${vendor.isBlocked ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"} px-2 py-0.5 rounded-full text-xs font-semibold border ${vendor.isBlocked ? "border-red-200" : "border-emerald-200"}`}>
                                    <span className={`w-1.5 h-1.5 ${vendor.isBlocked ? "bg-red-500" : "bg-emerald-500"} rounded-full`} /> {vendor.isBlocked ? "Blocked" : "Active"}
                                </span>
                            }
                        />
                        {vendor.isBlocked && (
                            <InfoRow
                                label="Reason for the block"
                                value={
                                    <span className={`inline-flex items-center gap-1  px-2 py-0.5 rounded-full text-xs font-semibold border ${vendor.isBlocked ? "border-red-200" : "border-emerald-200"}`}>
                                        <span className={`w-1.5 h-1.5 ${vendor.isBlocked ? "bg-red-500" : "bg-emerald-500"} rounded-full`} /> {vendor.blockedReason || "Not specified"}
                                    </span>
                                }
                            />
                        )}
                        <InfoRow
                            label="Email Verified"
                            value={
                                <span className={`inline-flex items-center gap-1 ${vendor.vendorInfo.isProfileVerified ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"} px-2 py-0.5 rounded-full text-xs font-semibold border ${vendor.vendorInfo.isProfileVerified ? "border-red-200" : "border-emerald-200"}`}>
                                    <BadgeCheck className="w-3.5 h-3.5" /> {vendor.vendorInfo.isProfileVerified ? "Verified" : "Not Verified"}
                                </span>
                            }
                        />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Bank Account */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3 pt-5 px-5">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-violet-500 rounded-full" />
                            <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Bank Account</CardTitle>
                            <Badge variant="outline" className="text-xs text-slate-500 ml-1">hover to reveal</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                        <InfoRow label="Account Number" value={<span className="font-mono text-slate-500 tracking-widest">{vendor.bankDetails.accountNumber}</span>} />
                        <InfoRow label="IFSC Code" value={<span className="font-mono text-slate-500">{vendor.bankDetails.ifsc}</span>} />
                        <InfoRow label="Account Holder" value={vendor.bankDetails.accountHolderName} highlight />
                        <InfoRow label="Bank" value={vendor.bankDetails.bankName} />
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

function InfoRow({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-2.5 border-b border-slate-100 last:border-0">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide min-w-[160px]">{label}</span>
            <span className={`text-sm font-medium text-right ${highlight ? "text-slate-900" : "text-slate-700"}`}>{value}</span>
        </div>
    );
}