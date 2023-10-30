import { MonthHeader } from "./MonthHeader"
import { DATE_FORMAT, MONTH } from "./utils"
import {
	CalendarType,
	daysToObject,
	getFirstDayOfWeek,
	getWeekDays,
} from "./utils"

interface WeekProps {
	locale: string
	calendarType: CalendarType
	date: Date
}

export const Week = ({ locale, calendarType, date }: WeekProps) => {
	const month = date.getMonth()
	const monthText = Object.keys(MONTH)[month]

	const getWeek = () => {
		const firstDayOfWeek = getFirstDayOfWeek(date, calendarType)

		const weekDays = getWeekDays(date, firstDayOfWeek)

		return weekDays.map((day) => daysToObject(month, day))
	}

	return (
		<div className="month" data-month={month}>
			<h3 className="month-title">{monthText}</h3>

			<div className="week">
				<MonthHeader locale={locale} calendarType={calendarType} />

				<div className="days">
					{getWeek().map((day) => {
						const dayNumber = day.date.getDate()
						const date = day.date.toLocaleDateString(locale, DATE_FORMAT)
						const key = `${day.date.getTime()}-${day.class}`

						return (
							<div className={`day ${day.class}`} key={key} data-date={date}>
								<p>{dayNumber}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
