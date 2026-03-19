import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Car } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encuentra tu próximo auto
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Compra y vende vehículos de forma segura con nuestra comunidad
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/cars"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ver Autos
            </Link>
            {user ? (
              <Link
                href="/publish"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
              >
                Publicar mi Auto
              </Link>
            ) : (
              <Link
                href="/register"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
              >
                Crear Cuenta
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Transacciones Seguras</h3>
              <p className="text-gray-600">Comunícate directamente con vendedores verificados</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Chat en Tiempo Real</h3>
              <p className="text-gray-600">Negocie directamente con compradores y vendedores</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fácil de Usar</h3>
              <p className="text-gray-600">Publica tu auto en minutos y reacha a miles de compradores</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
