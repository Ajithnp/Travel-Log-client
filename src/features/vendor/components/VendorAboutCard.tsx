import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/iso-date-format";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface VendorAboutCardProps {
  bio?: string;
  createdAt?: string;
}

const VendorAboutCard = ({ bio, createdAt }: VendorAboutCardProps) => {
  return (
    <Card className="h-full border border-border/80 hover:border-primary/50 transition-colors md:col-span-2 lg:col-span-1">
      <CardHeader className="pb-4 border-b border-border/40 mb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold mt-2">
          <Info className="w-5 h-5 text-primary" />
          About Vendor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {bio || `We are a premium travel agency committed to providing the best experiences around the globe. Our team of experts works tirelessly to curate unique and memorable journeys tailored to your preferences. From relaxing beach getaways to thrilling mountain expeditions, we ensure every detail is perfectly planned.`}
          </p>
          
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-muted-foreground">Joined:</span>
            <span className="px-3 py-1 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition-colors cursor-default">
              {formatDate(createdAt || "")}
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default VendorAboutCard;
