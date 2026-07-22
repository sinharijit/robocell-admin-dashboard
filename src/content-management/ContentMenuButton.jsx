import { Menu } from "lucide-react"

export default function ContentMenuButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        top-5
        right-5
        z-50

        w-11
        h-11

        rounded-full

        bg-zinc-900/80
        backdrop-blur-md

        border
        border-yellow-500/20

        flex
        items-center
        justify-center

        text-yellow-400

        hover:scale-110
        hover:border-yellow-400

        transition-all
      "
    >
      <Menu size={20} />
    </button>
  )
}