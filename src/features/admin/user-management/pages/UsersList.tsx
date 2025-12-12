import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableFooter from "@/components/table/TableFooter";
import type { IUser } from "@/types/IUser";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useUsersFetch, useUserStatusMutation } from "../hooks/api.hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { Loading } from "@/components/ui/loading";
import ConfirmDialog from "@/components/shared/modal/ConfirmDialog";
import { useCallback } from "react";
import { UserColumns } from "../components/UserTable";
import { USER_FILTER_OPTIONS } from "@/components/fieldsConfig/fields";

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

  const handleUserAction = useCallback((id: string, type: "block" | "unblock") => {
    setDialog({ id, type });
  }, []);


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


  if (isLoading) return <Loading variant="spinner" text="Loading content..." fullscreen />;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-gradient-premium">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-6">
          <TableHeader
            title={"Users"}
            search={search}
            onSearch={setSearch}
            filterOptions={USER_FILTER_OPTIONS}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <DataTable<IUser>
            data={users}
            columns={UserColumns(handleUserAction)}
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
            ? "Block User"
            : "Unblock User"
        }
        description={
          dialog?.type === "block"
            ? "Please enter a reason for blocking this user"
            : "Are you sure you want to unblock this user?"
        }
        showReasonInput={dialog?.type === "block"}
        onConfirm={handleConfirmAction}
        isConfirming={isPending}
      />
    </div>
  );
};

export default UsersListPage;
