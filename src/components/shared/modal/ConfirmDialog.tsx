
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onConfirm: (reason?: string) => void;
  showReasonInput?: boolean; 
  isConfirming?: boolean;
}

 function ConfirmDialog({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
   showReasonInput = false,
  isConfirming,
}: ConfirmDialogProps) {
 
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (showReasonInput) {
      onConfirm(reason);
      setReason("");
    } else {
      onConfirm();
    }
    onClose();
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence>
         
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl">{title}</DialogTitle>
                {description && (
                  <DialogDescription className="text-muted-foreground">
                    {description}
                  </DialogDescription>
                )}
              </DialogHeader>

              {showReasonInput && (
                <motion.div
                  className="space-y-4 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-sm font-medium">
                      Please provide your reason:
                    </Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter your reason here..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </motion.div>
              )}

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleClose} className="cursor-pointer">
                  Cancel
                </Button>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleConfirm}
                    disabled={isConfirming ||  (showReasonInput && !reason.trim())}
                    className="min-w-20 cursor-pointer"
                  >
                    Confirm
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
    
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(ConfirmDialog)