/**
 * Reusable form input component
 * @param {string} id - Input ID
 * @param {string} type - Input type (text, email, etc.)
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Current input value
 * @param {Function} onChange - Callback when input changes
 * @param {boolean} required - Whether the field is required
 * @param {string} className - Additional CSS classes
 * @param {Object} style - Additional inline styles
 */
const FormInput = ({
  id,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  style = {}
}) => {
  return (
    <div className={className} style={style}>
      <label
        htmlFor={id}
        className="block font-medium text-base text-black mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required={required}
      />
    </div>
  )
}

export default FormInput
