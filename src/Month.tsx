import { Day, DayObject } from "./Day"
import { MonthHeader } from "./MonthHeader"
import {
	CalendarType,
	MONTH,
	daysToObject,
	getFirstDayOfWeek,
	getWeekDays,
} from "./utils"

type Week = DayObject[]
const NUMBER_OF_WEEKS = 6
const getMonthWeeks = (
	month: number,
	year: number,
	calendarType: CalendarType
) => {
	const date = new Date(year, month, 1)

	// TODO check if this is necessary
	date.setHours(0, 0, 0, 0)

	// get the first day of the week of the month
	const firstDayOfWeek = getFirstDayOfWeek(date, calendarType)

	const weeks: Week[] = []
	for (let index = 0; index < NUMBER_OF_WEEKS; index++) {
		const weekDays = getWeekDays(date, firstDayOfWeek)

		const weekDaysObject: DayObject[] = weekDays.map((day) =>
			daysToObject(month, day)
		)

		weeks.push(weekDaysObject)

		// increment for the next week
		date.setDate(date.getDate() + 7)
	}

	return weeks
}

interface MonthProps {
	locale: string
	calendarType: CalendarType
	date: Date
	month?: number
	onClick?: (day: DayObject) => void
}

export const Month = ({
	locale,
	calendarType,
	date,
	month = date.getMonth(),
	onClick,
}: MonthProps) => {
	const year = date.getFullYear()
	const monthText = Object.keys(MONTH)[month]

	return (
		<div className="month" data-month={month}>
			<h3 className="month-title">{monthText}</h3>

			<MonthHeader locale={locale} calendarType={calendarType} />

			<div className="days">
				{getMonthWeeks(month, year, calendarType)
					.flat()
					.map((day) => {
						const { date: dateDay, classNames } = day
						const key = `${dateDay.getTime()}-${classNames[1]}`

						return <Day key={key} locale={locale} day={day} onClick={onClick} />
					})}
			</div>
		</div>
	)
}
