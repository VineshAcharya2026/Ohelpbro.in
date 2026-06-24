interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-border/50 p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold text-primary mt-2">{value}</p>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
