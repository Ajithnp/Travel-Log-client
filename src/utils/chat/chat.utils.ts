import type { Message } from "@/features/chat/services/api.services";
export type DividerItem = { type: "divider"; label: string };
export type MessageItem = { type: "message"; data: Message };
export type RenderItem = DividerItem | MessageItem;

const getDateLabel = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const buildRenderList = (messages: Message[]): RenderItem[] => {
  const items: RenderItem[] = [];
  let lastLabel = "";

  for (const message of messages) {
    const label = getDateLabel(message.createdAt.toString());
    if (label !== lastLabel) {
      items.push({ type: "divider", label });
      lastLabel = label;
    }
    items.push({ type: "message", data: message });
  }

  return items;
};