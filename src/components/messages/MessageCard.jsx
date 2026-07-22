import { formatDistanceToNow }
  from "date-fns"
import { motion } from "framer-motion"

export default function MessageCard({
  message,
  onClick,
}) {

  const preview =
    message.message?.slice(0, 55)

    const time = message.timestamp

        ? formatDistanceToNow(
            message.timestamp.toDate(),
            { addSuffix: true }
            )

        : "just now"

  return (

    <motion.div

      whileHover={{
        scale: 1.02,
      }}

      whileTap={{
        scale: 0.98,
      }}

      onClick={onClick}

      className={`
        cursor-pointer

        p-4
        rounded-2xl

        border

        transition-all

        ${
          message.status === "UNREAD"

            ? `
              border-yellow-400/40
              bg-yellow-500/10
            `

            : `
              border-zinc-800
              bg-zinc-900/60
            `
        }
      `}
    >

      <div className="
        flex
        items-start
        justify-between
        mb-2
        ">

        <div className="
            flex
            items-center
            gap-2
        ">

            {

            message.status === "UNREAD"

            && (

                <div className="
                w-2.5
                h-2.5

                rounded-full

                bg-yellow-400

                animate-pulse
                " />

            )
            }

            <h3 className="
            font-bold
            text-sm
            ">
            {message.name}
            </h3>

        </div>



        <div className="text-right">

            <span className={`

            text-[10px]

            px-2
            py-1

            rounded-full

            ${
                message.status === "UNREAD"

                ? `
                    bg-yellow-500/20
                    text-yellow-400
                `

                : message.status === "READ"

                ? `
                    bg-blue-500/20
                    text-blue-400
                `

                : `
                    bg-green-500/20
                    text-green-400
                `
            }

            `}>

            {message.status}

            </span>



            <p className="
            text-[10px]
            text-zinc-500
            mt-1
            ">

            {time}

            </p>

        </div>

        </div>



      <p className="
        text-zinc-400
        text-xs
        line-clamp-2
      ">

        {preview}...

      </p>

    </motion.div>
  )
}