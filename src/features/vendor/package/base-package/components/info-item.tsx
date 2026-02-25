
interface InfoItemProps {
  icon: React.ElementType;
  value?: string | number | null;
}

function InfoItem({ icon: Icon, value }: InfoItemProps) {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="flex items-center gap-1 min-w-0 text-sm text-muted-foreground">
      <Icon className="w-4 h-4 shrink-0" />
      <span className="line-clamp-1">{value}</span>
    </div>
  );
}

export default InfoItem;