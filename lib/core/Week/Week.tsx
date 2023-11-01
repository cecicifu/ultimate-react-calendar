import "./Week.css"

import {
	CalendarType,
	daysToObject,
	getFirstDayOfWeek,
	getWeekDays,
	getWeekNumber,
} from "../../utils/date"
import { DayObject } from "../Day"

export type Week = DayObject[]
export interface WeekProps {
	calendarType: CalendarType
	date: Date
	monthName?: React.ReactNode
	week?: Week
	dayElement: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
}

export const Week = ({
	calendarType,
	date,
	monthName,
	week,
	customWeekDays,
	dayElement,
}: WeekProps) => {
	const month = date.getMonth()

	const getWeek = () => {
		if (week) return week

		const firstDayOfWeek = getFirstDayOfWeek(date, calendarType)

		const weekDays = getWeekDays(date, firstDayOfWeek)

		return weekDays.map((day) => daysToObject(month, day, calendarType))
	}

	return (
		<div className="week" data-week={getWeekNumber(week ? week[0].date : date)}>
			{monthName}

			{customWeekDays}

			<div className="days">{getWeek().map((day) => dayElement(day))}</div>
		</div>
	)
}
