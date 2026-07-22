import { Plus, Trash2 } from "lucide-react"

export default function ImageLinksInput({

  value = [],
  onChange,
  multiple = true,
  label = "Image Link",

}) {

  const links =
    Array.isArray(value)
      ? value
      : value
        ? [value]
        : [""]

  const updateLink =
    (index, newValue) => {

      const updated = [...links]

      updated[index] = newValue

      onChange(

        multiple
          ? updated
          : newValue

      )

    }

  const addField =
    () => {

      onChange(

        [...links, ""]

      )

    }

  const removeField =
    (index) => {

      const updated =
        links.filter(

          (_, i) => i !== index

        )

      onChange(

        multiple
          ? updated
          : ""

      )

    }

    const getPreviewLink = (url) => {

        if (!url)
            return ""

        if (

            url.includes("drive.google.com/file/d/")

        ) {

            const match =

            url.match(

                /\/d\/([^/]+)/

            )

            if (match) {

            return `https://drive.google.com/uc?export=view&id=${match[1]}`

            }

        }

        return url

        }

  return (

    <div className="space-y-3">

      <label className="text-sm text-zinc-300">

        {label}

      </label>

      {

        links.map(

          (link, index) => (

            <div

              key={index}

              className="flex gap-2"

            >

              <input

                type="text"

                placeholder="Paste Google Drive Image Link"

                value={link}

                onChange={(e)=>

                  updateLink(

                    index,

                    e.target.value

                  )

                }

                className="

                  flex-1

                  p-3

                  rounded-xl

                  bg-zinc-900

                "

              />

              {

                link && (

                    <img

                    src={

                        getPreviewLink(link)

                    }

                    alt="Preview"

                    className="

                        w-24

                        h-24

                        rounded-xl

                        object-cover

                        border

                        border-zinc-700

                    "

                    />

                )

                }

              {

                multiple &&

                links.length > 1 && (

                  <button

                    type="button"

                    onClick={()=>

                      removeField(index)

                    }

                    className="

                      px-3

                      rounded-xl

                      bg-red-600

                      hover:bg-red-700

                    "

                  >

                    <Trash2 size={18}/>

                  </button>

                )

              }

            </div>

          )

        )

      }

      {

        multiple && (

          <button

            type="button"

            onClick={addField}

            className="

              flex

              items-center

              gap-2

              text-yellow-400

              hover:text-yellow-300

            "

          >

            <Plus size={18}/>

            Add another image

          </button>

        )

      }

    </div>

  )

}