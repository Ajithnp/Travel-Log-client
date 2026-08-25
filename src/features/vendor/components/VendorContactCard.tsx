import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import type { IVendorInfo } from "@/types/IVendorInfo";

interface VendorContactCardProps {
  profileData: Partial<IVendorInfo>;
}

const VendorContactCard = ({ profileData }: VendorContactCardProps) => {
  const contactDetails = [
    {
      label: "Email Address",
      value: profileData.email || "Not provided",
      icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-500/10",
    },
    {
      label: "Phone Number",
      value: profileData.phone || "Not provided",
      icon: Phone,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-500/10",
    },
    {
      label: "Business Address",
      value: profileData.businessAddress || "Not provided",
      icon: MapPin,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-500/10",
    },
  ];

  return (
    <Card className="h-full border border-border/80 hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4 border-b border-border/40 mb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold mt-2">
          <Phone className="w-5 h-5 text-primary" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
            whileHover={{ x: 4 }}
          >
            <div className={`p-3 rounded-xl ${detail.bg} ${detail.color} transition-transform duration-300 group-hover:scale-110`}>
              <detail.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
              <p className="text-base font-semibold text-foreground truncate" title={detail.value}>
                {detail.value}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VendorContactCard;
