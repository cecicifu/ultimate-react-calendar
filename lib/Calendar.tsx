import { PropsWithoutRef, forwardRef, useState } from "react"
import { Day, DayObject, DayObjectWithElement } from "./core/Day"
import { Month } from "./core/Month"
import { Year } from "./core/Year"
import { Week } from "./core/Week"
import { YearTitle } from "./parts/YearTitle"
import { WeekDays } from "./parts/WeekDays"
import { Controls } from "./parts/Controls"
import { CALENDAR_TYPES, CalendarType } from "./utils"
import "./Calendar.css"
import "./assets/css/global.css"

export type View = "year" | "month" | "week"
export interface CalendarProps {
	calendarType?: CalendarType
	className?: PropsWithoutRef<JSX.IntrinsicElements["main"]>["className"]
	customDay?: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
	startDate?: Date
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
			startDate = new Date(),
			locale = "en-US",
			onClick,
			view = "year",
			weekDayFormat = "narrow",
		},
		ref
	) => {
		const [date, setDate] = useState(startDate)
		const [currentView, setCurrentView] = useState<View>(view)

		return (
			<main ref={ref} className={className}>
				<div className="controls">
					<button onClick={() => setCurrentView("year")}>Year View</button>
					<button onClick={() => setCurrentView("month")}>Month View</button>
					<button onClick={() => setCurrentView("week")}>Week View</button>
				</div>

				<Controls setDate={setDate} date={date} currentView={currentView}>
					<YearTitle date={date} />
				</Controls>

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
