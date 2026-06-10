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

export const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
};

export const itemVariants:Variants = {
    hidden: { opacity: 0, y: 6, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

export const overlayV:Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18, delay: 0.04 } },
};

export const modalV:Variants = {
  hidden: { opacity: 0, scale: 0.93, y: 28 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 310, damping: 28, delay: 0.06 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 16,
    transition: { duration: 0.17, ease: "easeIn" },
  },
};



export const fieldV:Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.06, duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const successV:Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export const fadeUpBox:Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
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



export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.94, y: 14, transition: { duration: 0.2 } },
};

export const iconVariants: Variants = {
  hidden:  { scale: 0.4, opacity: 0, rotate: -20 },
  visible: { scale: 1,   opacity: 1, rotate: 0,
    transition: { delay: 0.1, duration: 0.45, type: "spring", stiffness: 280, damping: 18 } },
};

export const staggerContainer:Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18, delay: 0.05 } },
};

export const reviewModalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 16,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export const reviewSuccessVariants:Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};