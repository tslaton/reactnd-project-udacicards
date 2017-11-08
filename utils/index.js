// Libraries
import { format, distanceInWords } from 'date-fns'

export function formatTime(timestamp) {
  const now = Date.now()
  const threeDays = 3 * 24 * 60 * 60 * 1000 // in ms
  return now - timestamp < threeDays
    ? `${distanceInWords(timestamp, now)} ago`
    : `on ${format(timestamp, 'MMMM Do, YYYY')}`
}