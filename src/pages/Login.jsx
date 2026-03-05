import { useState } from 'react'
import logoImage from '../images/logo.png'
import FormInput from '../components/FormInput'
import PasswordInput from '../components/PasswordInput'
import ErrorState from '../components/ErrorState'
import Dashboard from './Dashboard'
import { BrowserRouter as Router } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === '123') {
      setUsername('')
      setPassword('')
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Invalid username or password')
    }
  }

  if (isLoggedIn) {
    return (
      <Router>
        <Dashboard setIsAuthenticated={setIsLoggedIn} />
      </Router>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8">
      {/* Login Card */}
      <div className="bg-white shadow-xl gap-6 rounded-2xl flex flex-col p-6 w-[548px]">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logoImage}
            alt="G Food Park Logo"
            className="object-contain rounded-full w-[120px] "
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* Title */}
          <h1 className="text-black text-2xl font-medium text-center">
            Login to your account
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm font-normal text-center">
            Enter your credentials below to login to your account
          </p>
        </div>

        {/* Error Message */}
        {error && <ErrorState error={error} />}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <FormInput
            id="username"
            type="text"
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mb-4"
          />

          {/* Password Field */}
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-6"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#9810FA] text-white font-medium text-lg  h-16 transition-all hover:bg-[#7A0DC8] active:scale-95"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
