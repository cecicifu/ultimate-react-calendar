import "./Day.css"

import { useRef } from "react"

import { DATE_FORMAT } from "../../utils/date"

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
	onDayClick?: (day: DayObjectWithElement) => void
	showNonCurrentDates: boolean
}

export const Day = ({
	locale,
	day,
	onDayClick,
	showNonCurrentDates,
}: DayProps) => {
	const { date: dateDay, classNames } = day

	const dayRef = useRef<HTMLDivElement>(null)

	const dayNumber = dateDay.getDate()
	const dateString = dateDay.toLocaleDateString(locale, DATE_FORMAT)

	const isClickable = onDayClick && classNames.includes("day--current-month")

	if (!showNonCurrentDates && !classNames.includes("day--current-month"))
		classNames.push("day--hidden")

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
			onClick={() => isClickable && onDayClick(getDayObject())}
		>
			<span>{dayNumber}</span>
		</div>
	)
}
