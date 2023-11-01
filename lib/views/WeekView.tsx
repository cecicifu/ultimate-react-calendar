import { Day, DayObject, DayObjectWithElement } from "../core/Day"
import { Week } from "../core/Week"
import { MonthTitle } from "../parts/MonthTitle"
import { WeekDays } from "../parts/WeekDays"
import { CalendarType } from "../utils/date"

export interface WeekViewProps {
	calendarType: CalendarType
	customDay?: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
	date: Date
	locale: string
	onClick?: (day: DayObjectWithElement) => void
	weekDayFormat?: Intl.DateTimeFormatOptions["weekday"]
}

export const WeekView = ({
	calendarType,
	customDay,
	customWeekDays,
	date,
	locale,
	onClick,
	weekDayFormat,
}: WeekViewProps) => {
	return (
		<Week
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
			dayElement={(day) => {
				const { date: dateDay, classNames } = day
				const key = `${dateDay.getTime()}-${classNames[1]}`

				if (customDay) return customDay(day)

				return <Day key={key} locale={locale} day={day} onClick={onClick} />
			}}
		/>
	)
}
