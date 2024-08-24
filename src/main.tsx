import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import { Calendar } from "../lib"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Calendar onDayClick={(day) => console.log(day)} />
	</StrictMode>
)
