import { useEffect, useState } from "react"

import ContentModal from "./ContentModal"

import {
  createHallOfFame,
  listenToHallOfFame,
  deleteHallOfFame,
  updateHallOfFame,
} from "@/services/hallOfFameService"

import ImageLinksInput from "@/components/ImageLinksInput"

export default function HallOfFameModal({

  isOpen,
  onClose,

}) {

  const [title, setTitle] = useState("")

  const [subtitle, setSubtitle] = useState("")

  const [description, setDescription] = useState("")

  const [year, setYear] = useState("")

  const [order, setOrder] = useState(1)

  const [image, setImage] = useState("")

  const [uploading, setUploading] = useState(false)

  const [entries, setEntries] = useState([])

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {

    const unsubscribe =
      listenToHallOfFame(
        setEntries
      )

    return () =>
      unsubscribe()

  }, [])

  const resetForm = () => {

    setTitle("")
    setSubtitle("")
    setDescription("")
    setYear("")
    setOrder(1)
    setImage("")
    setEditingId(null)

  }

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      const payload = {

        title,

        subtitle,

        description,

        year,

        image,

        order: Number(order),

      }

      if (editingId) {

        await updateHallOfFame(
          editingId,
          payload
        )

      } else {

        await createHallOfFame(
          payload
        )
      }

      resetForm()
    }

  const handleEditClick =
    (entry) => {

      setEditingId(entry.id)

      setTitle(entry.title || "")

      setSubtitle(entry.subtitle || "")

      setDescription(entry.description || "")

      setYear(entry.year || "")

      setOrder(entry.order || 1)

      setImage(entry.image || "")

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

    }

  return (

    <ContentModal

      isOpen={isOpen}

      onClose={onClose}

      title="Achievements"

    >

      <div className="grid lg:grid-cols-2 gap-8">

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
            required
          />

          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) =>
              setSubtitle(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
            required
          />

          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) =>
              setYear(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
            required
          />

          <input
            type="number"
            placeholder="Display Order"
            value={order}
            onChange={(e) =>
              setOrder(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
          />

          <ImageLinksInput

            label="Achievements Image"

            value={image}

            onChange={setImage}

            multiple={false}

          />

          {

            image && (

            <img

            src={image}

            alt="Preview"

            className="
            w-full
            h-48
            object-cover
            rounded-xl
            "

            />

            )

          }

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
            rows={4}
            required
          />

          <button
            type="submit"
            disabled={uploading}
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
              uploading
                ? "Uploading..."
                : editingId
                  ? "Update Entry"
                  : "Publish Achievement"
            }
          </button>

        </form>

        {/* LIST */}

        <div>

          <h3 className="text-xl font-bold text-yellow-400 mb-4">
            Existing Entries
          </h3>

          <div
            className="
              bg-zinc-900
              p-4
              rounded-xl
              mb-4
            "
          >

            <p
              className="
                text-sm
                text-zinc-400
              "
            >
              Total Achievements Entries
            </p>

            <h2
              className="
                text-3xl
                font-bold
                text-yellow-400
              "
            >
              {entries.length}
            </h2>

          </div>

          <div className="space-y-3">

            {
              entries.map(
                (entry) => (

                <div
                  key={entry.id}
                  className="bg-zinc-900 p-4 rounded-xl"
                >

                  <h4 className="font-bold">
                    {entry.title}
                  </h4>

                  <p className="text-zinc-400 text-sm">
                    {entry.subtitle}
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Year: {entry.year}
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Order: {entry.order}
                  </p>

                  <button

                    onClick={() =>
                      handleEditClick(entry)
                    }

                    className="
                      mt-3
                      mr-4
                      text-blue-400
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteHallOfFame(
                        entry.id
                      )
                    }
                    className="
                      mt-3
                      text-red-400
                    "
                  >
                    Delete
                  </button>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </ContentModal>

  )
}