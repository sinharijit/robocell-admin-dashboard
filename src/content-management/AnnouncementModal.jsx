import ContentModal
  from "./ContentModal"

export default function ProjectModal({

  isOpen,
  onClose,

}) {

  return (

    <ContentModal

      isOpen={isOpen}
      onClose={onClose}
      title="Announcements"

    >

      <div className="
        text-zinc-400
      ">
        Announcements Module Coming Soon
      </div>

    </ContentModal>

  )
}