# Ultimate React Calendar

The most complete React calendar for everyone.

![Screenshot 2023-11-01 191824](https://github.com/cecicifu/ultimate-react-calendar/assets/15237067/19d52583-3a24-415c-b669-1ea1d58ff7e2)

---

## Requirements

React >= 18.2.x

## Installation

NPM

```bash
npm install ultimate-react-calendar
```

YARN

```bash
yarn add ultimate-react-calendar
```

## Usage

You can import the full calendar using:

```js
import { Calendar } from "ultimate-react-calendar"

<>
  <Calendar />
</>
```

or choose to only use one view:

```js
import { YearView, MonthView, WeekView } from "ultimate-react-calendar"

<>
  <YearView />
  <MonthView />
  <WeekView />
</>
```

## Props

| Prop name           | Description                                                                                                                   | Default value                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| onDayClick          | Callback when click a day from the current month.                                                                             | n/a                                                     |
| classname           | Custom classname for the Calendar container.                                                                                  | `"calendar"`                                            |
| customDay           | Callback to customize the day that will be rendered.                                                                          | n/a                                                     |
| calendarType        | Type of calendar most commonly used in a given locale. Types available: `"iso8601"`, `"hebrew"`, `"gregory"` and `"islamic"`. | `"iso8601"`                                             |
| customWeekDays      | Received a custom component that will be rendered.                                                                            | n/a                                                     |
| startDate           | The beginning of a period that shall be displayed.                                                                            | `new Date()`                                            |
| locale              | Locale that should be used by the calendar. Can be any [IETF Language tag](https://en.wikipedia.org/wiki/IETF_language_tag).  | Browser language or `en-US` if the former is not found. |
| monthFormat         | Format in which the month will be displayed. Formats available: `"long"`, `"2-digit"`, `"narrow"`, `"numeric"` and `"short"`. | `"long"`                                                |
| showNonCurrentDates | Whether dates in the previous or next month should be displayed at all.                                                       | `true`                                                  |
| view                | Options available: `"year"`, `"month"` and `"year"`.                                                                          | `"year"`                                                |
| weekDayFormat       | Format in which the weekdays will be displayed. Options available: `"long"`, `"narrow"` and `"short"`.                        | `"narrow"`                                              |

## License

[MIT](https://github.com/cecicifu/ultimate-react-calendar/blob/main/LICENSE) License.
