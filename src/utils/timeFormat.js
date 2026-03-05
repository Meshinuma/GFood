import { toUtcDate } from './dateHelper'

export const formatTime = (date, options = {}) => {
  if (!date) return ''
  
  const d = toUtcDate(date)
  if (!d) return ''
  
  const defaultOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }
  
  return d.toLocaleTimeString('en-US', { ...defaultOptions, ...options })
}
