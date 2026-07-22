// import { useState } from "react"

import ContentMenu
  from "@/content-management/ContentMenu"

import ContentMenuButton
  from "@/content-management/ContentMenuButton"
import MessageModal
  from "@/components/messages/MessageModal"

import { useEffect, useState }
  from "react"

import MessageCard
  from "@/components/messages/MessageCard"

import {
  listenToMessages,
} from "@/services/messageService"

import {
  LogOut,
  LayoutDashboard,
} from "lucide-react"

import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

import { useNavigate } from "react-router-dom"

import { motion } from "framer-motion"

export default function DashboardLayout({
  children,
}) {

  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  const [messages, setMessages] =
  useState([])

  const [selectedMessage,
    setSelectedMessage] =
    useState(null)
  
  const [isMenuOpen,
    setIsMenuOpen] =
    useState(false)

  useEffect(() => {

    const unsubscribe =
      listenToMessages(setMessages)

    return () => unsubscribe()

  }, [])

  return (

    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      <ContentMenuButton
        onClick={() =>
          setIsMenuOpen(
            !isMenuOpen
          )
        }
      />

      <ContentMenu
        isOpen={isMenuOpen}
      />

      {/* SIDEBAR */}

      <motion.aside

        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}

        className="
          w-full
          lg:w-72
          bg-zinc-950
          border-r
          border-yellow-500/10
          p-6
          flex
          flex-col
          justify-between
        "
      >

        <div>

          {/* LOGO */}

          <div className="mb-12">

            <h1 className="
              text-3xl
              font-black
              tracking-wide
            ">
              Robo
              <span className="text-yellow-400">
                Cell
              </span>
            </h1>

            <p className="
              text-zinc-500
              text-sm
              mt-1
            ">
              Admin Dashboard
            </p>

          </div>

          {/* NAVIGATION */}

          <nav className="space-y-3">

            <div className="
              flex
              items-center
              gap-3

              bg-yellow-500/10
              text-yellow-400

              px-4
              py-3

              rounded-2xl

              border
              border-yellow-500/20
            ">

              <LayoutDashboard size={20} />

              <span className="font-medium">
                Dashboard
              </span>

            </div>

          </nav>

        </div>

        {/* MESSAGES */}

          <div className="
              mt-8

              flex-1

              overflow-y-auto
            ">

            <div className="
                flex
                items-center
                justify-between

                mb-4
              ">

              <h2 className="
                text-sm
                font-bold
                text-yellow-400
                uppercase
                tracking-wider
              ">
                Messages
              </h2>

              <span className="
                text-xs
                text-zinc-500
              ">
                {messages.length}
              </span>

            </div>



            <div className="
              space-y-3
            ">

              {
                messages.slice(0, 10).map(
                  (message) => (

                  <MessageCard

                    key={message.id}

                    message={message}

                    onClick={() => setSelectedMessage(message)}
                  />

                ))
              }

            </div>

          </div>

        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          className="
            flex
            items-center
            gap-2

            text-zinc-400

            hover:text-red-400

            transition-all
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </motion.aside>



      {/* MAIN CONTENT */}

      <main className="
        flex-1
        p-4
        md:p-6
        lg:p-8
        bg-gradient-to-br
        from-black
        via-zinc-950
        to-black
      ">

        {children}

      </main>

      <MessageModal

        message={selectedMessage}

        onClose={() =>
          setSelectedMessage(null)
        }
      />

    </div>
  )
}