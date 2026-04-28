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