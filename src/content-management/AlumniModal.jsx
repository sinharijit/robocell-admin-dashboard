import ImageLinksInput
  from "@/components/ImageLinksInput"

import ContentModal from "./ContentModal"

import { useEffect, useState } from "react"

import {
  createAlumni,
  listenToAlumni,
  deleteAlumni,
  updateAlumni,
}
from "@/services/alumniService"

export default function AlumniModal({

  isOpen,
  onClose,

}) {

  const [name,
    setName] =
    useState("")

  const [position,
    setPosition] =
    useState("")

  const [company,
    setCompany] =
    useState("")

  const [domain,
    setDomain] =
    useState("")

  const [batch,
    setBatch] =
    useState("")

  const [linkedin,
    setLinkedin] =
    useState("")

  const [order,
    setOrder] =
    useState("")

  const [image,
    setImage] =
    useState("")

  const [alumni,
    setAlumni] =
    useState([])

  const [editingAlumni,
    setEditingAlumni] =
    useState(null)

  const [editImage,
    setEditImage] =
    useState("")

  const [editName,
    setEditName] =
    useState("")

  const [editPosition,
    setEditPosition] =
    useState("")

  const [editCompany,
    setEditCompany] =
    useState("")

  const [editDomain,
    setEditDomain]
    = useState("")

  const [editBatch,
    setEditBatch] =
    useState("")

  const [editLinkedin,
    setEditLinkedin] =
    useState("")

  const [editOrder,
    setEditOrder] =
    useState("")

  const [expandedBatch,
    setExpandedBatch] =
    useState({})



  useEffect(() => {

    const unsubscribe =
      listenToAlumni(
        setAlumni
      )

    return () =>
      unsubscribe()

  }, [])

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      if (!image) {

        alert(
          "Please select a photo"
        )

        return
      }

      await createAlumni({

        name,

        position,

        company,

        domain,

        batch: Number(batch),

        linkedin,

        order:
          Number(order),

        image,

      })

      setName("")
      setPosition("")
      setCompany("")
      setDomain("")
      setBatch("")
      setLinkedin("")
      setOrder("")
      setImage("")
    }



  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this alumni?"
        )

      if (!confirmDelete)
        return

      await deleteAlumni(id)
    }

  const openEditModal =
    (member) => {

      setEditingAlumni(
        member
      )

      setEditImage(
        member.image
      )

      setEditName(
        member.name
      )

      setEditPosition(
        member.position
      )

      setEditCompany(
        member.company
      )

      setEditDomain(
        member.domain || ""
      )

      setEditBatch(
        member.batch
      )

      setEditLinkedin(
        member.linkedin
      )

      setEditOrder(
        member.order
      )
    }


  const handleUpdateAlumni =
    async () => {

      await updateAlumni(

        editingAlumni.id,

        {

          name:
            editName,

          position:
            editPosition,

          company:
            editCompany,

          domain:
            editDomain,

          batch: Number(editBatch),

          linkedin:
            editLinkedin,

          order:
            Number(
              editOrder
            ),

          image:
            editImage,

        }
      )

      setEditingAlumni(
        null
      )
    }

  const groupedAlumni = alumni.reduce((groups, member) => {

    const batch = member.batch || "Unknown"

    if (!groups[batch]) {

      groups[batch] = []

    }

    groups[batch].push(member)

    return groups

  }, {})



  return (

    <ContentModal

      isOpen={isOpen}
      onClose={onClose}
      title="Alumni"

    >

      <div className="
        grid
        lg:grid-cols-2
        gap-6
      ">

        {/* LEFT */}

        <div>

          <form

            onSubmit={handleSubmit}

            className="
              space-y-4
            "
          >


            <ImageLinksInput

              value={image}

              onChange={setImage}

              multiple={false}

              label="Alumni Photo Link"

            />

            {

              image && (

                <img

                  src={image}

                  alt="Preview"

                  className="
                    w-full
                    h-40
                    object-cover
                    rounded-xl
                  "

                />

              )

            }



            <input

              type="text"

              placeholder="Alumni Name"

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



            <input

              type="text"

              placeholder="Position"

              value={position}

              onChange={(e) =>
                setPosition(
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

            <input

              type="text"

              placeholder="Current Company"

              value={company}

              onChange={(e) =>
                setCompany(
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

            <input

              value={editDomain}

              onChange={(e)=>
                setEditDomain(
                  e.target.value
                )
              }

              placeholder="Domain"

              className="
                w-full
                p-3
                rounded-xl
                bg-zinc-900
              "
            />


            <input

              type="text"

              placeholder="Batch (Eg: 2028)"

              value={batch}

              onChange={(e) =>
                setBatch(
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

            <input

              type="url"

              placeholder="LinkedIn URL"

              value={linkedin}

              onChange={(e) =>
                setLinkedin(
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

            <input

              type="number"

              placeholder="Display Order"

              value={order}

              onChange={(e) =>
                setOrder(
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

              Add Alumni

            </button>

          </form>

        </div>



        {/* RIGHT */}

        <div>

          <h3 className="
            text-xl
            font-bold
            text-yellow-400
            mb-4
          ">

            Existing Alumni

          </h3>

          {/* ── Dashboard Counter ── */}

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-4
              mb-4
            "
          >

            <h4 className="
              text-yellow-400
              font-bold
            ">
              Total Alumni
            </h4>

            <p className="
              text-3xl
              font-bold
            ">
              {alumni.length}
            </p>

          </div>

          {/* ── Alumni List (Grouped by Batch) ── */}

          <div className="
            max-h-[600px]
            overflow-y-auto
            space-y-3
          ">

            {
              Object.entries(groupedAlumni)

                .sort((a, b) => b[0] - a[0])

                .map(([batch, members]) => (

                  <div
                    key={batch}
                    className="
                      bg-zinc-900
                      rounded-2xl
                      overflow-hidden
                    "
                  >

                    <button

                      onClick={() =>
                        setExpandedBatch(prev => ({
                          ...prev,
                          [batch]: !prev[batch]
                        }))
                      }

                      className="
                        w-full
                        flex
                        justify-between
                        items-center
                        p-4
                        bg-zinc-800
                        text-yellow-400
                        font-bold
                      "
                    >

                      <span>
                        Batch {batch} ({members.length})
                      </span>

                      <span>
                        {expandedBatch[batch] ? "▲" : "▼"}
                      </span>

                    </button>

                    {

                      expandedBatch[batch] && (

                        <div className="space-y-3 p-3">

                          {

                            members.map((alumni) => (

                              <div

                                key={alumni.id}

                                className="
                                  bg-zinc-900
                                  rounded-2xl
                                  p-3
                                "
                              >

                                <img

                                  src={alumni.image}

                                  alt={alumni.name}

                                  className="
                                    w-full
                                    h-36
                                    object-cover
                                    rounded-xl
                                    mb-3
                                  "
                                />

                                <h4 className="
                                  font-bold
                                ">
                                  {alumni.name}
                                </h4>

                                <p className="
                                  text-sm
                                  text-zinc-400
                                ">
                                  {alumni.position}
                                </p>

                                <p className="
                                  text-sm
                                  text-yellow-400
                                ">
                                  {alumni.company}
                                </p>

                                <p className="
                                  text-xs
                                  text-cyan-400
                                ">
                                  {alumni.domain}
                                </p>

                                <p className="
                                  text-xs
                                  text-zinc-500
                                ">
                                  {alumni.batch}
                                </p>

                                <button

                                  onClick={() =>
                                    openEditModal(alumni)
                                  }

                                  className="
                                    mt-3
                                    mr-4
                                    text-blue-400
                                    text-sm
                                  "
                                >
                                  Edit
                                </button>

                                <button

                                  onClick={() =>
                                    handleDelete(alumni.id)
                                  }

                                  className="
                                    mt-3
                                    text-red-400
                                    text-sm
                                  "
                                >
                                  Delete
                                </button>

                              </div>

                            ))

                          }

                        </div>

                      )

                    }

                  </div>

                ))
            }

          </div>

        </div>

      </div>

      {
        editingAlumni && (

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
                p-6
                rounded-3xl
                w-full
                max-w-lg
                space-y-4
              "
            >

              <h3
                className="
                  text-xl
                  text-yellow-400
                  font-bold
                "
              >
                Edit Alumni
              </h3>


              <ImageLinksInput

                value={editImage}

                onChange={setEditImage}

                multiple={false}

                label="Alumni Photo Link"

              />

              {

                editImage && (

                  <img

                    src={editImage}

                    alt="Preview"

                    className="
                      w-full
                      h-40
                      object-cover
                      rounded-xl
                    "

                  />

                )

              }

              <input

                value={editName}

                onChange={(e)=>
                  setEditName(
                    e.target.value
                  )
                }

                placeholder="Name"

                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <input

                value={editPosition}

                onChange={(e)=>
                  setEditPosition(
                    e.target.value
                  )
                }

                placeholder="Position"

                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <input

                value={editCompany}

                onChange={(e)=>
                  setEditCompany(
                    e.target.value
                  )
                }

                placeholder="Current Company"

                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <input

                value={editBatch}

                onChange={(e)=>
                  setEditBatch(
                    e.target.value
                  )
                }

                placeholder="Batch (2020-2024)"

                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <input

                value={editLinkedin}

                onChange={(e)=>
                  setEditLinkedin(
                    e.target.value
                  )
                }

                placeholder="LinkedIn URL"

                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <input

                type="number"

                value={editOrder}

                onChange={(e)=>
                  setEditOrder(
                    e.target.value
                  )
                }

                placeholder="Display Order"

                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <button

                onClick={
                  handleUpdateAlumni
                }

                className="
                  w-full
                  bg-yellow-500
                  text-black
                  py-3
                  rounded-xl
                  font-bold
                "
              >
                Save Changes
              </button>

              <button

                onClick={() =>
                  setEditingAlumni(
                    null
                  )
                }

                className="
                  w-full
                  text-red-400
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