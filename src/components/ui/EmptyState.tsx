import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        {icon || <Folder className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-md text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-gradient-primary text-white hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}