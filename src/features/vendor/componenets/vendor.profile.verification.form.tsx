"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Building, User, MapPin, Hash } from "lucide-react"

interface VendorVerificationModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FilePreview {
  file: File
  url: string
}

interface FormData {
  businessLicence: File | null
  businessPan: File | null
  companyLogo: File | null
  businessLogo: File | null
  gstin: string
  address: string
  ownerName: string
}

export default function VendorVerificationModal({ isOpen, setIsOpen }: VendorVerificationModalProps) {
 
  const [formData, setFormData] = useState<FormData>({
    businessLicence: null,
    businessPan: null,
    companyLogo: null,
    businessLogo: null,
    gstin: "",
    address: "",
    ownerName: "",
  });

  console.log('formData')
  const [previews, setPreviews] = useState<{
    businessLicence?: FilePreview
    businessPan?: FilePreview
    companyLogo?: FilePreview
    businessLogo?: FilePreview
  }>({})

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviews((prev) => ({
        ...prev,
        [field]: { file, url },
      }))
      setFormData((prev) => ({ ...prev, [field]: file }))
    } else {
      setPreviews((prev) => {
        const newPreviews = { ...prev }
        if (newPreviews[field as keyof typeof newPreviews]) {
          URL.revokeObjectURL(newPreviews[field as keyof typeof newPreviews]!.url)
          delete newPreviews[field as keyof typeof newPreviews]
        }
        return newPreviews
      })
      setFormData((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleTextChange = (field: "gstin" | "address" | "ownerName", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    setIsOpen(false)
  }

  const FileInput = ({
    label,
    field,
    accept,
    icon: Icon,
  }: {
    label: string
    field: keyof FormData
    accept: string
    icon: any
  }) => {
    const preview = previews[field as keyof typeof previews]
    const isImage = accept.includes("image")

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
            className="hidden"
            id={field}
          />
          <label htmlFor={field} className="cursor-pointer">
            {preview ? (
              <div className="space-y-2">
                {isImage ? (
                  <img
                    src={preview.url || "/placeholder.svg"}
                    alt={label}
                    className="w-20 h-20 object-cover rounded-lg mx-auto"
                  />
                ) : (
                  <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-lg mx-auto">
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 truncate">{preview.file.name}</p>
                  <p className="text-xs text-gray-500">{(preview.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload {label.toLowerCase()}</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
              </div>
            )}
          </label>
        </div>
      </div>
    )
  }

  const TextInput = ({
    label,
    field,
    placeholder,
    icon: Icon,
  }: {
    label: string
    field: "gstin" | "address" | "ownerName"
    placeholder: string
    icon: any
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={formData[field]}
          onChange={(e) => handleTextChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Vendor Verification
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Vendor Verification</h2>
                  <p className="text-gray-600 mt-1">Please provide the required documents and information</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* File Inputs */}
                  <FileInput
                    label="Business Licence"
                    field="businessLicence"
                    accept=".pdf,.jpg,.jpeg,.png"
                    icon={FileText}
                  />

                  <FileInput label="Business PAN" field="businessPan" accept=".pdf,.jpg,.jpeg,.png" icon={FileText} />

                  <FileInput label="Company Logo" field="companyLogo" accept="image/*" icon={Building} />

                  <FileInput label="Business Logo" field="businessLogo" accept="image/*" icon={Building} />

                  {/* Text Inputs */}
                  <TextInput label="GSTIN" field="gstin" placeholder="Enter GSTIN number" icon={Hash} />

                  <TextInput label="Owner Name" field="ownerName" placeholder="Enter owner's full name" icon={User} />
                </div>

                <div className="mt-6">
                  <TextInput
                    label="Business Address"
                    field="address"
                    placeholder="Enter complete business address"
                    icon={MapPin}
                  />
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Submit Verification
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
