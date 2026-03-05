import seats_icon from '../assets/icons/seats.svg'

export default function TableCard({ table }) {
  const isAvailable = table.isAvailable

  return (
    <div
      className={
        isAvailable
          ? 'w-full min-h-[112px] rounded-xl border border-green-500/80 bg-white px-5 py-4'
          : 'w-full min-h-[112px] rounded-xl border border-gray-200 bg-gray-50 px-5 py-4'
      }
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 truncate text-base font-semibold text-gray-900">{table.name}</p>

        <span
          className={
            isAvailable
              ? 'shrink-0 whitespace-nowrap rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white'
              : 'shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700'
          }
        >
          {isAvailable ? 'Available' : 'Occupied'}
        </span>
      </div>
      <h1 className="mt-1 text-sm font-semibold text-red-700">{table.price}</h1>

      <p className="mt-1 text-sm text-gray-500">{table.type}</p>

      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
        <img src={seats_icon} alt="Seats" className="h-3 w-3" />
        <span>{table.seats} seats</span>
      </div>
    </div>
  )
}
