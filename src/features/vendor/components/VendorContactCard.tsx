import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import type { IVendorInfo } from "@/types/IVendorInfo";

interface VendorContactCardProps {
  profileData: Partial<IVendorInfo>;
}

const VendorContactCard = ({ profileData }: VendorContactCardProps) => {
  return (
    <Card className="h-full border border-border/80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg mt-2 md:mt-2">
          <Phone className="w-4 h-4" />
          Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <motion.div
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          whileHover={{ x: 2 }}
        >
          <Mail className="w-3 h-3 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium">Email</p>
            <p className="text-xs text-muted-foreground truncate">
              {profileData.email}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          whileHover={{ x: 2 }}
        >
          <Phone className="w-3 h-3 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium">Phone</p>
            <p className="text-xs text-muted-foreground">{profileData.phone}</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          whileHover={{ x: 2 }}
        >
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium">Address</p>
            <p className="text-xs text-muted-foreground">
              {profileData.businessAddress}
            </p>
          </div>
        </motion.div>

        {/* <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Globe className="w-3 h-3 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">Website</p>
                  <p className="text-xs text-muted-foreground truncate">{''}</p>
                </div>
              </motion.div> */}
      </CardContent>
    </Card>
  );
};

export default VendorContactCard;
