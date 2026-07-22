import ImageLinksInput
  from "@/components/ImageLinksInput"

import ContentModal from "./ContentModal"

import { useEffect, useState } from "react"

import {
  createMember,
  listenToMembers,
  deleteMember,
  updateMember,
}
from "@/services/teamService"

export default function TeamModal({

  isOpen,
  onClose,

}) {

  const [name,
    setName] =
    useState("")

  const [position,
    setPosition] =
    useState("")

  const [role,
    setRole] =
    useState("executive")

  const [order,
    setOrder] =
    useState("")

  const [image,
    setImage] =
    useState("")

  const [members,
    setMembers] =
    useState([])

  const [editingMember,
    setEditingMember] =
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

  const [editRole,
    setEditRole] =
    useState("executive")

  const [editOrder,
    setEditOrder] =
    useState("")



  useEffect(() => {

    const unsubscribe =
      listenToMembers(
        setMembers
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

      await createMember({

        name,

        position,

        role,

        order:
          Number(order),

        image,

      })

      setName("")
      setPosition("")
      setRole("executive")
      setOrder("")
      setImage("")
    }



  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this member?"
        )

      if (!confirmDelete)
        return

      await deleteMember(id)
    }

  const openEditModal =
    (member) => {

      setEditingMember(
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

      setEditRole(
        member.role
      )

      setEditOrder(
        member.order
      )
    }



  const handleEditImage =
    (e) => {

      const file =
        e.target.files[0]

      if (!file) return

      const reader =
        new FileReader()

      reader.onloadend =
        () => {

          setEditImage(
            reader.result
          )
        }

      reader.readAsDataURL(
        file
      )
    }



  const handleUpdateMember =
    async () => {

      await updateMember(

        editingMember.id,

        {

          name:
            editName,

          position:
            editPosition,

          role:
            editRole,

          order:
            Number(
              editOrder
            ),

          image:
            editImage,

        }
      )

      setEditingMember(
        null
      )
    }

  const totalMembers =
    members.length

  const executiveCount =
    members.filter(
      (m) =>
        m.role ===
        "executive"
    ).length

  const coreCount =
    members.filter(
      (m) =>
        m.role !==
        "executive"
    ).length



  return (

    <ContentModal

      isOpen={isOpen}
      onClose={onClose}
      title="Team Members"

    >
      <div
        className="
          grid
          grid-cols-3
          gap-4
          mb-6
        "
      >

        <div
          className="
            bg-zinc-900
            p-4
            rounded-2xl
          "
        >
          <p className="text-zinc-400">
            Total
          </p>

          <h3
            className="
              text-3xl
              text-yellow-400
              font-bold
            "
          >
            {totalMembers}
          </h3>
        </div>

        <div
          className="
            bg-zinc-900
            p-4
            rounded-2xl
          "
        >
          <p className="text-zinc-400">
            Executive
          </p>

          <h3
            className="
              text-3xl
              text-yellow-400
              font-bold
            "
          >
            {executiveCount}
          </h3>
        </div>

        <div
          className="
            bg-zinc-900
            p-4
            rounded-2xl
          "
        >
          <p className="text-zinc-400">
            Others
          </p>

          <h3
            className="
              text-3xl
              text-yellow-400
              font-bold
            "
          >
            {coreCount}
          </h3>
        </div>

      </div>

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

            {/* <input

              type="file"

              accept="image/*"

              onChange={
                handleImageChange
              }

              className="
                w-full
                p-3
                rounded-xl
                bg-zinc-900
              "
            />



            {
              image && (

                <img

                  src={image}

                  alt="preview"

                  className="
                    w-full
                    h-40
                    object-cover
                    rounded-xl
                  "
                />

              )
            } */}

            <ImageLinksInput

              value={image}

              onChange={setImage}

              multiple={false}

              label="Team Member Image Link"

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

              placeholder="Member Name"

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



            <select

              value={role}

              onChange={(e) =>
                setRole(
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

              <option value="advisor">
                advisor
              </option>

              <option value="executive">
                executive
              </option>

              <option value="senior">
                senior
              </option>

              <option value="member">
                member
              </option>

            </select>



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

              Add Member

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

            Existing Members

          </h3>

          <div className="
            max-h-[600px]
            overflow-y-auto
            space-y-3
          ">

            {
              members.map(
                (member) => (

                <div

                  key={member.id}

                  className="
                    bg-zinc-900
                    rounded-2xl
                    p-3
                  "
                >

                  <img

                    src={member.image}

                    alt={member.name}

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
                    {member.name}
                  </h4>

                  <p className="
                    text-sm
                    text-zinc-400
                  ">
                    {member.position}
                  </p>

                  <p className="
                    text-xs
                    text-yellow-400
                  ">
                    {member.role}
                  </p>

                  <p className="
                    text-xs
                    text-zinc-500
                    mt-1
                  ">
                    Order: {member.order}
                  </p>

                  <button

                    onClick={() =>
                      openEditModal(
                        member
                      )
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
                      handleDelete(
                        member.id
                      )
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

        </div>

      </div>

      {
        editingMember && (

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
                Edit Member
              </h3>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleEditImage
                }
              />

              {
                editImage && (

                  <img

                    src={editImage}

                    alt="preview"

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

                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-zinc-900
                "
              />

              <select

                value={editRole}

                onChange={(e)=>
                  setEditRole(
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

                <option value="advisor">
                  advisor
                </option>

                <option value="executive">
                  executive
                </option>

                <option value="senior">
                  senior
                </option>

                <option value="member">
                  member
                </option>

              </select>

              <input

                type="number"

                value={editOrder}

                onChange={(e)=>
                  setEditOrder(
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

              <button

                onClick={
                  handleUpdateMember
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
                  setEditingMember(
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