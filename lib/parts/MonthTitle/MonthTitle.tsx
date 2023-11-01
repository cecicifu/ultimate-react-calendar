import "./MonthTitle.css"

import { getMonthNames } from "../../utils/date"

export interface MonthTitleProps {
	locale: string
	date?: Date
	month?: number
}

export const MonthTitle = ({
	locale,
	date = new Date(),
	month,
}: MonthTitleProps) => {
	const dateMonth = date.getMonth()
	const monthTitle = getMonthNames(locale)[month ?? dateMonth]

	return <h3 className="month-title">{monthTitle}</h3>
}
