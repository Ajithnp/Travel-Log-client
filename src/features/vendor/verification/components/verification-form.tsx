import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  vendorVerificationSchema,
  type VendorVerificationFormType,
} from "../validations/vendor.verification.schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  FileText,
  GitBranch,
  Hash,
  IdCard,
  ImageIcon,
  Landmark,
  Loader2,
  MapPin,
  User,
} from "lucide-react";
import { FileUploadZone } from "./file-upload";
import { useIfscLookup } from "../hooks/ifsc-lookup";

interface VerificationFormProps {
  onSubmit: (data: VendorVerificationFormType) => void;
}

const VerificationForm = ({ onSubmit }: VerificationFormProps) => {
  const form = useForm<VendorVerificationFormType>({
    resolver: zodResolver(vendorVerificationSchema),
    defaultValues: {
      gstin: "",
      ownerName: "",
      businessAddress: "",
      accountNumber: "",
      ifsc: "",
      bankName: "",
      branch: "",
      accountHolderName: "",
      businessLicence: undefined,
      businessPan: undefined,
      companyLogo: undefined,
      ownerIdentityProof: undefined,
    },
  });

  const ifscValue = useWatch({ control: form.control, name: "ifsc" });
  const bankName = useWatch({ control: form.control, name: "bankName" });

  useIfscLookup(ifscValue, {
    setValue: form.setValue,
    setError: form.setError,
    clearErrors: form.clearErrors,
  });

  const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const isLookingUp = IFSC_REGEX.test(ifscValue) && !bankName;

  const formSubmit = (values: VendorVerificationFormType) => {
    console.log("Submitted:", values);
    onSubmit(values);
    // TODO: send to API
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <div className="p-6">
          {/* ── Section: Business Information ── */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Business Information
              </h2>
              <p className="text-xs text-slate-400">
                Legal and registration details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* GSTIN */}
            <FormField
              control={form.control}
              name="gstin"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    GSTIN Number{" "}
                    <span className="text-rose-500 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <Input
                        placeholder="e.g. 29ABCDE1234F1Z5"
                        {...field}
                        className={`pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all uppercase ${
                          fieldState.error ? "border-rose-300 bg-rose-50" : ""
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Owner Name */}
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Owner Full Name{" "}
                    <span className="text-rose-500 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <Input
                        placeholder="Enter owner's full name"
                        {...field}
                        className={`pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all ${
                          fieldState.error ? "border-rose-300 bg-rose-50" : ""
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Business Address */}
          <div className="mb-6">
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Business Address{" "}
                    <span className="text-rose-500 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <Input
                        placeholder="Full registered business address"
                        {...field}
                        className={`pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all ${
                          fieldState.error ? "border-rose-300 bg-rose-50" : ""
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* ── Section: Bank Account Details ── */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Bank Account Details
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Account Number */}
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Account Number{" "}
                    <span className="text-rose-500 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <Input
                        placeholder="Enter bank account number"
                        {...field}
                        className={`pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all ${
                          fieldState.error ? "border-rose-300 bg-rose-50" : ""
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />

            {/* IFSC */}
            <FormField
              control={form.control}
              name="ifsc"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    IFSC Code <span className="text-rose-500 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <Input
                        placeholder="e.g. SBIN0001234"
                        {...field}
                        className={`pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all uppercase ${
                          fieldState.error ? "border-rose-300 bg-rose-50" : ""
                        }`}
                      />
                      {/* Spinner shown while fetching */}
                      {isLookingUp && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 animate-spin" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Bank Name — auto-filled, read-only */}
            <FormField
              control={form.control}
              name="bankName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Bank Name
                    <span className="ml-1.5 text-xs font-normal text-indigo-400">
                      Auto-filled
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
                      <Input
                        placeholder="Auto-filled from IFSC"
                        {...field}
                        readOnly
                        className={`pl-10 h-11 rounded-xl transition-all cursor-default select-none
                    ${
                      field.value
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800 font-medium"
                        : "border-slate-200 bg-slate-100 text-slate-400"
                    }
                    ${fieldState.error ? "border-rose-300 bg-rose-50" : ""}
                  `}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branch"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Branch
                    <span className="ml-1.5 text-xs font-normal text-indigo-400">
                      Auto-filled
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
                      <Input
                        placeholder="Auto-filled from IFSC"
                        {...field}
                        readOnly
                        className={`pl-10 h-11 rounded-xl transition-all cursor-default select-none
                    ${
                      field.value
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800 font-medium"
                        : "border-slate-200 bg-slate-100 text-slate-400"
                    }
                    ${fieldState.error ? "border-rose-300 bg-rose-50" : ""}
                  `}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />
            {/* Account Holder Name */}
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Account Holder Name{" "}
                    <span className="text-rose-500 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <Input
                        placeholder="Enter account holder's full name"
                        {...field}
                        className={`pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all ${
                          fieldState.error ? "border-rose-300 bg-rose-50" : ""
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* ── Section: Business Documents ── */}
          <div className="border-t border-slate-100 pt-6 mt-2 mb-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Business Documents
                </h2>
                <p className="text-xs text-slate-400">
                  PDF, PNG, JPG up to 10MB each
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Business Licence */}
              <FormField
                control={form.control}
                name="businessLicence"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadZone
                        label="Business Licence"
                        icon={<Briefcase className="w-5 h-5" />}
                        accept=".png,.jpg,.jpeg,.pdf"
                        acceptLabel="PDF, PNG, JPG • Max 10MB"
                        fieldName="businessLicence"
                        value={field.value}
                        onChange={(f) => field.onChange(f)}
                        error={undefined} // errors surface via FormMessage below
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Business PAN Card */}
              <FormField
                control={form.control}
                name="businessPan"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadZone
                        label="Business PAN Card"
                        icon={<BadgeCheck className="w-5 h-5" />}
                        accept=".png,.jpg,.jpeg,.pdf"
                        acceptLabel="PDF, PNG, JPG • Max 10MB"
                        fieldName="businessPan"
                        value={field.value}
                        onChange={(f) => field.onChange(f)}
                        error={undefined}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Company Logo */}
              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadZone
                        label="Company Logo"
                        icon={<ImageIcon className="w-5 h-5" />}
                        accept=".png,.jpg,.jpeg"
                        acceptLabel="PNG, JPG • Max 10MB"
                        fieldName="companyLogo"
                        value={field.value}
                        onChange={(f) => field.onChange(f)}
                        error={undefined}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Owner Identity Proof */}
              <FormField
                control={form.control}
                name="ownerIdentityProof"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadZone
                        label="Owner Identity Proof"
                        icon={<IdCard className="w-5 h-5" />}
                        accept=".png,.jpg,.jpeg,.pdf"
                        acceptLabel="Aadhaar, PAN, Passport • Max 10MB"
                        fieldName="ownerIdentityProof"
                        value={field.value}
                        onChange={(f) => field.onChange(f)}
                        error={undefined}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-400">
     
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 h-11 rounded-xl font-semibold shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all duration-300 flex items-center gap-2 group"
            >
              Submit Verification
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default VerificationForm;
