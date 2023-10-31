import { ComponentProps } from "react"

interface RightIconProps extends ComponentProps<"svg"> {}

export const RightIcon = (props: RightIconProps) => {
	return (
		<svg
			{...props}
			fill="#000000"
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path d="M 6 6 L 6 8.15625 L 22.53125 16 L 6 23.84375 L 6 26 L 26 16.78125 L 26 15.21875 Z"></path>
			</g>
		</svg>
	)
}
