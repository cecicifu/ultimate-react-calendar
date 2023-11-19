import { ComponentProps } from "react"

interface RightIconProps extends ComponentProps<"svg"> {}

export const RightIcon = (props: RightIconProps) => {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			className="right-icon"
		>
			<polyline points="9 18 15 12 9 6"></polyline>
		</svg>
	)
}
