import { motion, AnimatePresence }
  from "framer-motion"

import { X }
  from "lucide-react"

export default function ContentModal({

  isOpen,
  title,
  onClose,
  children,

}) {

  return (

    <AnimatePresence>

      {isOpen && (

        <>

          <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            onClick={onClose}

            className="
              fixed
              inset-0

              z-[90]

              bg-black/50

              backdrop-blur-md
            "
          />

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}

            className="
              fixed

              top-1/2
              left-1/2

              -translate-x-1/2
              -translate-y-1/2

              z-[100]

              pointer-events-auto

              w-[95%]
              max-w-4xl

              max-h-[85vh]

              overflow-y-auto

              rounded-3xl

              bg-zinc-950

              border
              border-yellow-500/20

              p-6
            "
          >

            <div className="
              flex
              items-center
              justify-between

              mb-6
            ">

              <h2 className="
                text-2xl
                font-bold
                text-yellow-400
              ">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="
                  text-zinc-400
                  hover:text-red-400
                  transition-all
                "
              >
                <X />
              </button>

            </div>

            {children}

          </motion.div>

        </>

      )}

    </AnimatePresence>

  )
}