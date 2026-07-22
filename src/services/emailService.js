// import emailjs from "@emailjs/browser"

// const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
// const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
// const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// export const sendVerificationEmail = async (
//   donorName,
//   donorEmail,
//   amount
// ) => {

//   try {

//       await emailjs.send(

//     SERVICE_ID,

//     TEMPLATE_ID,

//     {
//       name: donorName,
//       email: donorEmail,
//       amount: amount,
//     },

//     PUBLIC_KEY

//   )

//     console.log("Email sent")

//   } catch (error) {

//     console.error(
//       "Email failed",
//       error
//     )
//   }
// }


import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const sendVerificationEmail = async (
  donorName,
  donorEmail,
  amount
) => {

  try {

    await emailjs.send(

      SERVICE_ID,

      TEMPLATE_ID,

      {
        name: donorName,
        email: donorEmail,
        amount: amount,
      },

      PUBLIC_KEY

    )

    console.log("Email sent")

    return true

  } catch (error) {

    console.error("Email failed", error)

    return false

  }

}