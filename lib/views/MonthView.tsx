import { Day, DayObject, DayObjectWithElement } from "../core/Day"
import { Month } from "../core/Month"
import { Week } from "../core/Week"
import { MonthTitle } from "../parts/MonthTitle"
import { WeekDays } from "../parts/WeekDays"
import { CalendarType } from "../utils/date"

interface MonthViewProps {
	calendarType: CalendarType
	customDay?: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
	date: Date
	locale: string
	onClick?: (day: DayObjectWithElement) => void
	weekDayFormat?: Intl.DateTimeFormatOptions["weekday"]
}

export const MonthView = ({
	calendarType,
	customDay,
	customWeekDays,
	date,
	locale,
	onClick,
	weekDayFormat,
}: MonthViewProps) => {
	return (
		<Month
			monthName={<MonthTitle locale={locale} month={date.getMonth()} />}
			calendarType={calendarType}
			date={date}
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
						date={date}
						dayElement={(day) => {
							const { date: dateDay, classNames } = day
							const key = `${dateDay.getTime()}-${classNames[1]}`

							if (customDay) return customDay(day)

							return (
								<Day key={key} locale={locale} day={day} onClick={onClick} />
							)
						}}
					/>
				)
			}}
		/>
	)
}
