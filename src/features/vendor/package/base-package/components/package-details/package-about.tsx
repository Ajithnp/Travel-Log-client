interface PackageAboutProps {
  description?: string; 
}

export function PackageAbout({ description }: PackageAboutProps) {
  if (!description) return null;

  return (
    <div className="bg-card rounded-xl border animate-fade-up p-6 shadow-premium" style={{ animationDelay: "0.1s" }}>
      <h2 className="section-title mb-4 font-semibold">About This Package</h2>
      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
        {description}
      </div>
    </div>
  );
}