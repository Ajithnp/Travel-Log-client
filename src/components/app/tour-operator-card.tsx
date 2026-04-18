import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  UserCheck, Shield } from "lucide-react";
import { StarRating } from "../common/start-rating";
import { useNavigate } from "react-router-dom";

type Operator = {
name: string;
id: string;
  rating: number;
  reviews: number;
};

type Props = {
  operator: Operator;
};

export function TourOperatorCard({ operator }: Props) {
  const navigate = useNavigate();
  return (
    <Card className="shadow-premium">
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold mb-3">Tour Operator</h3>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-amber-400">
            <UserCheck className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{operator.name}</p>

            <div className="flex items-center gap-1 flex-wrap">
              <StarRating rating={operator.rating} />
              <span className="text-xs text-muted-foreground">
                {operator.rating} · {operator.reviews} reviews
              </span>
            </div>

           
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Verified Operator 
                </span>
              </div>
        
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-3 gap-1.5"
          size="sm"
          data-testid="btn-contact-operator"
          onClick={() => navigate(`/packages/vendor/${operator.id}/profile`)}
        >
          View Operator
        </Button>
      </CardContent>
    </Card>
  );
}