<script setup lang="ts">
import { splitCsv, formatDuration } from '~/utils/format'

const route = useRoute()
const { getById, getNearby } = usePlaces()

// Validate the dynamic id: must be a positive integer.
const id = Number(route.params.id)
const place = Number.isInteger(id) && id > 0 ? getById(id) : undefined

// Friendly 404 if the place does not exist.
if (!place) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Այս վայրը գոյություն չունի',
    fatal: true
  })
}

useHead({
  title: `${place.name_am} · Armenia Travel`,
  meta: [
    {
      name: 'description',
      content: `${place.name_am}՝ ${place.region} մարզում։ Իմացիր ինչպես հասնել, ինչ տեսնել և կազմիր երթուղի։`
    }
  ]
})

// Map each place id to its hero image (shared with the listing page).
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
  12: '/images/echmiadzin.png'
}
const imageFor = (pid: number) => imageById[pid] ?? '/images/hero-armenia.png'

// Editorial content per place, with a graceful fallback.
type Content = {
  subtitle: string
  about: string
  whyVisit: string[]
  bestTime: string
  tips: string[]
}
const contentById: Record<number, Content> = {
  1: {
    subtitle: 'Հայաստանի ամենահայտնի հելլենիստական հուշարձաններից մեկը։',
    about:
      'Գառնիի տաճարը մ.թ. 1-ին դարում կառուցված հունահռոմեական ոճի միակ պահպանված հեթանոսական տաճարն է Հայաստանում։ Այն կանգնած է Ազատ գետի կիրճի վրա՝ շքեղ տեսարան բացելով դեպի շրջակա լեռները։',
    whyVisit: [
      'Միակ պահպանված հելլենիստական տաճարը տարածաշրջանում',
      'Անկրկնելի տեսարան դեպի Ազատի կիրճը',
      'Ընդամենը 45 րոպե Երևանից'
    ],
    bestTime:
      'Մայիսից հոկտեմբեր ամիսներն իդեալական են այցելության համար։ Առավոտյան ժամերին լույսն ամենագեղեցիկն է լուսանկարների համար։',
    tips: [
      'Հարմարավետ կոշիկ հագիր՝ քարե հատակների համար',
      'Համատեղիր այցը Քարերի սիմֆոնիայի և Գեղարդի հետ',
      'Տեղում կա ավանդական լավաշ թխող հնոց՝ անպայման փորձիր'
    ]
  }
}
const fallbackContent: Content = {
  subtitle: `${place.region} մարզի հիասքանչ ուղղություններից մեկը։`,
  about: `${place.name_am}-ը ${place.region} մարզի կարևոր տեսարժան վայրերից է, որը գրավում է այցելուներին իր եզակի մթնոլորտով և շրջակա բնությամբ։ Երևանից այստեղ հասնելու համար անհրաժեշտ է մոտ ${formatDuration(place.from_yerevan_minutes)}։`,
  whyVisit: [
    'Հարուստ պատմություն և մշակութային ժառանգություն',
    'Գեղատեսիլ բնություն և անմոռանալի տեսարաններ',
    `Հարմար է՝ ${splitCsv(place.best_for).join(', ')}`
  ],
  bestTime:
    'Տարվա տաք ամիսները՝ մայիսից հոկտեմբեր, լավագույնն են այցելության համար, երբ եղանակը մեղմ է և ճանապարհները՝ հարմար։',
  tips: [
    'Նախապես ստուգիր եղանակի կանխատեսումը',
    'Վերցրու ջուր և հարմարավետ կոշիկներ',
    'Համատեղիր այցը մոտակա ուղղությունների հետ'
  ]
}
const content = contentById[place.id] ?? fallbackContent

const nearby = getNearby(place)

// Build a 1-day itinerary from the route_group siblings.
const { getAll } = usePlaces()
const routeSiblings = getAll().filter((p) => p.route_group === place.route_group)

type Stop = { time: string; label: string }
function buildItinerary(): Stop[] {
  const stops: Stop[] = [{ time: '09:00', label: 'Մեկնում Երևանից' }]
  let minutes = 9 * 60 + place.from_yerevan_minutes
  // Order: current place first, then siblings.
  const ordered = [place, ...routeSiblings.filter((p) => p.id !== place.id)]
  for (const p of ordered) {
    const h = String(Math.floor(minutes / 60) % 24).padStart(2, '0')
    const m = String(minutes % 60).padStart(2, '0')
    stops.push({ time: `${h}:${m}`, label: p.name_am })
    minutes += p.visit_duration_minutes + 20 // visit + travel buffer
  }
  const h = String(Math.floor(minutes / 60) % 24).padStart(2, '0')
  const m = String(minutes % 60).padStart(2, '0')
  stops.push({ time: `${h}:${m}`, label: 'Վերադարձ Երևան' })
  return stops
}
const itinerary = buildItinerary()
const totalVisitMinutes = routeSiblings.reduce((s, p) => s + p.visit_duration_minutes, 0)

const quickInfo = [
  { label: 'Երևանից', value: formatDuration(place.from_yerevan_minutes), icon: 'car' },
  { label: 'Այցի տևողություն', value: formatDuration(place.visit_duration_minutes), icon: 'clock' },
  { label: 'Հարմար է', value: splitCsv(place.best_for).slice(0, 2).join(', '), icon: 'heart' },
  { label: 'Մոտակայքում', value: `${nearby.length} վայր`, icon: 'pin' }
]
</script>

<template>
  <div>
    <!-- 2. HERO -->
    <section class="relative overflow-hidden bg-wine">
      <img
        :src="imageFor(place.id)"
        :alt="`${place.name_am}, ${place.region}`"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/20" />
      <div class="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <NuxtLink
          to="/places"
          class="mb-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-beige/80 transition-colors hover:text-beige"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 19l-7-7 7-7" />
          </svg>
          Բոլոր վայրերը
        </NuxtLink>

        <div class="flex flex-wrap gap-2">
          <span class="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">{{ place.region }}</span>
          <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-beige backdrop-blur-sm">{{ place.category }}</span>
        </div>

        <h1 class="mt-4 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-beige sm:text-5xl lg:text-6xl">
          {{ place.name_am }}
        </h1>
        <p class="mt-4 max-w-xl text-pretty text-base leading-relaxed text-beige/85 sm:text-lg">
          {{ content.subtitle }}
        </p>
      </div>
    </section>

    <!-- 3. QUICK INFO CARDS -->
    <section class="relative z-10 bg-beige">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="-mt-10 grid gap-4 rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          <div
            v-for="info in quickInfo"
            :key="info.label"
            class="flex items-center gap-4 rounded-2xl bg-beige/60 p-4"
          >
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <svg v-if="info.icon === 'car'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 17H3v-5l2-5h11l3 5h2v5h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
              <svg v-else-if="info.icon === 'clock'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              <svg v-else-if="info.icon === 'heart'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 6 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/></svg>
              <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <div class="min-w-0">
              <p class="text-xs font-semibold uppercase tracking-wider text-ink/50">{{ info.label }}</p>
              <p class="truncate font-serif text-lg font-semibold text-ink">{{ info.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. MAIN CONTENT -->
    <section class="bg-beige py-14 lg:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-3">
          <!-- LEFT -->
          <div class="space-y-10 lg:col-span-2">
            <!-- About -->
            <div>
              <h2 class="font-serif text-2xl font-bold text-ink sm:text-3xl">Վայրի մասին</h2>
              <p class="mt-4 text-pretty leading-relaxed text-ink/70">{{ content.about }}</p>
            </div>

            <!-- Why visit -->
            <div class="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
              <h2 class="font-serif text-2xl font-bold text-ink">Ինչու՞ այցելել</h2>
              <ul class="mt-5 space-y-3">
                <li v-for="(reason, i) in content.whyVisit" :key="i" class="flex items-start gap-3">
                  <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span class="text-ink/75">{{ reason }}</span>
                </li>
              </ul>
            </div>

            <!-- Best time -->
            <div>
              <h2 class="font-serif text-2xl font-bold text-ink">Լավագույն ժամանակը</h2>
              <p class="mt-4 text-pretty leading-relaxed text-ink/70">{{ content.bestTime }}</p>
            </div>

            <!-- Tips -->
            <div class="rounded-3xl border border-gold/30 bg-gold/10 p-6 sm:p-8">
              <h2 class="flex items-center gap-2 font-serif text-2xl font-bold text-ink">
                <svg viewBox="0 0 24 24" class="h-6 w-6 text-gold-dark" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/></svg>
                Խորհուրդներ զբոսաշրջիկներին
              </h2>
              <ul class="mt-5 space-y-3">
                <li v-for="(tip, i) in content.tips" :key="i" class="flex items-start gap-3">
                  <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
                  <span class="text-ink/75">{{ tip }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- RIGHT (sticky) -->
          <aside class="lg:col-span-1">
            <div class="space-y-6 lg:sticky lg:top-24">
              <!-- Map placeholder -->
              <div class="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
                <div class="relative aspect-[4/3] bg-wine/5">
                  <img
                    :src="'/images/planner-bg.png'"
                    :alt="`${place.name_am}-ի մոտավոր դիրքը քարտեզի վրա`"
                    class="h-full w-full object-cover opacity-90"
                  />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-beige shadow-lg ring-4 ring-white/40">
                      <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between p-4">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wider text-ink/50">Գտնվելու վայրը</p>
                    <p class="font-serif text-base font-semibold text-ink">{{ place.region }}</p>
                  </div>
                  <span class="rounded-full bg-beige px-3 py-1 text-xs font-medium text-ink/60">Քարտեզ</span>
                </div>
              </div>

              <!-- Route summary -->
              <div class="rounded-3xl bg-wine p-6 text-beige shadow-soft">
                <h3 class="font-serif text-lg font-bold">Երթուղու ամփոփում</h3>
                <dl class="mt-4 space-y-3 text-sm">
                  <div class="flex items-center justify-between border-b border-beige/15 pb-3">
                    <dt class="text-beige/70">Մեկնակետ</dt>
                    <dd class="font-semibold">Երևան</dd>
                  </div>
                  <div class="flex items-center justify-between border-b border-beige/15 pb-3">
                    <dt class="text-beige/70">Տևողություն ճանապ.</dt>
                    <dd class="font-semibold">{{ formatDuration(place.from_yerevan_minutes) }}</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-beige/70">Կանգառներ</dt>
                    <dd class="font-semibold">{{ routeSiblings.length }} վայր</dd>
                  </div>
                </dl>
                <NuxtLink
                  to="/planner"
                  class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-ink transition-transform hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>
                  Կազմել երթուղի AI-ով
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- 5. NEARBY PLACES -->
    <section v-if="nearby.length" class="bg-white py-16 lg:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <p class="text-sm font-semibold uppercase tracking-wider text-brand">Մոտակայքում</p>
          <h2 class="mt-3 text-balance font-serif text-3xl font-bold text-ink sm:text-4xl">
            Մոտակա ուղղություններ
          </h2>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="np in nearby"
            :key="np.id"
            class="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft transition-transform hover:-translate-y-1"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="imageFor(np.id)"
                :alt="`${np.name_am}, ${np.region}`"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
              <span class="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-beige backdrop-blur-sm">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                Երևանից {{ formatDuration(np.from_yerevan_minutes) }}
              </span>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <span class="inline-flex w-fit items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">{{ np.category }}</span>
              <h3 class="mt-2 font-serif text-lg font-semibold text-ink">{{ np.name_am }}</h3>
              <NuxtLink
                :to="`/places/${np.id}`"
                class="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-beige"
              >
                Տեսնել
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 6. SUGGESTED ROUTE -->
    <section class="bg-beige py-16 lg:py-20">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div class="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
          <div class="bg-wine px-6 py-8 text-beige sm:px-8">
            <p class="text-sm font-semibold uppercase tracking-wider text-gold">Առաջարկվող երթուղի</p>
            <h2 class="mt-2 font-serif text-2xl font-bold sm:text-3xl">1-օրյա երթուղի Երևանից</h2>
            <p class="mt-2 text-sm text-beige/75">
              {{ routeSiblings.length }} կանգառ · ընդհանուր այց {{ formatDuration(totalVisitMinutes) }}
            </p>
          </div>

          <ol class="relative p-6 sm:p-8">
            <li
              v-for="(stop, i) in itinerary"
              :key="i"
              class="relative flex gap-5 pb-7 last:pb-0"
            >
              <!-- connector line -->
              <span
                v-if="i < itinerary.length - 1"
                class="absolute left-[1.4rem] top-7 h-full w-px bg-ink/15"
                aria-hidden="true"
              />
              <span
                class="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                :class="i === 0 || i === itinerary.length - 1 ? 'bg-brand text-beige' : 'bg-gold/20 text-gold-dark ring-1 ring-gold/40'"
              >
                {{ stop.time }}
              </span>
              <div class="pt-2.5">
                <p class="font-serif text-base font-semibold text-ink">{{ stop.label }}</p>
              </div>
            </li>
          </ol>

          <div class="border-t border-ink/10 p-6 sm:px-8">
            <NuxtLink
              to="/planner"
              class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-beige transition-colors hover:bg-brand-dark"
            >
              Անհատականացնել երթուղին AI-ով
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
