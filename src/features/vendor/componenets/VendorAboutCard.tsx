import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const VendorAboutCard = () => {
  return (
    <Card className="h-full border border-border/80 md:col-span-2 lg:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg mt-2 md:mt-2">About & Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-3"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            Premium organic produce supplier since 2018. Sustainable farming
            practices with farm-to-table delivery.
          </p>
          {/* <div className="grid grid-cols-3 gap-2">
                  <motion.div whileHover={{ scale: 1.02 }} className="p-2 rounded-lg bg-muted/50 text-center">
                    <div className="text-lg font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Customers</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-2 rounded-lg bg-muted/50 text-center">
                    <div className="text-lg font-bold text-primary">50+</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-2 rounded-lg bg-muted/50 text-center">
                    <div className="text-lg font-bold text-primary">6</div>
                    <div className="text-xs text-muted-foreground">Years</div>
                  </motion.div>
                </div> */}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default VendorAboutCard;
