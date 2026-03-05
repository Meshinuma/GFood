import { useMemo, useState } from 'react'
import TableCard from '../components/TableCard'
import search_icon from '../assets/icons/search.svg'
import atable_icon from '../assets/icons/atable.svg'
import otable_icon from '../assets/icons/otable.svg'
import ttable_icon from '../assets/icons/ttable.svg'
import TableStatCard from '../components/TableStatCard'

const TablesManagement = () => {
  const tables = [
    { id: 1, name: 'Table 1', type: 'Food', seats: 4, isAvailable: true, price: 100 },
    { id: 2, name: 'Table 2', type: 'Food', seats: 4, isAvailable: true, price: 120 },
    { id: 3, name: 'Table 3', type: 'Food', seats: 6, isAvailable: false, price: 150 },
    { id: 4, name: 'Table 4', type: 'Food', seats: 4, isAvailable: false, price: 100 },
    { id: 5, name: 'Table 1', type: 'Samgyupsal', seats: 4, isAvailable: true, price: 200 },
    { id: 6, name: 'Table 2', type: 'Samgyupsal', seats: 6, isAvailable: false, price: 250 },
    { id: 7, name: 'Table 3', type: 'Samgyupsal', seats: 4, isAvailable: true, price: 180 },
    { id: 8, name: 'Table 4', type: 'Samgyupsal', seats: 4, isAvailable: false, price: 150 },
    { id: 9, name: 'Table 1', type: 'KTV', seats: 6, isAvailable: false, price: 300 },
    { id: 10, name: 'Table 2', type: 'KTV', seats: 4, isAvailable: true, price: 250 },
    { id: 11, name: 'Table 3', type: 'KTV', seats: 4, isAvailable: true, price: 200 },
    { id: 12, name: 'Table 4', type: 'KTV', seats: 6, isAvailable: false, price: 350 },
    { id: 13, name: 'Table 5', type: 'Food', seats: 4, isAvailable: true, price: 120 },
    { id: 14, name: 'Table 6', type: 'Samgyupsal', seats: 6, isAvailable: true, price: 280 },
    { id: 15, name: 'Table7', type: 'KTV', seats: 4, isAvailable: true, price: 220 }
  ]

  const tableStats = [
    { label: 'Total Tables', value: tables.length, icon: ttable_icon },
    {
      label: 'Available Tables',
      value: tables.filter((t) => t.isAvailable).length,
      icon: atable_icon
    },
    {
      label: 'Occupied Tables',
      value: tables.filter((t) => !t.isAvailable).length,
      icon: otable_icon
    }
  ]

  const [view, setView] = useState('all')
  const [search, setSearch] = useState('')

  const filteredTables = useMemo(() => {
    const q = search.trim().toLowerCase()

    return tables
      .filter((t) => (view === 'available' ? t.isAvailable : true))
      .filter((t) => {
        if (!q) return true
        return (
          t.name.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q) ||
          (t.isAvailable ? 'available' : 'occupied').includes(q)
        )
      })
  }, [tables, view, search])

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <main className="flex-1 flex flex-col min-h-0 ">
        {/* Header */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-black mb-1 xs:mb-2">Tables</h1>
              <p className="text-lg font-normal text-gray-600">Manage and track all tables</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tableStats.map((stat) => (
              <TableStatCard key={stat.label} tableStats={stat} />
            ))}

            <div className="md:col-span-3 w-full min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full lg:max-w-[420px]">
                  <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                    <img src={search_icon} alt="Search" className="h-4 w-4" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Search by table name, type, seats..."
                    />
                  </div>
                </div>

                <div className="flex w-full gap-3 lg:w-auto lg:justify-end">
                  <button
                    onClick={() => setView('all')}
                    className={
                      view === 'all'
                        ? 'flex-1 rounded-xl border border-purple-600 bg-purple-50 px-6 py-2 text-sm font-semibold text-purple-700 lg:flex-none'
                        : 'flex-1 rounded-xl border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 lg:flex-none'
                    }
                  >
                    All Tables
                  </button>

                  <button
                    onClick={() => setView('available')}
                    className={
                      view === 'available'
                        ? 'flex-1 rounded-xl border border-purple-600 bg-purple-50 px-6 py-2 text-sm font-semibold text-purple-700 lg:flex-none'
                        : 'flex-1 rounded-xl border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 lg:flex-none'
                    }
                  >
                    Available
                  </button>
                </div>
              </div>

              <h3 className="mt-6 text-base font-semibold text-gray-900">Completed Orders</h3>

              <div className="mt-4 grid sm:grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {filteredTables.map((t) => (
                  <TableCard key={t.id} table={t} />
                ))}
              </div>

              {filteredTables.length === 0 && (
                <p className="mt-4 text-sm text-gray-400">No matching tables found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TablesManagement
