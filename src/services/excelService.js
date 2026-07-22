import * as XLSX from "xlsx"

export const exportRegistrationsToExcel = (

  eventTitle,

  registrations

) => {

  const rows = []

  registrations.forEach(

    (registration) => {

      const row = {

        "Team Name":
          registration.teamName,

        "Team Size":
          registration.teamSize,

        "Registration Date":
          registration.registrationDate,

      }

      registration.participants?.forEach(

        (participant, index) => {

          const number = index + 1

          row[`Participant ${number}`] =
            participant.name || ""

          row[`Email ${number}`] =
            participant.email || ""

          row[`WhatsApp ${number}`] =
            participant.whatsapp || ""

          row[`Branch ${number}`] =
            participant.branch || ""

        }

      )

      rows.push(row)

    }

  )

  const worksheet =
    XLSX.utils.json_to_sheet(rows)

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Registrations"

  )

  const safeName =
    eventTitle.replace(

      /[^a-zA-Z0-9]/g,

      "_"

    )

  XLSX.writeFile(

    workbook,

    `${safeName}_Registrations.xlsx`

  )

}