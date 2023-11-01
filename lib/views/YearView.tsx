import "../assets/css/global.css"

import { Day, DayObject, DayObjectWithElement } from "../core/Day"
import { Month } from "../core/Month"
import { Week } from "../core/Week"
import { Year } from "../core/Year"
import { DaysOfTheWeek } from "../parts/DaysOfTheWeek"
import { MonthTitle } from "../parts/MonthTitle"
import { CALENDAR_TYPES, CalendarType } from "../utils/date"
import { getNavigatorLocale } from "../utils/navigator"

export interface YearViewProps {
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

export const YearView = ({
	calendarType = CALENDAR_TYPES.ISO_8601,
	customDay,
	customDaysOfTheWeek,
	initialDate = new Date(),
	locale = getNavigatorLocale() ?? "en-US",
	formatMonth = "long",
	onDayClick,
	showNonCurrentDates = true,
	formatDaysOfTheWeek = "narrow",
}: YearViewProps) => {
	return (
		<Year
			date={initialDate}
			monthElement={(month) => {
				const monthNumber = month + 1

				return (
					<Month
						monthName={
							<MonthTitle
								locale={locale}
								monthFormat={formatMonth}
								month={month}
							/>
						}
						key={monthNumber}
						calendarType={calendarType}
						month={month}
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
						weekElement={(week) => {
							return (
								<Week
									key={week[0].date.getTime()}
									calendarType={calendarType}
									week={week}
									date={initialDate}
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
						}}
					/>
				)
			}}
		/>
	)
}
