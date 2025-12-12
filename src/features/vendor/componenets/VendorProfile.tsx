import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star} from "lucide-react";
import type { IVendorInfo } from "@/types/IVendorInfo";
import { useNavigate } from "react-router-dom";
import {
  containerVariants,
  itemVariants,
} from "../animations/vendorProfile.animations";
import VendorAboutCard from "./VendorAboutCard";
import VendorContactCard from "./VendorContactCard";
import VerificationBadge from "./VerificationBadge";
import { getVerificationButtonLabel } from "@/utils/vendorStatus";
import { Loading } from "@/components/ui/loading";

interface VendorProfileProps {
  profileData?: Partial<IVendorInfo>;
  url?: string;
  loadingPage: boolean;
  loadingLogo: boolean;
}
export default function VendorProfile({
  profileData,
  url,
  loadingPage,
  loadingLogo,
}: VendorProfileProps) {

  const navigate = useNavigate();
  const handleGoToVerification = () => {
    navigate("/vendor/verification");
  };
  if(loadingPage) return <Loading  variant="spinner" fullscreen/>

  if (!profileData) return;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto p-4 space-y-4 min-h-screen"
    >
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"></h1>
      </div>

      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="border border-border/80">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Avatar Section */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                  <AvatarImage
                    src={profileData.profileLogo}
                    alt="Vendor Avatar"
                  />
                  {loadingLogo ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-full">
                      <span className="text-gray-500 text-sm">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <AvatarImage
                        src={url}
                        alt="Vendor Avatar"
                        className="transition-opacity duration-300"
                      />
                      <AvatarFallback className="text-lg">
                        {profileData?.name?.[0]}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              </motion.div>

              {/* Profile Info Section */}
              <div className="flex-1 space-y-2 w-full">
                <div className="space-y-1">
                  {/* Top section: name + badge + edit button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                    {/* Left side: name + badge + rejection reason */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="text-xl lg:text-2xl font-bold">
                        {profileData.name}
                      </h2>
                      <VerificationBadge
                        status={profileData.status}
                      />
                      {profileData.reasonForReject && (
                        <h6 className="text-sm font-bold text-red-700 p-1 rounded text-right">
                          {profileData.reasonForReject}
                        </h6>
                      )}
                    </div>

                    {/* Right side: Edit button */}
                    {profileData.isProfileVerified && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/vendor/profile-edit")}
                        className="mt-2 sm:mt-0 bg-primary text-white text-sm px-7 py-1.5 rounded-lg shadow hover:bg-primary/90 cursor-pointer"
                      >
                        Edit
                      </motion.button>
                    )}
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                    <span>(124 reviews)</span>
                  </div>
                </div>

                {/* Verification Button */}
                <motion.div>
                  {profileData.status !== "Approved" && (
                    <Button
                      onClick={handleGoToVerification}
                      disabled={profileData.status === "Pending"}
                      size="sm"
                      className="w-full sm:w-auto cursor-pointer"
                    >
                      {getVerificationButtonLabel(profileData.status)}

                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <VendorContactCard profileData={profileData} />
        </motion.div>

        {/* About & Stats */}
        <motion.div variants={itemVariants}>
          <VendorAboutCard />
        </motion.div>
      </div>
    </motion.div>
  );
}
