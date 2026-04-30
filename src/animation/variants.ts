import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: "easeInOut",
    },
  }),
};

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
  },
  hover: {
    scale: 1.018,
    y: -4,
    boxShadow: "0 12px 40px 0 rgba(99,102,241,0.13)",
    transition: {
      duration: 0.28,
      ease: "easeInOut",
    },
  },
};

export const policyCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.25 } },
};

export const rowVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

export const policyBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

export const policyModalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 16, transition: { duration: 0.22 } },
};

export const policyRuleRowVariants: Variants = {
  hidden: { opacity: 0, x: -12, height: 0 },
  visible: { opacity: 1, x: 0, height: "auto", transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: 12, height: 0, transition: { duration: 0.2 } },
};