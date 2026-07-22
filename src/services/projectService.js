import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

const projectsRef =
  collection(db, "projects")

export const createProject =
  async (projectData) => {

    await addDoc(
      projectsRef,
      {
        ...projectData,

        createdAt:
          serverTimestamp(),
      }
    )
  }

export const updateProject =
  async (
    id,
    projectData
  ) => {

    await updateDoc(
      doc(
        db,
        "projects",
        id
      ),
      projectData
    )
  }

export const listenToProjects =
  (callback) => {

    // const q = query(
    //   projectsRef,
    //   orderBy(
    //     "createdAt",
    //     "desc"
    //   )
    // )

    const q = query(
      projectsRef,
      orderBy(
        "order",
        "asc"
      )
    )

    return onSnapshot(
      q,
      (snapshot) => {

        const projects =
          snapshot.docs.map(
            (docItem) => ({

              id:
                docItem.id,

              ...docItem.data(),

            })
          )

        callback(projects)
      }
    )
  }

export const deleteProject =
  async (id) => {

    await deleteDoc(
      doc(
        db,
        "projects",
        id
      )
    )
  }