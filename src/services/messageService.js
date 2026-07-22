import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"



const messagesRef =
  collection(db, "messages")



export const listenToMessages = (
  callback
) => {

  const q = query(
    messagesRef,
    orderBy("timestamp", "desc")
  )

  return onSnapshot(q, (snapshot) => {

    const messages =
      snapshot.docs.map((doc) => ({

        id: doc.id,
        ...doc.data(),

      }))

    callback(messages)

  })
}



export const markMessageAsRead =
  async (id) => {

    const messageDoc =
      doc(db, "messages", id)

    await updateDoc(messageDoc, {
      status: "READ",
    })
}



export const markMessageAsReplied =
  async (id) => {

    const messageDoc =
      doc(db, "messages", id)

    await updateDoc(messageDoc, {
      status: "REPLIED",
    })
}