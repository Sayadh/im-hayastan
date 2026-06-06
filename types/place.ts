export type Place = {
  id: number
  name_am: string
  region: string
  category: string
  from_yerevan_minutes: number
  visit_duration_minutes: number
  best_for: string
  route_group: string
  /** Comma-separated ids of nearby places, e.g. "2,3,4" */
  nearby_places: string
}

/** A planner route: places sharing the same route_group. */
export type RouteSuggestion = {
  route_group: string
  places: Place[]
  total_minutes: number
}
