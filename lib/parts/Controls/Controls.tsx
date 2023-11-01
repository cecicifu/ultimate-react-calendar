import { View } from "../../Calendar"
import { LeftIcon } from "./LeftIcon"
import { RightIcon } from "./RightIcon"
import "./Controls.css"

export interface ControlsProps {
	setDate: React.Dispatch<React.SetStateAction<Date>>
	date: Date
	currentView: View
	children: React.ReactNode
}

export const Controls = ({
	setDate,
	date,
	currentView,
	children,
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
			<button onClick={defaultRightEvent} className="left-button">
				<LeftIcon className="left-icon" />
			</button>
			{children}
			<button onClick={defaultLeftEvent} className="right-button">
				<RightIcon className="right-icon" />
			</button>
		</div>
	)
}
