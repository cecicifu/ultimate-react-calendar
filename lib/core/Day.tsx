import { useRef } from "react"
import { DATE_FORMAT } from "../utils/utils"

export type DayObject = {
	date: Date
	classNames: string[]
}

export type DayObjectWithElement = DayObject & {
	element: HTMLDivElement
}

interface DayProps {
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
			element: dayRef?.current!,
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
