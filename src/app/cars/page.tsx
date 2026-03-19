import { createClient } from '@/lib/supabase/server'
import CarCard from '@/components/CarCard'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; brand?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('cars')
    .select('*')
    .eq('status', 'disponible')
    .order('created_at', { ascending: false })

  if (params.q) {
    query = query.ilike('title', `%${params.q}%`)
  }

  if (params.brand) {
    query = query.eq('brand', params.brand)
  }

  const { data: cars } = await query

  const { data: brands } = await supabase
    .from('cars')
    .select('brand')
    .eq('status', 'disponible')

  const uniqueBrands = [...new Set(brands?.map(b => b.brand) || [])].sort()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form className="flex-1 relative" action="/cars" method="GET">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="q"
              defaultValue={params.q}
              placeholder="Buscar autos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </form>

          <form action="/cars" method="GET">
            {params.q && <input type="hidden" name="q" value={params.q} />}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="brand"
                defaultValue={params.brand}
                onChange={(e) => e.target.form?.submit()}
                className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Todas las marcas</option>
                {uniqueBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {cars && cars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No se encontraron autos</p>
            <Link href="/cars" className="text-blue-600 hover:underline mt-2 inline-block">
              Ver todos los autos
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
