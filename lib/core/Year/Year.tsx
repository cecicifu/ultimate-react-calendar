import "./Year.css"

import { MONTH } from "../../utils/date"

export interface YearProps {
	date: Date
	monthElement: (month: number) => React.ReactNode
}

export const Year = ({ date, monthElement }: YearProps) => {
	const year = date.getFullYear()

	return (
		<div className="year" data-year={year}>
			{Object.values(MONTH).map((month: number) => monthElement(month))}
		</div>
	)
}
