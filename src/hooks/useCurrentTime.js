import { useState, useEffect } from 'react'

/**
 * Custom hook for managing current time with auto-update
 * @param {number} updateInterval - Interval in milliseconds to update time (default: 60000 for 1 minute)
 * @returns {Date} Current time object
 */
export const useCurrentTime = (updateInterval = 60000) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, updateInterval)
    
    return () => clearInterval(timer)
  }, [updateInterval])

  return currentTime
}
