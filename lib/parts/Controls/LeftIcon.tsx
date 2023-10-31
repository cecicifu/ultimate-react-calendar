import { ComponentProps } from "react"

interface Props extends ComponentProps<"svg"> {}

export const LeftIcon = (props: Props) => {
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
				<path d="M 26 6 L 6 15.21875 L 6 16.78125 L 26 26 L 26 23.84375 L 9.46875 16 L 26 8.15625 Z"></path>
			</g>
		</svg>
	)
}
