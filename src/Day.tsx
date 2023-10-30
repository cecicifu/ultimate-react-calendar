import { DATE_FORMAT } from "./utils"

export type DayObject = {
	date: Date
	class: string
}

interface DayProps {
	locale: string
	day: DayObject
}

export const Day = ({ locale, day }: DayProps) => {
	const { date: dateDay, class: dayClass } = day

	const dayNumber = dateDay.getDate()
	const dateString = dateDay.toLocaleDateString(locale, DATE_FORMAT)

	return (
		<div
			className={`day ${dayClass}`}
			key={`${dateDay.getTime()}-${dayClass}`}
			data-date={dateString}
		>
			<p>{dayNumber}</p>
		</div>
	)
}
