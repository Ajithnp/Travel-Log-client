"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loading } from "@/components/ui/loading"
import { Hash, User, MapPin, FileText, ImageIcon } from "lucide-react"
import { type VendorVerificationFormType, vendorVerificationSchema } from "../validations/vendor.verification.schema"

interface VendorVerificationFormProps {
  onSubmit: (data: VendorVerificationFormType) => void;
  isPending: boolean;
}

export function VendorVerificationForm({
  onSubmit,
  isPending
}: VendorVerificationFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VendorVerificationFormType>({
    resolver: zodResolver(vendorVerificationSchema),
  })

  if (isPending) {
    <Loading variant="spinner" text="updating..." fullscreen/>
  }
  const businessLicenceFile = watch("businessLicence")
  const businessPanFile = watch("businessPan")
  const companyLogoFile = watch("companyLogo")
  const ownerIdentityProofFile = watch("ownerIdentityProof")

  return (
    <div className="w-full bg-white rounded-lg shadow-lg relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Vendor Verification</h1>
        <p className="text-sm text-gray-600 mt-1">Please provide the required documents and information</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Business Licence <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("businessLicence")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept=".png,.jpg,.jpeg,.pdf"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p
                  className={`text-sm font-medium  mb-1 ${businessLicenceFile?.[0]?.name ? "text-green-600" : "text-grey-600"}`}
                >
                  {businessLicenceFile?.[0]?.name || "Click to upload business licence"}
                </p>
                <p className="text-xs text-gray-500"> PDF up to 10MB</p>
              </div>
            </div>

            {errors.businessLicence?.message && (
              <p className="text-red-500 text-sm">{errors.businessLicence.message.toString()}</p>
            )}
          </div>

          {/* Business PAN */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Business PAN <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("businessPan")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept=".png,.jpg,.jpeg,.pdf"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p
                  className={`text-sm font-medium  mb-1 ${businessPanFile?.[0]?.name ? "text-green-600" : "text-grey-600"}`}
                >
                  {businessPanFile?.[0]?.name || "Click to upload business licence"}
                </p>
                <p className="text-xs text-gray-500"> PDF up to 10MB</p>
              </div>
            </div>
            {errors.businessPan?.message && (
              <p className="text-red-500 text-sm">{errors.businessPan.message.toString()}</p>
            )}
          </div>

          {/* Company Logo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Company Logo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("companyLogo")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept=".png,.jpg,.jpeg,.pdf"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p
                  className={`text-sm font-medium  mb-1 ${companyLogoFile?.[0]?.name ? "text-green-600" : "text-grey-600"}`}
                >
                  {companyLogoFile?.[0]?.name || "Click to upload business licence"}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
            {errors.companyLogo?.message && (
              <p className="text-red-500 text-sm">{errors.companyLogo.message.toString()}</p>
            )}
          </div>

          {/* Owner Identity Proof */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Owner Identity Proof <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("ownerIdentityProof")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept=".png,.jpg,.jpeg,.pdf"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p
                  className={`text-sm font-medium  mb-1 ${ownerIdentityProofFile?.[0]?.name ? "text-green-600" : "text-grey-600"}`}
                >
                  {ownerIdentityProofFile?.[0]?.name || "Click to upload business licence"}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
            {errors.ownerIdentityProof?.message && (
              <p className="text-red-500 text-sm">{errors.ownerIdentityProof.message.toString()}</p>
            )}
          </div>
        </div>

        {/* Text Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              GSTIN <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="text" placeholder="Enter GSTIN number" {...register("gstin")} className="pl-10" />
            </div>
            {errors.gstin && <p className="text-red-500 text-sm">{errors.gstin.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Owner Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="text" placeholder="Enter owner's full name" {...register("ownerName")} className="pl-10" />
            </div>
            {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName.message}</p>}
          </div>
        </div>

        {/* Business Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Business Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter complete business address"
              {...register("businessAddress")}
              className="pl-10"
            />
          </div>
          {errors.businessAddress && <p className="text-red-500 text-sm">{errors.businessAddress.message}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center md:justify-end space-x-3 pt-4">
          <Button type="submit" className="px-6 bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Submit Verification
          </Button>
        </div>
      </form>
    </div>
  )
}
