import type { IUser } from "@/types/IUser";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Edit,
  User,
  Calendar,
  ShieldCheck
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  user?: Partial<IUser>;
}

export default function Profile({ user }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 font-['Inter']">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-2 ring-slate-100 shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-2xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {user?.name || "User Name"}
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px] px-2 py-0 hidden sm:inline-flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </Badge>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {user?.email || "email@example.com"}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate("/user/editProfile")}
          variant="outline" 
          className="w-full sm:w-auto gap-2 border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all text-sm h-10"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-800">Personal Details</h3>
          <p className="text-xs text-slate-500 mt-0.5">Your personal information and contact details.</p>
        </div>
        
        <div className="divide-y divide-slate-50">
          <div className="flex flex-col sm:flex-row sm:items-center py-4 px-5 hover:bg-slate-50/50 transition-colors">
            <div className="w-full sm:w-1/3 flex items-center gap-2 text-sm font-medium text-slate-500 mb-1 sm:mb-0">
              <User className="w-4 h-4 text-slate-400" />
              Full Name
            </div>
            <div className="w-full sm:w-2/3 text-sm font-semibold text-slate-900">
              {user?.name || "Not provided"}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center py-4 px-5 hover:bg-slate-50/50 transition-colors">
            <div className="w-full sm:w-1/3 flex items-center gap-2 text-sm font-medium text-slate-500 mb-1 sm:mb-0">
              <Mail className="w-4 h-4 text-slate-400" />
              Email Address
            </div>
            <div className="w-full sm:w-2/3 text-sm font-semibold text-slate-900">
              {user?.email || "Not provided"}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-4 px-5 hover:bg-slate-50/50 transition-colors">
            <div className="w-full sm:w-1/3 flex items-center gap-2 text-sm font-medium text-slate-500 mb-1 sm:mb-0">
              <Phone className="w-4 h-4 text-slate-400" />
              Phone Number
            </div>
            <div className="w-full sm:w-2/3 text-sm font-semibold text-slate-900">
              {user?.phone || "Not provided"}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-4 px-5 hover:bg-slate-50/50 transition-colors">
            <div className="w-full sm:w-1/3 flex items-center gap-2 text-sm font-medium text-slate-500 mb-1 sm:mb-0">
              <Calendar className="w-4 h-4 text-slate-400" />
              Status
            </div>
            <div className="w-full sm:w-2/3 text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Member
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}