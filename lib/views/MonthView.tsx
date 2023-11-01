import { Day, DayObject, DayObjectWithElement } from "../core/Day"
import { Month } from "../core/Month"
import { Week } from "../core/Week"
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
