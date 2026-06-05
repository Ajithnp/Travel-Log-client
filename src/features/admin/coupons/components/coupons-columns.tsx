import type { Column } from "@/components/table/DataTable";
import type { ICouponTemplateResponse } from "../services/api.services";
import { Badge } from "@/components/ui/badge";
import { TableActions, type TableAction } from "@/components/table/TableActions";
import { Ban, IndianRupee, Target, Ticket } from "lucide-react";

export const CouponColumns = (
    onDeactivate: (couponId: string) => void
): Column<ICouponTemplateResponse>[] => [
        {
            key: "title",
            label: "Coupon Title",
            render: (coupon) => (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-800 flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-orange-400" />
                        {coupon.title}
                    </span>
                </div>
            ),
        },
        {
            key: "rewardValue",
            label: "Reward Value",
            render: (coupon) => (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-800 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-400" />{coupon.rewardValue}
                    </span>
                </div>
            )
        },

        {
            key: "probability",
            label: "Probabilty",
            render: (coupon) => {
                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-slate-800 flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-400" />
                            {coupon.probability * 100}%
                        </span>
                    </div>
                );
            },
        },

        {
            key: "isActive",
            label: "Coupon Status",
            render: (coupon) => (
                <div className="flex flex-col">
                    {coupon.isActive ? <Badge variant="verified">Active</Badge> : <Badge variant="destructive">Inactive</Badge>}
                </div>
            ),
        },

        {
            key: "actions",
            label: "Actions",
            render: (coupon) => {
                const actions: TableAction[] = [
                    {
                        label: "Deactivate",
                        icon: <Ban className="w-4 h-4" />,
                        variant: "success",
                        onClick: () => onDeactivate(coupon.id),
                        disabled: !coupon.isActive
                    },
                ];

                return <TableActions actions={actions} />;
            },
        },
    ];