import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

const teamRef =
  collection(
    db,
    "team_members"
  )



export const createMember =
  async (memberData) => {

    await addDoc(
      teamRef,
      memberData
    )
  }



export const listenToMembers =
  (callback) => {

    return onSnapshot(

      teamRef,

      (snapshot) => {

        const members =
          snapshot.docs.map(
            (docItem) => ({

              id: docItem.id,

              ...docItem.data(),

            })
          )

        callback(members)
      }
    )
  }



export const deleteMember =
  async (id) => {

    await deleteDoc(

      doc(
        db,
        "team_members",
        id
      )

    )
  }

  export const updateMember =
    async (
      id,
      updatedData
    ) => {

      await updateDoc(

        doc(
          db,
          "team_members",
          id
        ),

        updatedData

      )
    }