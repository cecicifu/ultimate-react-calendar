import "./Calendar.css"

const LOCALE = "es-es"
const DATE_FORMAT: Intl.DateTimeFormatOptions = {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
}

const YEAR = new Date().getFullYear()
const MONTH = {
	january: 0,
	february: 1,
	march: 2,
	april: 3,
	may: 4,
	june: 5,
	july: 6,
	august: 7,
	september: 8,
	october: 9,
	november: 10,
	december: 11,
}

// 0 = sunday, 1 = monday
const FIRST_WEEK_DAY = 0

// const WEEK = {
//   "monday": 0,
//   "tuesday": 1,
//   "wednesday": 2,
//   "thursday": 3,
//   "friday": 4,
//   "saturday": 5,
//   "sunday": 6
// }

const firstDayOfTheWeek = (month: number, year: number) => {
	const date = new Date(year, month, 1)
	const day = FIRST_WEEK_DAY !== 0 ? date.getDay() : date.getDay() + 1

	return day === 0 ? 7 : day
}

const lastDayOfTheWeek = (month: number, year: number) => {
	const date = new Date(year, month + 1, 0)
	const day = date.getDay()

	return day === 0 ? 7 : day
}

const getLastDaysOfTheMonth = (
	month: number,
	year: number,
	firstDaysAvailable: number
) => {
	const days: Day[] = []

	if (FIRST_WEEK_DAY === new Date(year, month, 1).getDay()) return days

	for (let index = 1; index <= firstDaysAvailable; index++) {
		const date = new Date(year, month, 1)
		days.push({
			date: new Date(date.setDate(date.getDate() - index)),
			class: "day--previous-month",
		})
	}

	return days.reverse()
}

const getNextDaysOfTheMonth = (
	month: number,
	year: number,
	weekDays: number
) => {
	const days: Day[] = []

	for (let index = 1; index <= weekDays; index++) {
		const date = new Date(year, month, 1)
		days.push({
			date: new Date(date.setDate(date.getDate() + index - 1)),
			class: "day--next-month",
		})
	}

	return days
}

const getWeekNumber = (date: Date, startOfWeek: number) => {
	const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
	const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
	const daysUntilStartOfWeek = (7 + startOfWeek - firstDayOfYear.getDay()) % 7
	const daysSinceStartOfWeek = pastDaysOfYear - daysUntilStartOfWeek
	return Math.ceil((daysSinceStartOfWeek + 1) / 7)
}

const getDays = (month: number, year: number) => {
	const date = new Date(year, month, 1)
	const days: Day[] = []

	const lastDayMonth = new Date(year, month + 1, 0)

	const firstDayWeekNumber = getWeekNumber(date, FIRST_WEEK_DAY)
	const lastDayWeekNumber = getWeekNumber(lastDayMonth, FIRST_WEEK_DAY)

	const monthWeeks = lastDayWeekNumber - firstDayWeekNumber + 2

	console.log({ lastDayWeekNumber, firstDayWeekNumber })

	while (date.getMonth() === month) {
		days.push({
			date: new Date(date),
			class: "day--current-month",
		})
		date.setDate(date.getDate() + 1)
	}

	const pastDaysAvailable = 7 - (7 - firstDayOfTheWeek(month, year)) - 1
	// const nextDaysAvailable = 7 - lastDayOfTheWeek(month, year)
	let nextDaysAvailable = 0

	// console.log(monthWeeks)

	if (monthWeeks >= 5) {
		// console.log(lastDayMonth.getDay())

		// first day of the week
		// if (lastDayMonth.getDay() === 0) {

		// console.log(`${lastDayMonth.getMonth() + 1} --> ${lastDayMonth.getDate()}`)

		nextDaysAvailable = 7 - lastDayMonth.getDay() - 1

		if (monthWeeks === 6) {
			nextDaysAvailable += 7
		}
		// }
	}

	const lastDays = getLastDaysOfTheMonth(month, year, pastDaysAvailable)

	const nextDays = getNextDaysOfTheMonth(month, year, nextDaysAvailable)

	return [...lastDays, ...days, ...nextDays]
}

type Day = {
	date: Date
	class: string
}

const Calendar = () => {
	return (
		<div className="calendar">
			<h2>{YEAR}</h2>
			<div className="year" data-year={YEAR}>
				{Object.values(MONTH).map((month: number) => {
					const monthNumber = month + 1
					const monthText = Object.keys(MONTH)[month]

					return (
						<div className="month" key={monthNumber} data-month={month}>
							<h3>{monthText}</h3>
							<div className="week">
								{FIRST_WEEK_DAY === 0 && (
									<>
										<div>D</div>
										<div>L</div>
										<div>M</div>
										<div>X</div>
										<div>J</div>
										<div>V</div>
										<div>S</div>
									</>
								)}
								{/* @ts-ignore */}
								{FIRST_WEEK_DAY === 1 && (
									<>
										<div>L</div>
										<div>M</div>
										<div>X</div>
										<div>J</div>
										<div>V</div>
										<div>S</div>
										<div>D</div>
									</>
								)}
								{/* @ts-ignore */}
								{FIRST_WEEK_DAY === 2 && (
									<>
										<div>M</div>
										<div>X</div>
										<div>J</div>
										<div>V</div>
										<div>S</div>
										<div>D</div>
										<div>L</div>
									</>
								)}
							</div>
							<div className="days">
								{getDays(month, YEAR).map((day) => {
									const dayNumber = day.date.getDate()

									const date = new Date(
										YEAR,
										month,
										dayNumber
									).toLocaleDateString(LOCALE, DATE_FORMAT)

									return (
										<div
											className={`day ${day.class}`}
											key={`${day.date.getTime()}-${day.class}`}
											data-date={date}
										>
											<p>{dayNumber}</p>
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Calendar
