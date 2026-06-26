import { fadeUp } from "@/animation/variants";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";


type ISTEPS = {
  num: string;
  sub: string;
  title: string;
  desc: string;
}
const STEPS: ISTEPS[] = [
  {
    num: "01",
    sub: "SET YOUR DATES",
    title: "Choose your travel dates",
    desc: "Tell us when you're free, and we'll show trips that match your schedule.",
  },

  {
    num: "02",
    sub: "PICK YOUR PACKAGE",
    title: "Select your perfect getaway",
    desc: "Compare destinations, stays, activities, and pricing to find the right trip."
  },
  {
    num: "03",
    sub: "BOOK YOUR SLOT",
    title: "Confirm your booking",
    desc: "Secure your seat instantly and receive all your trip details in one place.",
  },
  {
    num: "04",
    sub: "JUST SHOW UP",
    title: "We handle the rest",
    desc: "Pack your bags and enjoy the journey while we take care of the planning.",
  },
];


export default function BookingInFourMoves() {
  return (
    <section
      className="py-20 md:py-28 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span
            className="inline-flex items-center gap-1.5 border border-stone-400/50 text-stone-600 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 mb-7"
          >
            <Plus className="w-3 h-3" strokeWidth={2.5} />
            Booking, in four moves
          </span>
        </motion.div>


        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[2rem] sm:text-[2.6rem] md:text-[3.1rem] font-black leading-[1.12] max-w-xl mb-14 md:mb-16"
        >
          From "I need a break" to packed bag.
        </motion.h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:bg-orange-50/80 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-orange-100"
            >
              <div
                className="w-full h-px mb-6 hidden lg:block transition-colors duration-300 group-hover:bg-orange-300 bg-stone-200"
              />

              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className="text-xs font-black tracking-widest transition-colors duration-300 group-hover:text-orange-600"
                  style={{ color: "#080705ff" }}
                >
                  {step.num}
                </span>
                <span
                  className="text-[11px] tracking-wider uppercase"
                  style={{ color: "rgba(14, 11, 11, 0.38)" }}
                >
                  — {step.sub}
                </span>
              </div>

              <h3
                className="text-base sm:text-[17px] font-bold leading-snug mb-2.5"
                style={{ color: "#000000ff" }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(3, 1, 1, 0.45)" }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}