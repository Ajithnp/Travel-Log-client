import type { Column } from "@/components/table/DataTable";
import { TableActions, type TableAction } from "@/components/table/TableActions";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { IContactResponse } from "../services/api.services";
import { formatDate } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type EnquiryResolveActionHandler = (enquiryId: string) => void;

export const CancellationColumns = (
    onResolveAction: EnquiryResolveActionHandler,
    status?: string,
): Column<IContactResponse>[] => {
    const columns: Column<IContactResponse>[] = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "subject", label: "Subject" },
        {
            key: "message",
            label: "Message",
            render: (enquiry) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="tracking-tight text-green-600 font-medium hover:underline cursor-pointer focus:outline-none">
                            View Message
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 text-sm max-w-xs break-words bg-white border border-slate-200 shadow-lg rounded-lg text-slate-700">
                        {enquiry.message}
                    </PopoverContent>
                </Popover>
            ),
        },
        {
            key: "isGuest",
            label: "Guest",
            render: (enquiry) => (
                <span className="tracking-tight ">
                    {enquiry.isGuest ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: "createdAt", label: "Date", render: (enquiry) => (
                <span className="tracking-tight ">
                    {formatDate(enquiry.createdAt.toString(), 'dd/MM/yyyy')}
                </span>
            ),
        },
    ];

    if (status === "resolved") {
        columns.push({
            key: "updatedAt",
            label: "Resolved On",
            render: (enquiry) => (
                <span className="tracking-tight ">
                    {enquiry.updatedAt ? formatDate(enquiry.updatedAt.toString(), 'dd/MM/yyyy') : "Not Resolved"}
                </span>
            ),
        });
    }

    columns.push(
        {
            key: "status",
            label: "Status",
            render: (enquiry) => (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${enquiry.status === 'pending'
                            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                            : enquiry.status === 'resolved'
                                ? "bg-green-100 text-green-700 border-green-300"
                                : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                >
                    {enquiry.status}
                </motion.div>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (enquiry) => {
                const actions: TableAction[] = [
                    {
                        label: "Resolve",
                        show: enquiry.status === "pending",
                        icon: <Eye className="w-4 h-4" />,
                        onClick: () => onResolveAction(enquiry.id),
                        variant: "primary",
                    },
                ];

                return <TableActions actions={actions} />;
            },
        }
    );

    return columns;
};