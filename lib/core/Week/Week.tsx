import "./Week.css"

import {
	CalendarType,
	daysToObject,
	getDaysOfTheWeek,
	getFirstDayOfWeek,
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
	customDaysOfTheWeek?: React.ReactNode
}

export const Week = ({
	calendarType,
	date,
	monthName,
	week,
	customDaysOfTheWeek,
	dayElement,
}: WeekProps) => {
	const month = date.getMonth()

	const getWeek = () => {
		if (week) return week

		const firstDayOfWeek = getFirstDayOfWeek(date, calendarType)

		const daysOfTheWeek = getDaysOfTheWeek(date, firstDayOfWeek)

		return daysOfTheWeek.map((day) => daysToObject(month, day, calendarType))
	}

	return (
		<div className="week" data-week={getWeekNumber(week ? week[0].date : date)}>
			{monthName}

			{customDaysOfTheWeek}

			<div className="days">{getWeek().map((day) => dayElement(day))}</div>
		</div>
	)
}
