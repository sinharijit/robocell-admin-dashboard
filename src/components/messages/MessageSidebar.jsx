import MessageCard from "./MessageCard"

export default function MessageSidebar({
  messages,
  onSelectMessage,
}) {

  return (

    <div className="
      w-[320px]

      bg-zinc-950/80
      backdrop-blur-md

      border-r
      border-yellow-500/10

      p-4

      overflow-y-auto

      custom-scrollbar
    ">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="
          text-2xl
          font-black
          text-yellow-400
        ">
          Messages
        </h2>

        <p className="
          text-zinc-500
          text-sm
        ">
          Live user communication
        </p>

      </div>



      {/* MESSAGE LIST */}

      <div className="
        space-y-3

        max-h-[75vh]

        overflow-y-auto

        pr-1

        custom-scrollbar
      ">

        {
          messages.length === 0

            ? (

              <div className="
                flex
                flex-col
                items-center
                justify-center

                text-center

                py-16

                text-zinc-500
              ">

                <div className="
                  text-5xl
                  mb-4
                ">
                  💬
                </div>

                <h3 className="
                  font-bold
                  text-sm
                  mb-2
                ">
                  No Messages Yet
                </h3>

                <p className="
                  text-xs
                  leading-relaxed
                ">
                  User messages will
                  appear here in realtime
                </p>

              </div>

            )

            : (

              messages.map((message) => (

                <MessageCard

                  key={message.id}

                  message={message}

                  onClick={() =>
                    onSelectMessage(message)
                  }
                />

              ))
            )
        }

      </div>

    </div>
  )
}