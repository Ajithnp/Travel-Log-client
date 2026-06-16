import { Building2, CalendarRange, Package, CircleDot } from "lucide-react";
import { SectionCard } from "./section-card";
import { InfoRow } from "./payout-info-raw";
import { formatDateRange } from "@/utils/combine-date-formater";

interface PayoutInformationProps {
    vendorName?: string;
    scheduleStartDate?: string | Date;
    scheduleEndDate?: string | Date;
    packageTitle?: string;
}

export function PayoutInformation({ vendorName, scheduleStartDate, scheduleEndDate, packageTitle }: PayoutInformationProps) {
    return (
        <SectionCard label="Payout Information" icon={CircleDot} >
            <div className="divide-y divide-slate-100">
                <InfoRow icon={Building2} label="Vendor" value={vendorName ?? ''} />
                <InfoRow
                    icon={CalendarRange}
                    label="Schedule" value={scheduleStartDate && scheduleEndDate
                        ? formatDateRange(scheduleStartDate.toString(), scheduleEndDate.toString())
                        : 'N/A'}
                />
                <InfoRow icon={Package} label="Package" value={packageTitle ?? 'N/A'} />
            </div>
        </SectionCard>
    );
}
