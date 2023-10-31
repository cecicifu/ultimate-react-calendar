import "./YearTitle.css"

export interface YearTitleProps {
	date: Date
}

export const YearTitle = ({ date }: YearTitleProps) => {
	const year = date.getFullYear()

	return <h2 className="year-title">{year}</h2>
}
