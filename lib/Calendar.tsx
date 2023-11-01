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

export type View = "year" | "month" | "week"
export interface CalendarProps {
	calendarType?: CalendarType
	className?: PropsWithoutRef<JSX.IntrinsicElements["main"]>["className"]
	customDay?: (day: DayObject) => React.ReactNode
	customWeekDays?: React.ReactNode
	startDate?: Date
	locale?: string
	monthFormat?: Intl.DateTimeFormatOptions["month"]
	onDayClick?: (day: DayObjectWithElement) => void
	showNonCurrentDates?: boolean
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
			locale = getNavigatorLocale() ?? "en-US",
			monthFormat = "long",
			onDayClick,
			showNonCurrentDates = true,
			view = "year",
			weekDayFormat = "narrow",
		},
		ref
	) => {
		const [date, setDate] = useState(startDate)
		const [currentView, setCurrentView] = useState<View>(view)

		const calendarClassnames = [
			"calendar",
			className,
			`${currentView}-view`,
		].join(" ")

		return (
			<main ref={ref} className={calendarClassnames}>
				<Controls setDate={setDate} date={date} currentView={currentView}>
					<YearTitle date={date} />
				</Controls>

				<div className="buttons">
					<div className="views">
						<button
							className={currentView === "year" ? "view-selected" : ""}
							onClick={() => setCurrentView("year")}
						>
							Year View
						</button>
						<button
							className={currentView === "month" ? "view-selected" : ""}
							onClick={() => setCurrentView("month")}
						>
							Month View
						</button>
						<button
							className={currentView === "week" ? "view-selected" : ""}
							onClick={() => setCurrentView("week")}
						>
							Week View
						</button>
					</div>

					<button className="today-button" onClick={() => setDate(new Date())}>
						Today
					</button>
				</div>

				<div className="content">
					{currentView === "year" && (
						<YearView
							calendarType={calendarType}
							customDay={customDay}
							customWeekDays={customWeekDays}
							startDate={date}
							locale={locale}
							monthFormat={monthFormat}
							onDayClick={onDayClick}
							showNonCurrentDates={showNonCurrentDates}
							weekDayFormat={weekDayFormat}
						/>
					)}

					{currentView === "month" && (
						<MonthView
							calendarType={calendarType}
							customDay={customDay}
							customWeekDays={customWeekDays}
							startDate={date}
							locale={locale}
							monthFormat={monthFormat}
							onDayClick={onDayClick}
							showNonCurrentDates={showNonCurrentDates}
							weekDayFormat={weekDayFormat}
						/>
					)}

					{currentView === "week" && (
						<WeekView
							calendarType={calendarType}
							customDay={customDay}
							customWeekDays={customWeekDays}
							startDate={date}
							locale={locale}
							monthFormat={monthFormat}
							onDayClick={onDayClick}
							showNonCurrentDates={showNonCurrentDates}
							weekDayFormat={weekDayFormat}
						/>
					)}
				</div>
			</main>
		)
	}
)

export default Calendar
