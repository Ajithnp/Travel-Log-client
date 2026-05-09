import { FileCheck2, UploadCloud, X } from "lucide-react";
import { useRef } from "react";
import type { ExistingFile } from "../validations/vendor.verification.schema";
import type { IFiles } from "../api.types";

interface FileUploadZoneProps {
  label: string;
  icon: React.ReactNode;
  accept: string;
  acceptLabel: string;
  fieldName: string;
  value?: File | IFiles;
  onChange: (file: File | undefined) => void;
  error?: string;
}

function isExistingFile(v: unknown): v is ExistingFile {
  return typeof v === "object" && v !== null && "key" in v && "fieldName" in v;
}

export function FileUploadZone({
  label,
  icon,
  accept,
  acceptLabel,
  value,
  onChange,
  error,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Existing S3 file state ──
  if (isExistingFile(value)) {
    const displayName = value.key.split("/").pop() ?? value.key;

    return (
      <div
        className={`rounded-xl border-2 p-4 transition-all ${
          error
            ? "border-rose-300 bg-rose-50"
            : "border-emerald-200 bg-emerald-50"
        }`}
      >
        <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-800 truncate">
              {displayName}
            </p>
            <p className="text-xs text-emerald-600">
              Previously uploaded • kept
            </p>
          </div>

          {/* Replace button */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold shrink-0 underline underline-offset-2"
          >
            Replace
          </button>

          {/* Clear (go back to required upload) */}
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="w-6 h-6 rounded-full bg-slate-200 hover:bg-rose-100 flex items-center justify-center transition-colors"
            title="Remove"
          >
            <X className="w-3 h-3 text-slate-500" />
          </button>
        </div>

        {/* Hidden input for replacement */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(file);
            e.target.value = "";
          }}
        />

        {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
      </div>
    );
  }

  // ── New File selected state ────────
  if (value instanceof File) {
    return (
      <div
        className={`rounded-xl border-2 p-4 transition-all ${
          error
            ? "border-rose-300 bg-rose-50"
            : "border-indigo-200 bg-indigo-50"
        }`}
      >
        <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-indigo-800 truncate">
              {value.name}
            </p>
            <p className="text-xs text-indigo-500">
              {(value.size / 1024).toFixed(1)} KB • new file
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="w-6 h-6 rounded-full bg-slate-200 hover:bg-rose-100 flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 text-slate-500" />
          </button>
        </div>

        {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
      </div>
    );
  }

  // ── Empty / dropzone state ──────────────
  return (
    <div
      className={`rounded-xl border-2 border-dashed p-5 cursor-pointer transition-all hover:bg-slate-50 ${
        error ? "border-rose-300 bg-rose-50" : "border-slate-200"
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) onChange(file);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
          e.target.value = "";
        }}
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">{label}</p>
          <p className="text-xs text-slate-400 mt-0.5">{acceptLabel}</p>
        </div>
        <div className="flex items-center gap-1.5 text-indigo-500 text-xs font-medium">
          <UploadCloud className="w-3.5 h-3.5" />
          Click to upload
        </div>
      </div>
      {error && (
        <p className="text-xs text-rose-500 mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
