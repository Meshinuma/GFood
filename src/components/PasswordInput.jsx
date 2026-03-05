import { useState } from 'react'

/**
 * Reusable password input component with show/hide toggle
 * @param {string} id - Input ID
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Current password value
 * @param {Function} onChange - Callback when password changes
 * @param {boolean} required - Whether the field is required
 * @param {string} className - Additional CSS classes
 * @param {Object} style - Additional inline styles
 */
const PasswordInput = ({ 
  id, 
  label, 
  placeholder,
  value, 
  onChange, 
  required = false,
  className = '',
  style = {}
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={className} style={style}>
      <label 
        htmlFor={id} 
        className="block text-black mb-2"
        style={{
          fontWeight: 500,
          fontSize: 'clamp(14px, 3vw, 16px)',
          lineHeight: '150%',
          letterSpacing: '0%'
        }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput
