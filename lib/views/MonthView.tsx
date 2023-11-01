import "../assets/css/global.css"

import { Day, DayObject, DayObjectWithElement } from "../core/Day"
import { Month } from "../core/Month"
import { Week } from "../core/Week"
import { MonthTitle } from "../parts/MonthTitle"
import { WeekDays } from "../parts/WeekDays"
import { CALENDAR_TYPES, CalendarType } from "../utils/date"
import { getNavigatorLocale } from "../utils/navigator"

export interface MonthViewProps {
	calendarType?: CalendarType
	customDay?: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
	startDate?: Date
	locale?: string
	monthFormat?: Intl.DateTimeFormatOptions["month"]
	onDayClick?: (day: DayObjectWithElement) => void
	showNonCurrentDates?: boolean
	weekDayFormat?: Intl.DateTimeFormatOptions["weekday"]
}

export const MonthView = ({
	calendarType = CALENDAR_TYPES.ISO_8601,
	customDay,
	customWeekDays,
	startDate = new Date(),
	locale = getNavigatorLocale() ?? "en-US",
	monthFormat = "long",
	onDayClick,
	showNonCurrentDates = true,
	weekDayFormat = "narrow",
}: MonthViewProps) => {
	return (
		<Month
			monthName={
				<MonthTitle
					locale={locale}
					monthFormat={monthFormat}
					month={startDate.getMonth()}
				/>
			}
			calendarType={calendarType}
			date={startDate}
			customWeekDays={
				customWeekDays ?? (
					<WeekDays
						locale={locale}
						calendarType={calendarType}
						format={weekDayFormat}
					/>
				)
			}
			weekElement={(week) => {
				return (
					<Week
						key={week[0].date.getTime()}
						calendarType={calendarType}
						week={week}
						date={startDate}
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
}
