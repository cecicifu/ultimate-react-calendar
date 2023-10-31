import { DayObject } from "../Day"
import {
	CalendarType,
	daysToObject,
	getFirstDayOfWeek,
	getWeekDays,
} from "../../utils"
import "./Month.css"
import React from "react"
import { MonthTitle } from "../../parts/MonthTitle"

export type Week = DayObject[]

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

	const NUMBER_OF_WEEKS = 6

	const weeks: Week[] = []
	for (let index = 0; index < NUMBER_OF_WEEKS; index++) {
		const weekDays = getWeekDays(date, firstDayOfWeek)

		const weekDaysObject: DayObject[] = weekDays.map((day) =>
			daysToObject(month, day, calendarType)
		)

		weeks.push(weekDaysObject)

		// increment for the next week
		date.setDate(date.getDate() + 7)
	}

	return weeks
}

export interface MonthProps {
	calendarType: CalendarType
	date: Date
	month?: number
	dayElement: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
}

export const Month = ({
	calendarType,
	date,
	month = date.getMonth(),
	customWeekDays,
	dayElement,
}: MonthProps) => {
	const year = date.getFullYear()

	return (
		<div className="month" data-month={month}>
			<MonthTitle month={month} />

			{customWeekDays}

			<div className="days">
				{getMonthWeeks(month, year, calendarType)
					.flat()
					.map((day) => dayElement(day))}
			</div>
		</div>
	)
}
