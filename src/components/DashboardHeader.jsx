import { useState, useRef, useEffect } from 'react'
import logoImage from '../images/logo.png'
import { formatDate } from '../utils/dateFormat'
import { formatTime } from '../utils/timeFormat'

const HamburgerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const LogoutIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
)

const DashboardHeader = ({ setSidebarOpen, currentTime, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 h-16 sm:h-20 px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 z-30">
      {/* Left: hamburger (mobile only) + logo + brand */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <HamburgerIcon />
        </button>
        <img src={logoImage} alt="G FOOD PARK" className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 object-contain" />
        <span className="font-bold text-[#9810FA] text-lg sm:text-xl lg:text-2xl truncate">G FOOD PARK</span>
      </div>

      {/* Right: date/time + profile menu */}
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <div className="hidden sm:flex flex-col text-right mr-1">
          <p className="text-[13px] text-gray-500 leading-none mb-1 font-medium">Current Date and Time</p>
          <p className="text-[17px] font-bold text-black tracking-tight">
            {formatDate(currentTime, { year: 'numeric', month: 'long', day: 'numeric' })}
            <span className="mx-1.5 font-black text-gray-400">·</span>
            {formatTime(currentTime)}
          </p>
        </div>
        <p className="sm:hidden text-xs font-semibold text-gray-700">{formatTime(currentTime)}</p>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-200 border-2 border-[#9810FA] overflow-hidden focus:outline-none transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            <svg className="w-8 h-8 sm:w-9 sm:h-9 text-gray-500 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
              <div className="px-5 py-3">
                <p className="text-sm text-gray-500 mb-0.5">Signed in as</p>
                <p className="text-base font-bold text-black">admin</p> {/* Hardcoded admin as requested by previous logic */}
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  handleLogout()
                }}
                className="w-full text-left px-5 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-gray-50 flex items-center gap-3 transition-colors"
                style={{ fontSize: '15px' }}
              >
                <LogoutIcon /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
