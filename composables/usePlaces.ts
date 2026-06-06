import placesData from '~/data/places.json'
import type { Place, RouteSuggestion } from '~/types/place'
import { parseIds, splitCsv } from '~/utils/format'

// Single typed source of truth. When we move to PostgreSQL,
// only this composable changes (swap the import for a $fetch('/api/places')).
const places = placesData as Place[]

export function usePlaces() {
  const getAll = (): Place[] => places

  const getById = (id: number): Place | undefined =>
    places.find((p) => p.id === id)

  const getNearby = (place: Place): Place[] =>
    parseIds(place.nearby_places)
      .map((id) => getById(id))
      .filter((p): p is Place => Boolean(p))

  /**
   * Filter places by category and/or interest (best_for),
   * then group them by route_group into route suggestions.
   */
  const suggestRoutes = (opts: {
    category?: string
    interest?: string
  }): RouteSuggestion[] => {
    const { category, interest } = opts

    const filtered = places.filter((p) => {
      const matchCategory = !category || p.category === category
      const matchInterest =
        !interest ||
        splitCsv(p.best_for).some(
          (b) => b.toLowerCase() === interest.toLowerCase()
        )
      return matchCategory && matchInterest
    })

    const groups = new Map<string, Place[]>()
    for (const p of filtered) {
      const list = groups.get(p.route_group) ?? []
      list.push(p)
      groups.set(p.route_group, list)
    }

    return [...groups.entries()]
      .map(([route_group, groupPlaces]) => ({
        route_group,
        places: groupPlaces,
        total_minutes: groupPlaces.reduce(
          (sum, p) => sum + p.visit_duration_minutes,
          0
        )
      }))
      .sort((a, b) => b.places.length - a.places.length)
  }

  // Unique, sorted helper lists for filter dropdowns.
  const categories = (): string[] =>
    [...new Set(places.map((p) => p.category))].sort()

  const interests = (): string[] =>
    [...new Set(places.flatMap((p) => splitCsv(p.best_for)))].sort()

  return { getAll, getById, getNearby, suggestRoutes, categories, interests }
}
