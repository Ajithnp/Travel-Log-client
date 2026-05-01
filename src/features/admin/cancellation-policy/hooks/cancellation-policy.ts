import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Policy } from "../types";
import type { PolicyFormValues } from "../components/create-policy-modal";
import {
  usePoliciesQuery,
  usePolicyCreateMutation,
  useTogglePolicyActiveMutation,
} from "./api.hooks";

type ToggleState = {
  id: string;
  name: string;
  isActive: boolean;
} | null;

export function useCancellationPolicies() {
  const [showDisabled, setShowDisabled] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [active, setActive] = useState<ToggleState>(null);

  const { data: policiesData, isLoading } = usePoliciesQuery();
  const { mutate: createPolicy, isPending: isCreatePending } =
    usePolicyCreateMutation();

  const { mutate: togglePolicyActive, isPending: isTogglePending } =
    useTogglePolicyActiveMutation();

  const policies: Policy[] = policiesData?.data ?? [];

  const visible = useMemo(() => {
    return showDisabled
      ? policies
      : policies.filter((p) => p.isActive);
  }, [showDisabled, policies]);

  const hiddenCount = useMemo(() => {
    return policies.filter((p) => !p.isActive).length;
  }, [policies]);

  const openCreateModal = () => setOpenCreate(true);
  const closeCreateModal = () => setOpenCreate(false);

  const handleCreate = (values: PolicyFormValues) => {
    createPolicy(values, {
      onSuccess: () => {
        toast.success("Policy created successfully!");
        closeCreateModal();
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to create policy."
        );
      },
    });
  };

  const requestToggle = (
    id: string,
    isActive: boolean,
    name: string
  ) => {
    setActive({ id, isActive, name });
  };

  const cancelToggle = () => setActive(null);

  const confirmToggle = () => {
    if (!active) return;

    togglePolicyActive(
      {
        id: active.id,
        isActive: active.isActive,
      },
      {
        onSuccess: () => {
          toast.success(
            `Policy ${active.name} ${
              active.isActive ? "enabled" : "disabled"
            } successfully!`
          );
          setActive(null);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              `Failed to ${
                active.isActive ? "enable" : "disable"
              } policy.`
          );
        },
      }
    );
  };

  return {
    showDisabled,
    setShowDisabled,

    openCreate,
    openCreateModal,
    closeCreateModal,

    active,
    requestToggle,
    cancelToggle,
    confirmToggle,

    visible,
    hiddenCount,

    isLoading,
    isCreatePending,
    isTogglePending,

    handleCreate,
  };
}