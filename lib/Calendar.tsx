import { PropsWithoutRef, forwardRef, useState } from "react"
import { Day, DayObject, DayObjectWithElement } from "./core/Day"
import { Month } from "./core/Month"
import { Year } from "./core/Year"
import { Week } from "./core/Week"
import { YearTitle } from "./parts/YearTitle"
import { CALENDAR_TYPES, CalendarType } from "./utils"
import "./Calendar.css"
import "./global.css"
import { WeekDays } from "./parts/WeekDays"

export type View = "year" | "month" | "week"
export interface CalendarProps {
	calendarType?: CalendarType
	className?: PropsWithoutRef<JSX.IntrinsicElements["main"]>["className"]
	customDay?: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
	date?: Date
	locale?: string
	onClick?: (day: DayObjectWithElement) => void
	view?: View
	weekDayFormat?: Intl.DateTimeFormatOptions["weekday"]
}

export type Ref = HTMLElement

const Calendar = forwardRef<Ref, CalendarProps>(
	(
		{
			calendarType = CALENDAR_TYPES.ISO_8601,
			className = "calendar",
			customDay,
			customWeekDays,
			date = new Date(),
			locale = "en-US",
			onClick,
			view = "year",
			weekDayFormat = "narrow",
		},
		ref
	) => {
		const [currentView, setCurrentView] = useState<View>(view)

		return (
			<main ref={ref} className={className}>
				<div className="controls">
					<button onClick={() => setCurrentView("year")}>Year View</button>
					<button onClick={() => setCurrentView("month")}>Month View</button>
					<button onClick={() => setCurrentView("week")}>Week View</button>
				</div>

				<YearTitle date={date} />

				<div className="content">
					{currentView === "year" && (
						<Year
							date={date}
							monthElement={(month) => {
								const monthNumber = month + 1

								return (
									<Month
										key={monthNumber}
										calendarType={calendarType}
										month={month}
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

											return (
												<Day
													key={key}
													locale={locale}
													day={day}
													onClick={onClick}
												/>
											)
										}}
									/>
								)
							}}
						/>
					)}

					{currentView === "month" && (
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
							dayElement={(day) => {
								const { date: dateDay, classNames } = day
								const key = `${dateDay.getTime()}-${classNames[1]}`

								if (customDay) return customDay(day)

								return (
									<Day key={key} locale={locale} day={day} onClick={onClick} />
								)
							}}
						/>
					)}

					{currentView === "week" && (
						<Week
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

								return (
									<Day key={key} locale={locale} day={day} onClick={onClick} />
								)
							}}
						/>
					)}
				</div>
			</main>
		)
	}
)

export default Calendar
