import { User, UserRoundPlus, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { PricingTierDTO, ScheduleResponse } from "../types/types";

type PricingSectionProps = {
  schedule: ScheduleResponse;
};

const PricingSection = ({ schedule }: PricingSectionProps) => {
  const solo = schedule.pricing?.find((p: PricingTierDTO) => p.type === "SOLO");
  const duo = schedule.pricing?.find((p: PricingTierDTO) => p.type === "DUO");
  const group = schedule.pricing?.find((p: PricingTierDTO) => p.type === "GROUP");

  if (!solo) return null;

  const duoPerHead = duo ? duo.price / duo.peopleCount : null;
  const groupPerHead = group ? group.price / group.peopleCount : null;

  return (
    <Card className="animate-[fade-in_0.7s_ease-out] shadow-premium">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-heading font-bold text-foreground">
            Pricing
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* SOLO */}
          <PricingCard
            icon={<User className="w-5 h-5 mx-auto text-orange-400" />}
            type="Solo"
            price={`₹${solo.price.toLocaleString("en-IN")}`}
            sub="per head"
          />

          {/* DUO */}
          {duo && (
            <PricingCard
              icon={<UserRoundPlus className="w-5 h-5 mx-auto text-orange-400" />}
              type="Duo"
              price={`₹${duo.price.toLocaleString("en-IN")}`}
              sub={`total · ₹${duoPerHead!.toLocaleString("en-IN")}/head`}
            />
          )}

          {/* GROUP */}
          {group && (
            <PricingCard
              icon={<Users className="w-5 h-5 mx-auto  text-orange-400"/>}
              type={`Group (${group.peopleCount})`}
              price={`₹${group.price.toLocaleString("en-IN")}`}
              sub={`total · ~₹${groupPerHead!.toLocaleString("en-IN")}/head`}
            />
          )}

        </div>
      </CardContent>
    </Card>
  );
};

const PricingCard = ({
  icon,
  type,
  price,
  sub,
}: {
  icon: React.ReactNode;
  type: string;
  price: string;
  sub: string;
}) => (
  <div className="border border-foreground/10 rounded-xl p-4 sm:p-5 text-center shadow-premium">
    <div className="flex justify-center text-primary mb-2">{icon}</div>

    <p className="text-sm font-heading text-foreground/80 mb-2">{type}</p>

    <p className="text-xl sm:text-2xl font-heading font-bold text-foreground">
      {price}
    </p>

    <p className="text-sm font-semibold text-muted-foreground mt-1">{sub}</p>
  </div>
);

export default PricingSection;