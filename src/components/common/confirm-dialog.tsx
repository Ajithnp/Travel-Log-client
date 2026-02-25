import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import type React from "react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  onConfirm: () => void;

  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  destructive?: boolean;

  icon?: React.ReactNode;
  className?: string;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  destructive = false,
  icon,
  className,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          "sm:max-w-md rounded-xl px-8 py-8 text-center",
          "duration-300 ease-out",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95",
          "data-[state=closed]:zoom-out-95",

          className,
        )}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          {icon ? (
            icon
          ) : (
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-muted-foreground text-base mb-6">{description}</p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <AlertDialogCancel disabled={loading} className="px-6">
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "px-6",
              destructive && "bg-red-600 hover:bg-red-700 text-white",
            )}
          >
            {loading ? "Processing..." : confirmText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
