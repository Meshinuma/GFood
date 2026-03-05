export default function DashboardStatCard({ tableStats }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
      <div>
        <p className="text-xs text-gray-500">{tableStats.title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{tableStats.value}</p>
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tableStats.color}`}>
        <img src={tableStats.icon} alt={tableStats.title} className="h-5 w-5" />
      </div>
    </div>
  )
}
