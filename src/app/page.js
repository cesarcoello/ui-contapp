'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserData } from './services/api'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      try {

        const userData = await getUserData(token)
        if (userData.data.detail === 'Inactive user' && userData.error) {
          router.push('/active-user')

        } else {
          setUser(userData.data)

        }




      } catch (err) {
        console.error('Error fetching user data:', err)
        localStorage.removeItem('token')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-800">Cargando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenido, {user?.firstname}</h1>
          <div className="space-y-2 text-gray-700">
            <p><strong>Nombre:</strong> {user?.firstname} {user?.lastname}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}