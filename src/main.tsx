import React from "react"
import ReactDOM from "react-dom/client"

import { Calendar } from "../lib"

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
	<React.StrictMode>
		<Calendar onDayClick={(day) => console.log(day)} />
	</React.StrictMode>
)
