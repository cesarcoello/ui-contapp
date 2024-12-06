'use client'

import { useState } from 'react'
import { activeUser } from '../services/api'
import { useRouter } from 'next/navigation'


export default function ActiveUserPage() {

  const [code, setCode] = useState('')
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const router = useRouter()



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (code === '') {
      setError('El código es obligatorio')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      await activeUser(token, code)

      localStorage.removeItem('token')
      router.push('/login')

    } catch (error) {
      console.error('Error fetching user data:', error)
      localStorage.removeItem('token')
      router.push('/login')
    }



  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verificar cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Ingrese su código</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 "
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button disabled={disabled} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {!disabled ? 'Verficar' : 'Verificando...'}
          </button>
        </form>

      </div>
    </div>
  );
}