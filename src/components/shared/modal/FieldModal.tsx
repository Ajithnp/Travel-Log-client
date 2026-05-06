import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  X,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";



type FieldType = "email" | "password" | "text";

interface ValidationRule {
  required?: string;
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: string, allValues: Record<string, string>) => string | true;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
  validation?: ValidationRule;
}

interface FieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconBg?: string;
  fields: FieldConfig[];
  submitLabel?: string;
  isLoading?: boolean;
  onSubmit: (data: Record<string, string>) => void;
}



function FieldModal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  iconBg = "from-violet-500 to-indigo-500",
  fields,
  submitLabel = "Save Changes",
  isLoading = false,
  onSubmit,
}: FieldModalProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);

  const validate = (fieldName: string, value: string): string => {
    const field = fields.find((f) => f.name === fieldName);
    if (!field?.validation) return "";
    const v = field.validation;
    if (v.required && !value.trim()) return v.required;
    if (v.minLength && value.length < v.minLength.value) return v.minLength.message;
    if (v.pattern && !v.pattern.value.test(value)) return v.pattern.message;
    if (v.validate) {
      const result = v.validate(value, values);
      if (result !== true) return result;
    }
    return "";
  };

  const handleChange = (name: string, value: string) => {
    const updated = { ...values, [name]: value };
    setValues(updated);
    if (touched[name]) {
    //   const field = fields.find((f) => f.name === name)!;
      const err = validate(name, value);
      setErrors((e) => ({ ...e, [name]: err }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const err = validate(name, values[name]);
    setErrors((e) => ({ ...e, [name]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(fields.map((f) => [f.name, true]));
    setTouched(allTouched);
    const newErrors: Record<string, string> = {};
    let hasError = false;
    for (const field of fields) {
      const err = validate(field.name, values[field.name]);
      if (err) { newErrors[field.name] = err; hasError = true; }
    }
    setErrors(newErrors);
    if (!hasError) {
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onSubmit(values); }, 900);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,15,25,0.55)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md bg-white rounded-3xl shadow-[0_32px_80px_-8px_rgba(0,0,0,0.22)] overflow-hidden relative"
          >
            {/* Top gradient accent */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${iconBg}`} />

            {/* Header */}
            <div className="px-7 pt-7 pb-5 flex items-start gap-4">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                {icon}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{title}</h2>
                <p className="text-sm text-slate-400 mt-0.5 leading-snug">{description}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors mt-0.5"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            <div className="h-px bg-slate-100 mx-7" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-7 pt-5 pb-7 space-y-4">
              {fields.map((field) => {
                const isPassword = field.type === "password";
                const isVis = visible[field.name];
                const hasErr = touched[field.name] && !!errors[field.name];
                const isOk = touched[field.name] && !errors[field.name] && !!values[field.name];
                return (
                  <div key={field.name} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type={isPassword ? (isVis ? "text" : "password") : field.type}
                        value={values[field.name]}
                        placeholder={field.placeholder}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        onBlur={() => handleBlur(field.name)}
                        className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm font-medium bg-slate-50 placeholder-slate-300 outline-none transition-all duration-200 ${
                          hasErr
                            ? "border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            : isOk
                            ? "border-emerald-300 bg-emerald-50/30 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            : "border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:bg-white"
                        }`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        {isPassword ? (
                          <button
                            type="button"
                            onClick={() => setVisible((v) => ({ ...v, [field.name]: !isVis }))}
                            className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {isVis ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        ) : isOk ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : hasErr ? (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        ) : null}
                      </div>
                    </div>
                    <AnimatePresence>
                      {hasErr && (
                        <motion.p
                          key="err"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="text-xs text-red-500 font-medium flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" /> {errors[field.name]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {field.hint && !hasErr && (
                      <p className="text-xs text-slate-400">{field.hint}</p>
                    )}
                  </div>
                );
              })}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 bg-gradient-to-r ${iconBg} hover:opacity-90 disabled:opacity-70 shadow-md`}
                >
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.span key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Saved!
                      </motion.span>
                    ) : isLoading ? (
                      <motion.span key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving…
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                        {submitLabel} <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default FieldModal