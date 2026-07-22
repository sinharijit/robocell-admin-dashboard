import { useState } from "react"

import { signInWithEmailAndPassword }
from "firebase/auth"

import { auth } from "@/lib/firebase"

import { useNavigate }
from "react-router-dom"

import toast from "react-hot-toast"

import { motion }
from "framer-motion"

export default function LoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)



  const handleLogin = async (
    e
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      toast.success(
        "Login successful"
      )

      navigate("/")

    } catch (error) {

      toast.error(
        "Invalid email or password"
      )

    } finally {

      setLoading(false)
    }
  }



  return (

    <div className="
      min-h-screen

      bg-black

      flex
      items-center
      justify-center

      px-4
    ">

      <motion.div

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="
          w-full
          max-w-md

          bg-zinc-900/70
          backdrop-blur-md

          border
          border-yellow-500/10

          rounded-3xl

          p-8
        "
      >

        {/* LOGO */}

        <div className="
          text-center
          mb-8
        ">

          <h1 className="
            text-5xl
            font-black
            text-white
          ">

            Robo
            <span className="
              text-yellow-400
            ">
              Cell
            </span>

          </h1>

          <p className="
            text-zinc-400
            mt-3
          ">
            Admin Dashboard Login
          </p>

        </div>



        {/* FORM */}

        <form
          onSubmit={handleLogin}

          className="
            space-y-5
          "
        >

          <input
            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full

              bg-black/40

              border
              border-zinc-700

              focus:border-yellow-400

              rounded-2xl

              px-4
              py-4

              outline-none

              transition-all

              text-white
              placeholder:text-zinc-500
            "
          />



          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full

              bg-black/40

              border
              border-zinc-700

              focus:border-yellow-400

              rounded-2xl

              px-4
              py-4

              outline-none

              transition-all

              text-white
              placeholder:text-zinc-500
            "
          />



          <button

            disabled={loading}

            className="
              w-full

              bg-yellow-400
              text-black

              font-bold

              py-4

              rounded-2xl

              hover:bg-yellow-300

              transition-all
            "
          >

            {
              loading

                ? "Signing in..."

                : "Login"
            }

          </button>

        </form>

      </motion.div>

    </div>
  )
}