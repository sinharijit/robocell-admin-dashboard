import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

const hallOfFameRef =
  collection(db, "hallOfFame")

export const createHallOfFame =
  async (data) => {

    await addDoc(
      hallOfFameRef,
      data
    )
  }

export const listenToHallOfFame =
  (callback) => {

    const q = query(
      hallOfFameRef,
      orderBy("order", "asc")
    )

    return onSnapshot(
      q,
      (snapshot) => {

        const data =
          snapshot.docs.map(
            (docItem) => ({
              id: docItem.id,
              ...docItem.data(),
            })
          )

        callback(data)
      }
    )
  }

export const deleteHallOfFame =
  async (id) => {

    await deleteDoc(
      doc(
        db,
        "hallOfFame",
        id
      )
    )
  }

export const updateHallOfFame =
  async (id, data) => {

    await updateDoc(
      doc(
        db,
        "hallOfFame",
        id
      ),
      data
    )
  }