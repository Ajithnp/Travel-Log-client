import { Shield, Phone } from "lucide-react";
import type{ LucideIcon } from "lucide-react";

type Badge = {
  icon: LucideIcon;
  label: string;
};

type Props = {
  badges?: Badge[];
};

const defaultBadges: Badge[] = [
  { icon: Shield, label: "Verified Operator" },
  { icon: Phone, label: "24/7 Support" },
];

export function TrustBadges({ badges = defaultBadges }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 p-2 rounded-md bg-card border border-border text-xs shadow-premium"
        >
          <Icon className="w-4 h-4 text-green-600 shrink-0" />
          <span className="text-muted-foreground leading-tight">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}