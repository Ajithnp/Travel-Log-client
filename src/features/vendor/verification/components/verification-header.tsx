import { Building2, Shield } from "lucide-react";


const VerificationHeader = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-indigo-200 font-bold" />
            <span className="text-indigo-200 text-xs font-medium uppercase tracking-wider">
              Secure Verification
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Vendor Verification</h1>
          <p className="text-indigo-200 text-sm font-semibold">
           Fill in all sections to submit your business for review. Our team typically responds within 2–3 business days.
          </p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <Building2 className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default VerificationHeader;
