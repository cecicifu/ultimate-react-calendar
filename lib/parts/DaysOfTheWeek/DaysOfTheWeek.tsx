import "./DaysOfTheWeek.css"

import { CALENDAR_TYPES, CalendarType } from "../../utils/date"

const getDaysOfTheWeek = (
	locale: string,
	calendarType: CalendarType,
	formatDaysOfTheWeek: Intl.DateTimeFormatOptions["weekday"]
) => {
	const { format: abbrFormat } = new Intl.DateTimeFormat(locale, {
		weekday: formatDaysOfTheWeek,
	})

	const { format: fullNameFormat } = new Intl.DateTimeFormat(locale, {
		weekday: "long",
	})

	if (
		calendarType === CALENDAR_TYPES.GREGORY ||
		calendarType === CALENDAR_TYPES.HEBREW
	) {
		return [...Array(7).keys()].map((day) => {
			const date = new Date(Date.UTC(2021, 1, day))

			return {
				abbrName: abbrFormat(date),
				fullName: fullNameFormat(date),
			}
		})
	}
	if (calendarType === CALENDAR_TYPES.ISLAMIC) {
		return [...Array(7).keys()].map((day) => {
			const date = new Date(Date.UTC(2021, 7, day))

			return {
				abbrName: abbrFormat(date),
				fullName: fullNameFormat(date),
			}
		})
	}

	return [...Array(7).keys()].map((day) => {
		const date = new Date(Date.UTC(2021, 5, day))

		return {
			abbrName: abbrFormat(date),
			fullName: fullNameFormat(date),
		}
	})
}

export interface DaysOfTheWeekProps {
	locale: string
	calendarType: CalendarType
	format: Intl.DateTimeFormatOptions["weekday"]
}

// TODO fix index key
export const DaysOfTheWeek = ({
	locale,
	calendarType,
	format: formatDaysOfTheWeek,
}: DaysOfTheWeekProps) => {
	return (
		<div className="header">
			{getDaysOfTheWeek(locale, calendarType, formatDaysOfTheWeek).map(
				(day, index) => {
					return (
						<abbr
							key={index}
							title={day.fullName}
							aria-label={day.fullName}
							className="dayOfTheWeek"
						>
							{day.abbrName}
						</abbr>
					)
				}
			)}
		</div>
	)
}
