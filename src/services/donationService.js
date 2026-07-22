import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

const donationsRef = collection(db, "donations")

export function listenToDonations(callback) {

  const q = query(
    donationsRef,
    orderBy("createdAt", "desc")
  )

  return onSnapshot(
    q,

    (snapshot) => {

      const donations = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }))

      callback(donations)
    },

    (error) => {
      console.error("Firestore Error:", error)
    }
  )
}

export async function updateDonationStatus(
  donationId,
  status
) {

  const donationDoc = doc(
    db,
    "donations",
    donationId
  )

  await updateDoc(donationDoc, {
    paymentStatus: status,
  })
}