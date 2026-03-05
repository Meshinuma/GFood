import { toUtcDate } from './dateHelper'

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return ''
  
  const date = toUtcDate(dateString)
  if (!date) return ''
  
  const defaultOptions = {
    year: 'numeric',
    month: options.month || 'long',
    day: 'numeric'
  }
  
  // Only include time if explicitly requested
  if (options.hour !== undefined || options.minute !== undefined || options.includeTime) {
    defaultOptions.hour = '2-digit'
    defaultOptions.minute = '2-digit'
  }
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}
