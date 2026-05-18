import { useState } from "react";
import { useChatMembers } from "../../hooks/api.hooks";
import { UserMinus, X, Users, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MembersPanelProps {
  chatId: string;
  onClose: () => void;
  onRemoveMember?: (memberId: string) => void;
}

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-indigo-500",
];
function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export const MembersPanel = ({ chatId, onClose, onRemoveMember }: MembersPanelProps) => {
  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);
  const { data: membersResponse, isLoading } = useChatMembers(chatId);
  const members = membersResponse?.data ?? [];
  const activeCount = members.filter((m) => m.status).length;

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute top-0 right-0 bottom-0 z-40 w-72 sm:w-80 bg-background/95 backdrop-blur border-l border-border flex flex-col shadow-2xl">

        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center">
              <Users className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Members</h3>
              <p className="text-[11px] text-muted-foreground leading-none mt-0.5">
                {isLoading
                  ? "Loading…"
                  : `${activeCount} online · ${members.length} total`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Member list */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col gap-0 px-4 py-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-full bg-muted animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-24 bg-muted animate-pulse rounded-full" />
                    <div className="h-2.5 w-16 bg-muted/60 animate-pulse rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground px-6 py-8">
              <Users className="w-8 h-8 opacity-30" />
              <p className="text-sm text-center">No members found</p>
            </div>
          ) : (
            <div className="py-2">
              {members.map((member) => {
                const initial = member.name?.[0]?.toUpperCase() ?? "?";
                const color = avatarColor(member.name ?? "");
                const isActive = member.status;

                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/40 transition-colors group"
                  >
                    {/* Avatar with status dot */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white font-semibold text-[13px]`}
                      >
                        {initial}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${
                          isActive ? "bg-emerald-500" : "bg-muted-foreground/40"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground truncate leading-tight">
                        {member.name}
                      </p>
                      <p
                        className={`text-[11px] leading-none mt-0.5 ${
                          isActive ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {isActive ? "Active" : "Blocked"}
                      </p>
                    </div>

                    {/* Remove button */}
                    {onRemoveMember && isActive && (
                      <button
                        onClick={() => setPendingRemoveId(member.id)}
                        className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/40"
                        title="Remove member"
                      >
                        <UserMinus className="w-3 h-3" />
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Admin actions footer */}
        {onRemoveMember && (
          <div className="border-t border-border/60 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-2">
              Admin Actions
            </p>
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 transition-colors border border-border/60">
              <Archive className="w-4 h-4" />
              Archive Group
            </button>
          </div>
        )}
      </div>

      {/* Confirm remove dialog */}
      {pendingRemoveId && (
        <ConfirmDialogForChat
          title="Remove member?"
          description="This member will be removed from the group and will no longer receive messages."
          confirmLabel="Remove"
          danger
          onConfirm={() => {
            onRemoveMember?.(pendingRemoveId);
            setPendingRemoveId(null);
            onClose();
          }}
          onCancel={() => setPendingRemoveId(null)}
        />
      )}
    </>
  );
};



interface ConfirmDialogForChatProps {
  title: string;
  description: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialogForChat = ({
  title,
  description,
  confirmLabel,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogForChatProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <div className="bg-background border border-border rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-150">
      <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${danger ? "bg-rose-50 dark:bg-rose-950/30" : "bg-violet-50 dark:bg-violet-950/30"}`}>
        {danger
          ? <UserMinus className="w-5 h-5 text-rose-600" />
          : <Archive className="w-5 h-5 text-violet-600" />
        }
      </div>
      <h3 className="font-semibold text-[15px] text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{description}</p>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={onCancel} className="rounded-lg">
          Cancel
        </Button>
        <Button
          size="sm"
          variant={danger ? "destructive" : "default"}
          onClick={onConfirm}
          className="rounded-lg"
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  </div>
);