import { motion } from "framer-motion"

export default function MetricCard({
  title,
  value,
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.03,
      }}

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
        bg-zinc-900/70
        backdrop-blur-md

        border
        border-yellow-500/10

        rounded-3xl

        p-6

        shadow-lg
      "
    >

      <p className="
        text-zinc-400
        text-sm
        mb-3
      ">
        {title}
      </p>

      <h2 className="
        text-4xl
        font-black

        text-yellow-400
      ">
        {value}
      </h2>

    </motion.div>
  )
}