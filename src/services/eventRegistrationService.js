import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"



/*
|--------------------------------------------------------------------------
| Listen to registrations of ONE event
|--------------------------------------------------------------------------
*/

export const listenToRegistrations = (

  eventId,

  callback

) => {

  const registrationsRef =
    collection(

      db,

      "events",

      eventId,

      "registrations"

    )

  return onSnapshot(

    registrationsRef,

    (snapshot) => {

      const registrations =
        snapshot.docs.map(

          (docItem) => ({

            id: docItem.id,

            ...docItem.data(),

          })

        )

      callback(registrations)

    }

  )

}



/*
|--------------------------------------------------------------------------
| Delete Registration
|--------------------------------------------------------------------------
*/

export const deleteRegistration =

  async (

    eventId,

    registrationId

  ) => {

    await deleteDoc(

      doc(

        db,

        "events",

        eventId,

        "registrations",

        registrationId

      )

    )

  }