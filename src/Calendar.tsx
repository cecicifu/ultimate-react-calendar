import { useState } from "react"
import { Year } from "./Year"
import { Month } from "./Month"
import { Week } from "./Week"
import { CALENDAR_TYPES, CalendarType } from "./utils"
import "./Calendar.css"

type View = "year" | "month" | "week"
interface CalendarProps {
	locale?: string
	calendarType?: CalendarType
	date?: Date
	view?: View
}

const Calendar = ({
	locale = "en-US",
	calendarType = CALENDAR_TYPES.ISO_8601,
	view = "year",
	date = new Date(),
}: CalendarProps) => {
	const [currentView, setCurrentView] = useState(view)

	const year = date.getFullYear()

	return (
		<div className="calendar">
			<button onClick={() => setCurrentView("year")}>Year View</button>
			<button onClick={() => setCurrentView("month")}>Month View</button>
			<button onClick={() => setCurrentView("week")}>Week View</button>

			<main className="content">
				<h2 className="year-title">{year}</h2>
				{currentView === "year" && (
					<Year locale={locale} calendarType={calendarType} date={date} />
				)}

				{currentView === "month" && (
					<Month locale={locale} calendarType={calendarType} date={date} />
				)}

				{currentView === "week" && (
					<Week locale={locale} calendarType={calendarType} date={date} />
				)}
			</main>
		</div>
	)
}

export default Calendar
