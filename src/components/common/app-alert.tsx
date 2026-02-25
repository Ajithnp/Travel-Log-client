import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type{ ReactNode } from "react";

type AlertVariant = "info" | "warning" | "success" | "error";

interface AppAlertProps {
  message: string;
  variant?: AlertVariant;
  icon?: ReactNode;
  className?: string;
}

const variantStyles = {
  info: {
    container: "border-blue-300 bg-blue-50",
    text: "text-blue-500",
    icon: <InfoIcon className="w-5 h-5 text-blue-500" />,
  },
  warning: {
    container: "border-orange-300 bg-orange-50",
    text: "text-orange-500",
    icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  },
  success: {
    container: "border-green-300 bg-green-50",
    text: "text-green-500",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  error: {
    container: "border-red-300 bg-red-50",
    text: "text-red-500",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
};

export function AppAlert({
  message,
  variant = "info",
  icon,
  className = "",
}: AppAlertProps) {
  const styles = variantStyles[variant];

  return (
    <Alert
      className={`border flex items-center gap-3 ${styles.container} ${className}`}
    >
      <div className="flex items-center justify-center">
        {icon ?? styles.icon}
      </div>

      <AlertDescription className={`${styles.text} text-sm`}>
        {message}
      </AlertDescription>
    </Alert>
  );
}