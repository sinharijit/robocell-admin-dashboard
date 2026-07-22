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

const eventsRef =
  collection(db, "events")



export const createEvent =
  async (eventData) => {

    await addDoc(
      eventsRef,
      eventData
    )

  }



export const listenToEvents =
  (callback) => {

    const q = query(
      eventsRef,
      orderBy("order", "asc")
    )

    return onSnapshot(

      q,

      (snapshot) => {

        const events =
          snapshot.docs.map(
            (docItem) => ({

              id: docItem.id,

              ...docItem.data(),

            })
          )

        callback(events)

      }

    )

  }



// export const updateEvent =
//   async (
//     id,
//     eventData
//   ) => {

//     await updateDoc(

//       doc(
//         db,
//         "events",
//         id
//       ),

//       eventData

//     )

//   }



export const deleteEvent =
  async (id) => {

    await deleteDoc(

      doc(
        db,
        "events",
        id
      )

    )

  }

export const updateEvent =
  async (id, eventData) => {

    await updateDoc(

      doc(
        db,
        "events",
        id
      ),

      eventData

    )

  }