import { cn } from "@/lib/utils";
import { CheckCircle2, Upload } from "lucide-react";
import { useCallback, useState } from "react";

interface FileUploadZoneProps {
  label: string;
  icon: React.ReactNode;
  accept: string;
  acceptLabel: string;
  fieldName: string;
  value?: File;
  onChange: (file: File | undefined) => void;
  error?: string;
}

export function FileUploadZone({
  label,
  icon,
  accept,
  acceptLabel,
  fieldName,
  value,
  onChange,
  error,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onChange(file);
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
        {label}
        <span className="text-rose-500 text-xs">*</span>
      </label>
      <div className="relative group">
        <input
          type="file"
          name={fieldName}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0])}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        />
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-5 text-center transition-all duration-300",
            isDragging
              ? "border-indigo-400 bg-indigo-50 scale-[1.01]"
              : value
              ? "border-emerald-400 bg-emerald-50"
              : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50",
            error && !value && "border-rose-300 bg-rose-50"
          )}
        >
          <div className="flex flex-col items-center gap-2.5">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                value
                  ? "bg-emerald-100 text-emerald-600"
                  : isDragging
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-white text-slate-400 shadow-sm group-hover:bg-indigo-100 group-hover:text-indigo-500"
              )}
            >
              {value ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : isDragging ? (
                <Upload className="w-5 h-5 animate-bounce" />
              ) : (
                icon
              )}
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-medium transition-colors",
                  value
                    ? "text-emerald-700"
                    : isDragging
                    ? "text-indigo-600"
                    : "text-slate-500 group-hover:text-indigo-600"
                )}
              >
                {value ? value.name : isDragging ? "Drop to upload" : "Click or drag to upload"}
              </p>
              {!value && (
                <p className="text-xs text-slate-400 mt-0.5">{acceptLabel}</p>
              )}
              {value && (
                <p className="text-xs text-emerald-600 mt-0.5 font-medium">
                  {(value.size / 1024 / 1024).toFixed(2)} MB uploaded
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {error && !value && (
        <p className="text-rose-500 text-xs flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-rose-500" />
          {error}
        </p>
      )}
    </div>
  );
}