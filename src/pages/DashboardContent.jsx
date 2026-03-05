import { useMemo, useState } from 'react'
import bell_icon from '../assets/icons/bell_icon.svg'
import sales_icon from '../assets/icons/sales_icon.svg'
import order_icon from '../assets/icons/order_icon.svg'
import activetable_icon from '../assets/icons/activetable_icon.svg'
import DashboardStatCard from '../components/DashboardStatCard'

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts'

const DashboardContent = () => {
  const data = [
    {
      name: 'Page A',
      date: '2024-06-01',
      amt: 100
    },
    {
      name: 'Page B',
      date: '2024-06-02',
      amt: 500
    },
    {
      name: 'Page C',
      date: '2024-06-03',
      amt: 300
    },
    {
      name: 'Page D',
      date: '2024-06-04',
      amt: 1500
    },
    {
      name: 'Page E',
      date: '2024-06-05',
      amt: 1200
    },
    {
      name: 'Page F',
      date: '2024-06-06',
      amt: 2400
    }
  ]

  const incomingOrders = [
    {
      id: 'IN-001',
      table: 'T-3',
      service: 'Samgyupsal',
      amount: 380,
      time: '12:01 PM',
      status: 'Incoming',
      isAdditional: false
    },
    {
      id: 'IN-002',
      table: 'R-1',
      service: 'KTV',
      amount: 380,
      time: '12:05 PM',
      status: 'Incoming',
      isAdditional: true
    },
    {
      id: 'IN-004',
      table: 'T-3',
      service: 'Samgyupsal',
      amount: 380,
      time: '12:10 PM',
      status: 'Incoming',
      isAdditional: false
    }
  ]

  const orders = [
    {
      id: '#12345',
      service: 'Samgyupsal',
      table: 'S-1',
      amount: 380,
      time: '12:01 PM',
      status: 'Completed'
    },
    {
      id: '#12346',
      service: 'KTV',
      table: 'R-1',
      amount: 380,
      time: '12:05 PM',
      status: 'In Progress'
    },
    {
      id: '#12350',
      service: 'KTV',
      table: 'R-5',
      amount: 500,
      time: '12:20 PM',
      status: 'Completed'
    },
    {
      id: '#12359',
      service: 'KTV',
      table: 'R-1',
      amount: 600,
      time: '12:20 PM',
      status: 'In Progress'
    }
  ]

  const activeTables = [
    { tableName: 'T-1', category: 'Food', status: 'Occupied' },
    { tableName: 'T-2', category: 'Samgyupsal', status: 'Occupied' },
    { tableName: 'T-3', category: 'KTV', status: 'Available' },
    { tableName: 'T-4', category: 'Food', status: 'Occupied' },
    { tableName: 'T-5', category: 'Food', status: 'Available' },
    { tableName: 'T-6', category: 'Food', status: 'Occupied' },
    { tableName: 'T-7', category: 'KTV', status: 'Available' },
    { tableName: 'T-8', category: 'Samgyupsal', status: 'Available' },
    { tableName: 'T-9', category: 'KTV', status: 'Occupied' },
    { tableName: 'T-10', category: 'Samgyupsal', status: 'Available' }
  ]

  const category = ['Food', 'Samgyupsal', 'KTV']

  const pillClass = (status) =>
    status === 'Occupied'
      ? 'border-orange-500 bg-orange-50 text-orange-600'
      : 'border-green-500 bg-green-50 text-green-600'

  const getTables = (status, category) =>
    activeTables
      .filter((t) => t.status === status && t.category === category)
      .map((t) => t.tableName)

  const newOrdersCount = incomingOrders.filter((x) => !x.label).length
  const totalOrdersCount = orders.length
  const activeTablesCount = activeTables.length

  const [tableStatusTab, setTableStatusTab] = useState('All')
  const [tableSearch, setTableSearch] = useState('')

  const totalSales = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.status === 'Completed' ? o.amount : 0), 0)
  }, [orders])

  const peso = (n) =>
    `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const cardsData = [
    {
      title: 'New Orders',
      value: newOrdersCount,
      icon: bell_icon,
      color: 'bg-blue-50'
    },
    {
      title: 'Total Sales',
      value: peso(totalSales),
      icon: sales_icon,
      color: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: totalOrdersCount,
      icon: order_icon,
      color: 'bg-green-50'
    },
    {
      title: 'Active Tables',
      value: activeTablesCount,
      icon: activetable_icon,
      color: 'bg-green-50'
    }
  ]

  return (
    <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-[#F5F5F5] min-h-full">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Welcome to your restaurant management dashboard
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-4">
          {/* Left: Cards */}
          <div className="flex">
            <div className="flex-1 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 2xl:grid-cols-4 gap-3 xs:gap-4">
              {/* New Orders */}
              {cardsData.map((card) => (
                <DashboardStatCard key={card.title} tableStats={card} />
                // <div
                //   key={card.title}
                //   className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm"
                // >
                //   <div>
                //     <p className="text-xs text-gray-500">{card.title}</p>
                //     <p className="mt-1 text-2xl font-semibold text-gray-900">{card.value}</p>
                //   </div>
                //   {/* bell icon */}
                //   <div
                //     className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
                //   >
                //     <img src={card.icon} alt={card.title} className="h-5 w-5" />
                //   </div>
                // </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            {/* LEFT MAIN */}
            <div className="col-span-1 xl:col-span-2 gap-4">
              {/* SALES OVERVIEW  */}
              <div className="rounded-xl bg-white p-4 shadow-sm ">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Sales Overview</p>
                    <p className="text-xs text-gray-500">Today performance</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium">
                      Today
                    </button>
                    <button className="rounded-lg px-3 py-1 text-xs text-gray-500">
                      This Week
                    </button>
                    <button className="rounded-lg px-3 py-1 text-xs text-gray-500">
                      This Month
                    </button>
                  </div>
                </div>

                <div className="w-full overflow-x-auto mt-4">
                  <LineChart
                    style={{ width: '100%', aspectRatio: 1.618, maxWidth: '100%' }}
                    responsive
                    data={data}
                    //data=""
                  >
                    <CartesianGrid />
                    <Line dataKey="amt" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="amt" />
                    <Legend />
                    {/* <RechartsDevtools /> */}
                  </LineChart>
                </div>
              </div>
              {/* Recent Orders */}
              <div className="mt-4 rounded-xl bg-white p-4 shadow-sm ">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-base font-semibold text-gray-900 shrink-0">Recent Orders</p>

                  <div className="ml-auto flex flex-wrap items-center gap-2">
                    {/* Tabs */}
                    <div className=" inline-flex h-9 shrink-0 items-center rounded-lg bg-gray-200 p-1">
                      {['All', 'Occupied', 'Available'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTableStatusTab(t)}
                          className={`h-7 rounded-md px-3 py-1 text-xs font-medium transition ${
                            tableStatusTab === t
                              ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Search */}
                    <div className="w-full lg:w-auto xl:w-auto ">
                      <input
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        placeholder="Search a table"
                        className="h-9 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none ring-0 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Table for Recent Orders */}
                <div className="mt-3 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-500">
                  <table className="w-full min-w-[640px] md:min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-3 py-2 text-[11px] font-semibold text-gray-500">
                          Order ID
                        </th>
                        <th className="px-3 py-2 text-[11px] font-semibold text-gray-500">
                          Service
                        </th>
                        <th className="px-3 py-2 text-[11px] font-semibold text-gray-500">Table</th>
                        <th className="px-3 py-2 text-[11px] font-semibold text-gray-500">
                          Amount
                        </th>
                        <th className="px-3 py-2 text-[11px] font-semibold text-gray-500">Time</th>
                        <th className="px-3 py-2 text-[11px] font-semibold text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders
                        // filter by tab (maps Occupied/Available to order status)
                        .filter((o) => {
                          if (tableStatusTab === 'All') return true
                          if (tableStatusTab === 'Occupied') return o.status !== 'Completed'
                          if (tableStatusTab === 'Available') return o.status === 'Completed'
                          return true
                        })
                        // filter by search (table column)
                        .filter((o) =>
                          tableSearch.trim()
                            ? o.table.toLowerCase().includes(tableSearch.trim().toLowerCase())
                            : true
                        )
                        .map((o) => (
                          <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-3 py-3 text-xs font-medium text-gray-900">{o.id}</td>
                            <td className="px-3 py-3 text-xs text-gray-700">{o.service}</td>
                            <td className="px-3 py-3 text-xs text-gray-700">{o.table}</td>
                            <td className="px-3 py-3 text-xs text-gray-700">{peso(o.amount)}</td>
                            <td className="px-3 py-3 text-xs text-gray-700">{o.time}</td>
                            <td className="px-3 py-3">
                              <span
                                className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ${
                                  o.status === 'Completed'
                                    ? 'bg-green-50 text-green-700 ring-green-200'
                                    : 'bg-orange-50 text-orange-700 ring-orange-200'
                                }`}
                              >
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: TABLES */}
            {/* <div className="m[-10px]"> */}
            <div className="col-span-1 self-start rounded-xl bg-white p-4 shadow-sm ">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-gray-900">Tables</p>
                <button className="text-sm font-medium text-purple-600 hover:underline">
                  See All
                </button>
              </div>

              {/* OCCUPIED */}
              <div className="mt-2 rounded-lg bg-gray-50 p-3">
                <h6 className="text-xs font-semibold text-gray-900">Occupied Tables/Rooms</h6>

                <div className="mt-2 space-y-3">
                  {category.map((cat) => {
                    const list = getTables('Occupied', cat)
                    return (
                      <div key={`occ-${cat}`}>
                        <p className="text-[11px] font-normal text-gray-700">{cat} Tables</p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {list.length > 0 ? (
                            list.map((name) => (
                              <span
                                key={`occ-${cat}-${name}`}
                                className={`rounded-md border px-3 py-1 text-xs font-semibold ${pillClass(
                                  'Occupied'
                                )}`}
                              >
                                {name}
                              </span>
                            ))
                          ) : (
                            <p className="text-[11px] text-gray-500">No Occupied Tables</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* AVAILABLE */}
              <div className="mt-3 rounded-lg bg-gray-50 p-3">
                <h6 className="text-xs font-semibold text-gray-900">Available Tables/Rooms</h6>

                <div className="mt-2 space-y-3">
                  {category.map((cat) => {
                    const list = getTables('Available', cat)
                    return (
                      <div key={`av-${cat}`}>
                        <p className="text-[11px] font-normal text-gray-700">{cat} Tables</p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {list.length > 0 ? (
                            list.map((name) => (
                              <span
                                key={`av-${cat}-${name}`}
                                className={`rounded-md border px-3 py-1 text-xs font-semibold ${pillClass(
                                  'Available'
                                )}`}
                              >
                                {name}
                              </span>
                            ))
                          ) : (
                            <p className="text-[11px] text-gray-500">No Available Tables</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {/* RIGHT: Incoming Orders */}
        <div className="w-full lg:w-[280px] xl:w-[340px] 2xl:w-[380px] shrink-0">
          <div className="rounded-xl bg-white p-4 shadow-sm  lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-gray-900">Incoming Orders</p>
              <button className="text-sm font-medium text-purple-600 hover:underline">
                See All
              </button>
            </div>

            <div className="mt-3 space-y-2 rounded-lg bg-purple-50 p-3">
              {incomingOrders.map((o) => {
                return (
                  <div
                    key={o.id}
                    className="flex items-center justify-between rounded-lg bg-white px-3 py-2"
                  >
                    {o.isAdditional ? (
                      <p className="text-xs font-medium text-purple-700">Additional Order</p>
                    ) : null}
                    <p className="text-sm font-medium text-purple-700">
                      {o.table} : {o.service}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-purple-700">{peso(o.amount)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
