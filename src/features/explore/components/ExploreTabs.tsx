import { Button } from "@/components/ui/button"

const tabs = [
  { label: "All", value: "all" },
  { label: "Programs", value: "program" },
  { label: "Courses", value: "course" },
  { label: "Bootcamps", value: "bootcamp" },
  { label: "Specializations", value: "specialization" }
]

export default function ExploreTabs() {
  return (
    <div className="flex gap-2 flex-wrap">

      {tabs.map(tab => (
        <Button
          key={tab.value}
          variant="outline"
          size="sm"
        >
          {tab.label}
        </Button>
      ))}

    </div>
  )
}