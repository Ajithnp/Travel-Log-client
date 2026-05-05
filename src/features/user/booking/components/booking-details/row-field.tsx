import React from 'react'

export default function Row({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400 flex-shrink-0 pt-0.5">{label}</span>
      <span className={`text-xs font-medium text-gray-800 text-right ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
