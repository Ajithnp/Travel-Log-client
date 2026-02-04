import type React from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BasePackageFormData } from "../../validations/base-package.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InclusionsExclusionsProps {
  type: "inclusions" | "exclusions";
  label: string;
}

export function InclusionsExclusions({
  type,
  label,
}: InclusionsExclusionsProps) {
  const { watch, setValue } = useFormContext<BasePackageFormData>();
  const items = watch(type) as string[] | undefined;
  const safeItems = Array.isArray(items) ? items : [];

  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    setValue(type, [...safeItems, inputValue.trim()], {
      shouldDirty: true,
      shouldTouch: true,
    });

    setInputValue("");
  };

  const handleRemove = (index: number) => {
    setValue(
      type,
      safeItems.filter((_, i) => i !== index),
      {
        shouldDirty: true,
        shouldTouch: true,
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      <Label className="block text-sm font-semibold text-foreground">
        {label}
      </Label>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Add ${
            type === "inclusions" ? "inclusion" : "exclusion"
          }...`}
          className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button
          type="button"
          onClick={handleAdd}
          variant="outline"
          size="sm"
          className="gap-1 bg-transparent"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {/* Tags */}
      <AnimatePresence mode="popLayout">
        {safeItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap gap-2"
          >
            {safeItems.map((item: string, index: number) => (
              <motion.div
                key={`${type}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-md font-medium"
              >
                {item}
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto w-auto p-0 hover:opacity-70"
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove ${item}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
