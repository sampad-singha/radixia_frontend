import ProgramCard from "./ProgramCard"
import { useExplore } from "@/features/explore/queries/explore.queries"
import type { ExploreParams } from "@/features/explore/types/explore.types"

type Props = {
  params: ExploreParams
}

export default function ExploreGrid({ params }: Props) {

  const { data, isLoading } = useExplore(params)

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
      <div className="space-y-4">

        {(data?.data ?? []).map(item => (
            <ProgramCard
                key={item.id}
                item={item}
            />
        ))}

      </div>
  )
}