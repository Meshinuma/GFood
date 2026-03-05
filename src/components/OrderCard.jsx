import clock_icon from '../assets/icons/clock_icon.svg'
import { formatTime } from '../utils/timeFormat'
import { useCurrentTime } from '../hooks/useCurrentTime'

export default function OrderCard({ order, onView }) {
  const isIncoming = (order.status || '').toLowerCase() === 'incoming'

  const currentTime = useCurrentTime()

  function getTimeAgo(dateString) {
    const now = new Date(currentTime)
    const created = new Date(dateString)

    const diffMs = now - created
    const diffMinutes = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes} min ago`
    if (diffHours < 24) return `${diffHours} hr ago`
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }

  const timeAgo = getTimeAgo(order.createdAt)

  return (
    <div className=" rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-gray-900">
            {order.service} : {order.table}
          </p>

          <p className="mt-1 text-xs font-medium text-gray-500">{order.id}</p>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
            <img src={clock_icon} alt="Time" className="h-3 w-3" />
            <span>
              {formatTime(order.createdAt)} • {timeAgo}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`
            shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold
            ${
              isIncoming
                ? 'bg-orange-50 text-orange-600 border border-orange-300'
                : 'bg-green-50 text-green-600 border border-green-300'
            }
          `}
        >
          {isIncoming ? 'Incoming' : 'Active'}
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={() => onView?.(order)}
        className="mt-4 w-full rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-800 active:scale-[0.99] transition"
      >
        View Order
      </button>
    </div>
  )
}
