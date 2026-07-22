import { useEffect, useMemo, useState } from "react"

import ContentModal from "./ContentModal"

import {
  listenToRegistrations,
  deleteRegistration,
} from "@/services/eventRegistrationService"

import {
  listenToEvents,
} from "@/services/eventService"

import {
  exportRegistrationsToExcel,
}
from "@/services/excelService"

export default function EventRegistrationsModal({

  isOpen,
  onClose,

}) {

  const [
    events,
    setEvents,
  ] = useState([])

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState(null)

  const [
    registrations,
    setRegistrations,
  ] = useState([])

  const [
    search,
    setSearch,
  ] = useState("")

  const [

    selectedRegistration,

    setSelectedRegistration,

  ] = useState(null)

  const [

    showDetails,

    setShowDetails,

  ] = useState(false)



  useEffect(() => {

    const unsubscribe =
      listenToEvents(
        setEvents
      )

    return () =>
      unsubscribe()

  }, [])



  useEffect(() => {

    if (!selectedEvent) {

      setRegistrations([])

      return

    }

    const unsubscribe =
      listenToRegistrations(

        selectedEvent.id,

        setRegistrations

      )

    return () =>
      unsubscribe()

  }, [selectedEvent])



  const filteredRegistrations =
    useMemo(() => {

      if (!search)
        return registrations

      const value =
        search.toLowerCase()

      return registrations.filter(

        (registration) => {

          const teamMatch =
            registration.teamName
              ?.toLowerCase()
              .includes(value)

          const participantMatch =
            registration.participants?.some(

              (participant) =>

                participant.name
                  ?.toLowerCase()
                  .includes(value)

                ||

                participant.email
                  ?.toLowerCase()
                  .includes(value)

                ||

                participant.whatsapp
                  ?.toLowerCase()
                  .includes(value)

            )

          return (

            teamMatch ||

            participantMatch

          )

        }

      )

    }, [

      registrations,

      search,

    ])



  const handleDelete =
    async (registrationId) => {

      if (

        !window.confirm(

          "Delete this registration?"

        )

      )

        return

      await deleteRegistration(

        selectedEvent.id,

        registrationId

      )

    }



  return (

    <ContentModal

      isOpen={isOpen}

      onClose={onClose}

      title="Event Registrations Data"

    >

      <div
        className="
          grid
          lg:grid-cols-3
          gap-6
        "
      >

        {/* ===========================
            LEFT PANEL
        =========================== */}

        <div
          className="
            space-y-4
          "
        >

          {/* Dashboard */}

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-4
            "
          >

            <h3
              className="
                text-yellow-400
                font-bold
              "
            >
              Total Events
            </h3>

            <p
              className="
                text-3xl
                font-bold
              "
            >
              {events.length}
            </p>

          </div>

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-4
            "
          >

            <h3
              className="
                text-yellow-400
                font-bold
              "
            >
              Selected Event
            </h3>

            <p
              className="
                mt-2
                font-semibold
              "
            >

              {

                selectedEvent

                  ? selectedEvent.title

                  : "None"

              }

            </p>

          </div>

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-4
            "
          >

            <h3
              className="
                text-yellow-400
                font-bold
              "
            >
              Registrations
            </h3>

            <p
              className="
                text-3xl
                font-bold
              "
            >

              {registrations.length}

            </p>

          </div>

          {/* Event List */}

          <div
            className="
              bg-zinc-950
              rounded-2xl
              p-3
              space-y-3
              max-h-[520px]
              overflow-y-auto
            "
          >

            {

              events.map(

                (event) => (

                  <button

                    key={event.id}

                    onClick={() =>

                      setSelectedEvent(
                        event
                      )

                    }

                    className={`

                      w-full
                      text-left
                      rounded-2xl
                      p-4
                      transition-all

                      ${

                        selectedEvent?.id === event.id

                          ?

                          "bg-yellow-500 text-black"

                          :

                          "bg-zinc-900 text-white hover:bg-zinc-800"

                      }

                    `}

                  >

                    <h4
                      className="
                        font-bold
                      "
                    >
                      {event.title}
                    </h4>

                    <p
                      className="
                        text-sm
                        opacity-70
                      "
                    >
                      {event.category}
                    </p>

                    <p
                      className="
                        text-xs
                        opacity-60
                      "
                    >
                      {event.date}
                    </p>

                    <p
                      className="
                        text-xs
                        opacity-60
                      "
                    >
                      {event.status}
                    </p>

                  </button>

                )

              )

            }

          </div>

        </div>



        {/* ===========================
            RIGHT PANEL
        =========================== */}

        <div
          className="
            lg:col-span-2
            space-y-4
          "
        >

          {/* Search */}

          <div
            className="
              flex
              gap-4
            "
          >

            <input

              type="text"

              placeholder="Search Team / Participant"

              value={search}

              onChange={(e)=>

                setSearch(
                  e.target.value
                )

              }

              className="
                flex-1
                p-3
                rounded-xl
                bg-zinc-900
              "

            />

            {

              selectedEvent && (

                <button

                  onClick={()=>

                    exportRegistrationsToExcel(

                      selectedEvent.title,

                      filteredRegistrations

                    )

                  }

                  className="
                    px-6
                    rounded-xl
                    bg-green-600
                    hover:bg-green-700
                    transition
                    font-semibold
                  "

                >

                  Export Excel

                </button>

              )

            }

          </div>



          {

            !selectedEvent && (

              <div

                className="
                  h-[650px]
                  rounded-2xl
                  bg-zinc-900
                  flex
                  items-center
                  justify-center
                  text-zinc-400
                  text-lg
                "

              >

                Select an event to view registrations.

              </div>

            )

          }



          {

            selectedEvent && (

              <div

                className="
                  max-h-[650px]
                  overflow-y-auto
                  space-y-4
                "

              >

                {

                  filteredRegistrations.length === 0 && (

                    <div

                      className="
                        bg-zinc-900
                        rounded-2xl
                        p-10
                        text-center
                        text-zinc-400
                      "

                    >

                      No registrations found.

                    </div>

                  )

                }



                {

                  filteredRegistrations.map(

                    (registration) => (

                      <div

                        key={registration.id}

                        className="
                          bg-zinc-900
                          rounded-2xl
                          p-5
                          border
                          border-zinc-800
                        "

                      >

                        <div
                          className="
                            flex
                            justify-between
                            items-start
                          "
                        >

                          <div>

                            <h3
                              className="
                                text-xl
                                font-bold
                                text-yellow-400
                              "
                            >
                              {registration.teamName}
                            </h3>

                            <p className="text-zinc-400">

                              Team Size :
                              {" "}
                              {registration.teamSize}

                            </p>

                            <p className="text-zinc-500 text-sm">

                              Registered :

                              {" "}

                              {registration.registrationDate}

                            </p>

                          </div>

                        </div>

                        <div
                          className="
                            flex
                            gap-3
                            mt-5
                          "
                        >

                          <button

                            onClick={() => {

                              setSelectedRegistration(

                                registration

                              )

                              setShowDetails(true)

                            }}

                            className="
                              px-5
                              py-2
                              rounded-xl
                              bg-blue-600
                              hover:bg-blue-700
                              transition
                            "

                          >

                            View Details

                          </button>

                          <button

                            onClick={()=>

                              handleDelete(

                                registration.id

                              )

                            }

                            className="
                              px-5
                              py-2
                              rounded-xl
                              bg-red-600
                              hover:bg-red-700
                              transition
                            "

                          >

                            Delete

                          </button>

                        </div>

                      </div>

                    )

                  )

                }

              </div>

            )

          }

        </div>

      </div>

      {
        showDetails &&

        selectedRegistration && (

          <div
            className="
              fixed
              inset-0
              z-[200]
              bg-black/70
              flex
              items-center
              justify-center
            "
          >

            <div
              className="
                bg-zinc-950
                w-full
                max-w-5xl
                max-h-[90vh]
                overflow-y-auto
                rounded-3xl
                p-8
                space-y-8
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-yellow-400
                  "
                >
                  Registration Details
                </h2>

                <button

                  onClick={() =>
                    setShowDetails(false)
                  }

                  className="
                    text-red-400
                    font-bold
                  "

                >
                  ✕
                </button>

              </div>

              {/* TEAM DETAILS */}

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-6
                "
              >

                <div>

                  <h3 className="font-bold text-yellow-400 mb-2">

                    Team Information

                  </h3>

                  <p>

                    <strong>Team Name:</strong>

                    {" "}

                    {selectedRegistration.teamName}

                  </p>

                  <p>

                    <strong>Team Size:</strong>

                    {" "}

                    {selectedRegistration.teamSize}

                  </p>

                  <p>

                    <strong>Registration Date:</strong>

                    {" "}

                    {selectedRegistration.registrationDate}

                  </p>

                </div>

                {

                  selectedRegistration.paymentProofImage && (

                    <div>

                      <h3
                        className="
                          font-bold
                          text-yellow-400
                          mb-2
                        "
                      >

                        Payment Proof

                      </h3>

                      <a

                        href={
                          selectedRegistration.paymentProofImage
                        }

                        target="_blank"

                        rel="noopener noreferrer"

                      >

                        <img

                          src={
                            selectedRegistration.paymentProofImage
                          }

                          alt="Payment Proof"

                          className="
                            rounded-xl
                            max-h-72
                            object-contain
                            border
                            border-zinc-700
                          "

                        />

                      </a>

                    </div>

                  )

                }

              </div>

              {/* PARTICIPANTS */}

              <div>

                <h3
                  className="
                    text-xl
                    font-bold
                    text-yellow-400
                    mb-4
                  "
                >

                  Participants

                </h3>

                <div
                  className="
                    space-y-4
                  "
                >

                  {

                    selectedRegistration.participants?.map(

                      (participant, index) => (

                        <div

                          key={index}

                          className="
                            bg-zinc-900
                            rounded-2xl
                            p-5
                          "

                        >

                          <h4
                            className="
                              font-bold
                              text-lg
                              mb-3
                            "
                          >

                            Participant {index + 1}

                          </h4>

                          <p>

                            <strong>Name:</strong>

                            {" "}

                            {participant.name || "-"}

                          </p>

                          <p>

                            <strong>Email:</strong>

                            {" "}

                            {participant.email || "-"}

                          </p>

                          <p>

                            <strong>WhatsApp:</strong>

                            {" "}

                            {participant.whatsapp || "-"}

                          </p>

                          <p>

                            <strong>Branch:</strong>

                            {" "}

                            {participant.branch || "-"}

                          </p>

                        </div>

                      )

                    )

                  }

                </div>

              </div>

              <button

                onClick={() =>
                  setShowDetails(false)
                }

                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-yellow-500
                  text-black
                  font-bold
                "

              >

                Close

              </button>

            </div>

          </div>

      )
      }

    </ContentModal>

  )

}