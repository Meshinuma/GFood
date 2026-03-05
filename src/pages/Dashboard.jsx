import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import DashboardContent from './DashboardContent'
import TablesManagement from './TablesManagement'
import Menu from './Menu'
import MenuCrew from './MenuCrew'
import Orders from './Orders'
import DashboardHeader from '../components/DashboardHeader'
import DashboardSidebar from '../components/DashboardSidebar'

import { useCurrentTime } from '../hooks/useCurrentTime'

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const currentTime = useCurrentTime()

  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when resizing to md+
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/')
  }

  const navigateTo = (section) => {
    setActiveSection(section)
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#F5F5F5]">
      {/* ── Header ── */}
      <DashboardHeader
        setSidebarOpen={setSidebarOpen}
        currentTime={currentTime}
        handleLogout={handleLogout}
      />

      {/* ── Body: sidebar + scrollable main ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          navigateTo={navigateTo}
        />

        {/* ── Main scrollable content ── */}
        <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6 lg:p-8">
          {activeSection === 'tables' ? (
            <TablesManagement />
          ) : activeSection === 'menu' ? (
            <Menu />
          ) : activeSection === 'crew' ? (
            <MenuCrew />
          ) : activeSection === 'orders' ? (
            <Orders />
          ) : (
            <DashboardContent />
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
