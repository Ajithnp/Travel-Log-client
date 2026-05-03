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
          <EmptyMedia variant="icon" className="w-10 h-10 text-gray-600">{icon}</EmptyMedia>
          <EmptyTitle className="text-lg text-gray-600 font-bold">{heading}</EmptyTitle>
          <EmptyDescription className="text-md text-gray-500">
            {description}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>{footer}</EmptyContent>
      </Empty>
    </div>
  );
}
