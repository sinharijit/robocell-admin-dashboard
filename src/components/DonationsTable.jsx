import {
  sendVerificationEmail
} from "@/services/emailService"

import { useState } from "react"

import { motion } from "framer-motion"

import toast from "react-hot-toast"

import { updateDonationStatus }
from "@/services/donationService"

export default function DonationsTable({
  donations,
  search,
  setSearch,
}) {

  const [loadingId, setLoadingId] =
    useState(null)



  const filteredDonations =
    donations.filter((donation) => {

      const text =
        search.toLowerCase()

      return (

        donation.donorName
          ?.toLowerCase()
          .includes(text)

        ||

        donation.email
          ?.toLowerCase()
          .includes(text)

        ||

        donation.utrId
          ?.includes(text)

        ||

        donation.amount
          ?.toString()
          .includes(text)
      )
    })



  const handleVerify = async (id) => {

    try {

      setLoadingId(id)

      await updateDonationStatus(
        id,
        "VERIFIED"
      )

      const donation = donations.find(
        (d) => d.id === id
      )

      await sendVerificationEmail(
        donation.donorName,
        donation.email,
        donation.amount
      )

      toast.success(
        "Donation verified"
      )

    } catch (error) {

      toast.error(
        "Verification failed"
      )

    } finally {

      setLoadingId(null)
    }
  }



  const handleReject = async (id) => {

    try {

      setLoadingId(id)

      await updateDonationStatus(
        id,
        "REJECTED"
      )

      toast.success(
        "Donation rejected"
      )

    } catch (error) {

      toast.error(
        "Rejection failed"
      )

    } finally {

      setLoadingId(null)
    }
  }



  return (

    <div className="
      mt-10

      bg-zinc-900/70
      backdrop-blur-md

      border
      border-yellow-500/10

      rounded-3xl

      p-6
    ">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        md:flex-row

        md:items-center
        md:justify-between

        gap-4
        mb-6
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          Pending Donations
        </h2>



        {/* SEARCH */}

        <input
          type="text"

          placeholder="
            Search by donor,
            email, amount or UTR
          "

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
            w-full
            md:w-96

            bg-black/40

            border
            border-zinc-700

            focus:border-yellow-400

            rounded-2xl

            px-4
            py-3

            outline-none

            transition-all
          "
        />

      </div>



      {/* EMPTY STATE */}

      {
        filteredDonations.length === 0 && (

          <div className="
            text-center
            py-20
            text-zinc-500
          ">

            No pending donations found

          </div>
        )
      }



      {/* TABLE */}

      <div className="
        overflow-x-auto
      ">

        <table className="
          w-full
          min-w-[900px]
        ">

          <thead>

            <tr className="
              border-b
              border-zinc-800
              text-zinc-400
            ">

              <th className="
                text-left
                py-4
              ">
                Donor
              </th>

              <th className="
                text-left
              ">
                Email
              </th>

              <th className="
                text-left
              ">
                Amount
              </th>

              <th className="
                text-left
              ">
                UTR
              </th>

              <th className="
                text-left
              ">
                Status
              </th>

              <th className="
                text-left
              ">
                Actions
              </th>

            </tr>

          </thead>



          <tbody>

            {
              filteredDonations

                // .filter(
                //   (d) =>
                //     d.paymentStatus === "PENDING"
                // )
                .filter(
                  (d) =>
                    d.paymentStatus?.toUpperCase() === "PENDING"
                )

                .map(
                (
                  donation,
                  index
                ) => (

                <motion.tr

                  key={donation.id}

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay:
                      index * 0.03,
                  }}

                  className="
                    border-b
                    border-zinc-800/50

                    hover:bg-zinc-800/30

                    transition-all
                  "
                >

                  <td className="
                    py-5
                    font-medium
                  ">
                    {
                      donation.donorName
                    }
                  </td>



                  <td className="
                    text-zinc-400
                  ">
                    {donation.email}
                  </td>



                  <td className={`
                    font-bold

                    ${
                      donation.amount >
                      50000

                        ? "text-red-400"

                        : "text-green-400"
                    }
                  `}>
                    ₹{donation.amount}
                  </td>



                  <td className={`
                    ${
                      donation.utrId
                        ?.length < 12

                        ? "text-red-400"

                        : ""
                    }
                  `}>
                    {donation.utrId}
                  </td>



                  <td>

                    <span className={`

                      px-3
                      py-1

                      rounded-full

                      text-xs
                      capitalize

                      ${
                        donation.paymentStatus
                        === "verified"

                          ? `
                            bg-green-500/20
                            text-green-400
                          `

                          : donation.paymentStatus
                          === "rejected"

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

                  </td>



                  <td>

                    <div className="
                      flex
                      gap-3
                    ">

                      <button

                        onClick={() =>
                          handleVerify(
                            donation.id
                          )
                        }

                        disabled={
                          loadingId ===
                          donation.id
                        }

                        className="
                          bg-green-500/20
                          text-green-400

                          hover:bg-green-500/30

                          px-4
                          py-2

                          rounded-xl

                          text-sm

                          transition-all

                          disabled:opacity-50
                        "
                      >

                        {
                          loadingId ===
                          donation.id

                            ? "Verifying..."

                            : "Verify"
                        }

                      </button>



                      <button

                        onClick={() =>
                          handleReject(
                            donation.id
                          )
                        }

                        disabled={
                          loadingId ===
                          donation.id
                        }

                        className="
                          bg-red-500/20
                          text-red-400

                          hover:bg-red-500/30

                          px-4
                          py-2

                          rounded-xl

                          text-sm

                          transition-all

                          disabled:opacity-50
                        "
                      >

                        {
                          loadingId ===
                          donation.id

                            ? "Rejecting..."

                            : "Reject"
                        }

                      </button>

                    </div>

                  </td>

                </motion.tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}