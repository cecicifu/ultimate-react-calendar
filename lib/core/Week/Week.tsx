import { DayObject } from "../Day"
import {
	CalendarType,
	daysToObject,
	getFirstDayOfWeek,
	getWeekDays,
	getWeekNumber,
} from "../../utils"
import "./Week.css"

export type Week = DayObject[]
export interface WeekProps {
	calendarType: CalendarType
	date: Date
	week?: Week
	dayElement: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
}

export const Week = ({
	calendarType,
	date,
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
			{customWeekDays}

			<div className="days">{getWeek().map((day) => dayElement(day))}</div>
		</div>
	)
}
