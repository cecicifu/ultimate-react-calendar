import "../assets/css/global.css"

import { Day, DayObject, DayObjectWithElement } from "../core/Day"
import { Week } from "../core/Week"
import { DaysOfTheWeek } from "../parts/DaysOfTheWeek"
import { MonthTitle } from "../parts/MonthTitle"
import { CALENDAR_TYPES, CalendarType } from "../utils/date"
import { getNavigatorLocale } from "../utils/navigator"

export interface WeekViewProps {
	calendarType?: CalendarType
	customDay?: (day: DayObject) => React.ReactNode
	customDaysOfTheWeek?: React.ReactNode
	initialDate?: Date
	locale?: string
	formatMonth?: Intl.DateTimeFormatOptions["month"]
	onDayClick?: (day: DayObjectWithElement) => void
	showNonCurrentDates?: boolean
	formatDaysOfTheWeek?: Intl.DateTimeFormatOptions["weekday"]
}

export const WeekView = ({
	calendarType = CALENDAR_TYPES.ISO_8601,
	customDay,
	customDaysOfTheWeek,
	initialDate = new Date(),
	locale = getNavigatorLocale() ?? "en-US",
	formatMonth = "long",
	onDayClick,
	showNonCurrentDates = true,
	formatDaysOfTheWeek = "narrow",
}: WeekViewProps) => {
	return (
		<Week
			monthName={
				<MonthTitle
					locale={locale}
					monthFormat={formatMonth}
					month={initialDate.getMonth()}
				/>
			}
			calendarType={calendarType}
			date={initialDate}
			customDaysOfTheWeek={
				customDaysOfTheWeek ?? (
					<DaysOfTheWeek
						locale={locale}
						calendarType={calendarType}
						format={formatDaysOfTheWeek}
					/>
				)
			}
			dayElement={(day) => {
				const { date: dateDay, classNames } = day
				const key = `${dateDay.getTime()}-${classNames[1]}`

				if (customDay) return customDay(day)

				return (
					<Day
						key={key}
						locale={locale}
						day={day}
						onDayClick={onDayClick}
						showNonCurrentDates={showNonCurrentDates}
					/>
				)
			}}
		/>
	)
}
