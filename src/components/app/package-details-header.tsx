import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronRight, Share2, Heart, Check } from "lucide-react";

interface PackageDetailsHeaderProps {
  title: string;
  saved: boolean;
  onSaveToggle: () => void;
}

export function PackageDetailsHeader({ title, saved, onSaveToggle }: PackageDetailsHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="flex items-center gap-2 flex-wrap flex-1">
        <Button 
          onClick={() => window.history.back()} 
          variant="ghost" 
          size="sm"
          data-testid="btn-back" 
          className="gap-1 text-muted-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            Packages
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{title}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-end gap-2 sm:ml-auto">
        <Button 
          variant={copied ? "default" : "outline"} 
          size="sm" 
          data-testid="btn-share" 
          onClick={handleShare}
          className={`gap-1.5 cursor-pointer transition-colors ${copied ? "bg-orange-400 hover:bg-orange-600 text-white border-transparent" : ""}`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
          {copied ? "Link Copied!" : "Share"}
        </Button>
        <Button
          variant={saved ? "default" : "outline"}
          size="sm"
          data-testid="btn-save"
          onClick={onSaveToggle}
          className={`gap-1.5 cursor-pointer transition-colors ${saved ? "bg-orange-400 hover:bg-orange-600 text-white border-transparent" : ""}`}
        >
          <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
}
