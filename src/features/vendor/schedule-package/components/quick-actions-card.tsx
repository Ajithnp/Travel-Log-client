import { Eye, ClipboardList, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const QuickActionsCard = () => {
  return (
    <Card className="animate-[fade-in_0.7s_ease-out] shadow-premium">
      <CardContent className="p-5 sm:p-6 space-y-3">
        <p className="text-sm font-semibold font-heading uppercase text-orange-500 mb-2">
          QUICK ACTIONS
        </p>

        <Button className="w-full rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold gap-2 h-10">
          <Eye className="w-4 h-4" />
          View Bookings 
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-sm border-foreground/15 font-heading gap-2 h-10"
        >
          <ClipboardList className="w-4 h-4" />
          Mark Attendance
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-sm border-foreground/15 font-heading gap-2 h-10"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;