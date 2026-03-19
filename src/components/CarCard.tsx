'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Car, MapPin, Gauge, Fuel } from 'lucide-react'
import { Database } from '@/types/database'

type Car = Database['public']['Tables']['cars']['Row']

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 bg-gray-200">
          {car.image_url ? (
            <Image
              src={car.image_url}
              alt={car.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Car className="h-16 w-16 text-gray-400" />
            </div>
          )}
          {car.status === 'vendido' && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              Vendido
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{car.title}</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <span>{car.brand} {car.model}</span>
            <span>•</span>
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400 text-sm mt-2">
            {car.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {car.location}
              </span>
            )}
            {car.mileage && (
              <span className="flex items-center gap-1">
                <Gauge className="h-3 w-3" />
                {car.mileage.toLocaleString()} km
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">
              ${car.price.toLocaleString()}
            </span>
            {car.fuel_type && (
              <span className="text-xs text-gray-500 capitalize flex items-center gap-1">
                <Fuel className="h-3 w-3" />
                {car.fuel_type}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
