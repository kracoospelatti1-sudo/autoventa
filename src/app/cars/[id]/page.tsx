import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Car, MapPin, Calendar, Fuel, Gauge, User, ArrowLeft } from 'lucide-react'
import ChatButton from './ChatButton'

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: car } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single()

  if (!car) {
    notFound()
  }

  const { data: seller } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', car.user_id)
    .single()

  const { data: conversations } = user ? await supabase
    .from('conversations')
    .select('id')
    .eq('car_id', car.id)
    .eq('buyer_id', user.id)
    .single() : { data: null }

  const isOwner = user?.id === car.user_id

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/cars" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-5 w-5" />
          Volver a los autos
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-64 md:h-96 bg-gray-200">
            {car.image_url ? (
              <Image src={car.image_url} alt={car.title} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Car className="h-24 w-24 text-gray-400" />
              </div>
            )}
            {car.status === 'vendido' && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                VENDIDO
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{car.title}</h1>
                <p className="text-gray-500 mt-1">{car.brand} {car.model} • {car.year}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">${car.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 py-4 border-t border-b border-gray-200">
              {car.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{car.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>{car.year}</span>
              </div>
              {car.mileage && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Gauge className="h-5 w-5" />
                  <span>{car.mileage.toLocaleString()} km</span>
                </div>
              )}
              {car.fuel_type && (
                <div className="flex items-center gap-2 text-gray-600 capitalize">
                  <Fuel className="h-5 w-5" />
                  <span>{car.fuel_type}</span>
                </div>
              )}
            </div>

            {car.description && (
              <div className="mt-6">
                <h2 className="font-semibold text-gray-900 mb-2">Descripción</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{car.description}</p>
              </div>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{seller?.full_name || 'Vendedor'}</p>
                  <p className="text-sm text-gray-500">
                    Miembro desde {seller?.created_at ? new Date(seller.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : 'recientemente'}
                  </p>
                </div>
              </div>
            </div>

            {!isOwner && user && car.status === 'disponible' && (
              <div className="mt-6">
                <ChatButton
                  carId={car.id}
                  sellerId={car.user_id}
                  buyerId={user.id}
                  existingConversationId={conversations?.id}
                />
              </div>
            )}

            {!user && car.status === 'disponible' && (
              <div className="mt-6">
                <Link href="/login" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                  Inicia sesión para contactar al vendedor
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
