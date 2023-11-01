import "./Calendar.css"
import "./assets/css/global.css"

import { forwardRef, PropsWithoutRef, useState } from "react"

import { DayObject, DayObjectWithElement } from "./core/Day"
import { Controls } from "./parts/Controls"
import { YearTitle } from "./parts/YearTitle"
import { CALENDAR_TYPES, CalendarType } from "./utils/date"
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
						<YearView
							calendarType={calendarType}
							customDay={customDay}
							customWeekDays={customWeekDays}
							date={date}
							locale={locale}
							onClick={onClick}
							weekDayFormat={weekDayFormat}
						/>
					)}

					{currentView === "month" && (
						<MonthView
							calendarType={calendarType}
							customDay={customDay}
							customWeekDays={customWeekDays}
							date={date}
							locale={locale}
							onClick={onClick}
							weekDayFormat={weekDayFormat}
						/>
					)}

					{currentView === "week" && (
						<WeekView
							calendarType={calendarType}
							customDay={customDay}
							customWeekDays={customWeekDays}
							date={date}
							locale={locale}
							onClick={onClick}
							weekDayFormat={weekDayFormat}
						/>
					)}
				</div>
			</main>
		)
	}
)

export default Calendar
