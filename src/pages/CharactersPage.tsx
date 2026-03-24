import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCharacters, searchCharacters } from '../api/rickAndMortyApi'
import { Character, Info } from '../types'
import Card from '../components/Card'
import Spinner from '../components/Spinner'

function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [info, setInfo] = useState<Info | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estado del buscador
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    setError(null)

    // Si hay búsqueda activa usa searchCharacters, si no trae todos
    const request = search
      ? searchCharacters(search, page)
      : getCharacters(page)

    request
      .then((data) => {
        setCharacters(data.results)
        setInfo(data.info)
      })
      .catch(() => setError(
        search
          ? `No se encontraron personajes con el nombre "${search}".`
          : 'No se pudieron cargar los personajes.'
      ))
      .finally(() => setLoading(false))
  }, [page, search]) // se ejecuta cuando cambia la página O la búsqueda

  function handleSearch() {
    setPage(1)      // volver a página 1 al buscar
    setSearch(query)
  }

  function handleClear() {
    setQuery('')
    setSearch('')
    setPage(1)
  }

  function getBadgeColor(status: string): string {
    if (status === 'Alive') return 'bg-green-500'
    if (status === 'Dead') return 'bg-red-500'
    return 'bg-gray-500'
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Personajes</h1>
          <p className="text-gray-400 mt-1">
            {info ? `${info.count} personajes encontrados` : ''}
          </p>
        </div>

        {/* Buscador */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar personaje..."
            className="flex-1 bg-[#13192e] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors"
          >
            Buscar
          </button>
          {search && (
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>

        {loading && <Spinner />}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">{error}</p>
            {search && (
              <button
                onClick={handleClear}
                className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                Ver todos los personajes
              </button>
            )}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  image={character.image}
                  title={character.name}
                  subtitle={character.species}
                  badge={character.status}
                  badgeColor={getBadgeColor(character.status)}
                  onClick={() => navigate(`/characters/${character.id}`)}
                  details={[
                    { label: 'Género', value: character.gender },
                    { label: 'Origen', value: character.origin.name },
                  ]}
                />
              ))}
            </div>

            {/* Paginación */}
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

export default CharactersPage