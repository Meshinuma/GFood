/**
 * Reusable error state component
 * @param {string} error - Error message to display
 */
const ErrorState = ({ error }) => {
  return (
    <div className="text-center py-12">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )
}

export default ErrorState
