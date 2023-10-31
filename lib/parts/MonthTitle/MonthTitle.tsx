import { MONTH } from "../../utils"
import "./MonthTitle.css"

export interface MonthTitleProps {
	date: Date
}

export const MonthTitle = ({ date }: MonthTitleProps) => {
	const month = date.getMonth()
	const monthText = Object.keys(MONTH)[month]

	return <h3 className="month-title">{monthText}</h3>
}
