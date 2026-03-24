import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCharacterById } from '../api/rickAndMortyApi'
import { Character } from '../types'
import Spinner from '../components/Spinner'

function CharacterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getCharacterById(Number(id))
      .then((data) => setCharacter(data))
      .catch(() => setError('No se pudo cargar el personaje.'))
      .finally(() => setLoading(false))
  }, [id])

  function getBadgeColor(status: string): string {
    if (status === 'Alive') return 'bg-green-500'
    if (status === 'Dead') return 'bg-red-500'
    return 'bg-gray-500'
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-3xl mx-auto">

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-8"
        >
          ← Volver
        </button>

        {loading && <Spinner />}

        {error && (
          <p className="text-red-400 text-center py-20">{error}</p>
        )}

        {!loading && !error && character && (
          <div className="bg-[#13192e] border border-gray-800 rounded-2xl overflow-hidden">

            {/* Imagen y nombre */}
            <div className="relative">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-72 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13192e] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${getBadgeColor(character.status)}`}>
                  {character.status}
                </span>
                <h1 className="text-white text-4xl font-bold mt-2">{character.name}</h1>
                <p className="text-green-400 text-lg">{character.species}</p>
              </div>
            </div>

            {/* Detalles */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

              {[
                { label: 'Género', value: character.gender },
                { label: 'Tipo', value: character.type || 'Desconocido' },
                { label: 'Origen', value: character.origin.name },
                { label: 'Última ubicación', value: character.location.name },
                { label: 'Episodios', value: `Aparece en ${character.episode.length} episodios` },
                { label: 'Creado', value: new Date(character.created).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#0a0e1a] rounded-xl p-4 border border-gray-800"
                >
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="text-white font-bold mt-1">{item.value}</p>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default CharacterDetailPage