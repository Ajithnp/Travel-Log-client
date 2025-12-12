import {  Shield, ShieldCheck, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VerificationBadge = ({ status }: { status: string|undefined }) => {
  switch (status) {
    case "Approved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    case "Rejected":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="bg-red-500">
          <Shield className="w-3 h-3 mr-1" />
          Unverified
        </Badge>
      );
  }
};

export default VerificationBadge;
