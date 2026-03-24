import { useEffect, useState } from 'react'
import { getEpisodes } from '../api/rickAndMortyApi'
import { Episode, Info } from '../types'
import Card from '../components/Card'
import Spinner from '../components/Spinner'

function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [info, setInfo] = useState<Info | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getEpisodes(page)
      .then((data) => {
        setEpisodes(data.results)
        setInfo(data.info)
      })
      .catch(() => setError('No se pudieron cargar los episodios.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Episodios</h1>
          <p className="text-gray-400 mt-1">
            {info ? `${info.count} episodios encontrados` : ''}
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
              {episodes.map((episode) => (
                <Card
                  key={episode.id}
                  title={episode.name}
                  badge={episode.episode}
                  badgeColor="bg-purple-600"
                  details={[
                    { label: 'Fecha', value: episode.air_date },
                    { label: 'Personajes', value: `${episode.characters.length} personajes` },
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

export default EpisodesPage