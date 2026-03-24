import { ApiResponse, Character, Episode, Location } from '../types'

const BASE_URL = 'https://rickandmortyapi.com/api'

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo obtener los datos`)
  }
  return response.json()
}

export async function getCharacters(page: number = 1): Promise<ApiResponse<Character>> {
  return fetchData<ApiResponse<Character>>(`${BASE_URL}/character?page=${page}`)
}

export async function searchCharacters(name: string, page: number = 1): Promise<ApiResponse<Character>> {
  return fetchData<ApiResponse<Character>>(`${BASE_URL}/character?name=${name}&page=${page}`)
}

export async function getCharacterById(id: number): Promise<Character> {
  return fetchData<Character>(`${BASE_URL}/character/${id}`)
}

export async function getEpisodes(page: number = 1): Promise<ApiResponse<Episode>> {
  return fetchData<ApiResponse<Episode>>(`${BASE_URL}/episode?page=${page}`)
}

export async function getEpisodeById(id: number): Promise<Episode> {
  return fetchData<Episode>(`${BASE_URL}/episode/${id}`)
}

export async function getLocations(page: number = 1): Promise<ApiResponse<Location>> {
  return fetchData<ApiResponse<Location>>(`${BASE_URL}/location?page=${page}`)
}

export async function getLocationById(id: number): Promise<Location> {
  return fetchData<Location>(`${BASE_URL}/location/${id}`)
}