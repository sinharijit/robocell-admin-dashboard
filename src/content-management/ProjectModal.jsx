import { useEffect, useState } from "react"

import {
  createProject,
  listenToProjects,
  deleteProject,
  updateProject,
} from "@/services/projectService"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

export default function ProjectModal({
  isOpen,
  onClose,
}) {

  const [name, setName] =
    useState("")

  const [description,
    setDescription] =
    useState("")

  const [status,
    setStatus] =
    useState("Completed")

  const [statusColor,
    setStatusColor] =
    useState("Green")

  const [videoUrl,
    setVideoUrl] =
    useState("")

  const [order,
    setOrder] =
    useState(1)

  const [projects,
    setProjects] =
    useState([])

  const [editingId,
    setEditingId] =
    useState(null)

  useEffect(() => {

    const unsubscribe =
      listenToProjects(
        setProjects
      )

    return () =>
      unsubscribe()

  }, [])

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        const projectData = {

          name,

          description,

          status,

          statusColor,

          videoUrl,

          order: Number(order),

        }

        if (editingId) {

          await updateProject(
            editingId,
            projectData
          )

        } else {

          await createProject(
            projectData
          )

        }

        setName("")
        setDescription("")
        // setStatus("Completed")
        // setStatusColor("Green")
        // setVideoUrl("")

        // setEditingId(null)
        setStatus("Completed")
        setStatusColor("Green")
        setVideoUrl("")
        setOrder(1)

        setEditingId(null)

      } catch (error) {

        console.error(
          "Project Error:",
          error
        )

      }
    }

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete project?"
        )
      )
        return

      await deleteProject(id)
    }

  const handleEdit =
    (project) => {

      setEditingId(
        project.id
      )

      setName(
        project.name
      )

      setDescription(
        project.description
      )

      setStatus(
        project.status
      )

      setStatusColor(
        project.statusColor
      )

      // setVideoUrl(
      //   project.videoUrl || ""
      // )

      setVideoUrl(
        project.videoUrl || ""
      )

      setOrder(
        project.order || 1
      )
    }

  if (!isOpen) return null

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
          z-[100]
          bg-black/70
          backdrop-blur-md
          flex
          items-center
          justify-center
          p-6
        "
      >

        <motion.div

          initial={{
            scale: 0.9,
            opacity: 0,
          }}

          animate={{
            scale: 1,
            opacity: 1,
          }}

          exit={{
            scale: 0.9,
            opacity: 0,
          }}

          className="
            w-full
            max-w-5xl
            bg-zinc-950
            border
            border-yellow-500/20
            rounded-3xl
            p-6
            grid
            lg:grid-cols-2
            gap-6
          "
        >

          {/* FORM */}

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-yellow-400
                mb-6
              "
            >
              {
                editingId
                  ? "Edit Project"
                  : "Create Project"
              }
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
                required
              />

              <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
                rows={5}
                required
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              >
                <option>
                  Completed
                </option>

                <option>
                  Ongoing
                </option>

                <option>
                  Research
                </option>
              </select>

              <select
                value={statusColor}
                onChange={(e) =>
                  setStatusColor(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              >
                <option>
                  Green
                </option>

                <option>
                  Blue
                </option>

                <option>
                  Yellow
                </option>

                <option>
                  Red
                </option>
              </select>

              <input
                type="number"
                placeholder="Display Order"
                value={order}
                onChange={(e) =>
                  setOrder(e.target.value)
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
                min="1"
              />

              <input
                type="text"
                placeholder="YouTube Embed Link"
                value={videoUrl}
                onChange={(e) =>
                  setVideoUrl(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <p
                className="
                  text-xs
                  text-yellow-400
                  leading-relaxed
                "
              >
                Use ONLY YouTube Embed Links.
                <br />
                Example:
                <br />
                https://www.youtube.com/embed/LXb3EKWslnQ
                <br /><br />
                Normal YouTube links
                will NOT work.
              </p>

              <button
                type="submit"
                className="
                  w-full
                  bg-yellow-500
                  text-black
                  font-bold
                  py-3
                  rounded-xl
                "
              >
                {
                  editingId
                    ? "Update Project"
                    : "Publish Project"
                }
              </button>

              {
                editingId && (

                  <button
                    type="button"
                    onClick={() => {

                      setEditingId(null)

                      setName("")
                      setDescription("")
                      // setStatus("Completed")
                      // setStatusColor("Green")
                      // setVideoUrl("")
                      setStatus("Completed")
                      setStatusColor("Green")
                      setVideoUrl("")
                      setOrder(1)

                    }}
                    className="
                      w-full
                      mt-2
                      bg-zinc-800
                      py-3
                      rounded-xl
                    "
                  >
                    Cancel Editing
                  </button>

                )
              }

            </form>

          </div>

          {/* PROJECT LIST */}

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-yellow-400
                mb-6
              "
            >
              Existing Projects
            </h2>

            <div
              className="
                space-y-3
                max-h-[600px]
                overflow-y-auto
              "
            >

              {
                projects.map(
                  (project) => (

                  <div

                    key={
                      project.id
                    }

                    className="
                      bg-zinc-900
                      p-4
                      rounded-2xl
                    "
                  >

                    <h3
                      className="
                        font-bold
                      "
                    >
                      {project.name}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-zinc-400
                      "
                    >
                      {project.status}
                    </p>

                    <p
                      className="
                        text-xs
                        text-yellow-400
                        mt-1
                      "
                    >
                      Order: {project.order}
                    </p>

                    <p
                      className="
                        text-xs
                        text-yellow-400
                        mt-1
                      "
                    >
                      {project.statusColor}
                    </p>

                    {
                      project.videoUrl && (

                        <p
                          className="
                            text-xs
                            text-blue-400
                            mt-2
                          "
                        >
                          Embedded Video Added
                        </p>

                      )
                    }

                    <div className="
                      flex
                      gap-4
                      mt-3
                    ">

                      <button
                        onClick={() =>
                          handleEdit(
                            project
                          )
                        }
                        className="
                          text-blue-400
                          text-sm
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            project.id
                          )
                        }
                        className="
                          text-red-400
                          text-sm
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))
              }

            </div>

          </div>

          <button

            onClick={onClose}

            className="
              absolute
              top-6
              right-6
              text-zinc-400
            "
          >
            ✕
          </button>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  )
}