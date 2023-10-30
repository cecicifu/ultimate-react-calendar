import { DATE_FORMAT } from "./utils"

export type DayObject = {
	date: Date
	classNames: string[]
}

interface DayProps {
	locale: string
	day: DayObject
	onClick?: (day: DayObject) => void
}

export const Day = ({ locale, day, onClick }: DayProps) => {
	const { date: dateDay, classNames } = day

	const dayNumber = dateDay.getDate()
	const dateString = dateDay.toLocaleDateString(locale, DATE_FORMAT)

	const isClickable = onClick && classNames.includes("day--current-month")

	const classNamesStr = classNames.join(" ")
	const clickableClass = isClickable ? " day--clickable" : ""

	return (
		<div
			className={`${classNamesStr}${clickableClass}`}
			key={`${dateDay.getTime()}-${classNames[1]}`}
			data-date={dateString}
			onClick={() => isClickable && onClick(day)}
		>
			<p>{dayNumber}</p>
		</div>
	)
}
