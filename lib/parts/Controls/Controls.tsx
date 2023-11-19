import "./Controls.css"

import { CalendarView } from "../../Calendar"
import { LeftIcon } from "./LeftIcon"
import { RightIcon } from "./RightIcon"

export interface ControlsProps {
	setDate: React.Dispatch<React.SetStateAction<Date>>
	date: Date
	currentView: CalendarView
	children: React.ReactNode
	nextDate?: string
	prevDate?: string
}

export const Controls = ({
	setDate,
	date,
	currentView,
	children,
	nextDate,
	prevDate,
}: ControlsProps) => {
	const defaultRightEvent = () =>
		setDate((prevDate) => {
			if (currentView === "year") {
				return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())
			}

			if (currentView === "month") {
				return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
			}

			if (currentView === "week") {
				return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
			}

			return prevDate
		})

	const defaultLeftEvent = () =>
		setDate((prevDate) => {
			if (currentView === "year") {
				return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
			}

			if (currentView === "month") {
				return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
			}

			if (currentView === "week") {
				return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
			}

			return prevDate
		})

	return (
		<div className="controls">
			<div className="year">
				<button
					title={prevDate}
					onClick={defaultRightEvent}
					className="left-button"
				>
					<LeftIcon className="left-icon" />
				</button>
				{children}
				<button
					title={nextDate}
					onClick={defaultLeftEvent}
					className="right-button"
				>
					<RightIcon className="right-icon" />
				</button>
			</div>
		</div>
	)
}
