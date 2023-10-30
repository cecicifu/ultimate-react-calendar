import React from "react"
import ReactDOM from "react-dom/client"
import Calendar from "./Calendar.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Calendar locale="es-ES" onClick={(day) => console.log(day)} />
	</React.StrictMode>
)
