import { fadeUp } from "@/animation/variants";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const STATS: {value: string, desc: string}[] = [
  {
    value:"Curated Experiences",
    desc: "Every trip is carefully selected for comfort, adventure, and authenticity.",
  },
  {
    value: "Flexible Duration",
    desc: "From 2-day escapes to longer journeys across incredible destinations",
  },
  {
    value: "Explore India Better",
    desc: "Discover hidden gems, nature retreats, and cultural experiences nationwide",
  },
];

export default function WhyShortTripsWin() {
  return (
    <section
      className="py-20 md:py-28 bg-orange-50/30"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1.5 border border-stone-400/50 text-stone-600 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 mb-7">
            <Plus className="w-3 h-3" strokeWidth={2.5} />
            WHY TRAVEL WITH US
          </span>
        </motion.div>

        
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[2rem] sm:text-[2.6rem] md:text-[3.1rem] font-black leading-[1.12] text-stone-900 max-w-2xl mb-14 md:mb-16"
          // style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Explore more of India without taking long breaks from life.
        </motion.h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-stone-300/70 rounded-xl overflow-hidden">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={[
                "px-7 py-8 sm:py-9 bg-white/0 group",
                "relative",
                i < STATS.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-stone-300/70"
                  : "",
              ].join(" ")}
            >
              
              <p
                className="text-2xl sm:text-3xl font-black leading-none mb-3 tracking-tight text-gray-600"
               
              >
                {stat.value}
              </p>

             
              <p className="text-stone-500 text-sm leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}