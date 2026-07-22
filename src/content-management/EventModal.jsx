import { useEffect, useState }
  from "react"

import ContentModal
  from "./ContentModal"

import {
  createEvent,
  listenToEvents,
  deleteEvent,
  updateEvent,
}
from "@/services/eventService"


import ImageLinksInput
from "@/components/ImageLinksInput"

export default function EventModal({

  isOpen,
  onClose,

}) {

  const [events,
    setEvents] =
    useState([])

  const [editingEvent,
    setEditingEvent] =
    useState(null)

  const [editForm,
    setEditForm] =
    useState({})


  const [formData,
    setFormData] =
    useState({

      title: "",

      category: "Workshop",

      date: "",

      venue: "",

      shortDescription: "",

      longDescription: "",

      status:
        "Registration Open",

      registrationOpen: true,

      paid: false,

      paymentAmount: 0,

      teamSize: 1,

      order: 1,

      image: "",

      paymentImage: "",

    })



  useEffect(() => {

    const unsubscribe =
      listenToEvents(
        setEvents
      )

    return () =>
      unsubscribe()

  }, [])



  const handleChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked,
      } = e.target

      setFormData(
        (prev) => ({

          ...prev,

          [name]:
            type ===
            "checkbox"
              ? checked
              : value,

        })
      )
    }



  const handleSubmit =
    async (e) => {

      e.preventDefault()

      await createEvent({

        ...formData,

        order:
          Number(
            formData.order
          ),

        paymentAmount:
          Number(
            formData.paymentAmount
          ),

        teamSize:
          Number(
            formData.teamSize
          ),

      })

      alert(
        "Event Published"
      )
    }

  const openEditModal =
    (event) => {

      setEditingEvent(event)

      setEditForm(event)

    }


  const handleEditChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked,
      } = e.target

      setEditForm(prev => ({

        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,

      }))

    }

  const handleUpdate =
    async () => {

      await updateEvent(

        editingEvent.id,

        {

          ...editForm,

          order:
            Number(editForm.order),

          paymentAmount:
            Number(editForm.paymentAmount),

          teamSize:
            Number(editForm.teamSize),

        }

      )

      setEditingEvent(null)

    }

  
  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Event?"
        )
      )
        return

      await deleteEvent(id)
    }



  return (

    <ContentModal

      isOpen={isOpen}

      onClose={onClose}

      title="Events"

    >

      <div
        className="
          grid
          lg:grid-cols-2
          gap-8
        "
      >

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
            space-y-4
          "
        >

          <input
            name="title"
            placeholder="Event Title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          />

          <select
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          >
            <option>
              Workshop
            </option>

            <option>
              Hackathon
            </option>

            <option>
              Competition
            </option>

            <option>
              Seminar
            </option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          >

            <option>
              Registration Open
            </option>

            <option>
              Coming Soon
            </option>

            <option>
              Closed
            </option>

          </select>

          <input
            name="date"
            placeholder="Date"
            value={
              formData.date
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          />

          <input
            name="venue"
            placeholder="Venue"
            value={
              formData.venue
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          />

          <textarea
            rows="3"
            name="shortDescription"
            placeholder="Short Description"
            value={
              formData.shortDescription
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          />

          <textarea
            rows="5"
            name="longDescription"
            placeholder="Long Description (HTML Allowed)"
            value={
              formData.longDescription
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          />

          <input
            type="number"
            name="teamSize"
            placeholder="Team Size"
            value={
              formData.teamSize
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          />

          <input
            type="number"
            name="order"
            placeholder="Display Order"
            value={
              formData.order
            }
            onChange={
              handleChange
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-zinc-900
            "
          />

          {/* <label
            className="
              block
              text-sm
            "
          >
            Event Banner
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(
                e.target.files[0],
                "image"
              )
            }
          /> */}

          <ImageLinksInput

            label="Event Banner Link"

            value={formData.image}

            onChange={(value) =>

              setFormData((prev) => ({

                ...prev,

                image: value,

              }))

            }

            multiple={false}

          />

          {

            formData.image && (

              <img

                src={formData.image}

                alt="Banner Preview"

                className="
                  w-full
                  h-40
                  object-cover
                  rounded-xl
                "

              />

            )

          }

          {/* <label
            className="
              block
              text-sm
            "
          >
            Payment QR Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(
                e.target.files[0],
                "paymentImage"
              )
            }
          /> */}

          <ImageLinksInput

            label="Payment QR Image Link"

            value={formData.paymentImage}

            onChange={(value) =>

              setFormData((prev) => ({

                ...prev,

                paymentImage: value,

              }))

            }

            multiple={false}

          />

          {

            formData.paymentImage && (

              <img

                src={formData.paymentImage}

                alt="Payment QR"

                className="
                  w-52
                  rounded-xl
                "

              />

            )

          }

          <label
            className="
              flex
              gap-2
            "
          >
            <input
              type="checkbox"
              name="registrationOpen"
              checked={
                formData.registrationOpen
              }
              onChange={
                handleChange
              }
            />
            Registration Open
          </label>

          <label
            className="
              flex
              gap-2
            "
          >
            <input
              type="checkbox"
              name="paid"
              checked={
                formData.paid
              }
              onChange={
                handleChange
              }
            />
            Paid Event
          </label>

          {
            formData.paid && (

              <input
                type="number"
                name="paymentAmount"
                placeholder="Amount"
                value={
                  formData.paymentAmount
                }
                onChange={
                  handleChange
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

            )
          }

          <button
            type="submit"
            // disabled={
            //   uploading
            // }
            className="
              w-full
              bg-yellow-500
              text-black
              py-3
              rounded-xl
              font-bold
            "
          >
            {/* {
              uploading
                ? "Uploading..."
                : "Publish Event"
            } */}

          Publish Event 
          </button>

        </form>
        
        {/* EVENT STATS */}

        <div className="
          lg:col-span-2
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        ">

          <div className="
            bg-zinc-900
            p-4
            rounded-xl
            text-center
          ">
            <p className="text-zinc-400 text-sm">
              Total Events
            </p>

            <p className="
              text-2xl
              font-bold
              text-yellow-400
            ">
              {events.length}
            </p>
          </div>

          <div className="
            bg-zinc-900
            p-4
            rounded-xl
            text-center
          ">
            <p className="text-zinc-400 text-sm">
              Registration Open
            </p>

            <p className="
              text-2xl
              font-bold
              text-green-400
            ">
              {
                events.filter(
                  event => event.registrationOpen
                ).length
              }
            </p>
          </div>

          <div className="
            bg-zinc-900
            p-4
            rounded-xl
            text-center
          ">
            <p className="text-zinc-400 text-sm">
              Paid Events
            </p>

            <p className="
              text-2xl
              font-bold
              text-red-400
            ">
              {
                events.filter(
                  event => event.paid
                ).length
              }
            </p>
          </div>

          <div className="
            bg-zinc-900
            p-4
            rounded-xl
            text-center
          ">
            <p className="text-zinc-400 text-sm">
              Free Events
            </p>

            <p className="
              text-2xl
              font-bold
              text-blue-400
            ">
              {
                events.filter(
                  event => !event.paid
                ).length
              }
            </p>
          </div>

        </div>


        {/* EVENT LIST */}

        <div>

          <h3
            className="
              text-xl
              font-bold
              text-yellow-400
              mb-4
            "
          >
            Existing Events
          </h3>

          <div
            className="
              space-y-4
            "
          >

            {
              events.map(
                (event) => (

                  <div

                    key={event.id}

                    className="
                      bg-zinc-900
                      p-4
                      rounded-xl
                    "
                  >

                    <h4 className="
                      font-bold
                      text-lg
                    ">
                      {event.title}
                    </h4>

                    <p className="
                      text-sm
                      text-zinc-400
                    ">
                      {event.category}
                    </p>

                    <p className="
                      text-xs
                      text-yellow-400
                      mt-1
                    ">
                      {event.status}
                    </p>

                    <p className="
                      text-xs
                      text-zinc-500
                    ">
                      {event.date}
                    </p>

                    <p className="
                      text-xs
                      text-zinc-500
                    ">
                      {event.venue}
                    </p>

                    {
                      event.paid && (
                        <p className="
                          text-xs
                          text-green-400
                          mt-1
                        ">
                          ₹ {event.paymentAmount}
                        </p>
                      )
                    }

                    <div className="flex gap-4 mt-3">

                      <button

                          onClick={() =>
                              openEditModal(event)
                          }

                          className="text-blue-400"

                      >

                      Edit

                      </button>

                      <button

                          onClick={() =>
                              handleDelete(event.id)
                          }

                          className="text-red-400"

                      >

                      Delete

                      </button>

                    </div>

                  </div>

                )
              )
            }

          </div>

        </div>

      </div>

      {/* EDIT MODAL */}

      {
        editingEvent && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              z-[200]
              flex
              items-center
              justify-center
            "
          >

            <div
              className="
                bg-zinc-950
                rounded-3xl
                p-6
                w-full
                max-w-2xl
                space-y-4
                max-h-[90vh]
                overflow-y-auto
              "
            >

              <h2 className="text-2xl font-bold text-yellow-400">
                Edit Event
              </h2>

              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="w-full p-3 rounded-xl bg-zinc-900"
              />

              <input
                name="date"
                value={editForm.date}
                onChange={handleEditChange}
                className="w-full p-3 rounded-xl bg-zinc-900"
              />

              <input
                name="venue"
                value={editForm.venue}
                onChange={handleEditChange}
                className="w-full p-3 rounded-xl bg-zinc-900"
              />

              <textarea
                rows="3"
                name="shortDescription"
                value={editForm.shortDescription}
                onChange={handleEditChange}
                className="w-full p-3 rounded-xl bg-zinc-900"
              />

              <textarea
                rows="6"
                name="longDescription"
                value={editForm.longDescription}
                onChange={handleEditChange}
                className="w-full p-3 rounded-xl bg-zinc-900"
              />

              <input
                type="number"
                name="teamSize"
                value={editForm.teamSize}
                onChange={handleEditChange}
                className="w-full p-3 rounded-xl bg-zinc-900"
              />

              <input
                type="number"
                name="paymentAmount"
                value={editForm.paymentAmount}
                onChange={handleEditChange}
                className="w-full p-3 rounded-xl bg-zinc-900"
              />

              <div className="flex gap-4">

                <button

                  onClick={handleUpdate}

                  className="
                    flex-1
                    bg-yellow-500
                    text-black
                    font-bold
                    py-3
                    rounded-xl
                  "
                >
                  Save
                </button>

                <button

                  onClick={() =>
                    setEditingEvent(null)
                  }

                  className="
                    flex-1
                    bg-red-500
                    text-white
                    py-3
                    rounded-xl
                  "
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )
      }

    </ContentModal>

  )

}