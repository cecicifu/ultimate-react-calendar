import "./Controls.css"
import { LeftIcon } from "./LeftIcon"
import { RightIcon } from "./RightIcon"

export interface ControlsProps {
	rightEvent?: () => void
	leftEvent?: () => void
	children: React.ReactNode
}

export const Controls = ({
	rightEvent,
	leftEvent,
	children,
}: ControlsProps) => {
	return (
		<div className="controls">
			<button onClick={rightEvent} className="left-button">
				<LeftIcon className="left-icon" />
			</button>
			{children}
			<button onClick={leftEvent} className="right-button">
				<RightIcon className="right-icon" />
			</button>
		</div>
	)
}
