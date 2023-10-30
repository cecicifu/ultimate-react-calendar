import { Day, DayObjectWithElement } from "./Day"
import { WeekDays } from "../parts/WeekDays"
import { MONTH } from "../utils/utils"
import {
	CalendarType,
	daysToObject,
	getFirstDayOfWeek,
	getWeekDays,
} from "../utils/utils"

interface WeekProps {
	locale: string
	calendarType: CalendarType
	date: Date
	onClick?: (day: DayObjectWithElement) => void
}

export const Week = ({ locale, calendarType, date, onClick }: WeekProps) => {
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
				<WeekDays locale={locale} calendarType={calendarType} />

				<div className="days">
					{getWeek().map((day) => {
						const { date: dateDay, classNames } = day
						const key = `${dateDay.getTime()}-${classNames[1]}`

						return <Day key={key} locale={locale} day={day} onClick={onClick} />
					})}
				</div>
			</div>
		</div>
	)
}
