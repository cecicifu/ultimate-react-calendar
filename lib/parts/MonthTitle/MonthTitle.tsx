import "./MonthTitle.css"

import { getMonthNames } from "../../utils/date"

export interface MonthTitleProps {
	locale: string
	monthFormat: Intl.DateTimeFormatOptions["month"]
	date?: Date
	month?: number
}

export const MonthTitle = ({
	locale,
	monthFormat,
	date = new Date(),
	month,
}: MonthTitleProps) => {
	const dateMonth = date.getMonth()
	const monthTitle = getMonthNames(locale, monthFormat)[month ?? dateMonth]

	return (
		<h3 className="month-title">
			<abbr title={monthTitle.fullName} aria-label={monthTitle.fullName}>
				{monthTitle.abbrName}
			</abbr>
		</h3>
	)
}
