import "./Calendar.css"

import { forwardRef, PropsWithoutRef, useState } from "react"

import { DayObject, DayObjectWithElement } from "./core/Day"
import { Controls } from "./parts/Controls"
import { YearTitle } from "./parts/YearTitle"
import { CALENDAR_TYPES, CalendarType } from "./utils/date"
import { getNavigatorLocale } from "./utils/navigator"
import { MonthView } from "./views/MonthView"
import { WeekView } from "./views/WeekView"
import { YearView } from "./views/YearView"
import { YearViewIcon, MonthViewIcon, WeekViewIcon } from "./parts/ViewIcons"

export type CalendarView = "year" | "month" | "week"

export type LocaleMessages = {
	yearView?: string
	monthView?: string
	weekView?: string
	today?: string
	nextDate?: string
	prevDate?: string
}

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
	messages?: LocaleMessages
}

export type CalendarRef = HTMLElement

export const Calendar = forwardRef<CalendarRef, CalendarProps>(
	(
		{
			calendarType = CALENDAR_TYPES.ISO_8601,
			className,
			customDay,
			customDaysOfTheWeek,
			initialDate = new Date(),
			locale = getNavigatorLocale(),
			formatMonth = "long",
			onDayClick,
			showNonCurrentDates = true,
			calendarView = "year",
			formatDaysOfTheWeek = "narrow",
			messages = {
				yearView: "Year View",
				monthView: "Month View",
				weekView: "Week View",
				today: "Today",
				nextDate: "Next date",
				prevDate: "Previous date",
			},
		},
		ref
	) => {
		const [date, setDate] = useState(initialDate)
		const [currentCalendarView, setCurrentCalendarView] =
			useState<CalendarView>(calendarView)

		const { yearView, monthView, weekView, today, nextDate, prevDate } =
			messages

		const calendarClassnames = [
			"calendar",
			`${currentCalendarView}-view`,
			className,
		].join(" ")

		return (
			<main ref={ref} className={calendarClassnames}>
				<header>
					<div className="today-container">
						<button
							className="today-button"
							onClick={() => setDate(new Date())}
						>
							{today}
						</button>
					</div>
					<Controls
						setDate={setDate}
						date={date}
						currentView={currentCalendarView}
						nextDate={nextDate}
						prevDate={prevDate}
					>
						<YearTitle date={date} />
					</Controls>
					<div className="views">
						<button
							title={yearView}
							className={currentCalendarView === "year" ? "view-selected" : ""}
							onClick={() => setCurrentCalendarView("year")}
						>
							<YearViewIcon />
						</button>
						<button
							title={monthView}
							className={currentCalendarView === "month" ? "view-selected" : ""}
							onClick={() => setCurrentCalendarView("month")}
						>
							<MonthViewIcon />
						</button>
						<button
							title={weekView}
							className={currentCalendarView === "week" ? "view-selected" : ""}
							onClick={() => setCurrentCalendarView("week")}
						>
							<WeekViewIcon />
						</button>
					</div>
				</header>

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
