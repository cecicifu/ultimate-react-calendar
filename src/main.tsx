import React from "react"
import ReactDOM from "react-dom/client"

import Calendar from "../lib/Calendar"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Calendar onDayClick={(day) => console.log(day)} />
	</React.StrictMode>
)
