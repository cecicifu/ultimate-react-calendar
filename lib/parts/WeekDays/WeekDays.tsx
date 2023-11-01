import "./WeekDays.css"

import { CALENDAR_TYPES, CalendarType } from "../../utils/date"

const getWeekDayNames = (
	locale: string,
	calendarType: CalendarType,
	weekDayFormat: Intl.DateTimeFormatOptions["weekday"]
) => {
	const { format } = new Intl.DateTimeFormat(locale, { weekday: weekDayFormat })

	if (
		calendarType === CALENDAR_TYPES.GREGORY ||
		calendarType === CALENDAR_TYPES.HEBREW
	) {
		return [...Array(7).keys()].map((day) =>
			format(new Date(Date.UTC(2021, 1, day)))
		)
	}
	if (calendarType === CALENDAR_TYPES.ISLAMIC) {
		return [...Array(7).keys()].map((day) =>
			format(new Date(Date.UTC(2021, 7, day)))
		)
	}

	return [...Array(7).keys()].map((day) =>
		format(new Date(Date.UTC(2021, 5, day)))
	)
}

export interface WeekHeaderProps {
	locale: string
	calendarType: CalendarType
	format: Intl.DateTimeFormatOptions["weekday"]
}

// TODO fix index key
export const WeekDays = ({
	locale,
	calendarType,
	format: weekDayFormat,
}: WeekHeaderProps) => {
	return (
		<div className="header">
			{getWeekDayNames(locale, calendarType, weekDayFormat).map(
				(day, index) => {
					return <div key={index}>{day}</div>
				}
			)}
		</div>
	)
}
