import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

const alumniRef =
  collection(
    db,
    "alumni"
  )

export const createAlumni =
  async (alumniData) => {

    await addDoc(
      alumniRef,
      alumniData
    )
  }

export const listenToAlumni =
  (callback) => {

    return onSnapshot(

      alumniRef,

      (snapshot) => {

        const alumni =
          snapshot.docs.map(
            (docItem) => ({

              id: docItem.id,

              ...docItem.data(),

            })
          )

        callback(alumni)
      }
    )
  }

export const deleteAlumni =
  async (id) => {

    await deleteDoc(

      doc(
        db,
        "alumni",
        id
      )

    )
  }

export const updateAlumni =
  async (id, alumniData) => {

    await updateDoc(

      doc(
        db,
        "alumni",
        id
      ),

      alumniData

    )
  }