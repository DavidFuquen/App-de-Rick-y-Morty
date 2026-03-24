import { useEffect, useState } from 'react'
import { getLocations } from '../api/rickAndMortyApi'
import { Location, Info } from '../types'
import Card from '../components/Card'
import Spinner from '../components/Spinner'

function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [info, setInfo] = useState<Info | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getLocations(page)
      .then((data) => {
        setLocations(data.results)
        setInfo(data.info)
      })
      .catch(() => setError('No se pudieron cargar las locaciones.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Locaciones</h1>
          <p className="text-gray-400 mt-1">
            {info ? `${info.count} locaciones encontradas` : ''}
          </p>
        </div>

        {loading && <Spinner />}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {locations.map((location) => (
                <Card
                  key={location.id}
                  title={location.name}
                  badge={location.type}
                  badgeColor="bg-blue-600"
                  details={[
                    { label: 'Dimensión', value: location.dimension },
                    { label: 'Residentes', value: `${location.residents.length} residentes` },
                  ]}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={!info?.prev}
                className="px-5 py-2 bg-green-500 text-white rounded-lg disabled:opacity-30 hover:bg-green-400 transition-colors font-bold"
              >
                ← Anterior
              </button>
              <span className="text-gray-400">
                Página <span className="text-white font-bold">{page}</span> de {info?.pages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!info?.next}
                className="px-5 py-2 bg-green-500 text-white rounded-lg disabled:opacity-30 hover:bg-green-400 transition-colors font-bold"
              >
                Siguiente →
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default LocationsPage