import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableFooter from "@/components/table/TableFooter";
import type { IUser } from "@/types/IUser";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useUsersFetch, useUserStatusMutation } from "../hooks/api.hooks";
import { userColumns } from "../../fields-config/tableFields";
import { useDebounce } from "@/hooks/useDebounce";
import { Loading } from "@/components/ui/loading";



const UsersListPage = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dialog, setDialog] = useState<{ id: string; type: "block" | "unblock" } | null>(null);
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, error } = useUsersFetch(
    page,
    LIMIT,
    debouncedSearch,
    selectedFilter
  );
  const { mutate: updateStatus, isPending } = useUserStatusMutation();

  const users = data?.data.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;


  const handleConfirmAction = (reason?: string) => {
    if (!dialog) return;


    updateStatus(
      { id: dialog.id, blockUser: dialog.type === 'block', reason },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setDialog(null)
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error?.message);
          setDialog(null)
        },
      }
    );
  };

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, selectedFilter]);


  if (isLoading) return <Loading variant="spinner" text="Loading content..." className="w-full h-full" />;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (isPending) return <Loading variant="spinner" className="w-full h-full"/>;

  return (
    <div className="min-h-screen bg-gradient-premium">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-6">
          <TableHeader
            title={"Users"}
            search={search}
            onSearch={setSearch}
            filterOptions={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Blocked", value: "blocked" },
            ]}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <DataTable<IUser>
            data={users}
            columns={userColumns((id, type) => setDialog({ id, type }))}
            loading={isLoading}
            emptyMessage="No users found"
            rowKey={(row) => row.id}
          />

          <TableFooter
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!dialog}
        onClose={() => setDialog(null)}
        title={
          dialog?.type === "block"
            ? "Unblock User"
            : "Unblock User"
        }
        description={
          dialog?.type === "block"
            ? "Please enter a reason for blocking this user"
            : "Are you sure you want to unblock this user?"
        }
        showReasonInput={dialog?.type === "block"}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

export default UsersListPage;
