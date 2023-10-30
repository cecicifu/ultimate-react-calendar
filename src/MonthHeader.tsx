import { CALENDAR_TYPES, CalendarType } from "./utils"

interface WeekHeaderProps {
	locale: string
	calendarType: CalendarType
}

const getMonthDayNames = (locale: string, calendarType: CalendarType) => {
	const { format } = new Intl.DateTimeFormat(locale, { weekday: "narrow" })

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

// TODO fix index key
export const MonthHeader = ({ locale, calendarType }: WeekHeaderProps) => {
	return (
		<div className="header">
			{getMonthDayNames(locale, calendarType).map((day, index) => {
				return <div key={index}>{day}</div>
			})}
		</div>
	)
}
