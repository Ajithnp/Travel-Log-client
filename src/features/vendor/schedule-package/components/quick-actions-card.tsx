import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuickActionsCardProps {
    onNavigateToBookings: () => void;
    onExportCSV: () => void;
    isPending: boolean;
}
const QuickActionsCard = ({
    onNavigateToBookings,
    onExportCSV,
    isPending
}: QuickActionsCardProps) => {
  return (
    <Card className="animate-[fade-in_0.7s_ease-out] shadow-premium">
      <CardContent className="p-5 sm:p-6 space-y-3">
        <p className="text-sm font-semibold font-heading uppercase text-orange-500 mb-2">
          QUICK ACTIONS
        </p>

        <Button
         className="w-full rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold gap-2 h-10"
         onClick={onNavigateToBookings}
         >
          <Eye className="w-4 h-4" />
          View Bookings 
        </Button>

        {/* <Button
          variant="outline"
          className="w-full rounded-sm border-foreground/15 font-heading gap-2 h-10"
        >
          <ClipboardList className="w-4 h-4" />
          Mark Attendance
        </Button> */}

        <Button
          variant="outline"
          className="w-full rounded-sm border-foreground/15 font-heading gap-2 h-10"
          onClick={onExportCSV}
          disabled={isPending}
        >
          <Download className="w-4 h-4" />
          {isPending ? "Exporting..." : "Export CSV"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;