import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function formatSessionTime(date: string) {

    const d = dayjs(date)

    return {
        relative: d.fromNow(),
        exact: d.format("MMM D, YYYY • h:mm A")
    }

}