import "./Month.css"

import React from "react"

import {
	CalendarType,
	daysToObject,
	getDaysOfTheWeek,
	getFirstDayOfWeek,
} from "../../utils/date"
import { DayObject } from "../Day"
import { Week } from "../Week"

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
		const daysOfTheWeek = getDaysOfTheWeek(date, firstDayOfWeek)

		const daysOfTheWeekObject: DayObject[] = daysOfTheWeek.map((day) =>
			daysToObject(month, day, calendarType)
		)

		weeks.push(daysOfTheWeekObject)

		// increment for the next week
		date.setDate(date.getDate() + 7)
	}

	return weeks
}

export interface MonthProps {
	calendarType: CalendarType
	date: Date
	monthName?: React.ReactNode
	month?: number
	weekElement: (day: Week) => React.ReactNode
	customDaysOfTheWeek?: React.ReactNode
}

export const Month = ({
	calendarType,
	date,
	monthName,
	month = date.getMonth(),
	customDaysOfTheWeek,
	weekElement,
}: MonthProps) => {
	const year = date.getFullYear()

	return (
		<div className="month" data-month={month}>
			{monthName}

			{customDaysOfTheWeek}

			<div className="weeks">
				{getMonthWeeks(month, year, calendarType).map((week) =>
					weekElement(week)
				)}
			</div>
		</div>
	)
}
