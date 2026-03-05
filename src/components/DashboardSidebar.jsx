import logoImage from '../images/logo.png'
import dashboardActiveIcon from '../images/dashboard-active.png'
import dashboardNotActiveIcon from '../images/dashboard-not-active.png'
import tableActiveIcon from '../images/table-active.png'
import tableNotActiveIcon from '../images/table-not-active.png'

// ─── Nav config ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    activeIcon: dashboardActiveIcon,
    icon: dashboardNotActiveIcon
  },
  { id: 'tables', label: 'Tables', activeIcon: tableActiveIcon, icon: tableNotActiveIcon },
  { id: 'menu', label: 'Menu', activeIcon: tableActiveIcon, icon: tableNotActiveIcon },
  { id: 'crew', label: 'Crew ', activeIcon: tableActiveIcon, icon: tableNotActiveIcon },
  { id: 'orders', label: 'Orders', activeIcon: tableActiveIcon, icon: tableNotActiveIcon }
]

// ─── Sidebar nav button ────────────────────────────────────────────────────────
const SidebarNavButton = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    title={item.label}
    className={[
      'relative flex flex-col items-center justify-center gap-1.5 rounded-lg border transition-colors focus:outline-none',
      'w-full min-h-[86px] py-4 px-3',
      'md:w-12 md:h-12 md:min-h-0 md:mx-auto md:p-0',
      'lg:w-full lg:min-h-[86px] lg:py-4 lg:px-3',
      isActive
        ? 'bg-[#9810FA] border-transparent shadow-lg text-white'
        : 'border-[#E5E5E5] text-purple-700 hover:bg-purple-50'
    ].join(' ')}
  >
    <img
      src={isActive ? item.activeIcon : item.icon}
      alt={item.label}
      className="w-8 h-8 md:w-5 md:h-5 lg:w-8 lg:h-8 flex-shrink-0"
    />
    <span className="font-semibold text-sm leading-tight text-center block md:hidden lg:block">
      {item.label}
    </span>
  </button>
)

// ─── Close icon ───────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen, activeSection, navigateTo }) => {
  return (
    <aside
      className={[
        'flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto overflow-x-hidden',
        'flex flex-col',
        'transition-transform duration-300 ease-in-out',
        'fixed md:static top-0 bottom-0 left-0 inset-y-0 md:inset-auto',
        'z-50 md:z-auto',
        'w-[220px] md:w-[72px] lg:w-[198px]',
        'px-3 pt-4 pb-6 md:px-2 md:py-4 lg:px-4 lg:py-6',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ].join(' ')}
    >
      {/* Mobile: logo + close button */}
      <div className="md:hidden flex items-center justify-between mb-5 px-1">
        <img src={logoImage} alt="G FOOD PARK" className="h-9 object-contain" />
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map((item) => (
          <SidebarNavButton
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={() => navigateTo(item.id)}
          />
        ))}
      </nav>
    </aside>
  )
}

export default DashboardSidebar
