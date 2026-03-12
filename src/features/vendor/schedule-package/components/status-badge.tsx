const statusStyles: Record<string, { dot: string; text: string }> = {
  upcoming: { dot: "bg-success", text: "text-success"},
  ongoing: { dot: "bg-blue-500", text: "text-blue-500" },
  completed: { dot: "bg-yellow-500", text: "text-yellow-500" },
  cancelled: { dot: "bg-destructive", text: "text-destructive" },
  sold_out: { dot: "bg-orange-500", text: "text-orange-500" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const s = statusStyles[status.toLowerCase()] ?? statusStyles.upcoming;
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${s.text}`}>
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;