import "./Calendar.css"
import "./assets/css/global.css"

import { forwardRef, PropsWithoutRef, useState } from "react"

import { DayObject, DayObjectWithElement } from "./core/Day"
import { Controls } from "./parts/Controls"
import { YearTitle } from "./parts/YearTitle"
import { CALENDAR_TYPES, CalendarType } from "./utils/date"
import { getNavigatorLocale } from "./utils/navigator"
import { MonthView } from "./views/MonthView"
import { WeekView } from "./views/WeekView"
import { YearView } from "./views/YearView"

export type CalendarView = "year" | "month" | "week"
export interface CalendarProps {
	calendarType?: CalendarType
	className?: PropsWithoutRef<JSX.IntrinsicElements["main"]>["className"]
	customDay?: (day: DayObject) => React.ReactNode
	customDaysOfTheWeek?: React.ReactNode
	initialDate?: Date
	locale?: string
	formatMonth?: Intl.DateTimeFormatOptions["month"]
	onDayClick?: (day: DayObjectWithElement) => void
	showNonCurrentDates?: boolean
	calendarView?: CalendarView
	formatDaysOfTheWeek?: Intl.DateTimeFormatOptions["weekday"]
}

export type Ref = HTMLElement

const Calendar = forwardRef<Ref, CalendarProps>(
	(
		{
			calendarType = CALENDAR_TYPES.ISO_8601,
			className,
			customDay,
			customDaysOfTheWeek,
			initialDate = new Date(),
			locale = getNavigatorLocale() ?? "en-US",
			formatMonth = "long",
			onDayClick,
			showNonCurrentDates = true,
			calendarView = "year",
			formatDaysOfTheWeek = "narrow",
		},
		ref
	) => {
		const [date, setDate] = useState(initialDate)
		const [currentCalendarView, setCurrentCalendarView] =
			useState<CalendarView>(calendarView)

		const calendarClassnames = [
			"calendar",
			`${currentCalendarView}-view`,
			className,
		].join(" ")

		return (
			<main ref={ref} className={calendarClassnames}>
				<Controls
					setDate={setDate}
					date={date}
					currentView={currentCalendarView}
				>
					<YearTitle date={date} />
				</Controls>

				<div className="buttons">
					<div className="views">
						<button
							className={currentCalendarView === "year" ? "view-selected" : ""}
							onClick={() => setCurrentCalendarView("year")}
						>
							Year View
						</button>
						<button
							className={currentCalendarView === "month" ? "view-selected" : ""}
							onClick={() => setCurrentCalendarView("month")}
						>
							Month View
						</button>
						<button
							className={currentCalendarView === "week" ? "view-selected" : ""}
							onClick={() => setCurrentCalendarView("week")}
						>
							Week View
						</button>
					</div>

					<button className="today-button" onClick={() => setDate(new Date())}>
						Today
					</button>
				</div>

				<div className="content">
					{currentCalendarView === "year" && (
						<YearView
							calendarType={calendarType}
							customDay={customDay}
							customDaysOfTheWeek={customDaysOfTheWeek}
							initialDate={date}
							locale={locale}
							formatMonth={formatMonth}
							onDayClick={onDayClick}
							showNonCurrentDates={showNonCurrentDates}
							formatDaysOfTheWeek={formatDaysOfTheWeek}
						/>
					)}

					{currentCalendarView === "month" && (
						<MonthView
							calendarType={calendarType}
							customDay={customDay}
							customDaysOfTheWeek={customDaysOfTheWeek}
							initialDate={date}
							locale={locale}
							formatMonth={formatMonth}
							onDayClick={onDayClick}
							showNonCurrentDates={showNonCurrentDates}
							formatDaysOfTheWeek={formatDaysOfTheWeek}
						/>
					)}

					{currentCalendarView === "week" && (
						<WeekView
							calendarType={calendarType}
							customDay={customDay}
							customDaysOfTheWeek={customDaysOfTheWeek}
							initialDate={date}
							locale={locale}
							formatMonth={formatMonth}
							onDayClick={onDayClick}
							showNonCurrentDates={showNonCurrentDates}
							formatDaysOfTheWeek={formatDaysOfTheWeek}
						/>
					)}
				</div>
			</main>
		)
	}
)

export default Calendar
