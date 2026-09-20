'use client'
import { Video, Film, FileText, HelpCircle, Users } from "lucide-react"

function MenuBox() {
  const services = [
    {
      id: 1,
      title: "",
      description: "",
      icon: Video,
      color: "",
    },
    {
      id: 2,
      title: "",
      description: "",
      icon: Film,
      color: "",
    },
    {
      id: 3,
      title: "",
      description: "",
      icon: FileText,
      color: "",
    },
    {
      id: 4,
      title: "",
      description: "",
      icon: HelpCircle,
      color: "",
    },
  ]

  return (
    <div className="w-full flex flex-col md:flex-row justify-between my-8 gap-6">

      <div className="flex w-full flex-row justify-between">

        <div className="w-full flex justify-center flex-col gap-2 items-center">

          <span className="text-blue-500 text-2xl">
            <Video size={34} />

          </span>
          <h1 className="text-sm font-medium dark:text-neutral-200 text-neutral-800">Interactive Live Classes</h1>
          <p className="hidden lg:flex text-xs text-neutral-600 dark:text-neutral-300">Direct video call classes with top mentors</p>
        </div>

        <div className="w-full flex justify-center flex-col gap-2 items-center">

          <span className="text-purple-500 text-2xl">

            <Film size={34} /></span>
          <h1 className="text-sm font-medium dark:text-neutral-200 text-neutral-800">Animated Lessons</h1>
          <p className="hidden lg:flex text-xs text-neutral-600 dark:text-neutral-300">Easy to learn with visual animations</p>
        </div>

      </div>


      <div className="flex w-full flex-row justify-between">


        <div className="w-full flex justify-center flex-col gap-2 items-center">

          <span className="text-emerald-500 text-2xl">
            <FileText size={34} /></span>
          <h1 className="text-sm font-medium dark:text-neutral-200 text-neutral-800">Smart Lecture Notes</h1>
          <p className="hidden lg:flex text-xs text-neutral-600 dark:text-neutral-300">Comprehensive notes & tutorials</p>
        </div>


        <div className="w-full flex justify-center flex-col gap-2 items-center">
          <span className="text-amber-500 text-2xl">


            <HelpCircle size={34} /></span>
          <h1 className="text-sm font-medium dark:text-neutral-200 text-neutral-800">Practice & Mock Tests</h1>
          <p className="hidden lg:flex text-xs text-neutral-600 dark:text-neutral-300">Instant evaluation and exam practice</p>
        </div>

      </div>


    </div>
  )
}

export default MenuBox