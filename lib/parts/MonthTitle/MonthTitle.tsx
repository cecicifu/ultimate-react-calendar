import { MONTH } from "../../utils"
import "./MonthTitle.css"

export interface MonthTitleProps {
	date?: Date
	month?: number
}

export const MonthTitle = ({ date = new Date(), month }: MonthTitleProps) => {
	const dateMonth = date.getMonth()
	const monthText = Object.keys(MONTH)[month ?? dateMonth]

	return <h3 className="month-title">{monthText}</h3>
}
