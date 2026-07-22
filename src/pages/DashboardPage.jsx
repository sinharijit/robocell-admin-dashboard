import MessageModal
  from "@/components/messages/MessageModal"

import { useEffect, useState } from "react"

import DashboardLayout from "@/layouts/DashboardLayout"

import MetricCard from "@/components/MetricCard"
import RecentDonations from "@/components/RecentDonations"
import DonationsTable from "@/components/DonationsTable"

import {
  listenToDonations,
} from "@/services/donationService"

import {
  listenToMessages,
} from "@/services/messageService"



export default function DashboardPage() {

  // MESSAGE STATES

  const [messages, setMessages] =
    useState([])

  const [selectedMessage,
    setSelectedMessage] =
    useState(null)



  // DONATION STATES

  const [donations, setDonations] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")



  // DONATION LISTENER

  useEffect(() => {

    const unsubscribe =
      listenToDonations((data) => {

        setDonations(data)

        setLoading(false)

      })

    return () => unsubscribe()

  }, [])



  // MESSAGE LISTENER

  useEffect(() => {

    const unsubscribe =
      listenToMessages(setMessages)

    return () => unsubscribe()

  }, [])



  // METRICS

  const totalFunds = donations

    .filter(
      (d) =>
        d.paymentStatus?.toUpperCase()
        === "VERIFIED"
    )

    .reduce(
      (sum, donation) =>
        sum + donation.amount,
      0
    )



  const verifiedCount =
    donations.filter(

      (d) =>

        d.paymentStatus?.toUpperCase()
        === "VERIFIED"

    ).length



  const pendingCount =
    donations.filter(

      (d) =>

        d.paymentStatus?.toUpperCase()
        === "PENDING"

    ).length



  const rejectedCount =
    donations.filter(

      (d) =>

        d.paymentStatus?.toUpperCase()
        === "REJECTED"

    ).length



  // LOADING UI

  if (loading) {

    return (

      <DashboardLayout>

        <div className="
          animate-pulse
          space-y-6
        ">

          <div className="
            h-12
            w-72
            bg-zinc-800
            rounded-xl
          " />

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
          ">

            {
              [1,2,3,4].map((item) => (

                <div
                  key={item}

                  className="
                    h-36
                    bg-zinc-800
                    rounded-3xl
                  "
                />
              ))
            }

          </div>

        </div>

      </DashboardLayout>
    )
  }



  // MAIN UI

  return (

    <DashboardLayout>

      <div>

        {/* MAIN DASHBOARD */}

        <div className="flex-1">

          <div className="mb-10">

            <h1 className="
              text-5xl
              font-black
              mb-3
            ">
              RoboCell

              <span className="
                text-yellow-400
              ">
                {" "}Dashboard
              </span>

            </h1>

            <p className="
              text-zinc-400
              text-lg
            ">
              Monitor and manage
              donations in realtime
            </p>

          </div>



          {/* METRIC CARDS */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
          ">

            <MetricCard
              title="Total Funds"
              value={`₹${totalFunds}`}
            />

            <MetricCard
              title="Verified Donations"
              value={verifiedCount}
            />

            <MetricCard
              title="Pending Donations"
              value={pendingCount}
            />

            <MetricCard
              title="Rejected Donations"
              value={rejectedCount}
            />

          </div>



          {/* DONATIONS */}

          <RecentDonations
            donations={donations}
          />

          <DonationsTable

            donations={donations}

            search={search}

            setSearch={setSearch}
          />

        </div>

      </div>

      <MessageModal

        message={selectedMessage}

        onClose={() =>
          setSelectedMessage(null)
        }
      />

    </DashboardLayout>
  )
}