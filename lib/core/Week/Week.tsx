import { DayObject } from "../Day"
import {
	CalendarType,
	daysToObject,
	getFirstDayOfWeek,
	getWeekDays,
} from "../../utils"
import "./Week.css"
import { MonthTitle } from "../../parts/MonthTitle"

export interface WeekProps {
	calendarType: CalendarType
	date: Date
	dayElement: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
}

export const Week = ({
	calendarType,
	date,
	customWeekDays,
	dayElement,
}: WeekProps) => {
	const month = date.getMonth()

	const getWeek = () => {
		const firstDayOfWeek = getFirstDayOfWeek(date, calendarType)

		const weekDays = getWeekDays(date, firstDayOfWeek)

		return weekDays.map((day) => daysToObject(month, day))
	}

	return (
		<div className="month" data-month={month}>
			<MonthTitle date={date} />

			<div className="week">
				{customWeekDays}

				<div className="days">{getWeek().map((day) => dayElement(day))}</div>
			</div>
		</div>
	)
}
