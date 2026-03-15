import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import VerificationHeader from "../components/verification-header";
import VerificationForm from "../components/verification-form";
import { useVendorVerificationSubmit } from "../hooks/verification-submit";
import type { VendorVerificationFormType } from "../validations/vendor.verification.schema";
import { ConfirmModal } from "@/components/common/confirm-modal";
import { useNavigate } from "react-router-dom";


export default function VendorVerificationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] =
    useState<VendorVerificationFormType | null>(null);
  
  const navigate = useNavigate();

  const { onSubmit, isPending } = useVendorVerificationSubmit(() => {
    setConfirmOpen(false);
    setSubmitted(true);
    navigate("/vendor/pending", {
    replace: true,
  });
  });

  const handleSubmit = (data: VendorVerificationFormType) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

  const confirmSubmit = async () => {
    if (!pendingData) return;
    onSubmit(pendingData);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Verification Submitted!
          </h2>
          <p className="text-slate-500 mb-6">
            Your documents have been uploaded successfully. We'll review your
            application within 2-3 business days.
          </p>
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1.5 text-sm font-medium">
            Under Review
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[84rem] mx-auto">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 font-sans">
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
            {/* Header Card */}
            <VerificationHeader />

            {/* Main Form Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <VerificationForm onSubmit={handleSubmit} />
            </div>
            <p className="text-center text-xs text-slate-400 pb-2">
              Documents are reviewed within 2–3 business days. You'll be
              notified via email upon approval.
            </p>
          </div>
        </div>
      </div>

      {confirmOpen && pendingData && (
        <ConfirmModal
          icon="shield"
          title="Submit Verification Request"
          description="You are about to submit your business and identity documents for verification. Once submitted, they cannot be edited while under review. Our team will review your application within 2–3 business days."
          confirmLabel="Submit for Review"
          cancelLabel="Review Again"
          danger={false}
          loading={isPending}
          done={submitted}
          onClose={() => {
            if (!isPending) setConfirmOpen(false);
          }}
          onConfirm={confirmSubmit}
        />
      )}
    </main>
  );
}
