![version](https://img.shields.io/npm/v/ultimate-react-calendar/latest) ![downloads](https://img.shields.io/npm/dt/ultimate-react-calendar) ![minzipsize](https://img.shields.io/bundlephobia/minzip/ultimate-react-calendar/latest) ![license](https://img.shields.io/github/license/cecicifu/ultimate-react-calendar)

# Ultimate React Calendar

The most complete React calendar for everyone without dependencies.

![Screenshot 2023-11-01 233026](https://github.com/cecicifu/ultimate-react-calendar/assets/15237067/aacf7ea1-fa85-4520-b0db-2f5cad0ec708)

---

## Requirements

React 16 or later.

## Installation

NPM:

```bash
npm install ultimate-react-calendar
```

YARN:

```bash
yarn add ultimate-react-calendar
```

## Usage

You can import all views using:

```jsx
import { Calendar } from "ultimate-react-calendar"

<>
  <Calendar />
</>
```

*If you import all views the calendar will come with some styles. These can always be overwritten.* 

Or choose to only import one view:

```jsx
import { YearView, MonthView, WeekView } from "ultimate-react-calendar"

<>
  <YearView />
  <MonthView />
  <WeekView />
</>
```

## Props

| Prop name           | Description                                                                                                                   | Default value                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| className           | Custom classname for the Calendar container.                                                                                  | `"calendar"`                                              |
| onDayClick          | Callback when click a day from the current month.                                                                             |                                                           |
| calendarType        | Type of calendar most commonly used in a given locale. Types available: `"iso8601"`, `"hebrew"`, `"gregory"` and `"islamic"`. | `"iso8601"`                                               |
| calendarView        | Type of view. Options available: `"year"`, `"month"` and `"year"`.                                                            | `"year"`                                                  |
| formatMonth         | Format in which the month will be displayed. Formats available: `"long"`, `"2-digit"`, `"narrow"`, `"numeric"` and `"short"`. | `"long"`                                                  |
| formatDaysOfTheWeek | Format in which the days of the week will be displayed. Options available: `"long"`, `"narrow"` and `"short"`.                | `"narrow"`                                                |
| customDaysOfTheWeek | Custom component that will be rendered for days of the week.                                                                  |                                                           |
| customDay           | Callback to customize the day that will be rendered.                                                                          |                                                           |
| initialDate         | The beginning of a period that shall be displayed.                                                                            | `new Date()`                                              |
| locale              | Locale that should be used by the calendar. Can be any [IETF Language tag](https://en.wikipedia.org/wiki/IETF_language_tag).  | Browser language or `"en-US"` if the former is not found. |
| showNonCurrentDates | Whether dates in the previous or next month should be displayed at all.                                                       | `true`                                                    |

## License

Under [MIT](https://github.com/cecicifu/ultimate-react-calendar/blob/main/LICENSE) License.
