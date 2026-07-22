import {
  motion,
  AnimatePresence,
} from "framer-motion"

import { X } from "lucide-react"

import {
  useState,
} from "react"

import emailjs
  from "@emailjs/browser"

import toast
  from "react-hot-toast"

import {
  markMessageAsReplied,
  markMessageAsRead,
} from "@/services/messageService"



export default function MessageModal({

  message,

  onClose,

}) {

  const [reply, setReply] =
    useState("")

  const [sending, setSending] =
    useState(false)



  if (!message) return null



  const handleSendReply =
    async () => {

      if (!reply.trim()) {

        toast.error(
          "Reply cannot be empty"
        )

        return
      }

      try {

        setSending(true)



        // EMAIL SEND

        await emailjs.send(

          "service_p8tvl3n",

          "template_z32yowa",

          {

            to_name:
              message.name,

            to_email:
              message.email,

            message:
              reply,

          },

          "014Uo3JmP0AxryOiM"
        )



        // UPDATE STATUS

        await markMessageAsReplied(
          message.id
        )



        toast.success(
          "Reply sent successfully"
        )



        setReply("")

        onClose()

      } catch (error) {

        console.error(error)

        toast.error(
          "Failed to send reply"
        )

      } finally {

        setSending(false)
      }
    }



  // MARK AS READ

  if (
    message.status === "UNREAD"
  ) {

    markMessageAsRead(message.id)
  }



  return (

    <AnimatePresence>

      <motion.div

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        exit={{
          opacity: 0,
        }}

        className="
          fixed
          inset-0

          bg-black/70
          backdrop-blur-sm

          z-50

          flex
          items-center
          justify-center

          p-6
        "
      >

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          exit={{
            opacity: 0,
            scale: 0.9,
          }}

          transition={{
            duration: 0.25,
          }}

          className="
            w-full
            max-w-2xl

            bg-zinc-950

            border
            border-yellow-500/20

            rounded-3xl

            shadow-2xl

            overflow-hidden
          "
        >

          {/* HEADER */}

          <div className="
            flex
            items-center
            justify-between

            px-6
            py-5

            border-b
            border-zinc-800
          ">

            <div>

              <h2 className="
                text-2xl
                font-black
                text-yellow-400
              ">
                {message.name}
              </h2>

              <p className="
                text-zinc-400
                text-sm
                mt-1
              ">
                {message.email}
              </p>

            </div>



            <button

              onClick={onClose}

              className="
                p-2

                rounded-xl

                hover:bg-zinc-800

                transition-all
              "
            >

              <X size={20} />

            </button>

          </div>



          {/* MESSAGE */}

          <div className="
            p-6
          ">

            <div className="
              bg-black/40

              border
              border-zinc-800

              rounded-2xl

              p-5

              min-h-[180px]
            ">

              <p className="
                text-zinc-200
                leading-relaxed
              ">
                {message.message}
              </p>

            </div>



            {/* REPLY */}

            <div className="
              mt-6
            ">

              <h3 className="
                text-lg
                font-bold
                mb-3
              ">
                Reply
              </h3>

              <textarea

                value={reply}

                onChange={(e) =>
                  setReply(e.target.value)
                }

                placeholder="
                  Write your reply here...
                "

                className="
                  w-full

                  h-36

                  bg-zinc-900

                  border
                  border-zinc-800

                  rounded-2xl

                  p-4

                  outline-none

                  focus:border-yellow-400

                  resize-none
                "
              />



              <div className="
                flex
                justify-end
                mt-4
              ">

                <button

                  onClick={
                    handleSendReply
                  }

                  disabled={sending}

                  className="
                    px-6
                    py-3

                    rounded-2xl

                    bg-yellow-400
                    text-black

                    font-bold

                    hover:scale-105

                    transition-all

                    disabled:opacity-50
                  "
                >

                  {
                    sending
                      ? "Sending..."
                      : "Send Reply"
                  }

                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  )
}