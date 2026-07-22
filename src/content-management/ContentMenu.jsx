import EventRegistrationsModal
  from "./EventRegistrationsModal"

import AlumniModal
  from "./AlumniModal"

import HallOfFameModal
  from "./HallOfFameModal"

import { useState } from "react"

import { motion, AnimatePresence }
  from "framer-motion"

import ProjectModal
  from "./ProjectModal"

import EventModal
  from "./EventModal"

import AnnouncementModal
  from "./AnnouncementModal"


import TeamModal
  from "./TeamModal"

export default function ContentMenu({
  isOpen,
}) {

  const [activeModal,
    setActiveModal] =
    useState(null)

  return (

    <>

      <AnimatePresence>

        {isOpen && (

          <motion.div

            initial={{
              y: -100,
              opacity: 0,
            }}

            animate={{
              y: 0,
              opacity: 1,
            }}

            exit={{
              y: -100,
              opacity: 0,
            }}

            transition={{
              duration: 0.4,
            }}

            className="
              fixed
              top-20
              right-5

              z-40

              w-80

              bg-zinc-950/95
              backdrop-blur-lg

              border
              border-yellow-500/20

              rounded-3xl

              p-4
            "
          >

            <div className="
              flex
              flex-col
              gap-3
            ">

              <button
                onClick={() =>
                  setActiveModal("projects")
                }
                className="
                  p-4
                  rounded-2xl

                  bg-zinc-900

                  text-yellow-400

                  hover:bg-yellow-500/10

                  transition-all
                "
              >
                Projects
              </button>

              <button
                onClick={() =>
                  setActiveModal("events")
                }
                className="
                  p-4
                  rounded-2xl

                  bg-zinc-900

                  text-yellow-400

                  hover:bg-yellow-500/10

                  transition-all
                "
              >
                Events
              </button>

              {/* <button
                onClick={() =>
                  setActiveModal("announcements")
                }
                className="
                  p-4
                  rounded-2xl

                  bg-zinc-900

                  text-yellow-400

                  hover:bg-yellow-500/10

                  transition-all
                "
              >
                Announcements
              </button> */}

              <button
                onClick={() =>
                  setActiveModal("team")
                }
                className="
                  p-4
                  rounded-2xl

                  bg-zinc-900

                  text-yellow-400

                  hover:bg-yellow-500/10

                  transition-all
                "
              >
                Team Members
              </button>

              <button
                onClick={() =>
                  setActiveModal("halloffame")
                }
                className="
                  p-4
                  rounded-2xl
                  bg-zinc-900
                  text-yellow-400
                  hover:bg-yellow-500/10
                  transition-all
                "
              >
                Achievements
              </button>

              <button
                onClick={() =>
                  setActiveModal("alumni")
                }
                className="
                  p-4
                  rounded-2xl

                  bg-zinc-900

                  text-yellow-400

                  hover:bg-yellow-500/10

                  transition-all
                "
              >
                Alumni
              </button>

              <button
                onClick={() =>
                  setActiveModal(
                    "eventregistrations"
                  )
                }
                className="
                  p-4
                  rounded-2xl

                  bg-zinc-900

                  text-yellow-400

                  hover:bg-yellow-500/10

                  transition-all
                "
              >
                Event Registrations
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      <ProjectModal
        isOpen={
          activeModal === "projects"
        }
        onClose={() =>
          setActiveModal(null)
        }
      />

      <EventModal
        isOpen={
          activeModal === "events"
        }
        onClose={() =>
          setActiveModal(null)
        }
      />

      <AnnouncementModal
        isOpen={
          activeModal === "announcements"
        }
        onClose={() =>
          setActiveModal(null)
        }
      />

      

      <TeamModal
        isOpen={
          activeModal === "team"
        }
        onClose={() =>
          setActiveModal(null)
        }
      />

      <HallOfFameModal
        isOpen={
          activeModal ===
          "halloffame"
        }
        onClose={() =>
          setActiveModal(null)
        }
      />

      <AlumniModal
        isOpen={
          activeModal === "alumni"
        }
        onClose={() =>
          setActiveModal(null)
        }
      />

      <EventRegistrationsModal
        isOpen={
          activeModal ===
          "eventregistrations"
        }
        onClose={() =>
          setActiveModal(null)
        }
      />

    </>

  )
}