import { useRef } from "react"
import { DATE_FORMAT } from "../../utils/date"
import "./Day.css"

export type DayObject = {
	date: Date
	classNames: string[]
}

export type DayObjectWithElement = DayObject & {
	element?: HTMLDivElement
}

export interface DayProps {
	locale: string
	day: DayObject
	onClick?: (day: DayObjectWithElement) => void
}

export const Day = ({ locale, day, onClick }: DayProps) => {
	const { date: dateDay, classNames } = day

	const dayRef = useRef<HTMLDivElement>(null)

	const dayNumber = dateDay.getDate()
	const dateString = dateDay.toLocaleDateString(locale, DATE_FORMAT)

	const isClickable = onClick && classNames.includes("day--current-month")

	const classNamesStr = classNames.join(" ")
	const clickableClass = isClickable ? " day--clickable" : ""

	const getDayObject = (): DayObjectWithElement => {
		return {
			...day,
			element: dayRef.current ? dayRef.current : undefined,
		}
	}

	return (
		<div
			ref={dayRef}
			className={`${classNamesStr}${clickableClass}`}
			key={`${dateDay.getTime()}-${classNames[1]}`}
			data-date={dateString}
			onClick={() => isClickable && onClick(getDayObject())}
		>
			<p>{dayNumber}</p>
		</div>
	)
}
