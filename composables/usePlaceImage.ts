// Maps place ids to their photography in /public/images.
// Shared across the Places grid and the destination detail page.
const imageById: Record<number, string> = {
  1: '/images/garni.png',
  2: '/images/geghard.png',
  3: '/images/symphony.png',
  4: '/images/garni.png',
  5: '/images/sevan.png',
  6: '/images/sevan.png',
  7: '/images/khor-virap.png',
  8: '/images/noravank.png',
  9: '/images/noravank.png',
  10: '/images/tatev.png',
  11: '/images/echmiadzin.png',
  12: '/images/echmiadzin.png',
}

export function usePlaceImage() {
  const imageFor = (id: number) => imageById[id] ?? '/images/hero-armenia.png'
  return { imageFor }
}
