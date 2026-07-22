import { motion } from "framer-motion"

export default function RecentDonations({
  donations,
}) {

  return (

    <div className="
      bg-zinc-900/70
      backdrop-blur-md

      border
      border-yellow-500/10

      rounded-3xl

      p-6
      mt-10
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          Recent Donations
        </h2>

        <span className="
          text-zinc-500
          text-sm
        ">
          Live Updates
        </span>

      </div>



      {/* DONATION LIST */}

      <div className="
        space-y-4

        max-h-[500px]
        overflow-y-auto

        pr-2
      ">

        {
          donations.slice(0, 10).map(
            (
              donation,
              index
            ) => {

              const status =
                donation.paymentStatus?.toUpperCase()

              return (

                <motion.div

                  key={donation.id}

                  initial={{
                    opacity: 0,
                    x: -20,
                  }}

                  animate={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    delay:
                      index * 0.04,
                  }}

                  whileHover={{
                    scale: 1.01,
                  }}

                  className="
                    flex
                    items-center
                    justify-between

                    bg-black/30

                    border
                    border-zinc-800

                    rounded-2xl

                    p-4

                    transition-all
                  "
                >

                  {/* LEFT */}

                  <div>

                    <h3 className="
                      font-semibold
                      text-lg
                    ">
                      {
                        donation.donorName
                      }
                    </h3>

                    <p className="
                      text-zinc-400
                      text-sm
                    ">
                      {donation.email}
                    </p>

                  </div>



                  {/* RIGHT */}

                  <div className="
                    text-right
                  ">

                    <p className="
                      text-xl
                      font-black

                      text-yellow-400
                    ">
                      ₹{donation.amount}
                    </p>



                    <span className={`

                      inline-block
                      mt-2

                      px-3
                      py-1

                      rounded-full

                      text-xs
                      capitalize

                      ${
                        status === "VERIFIED"

                          ? `
                            bg-green-500/20
                            text-green-400
                          `

                          : status === "REJECTED"

                          ? `
                            bg-red-500/20
                            text-red-400
                          `

                          : `
                            bg-yellow-500/20
                            text-yellow-400
                          `
                      }

                    `}>

                      {
                        donation.paymentStatus
                      }

                    </span>

                  </div>

                </motion.div>
              )
            })
        }

      </div>

    </div>
  )
}