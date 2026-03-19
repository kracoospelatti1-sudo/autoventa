'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { Car, MessageCircle, Plus, LogOut, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">AutoVenta</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/cars" className="text-gray-600 hover:text-gray-900 px-3 py-2">
              Ver Autos
            </Link>

            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/publish"
                      className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Publicar
                    </Link>
                    <Link
                      href="/chat"
                      className="p-2 text-gray-600 hover:text-gray-900"
                      title="Mensajes"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/my-cars"
                      className="p-2 text-gray-600 hover:text-gray-900"
                      title="Mis Autos"
                    >
                      <Car className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-900 px-3 py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Salir
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                      Ingresar
                    </Link>
                    <Link
                      href="/register"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            <Link href="/cars" className="block px-3 py-2 text-gray-600">Ver Autos</Link>
            {user ? (
              <>
                <Link href="/publish" className="block px-3 py-2 text-blue-600 font-medium">Publicar Auto</Link>
                <Link href="/chat" className="block px-3 py-2 text-gray-600">Mensajes</Link>
                <Link href="/my-cars" className="block px-3 py-2 text-gray-600">Mis Autos</Link>
                <button onClick={handleSignOut} className="block w-full text-left px-3 py-2 text-gray-600">Salir</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-gray-600">Ingresar</Link>
                <Link href="/register" className="block px-3 py-2 text-blue-600 font-medium">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
