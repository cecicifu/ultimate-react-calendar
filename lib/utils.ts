import { DayObject } from "./core/Day"

export const DATE_FORMAT: Intl.DateTimeFormatOptions = Object.freeze({
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
})

export const MONTH = Object.freeze({
	january: 0,
	february: 1,
	march: 2,
	april: 3,
	may: 4,
	june: 5,
	july: 6,
	august: 7,
	september: 8,
	october: 9,
	november: 10,
	december: 11,
})

export const CALENDAR_TYPES = Object.freeze({
	ISO_8601: "iso8601",
	ISLAMIC: "islamic",
	HEBREW: "hebrew",
	GREGORY: "gregory",
} as const)

export type CalendarType = (typeof CALENDAR_TYPES)[keyof typeof CALENDAR_TYPES]

export function getFirstDayOfWeek(
	date: Date,
	calendarType: CalendarType = CALENDAR_TYPES.ISO_8601
) {
	const weekday = date.getDay()

	switch (calendarType) {
		case CALENDAR_TYPES.ISO_8601:
			// Shifts days of the week so that Monday is 0, Sunday is 6
			return (weekday + 6) % 7
		case CALENDAR_TYPES.ISLAMIC:
			return (weekday + 1) % 7
		case CALENDAR_TYPES.HEBREW:
		case CALENDAR_TYPES.GREGORY:
			return weekday
		default:
			throw new Error("Unsupported calendar type.")
	}
}

export type Days = Date[]
export function getWeekDays(date: Date, firstDayOfWeek: number) {
	// TODO check if the timezone may cause issues

	const days: Days = []
	for (let index = 0; index < 7; index++) {
		const day = new Date(date)
		day.setDate(date.getDate() + index - firstDayOfWeek)

		// Check if the first day of the week is Sunday and the first day of the month is also Sunday
		// If true, then we need to show the current month
		if (
			firstDayOfWeek === 0 &&
			index === 0 &&
			day.getMonth() !== date.getMonth()
		) {
			day.setDate(day.getDate() + 7)
		}

		// Check if the first day of the week is Monday and the first day of the month is Sunday
		// If true, then we need to show the previous month
		if (
			firstDayOfWeek === 1 &&
			index === 0 &&
			day.getMonth() !== date.getMonth()
		) {
			day.setDate(day.getDate() - index)
		}

		days.push(day)
	}

	return days
}

export const daysToObject = (
	currentMonth: number,
	day: Date,
	calendarType: CalendarType
) => {
	const currentDate = new Date()

	const dayObject: DayObject = {
		date: day,
		classNames: ["day"],
	}

	const isPreviousMonth = currentMonth === day.getMonth() + 1
	const isNextMonth = currentMonth === day.getMonth() - 1
	const isPreviousYear = currentMonth === 0 && day.getMonth() === 11
	const isNextYear = currentMonth === 11 && day.getMonth() === 0

	const isWeekend =
		calendarType === CALENDAR_TYPES.ISLAMIC ||
		calendarType === CALENDAR_TYPES.HEBREW
			? day.getDay() === 5 || day.getDay() === 6
			: day.getDay() === 0 || day.getDay() === 6

	const isToday =
		day.getDate() === currentDate.getDate() &&
		day.getMonth() === currentDate.getMonth() &&
		day.getFullYear() === currentDate.getFullYear()

	if (isNextMonth || isNextYear) {
		dayObject.classNames.push("day--next-month")

		if (isNextYear) {
			dayObject.classNames.push("day--next-year")
		}

		if (isWeekend) {
			dayObject.classNames.push("day--weekend")
		}

		if (isToday) {
			dayObject.classNames.push("day--today")
		}

		return dayObject
	}

	if (isPreviousMonth || isPreviousYear) {
		dayObject.classNames.push("day--previous-month")

		if (isPreviousYear) {
			dayObject.classNames.push("day--previous-year")
		}

		if (isWeekend) {
			dayObject.classNames.push("day--weekend")
		}

		if (isToday) {
			dayObject.classNames.push("day--today")
		}

		return dayObject
	}

	dayObject.classNames.push("day--current-month")

	if (isWeekend) {
		dayObject.classNames.push("day--weekend")
	}

	if (isToday) {
		dayObject.classNames.push("day--today")
	}

	return dayObject
}

export const getWeekNumber = (date: Date) => {
	date = new Date(date)
	date.setHours(0, 0, 0, 0)
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
	const jan1 = new Date(date.getFullYear(), 0, 1)
	const weekNumber =
		1 +
		Math.ceil(
			((date.getTime() - jan1.getTime()) / 86400000 -
				3 +
				((jan1.getDay() + 6) % 7)) /
				7
		)
	return weekNumber
}
