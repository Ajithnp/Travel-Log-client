import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyOutlineProps {
  heading?: string;
  icon?: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
}

export function EmptyData({
  heading,
  icon,
  description,
  footer,
}: EmptyOutlineProps) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">{icon}</EmptyMedia>
          <EmptyTitle>{heading}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>{footer}</EmptyContent>
      </Empty>
    </div>
  );
}
