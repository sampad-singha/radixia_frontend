import ProgramCard from "./ProgramCard"

export default function ExploreGrid() {

  const mock = Array.from({ length: 8 })

  return (
    <div className="space-y-4">

      {mock.map((_, i) => (
        <ProgramCard key={i} />
      ))}

    </div>
  )
}