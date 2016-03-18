import cx from 'classnames'
import { lastDayInMonth } from './date-util'

export default ({ className, errors, onCommit, property, value }) => (
  <select
    className={cx(className, 'ct-input ct-month')}
    disabled={!value}
    onChange={ e => onCommit(selectMonth(e.target.value, value))}
    value={getMonth(value)}>
      {renderOptions()}
  </select>
)

function renderOptions() {
  return [<option key='placeholder' value=''>Month...</option>]
    .concat(getMonths().map(month => <option key={month.value} value={month.value}>{month.label}</option>))
}

function calculateDay(month, date) {
  const day = date.getUTCDate()
  const daysInMonth = lastDayInMonth(date.getUTCFullYear(), month)

  return day > daysInMonth ? daysInMonth : day
}

function getMonth(date) {
  return date ? date.getUTCMonth() : ''
}

function getMonths() {
  const months = []
  const language = window.navigator.userLanguage || window.navigator.language
  const formatter = new Intl.DateTimeFormat(language, { month: 'long' })
  const current = new Date(Date.UTC(2016, 0))

  for (let i = 0; i < 12; i++) {
    months.push({ label: formatter.format(current), value: i })
    current.setUTCMonth(i + 1)
  }

  return months
}

function selectMonth(value, date) {
  const month = parseInt(value)
  if (isNaN(month)) {
    return null
  }

  const day = calculateDay(month, date)
  date.setUTCMonth(month, day)

  return date
}
