import { Month } from "./Month"
import { CalendarType, MONTH } from "./utils"

interface YearProps {
	locale: string
	calendarType: CalendarType
	date: Date
}

export const Year = ({ locale, calendarType, date }: YearProps) => {
	const year = date.getFullYear()

	return (
		<div className="year" data-year={year}>
			{Object.values(MONTH).map((month: number) => {
				const monthNumber = month + 1

				return (
					<Month
						key={monthNumber}
						locale={locale}
						calendarType={calendarType}
						date={date}
						month={month}
					/>
				)
			})}
		</div>
	)
}
