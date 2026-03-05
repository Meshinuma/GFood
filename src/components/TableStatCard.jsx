export default function TableStatCard({ tableStats }) {
  return (
    <div>
      <div className="flex items-start justify-between rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-black/5">
        <div>
          <p className="text-xs text-gray-500">{tableStats.label}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{tableStats.value}</p>
        </div>
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100">
          <img src={tableStats.icon} alt={tableStats.label} className="h-12 w-12" />
        </div>
      </div>
    </div>
  )
}
