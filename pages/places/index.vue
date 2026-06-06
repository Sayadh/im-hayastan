<script setup lang="ts">
import { splitCsv, formatDuration } from '~/utils/format'

useHead({
  title: 'Տեսարժան վայրեր · Armenia Travel',
  meta: [
    {
      name: 'description',
      content:
        'Բացահայտիր Հայաստանի տեսարժան վայրերը՝ ֆիլտրիր ըստ մարզի, կատեգորիայի և հետաքրքրությունների։'
    }
  ]
})

const { getAll } = usePlaces()
const allPlaces = getAll()

// Map each place id to its hero image.
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

const imageFor = (id: number) => imageById[id] ?? '/images/hero-armenia.png'

// Filter state
const route = useRoute()
const search = ref('')
const region = ref(typeof route.query.region === 'string' ? route.query.region : '')
const category = ref('')
const bestFor = ref('')

const regions = [...new Set(allPlaces.map((p) => p.region))].sort()
const categories = [...new Set(allPlaces.map((p) => p.category))].sort()
const bestForOptions = [...new Set(allPlaces.flatMap((p) => splitCsv(p.best_for)))].sort()

const filtered = computed(() =>
  allPlaces.filter((p) => {
    const q = search.value.trim().toLowerCase()
    const matchSearch =
      !q ||
      p.name_am.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q)
    const matchRegion = !region.value || p.region === region.value
    const matchCategory = !category.value || p.category === category.value
    const matchBestFor =
      !bestFor.value || splitCsv(p.best_for).includes(bestFor.value)
    return matchSearch && matchRegion && matchCategory && matchBestFor
  })
)

const hasFilters = computed(
  () => !!(search.value || region.value || category.value || bestFor.value)
)

function resetFilters() {
  search.value = ''
  region.value = ''
  category.value = ''
  bestFor.value = ''
}

// Regions section data
const regionCards = [
  { name: 'Կոտայք', img: '/images/region-kotayk.png' },
  { name: 'Տավուշ', img: '/images/region-tavush.png' },
  { name: 'Սյունիք', img: '/images/region-syunik.png' },
  { name: 'Լոռի', img: '/images/region-lori.png' },
  { name: 'Վայոց ձոր', img: '/images/region-vayots.png' },
  { name: 'Գեղարքունիք', img: '/images/region-gegharkunik.png' }
].map((r) => ({
  ...r,
  count: allPlaces.filter((p) => p.region === r.name).length
}))
</script>

<template>
  <div>
    <!-- 1. HERO -->
    <section class="relative overflow-hidden bg-wine">
      <img
        :src="'/images/dilijan.png'"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-wine via-wine/70 to-wine/50" />
      <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <span class="inline-flex w-fit items-center gap-2 rounded-full border border-beige/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-beige backdrop-blur-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-gold" />
          Տեսարժան վայրեր
        </span>
        <h1 class="mt-6 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-beige sm:text-5xl">
          Բացահայտիր Հայաստանի տեսարժան վայրերը
        </h1>
        <p class="mt-5 max-w-xl text-pretty text-base leading-relaxed text-beige/80 sm:text-lg">
          Ընտրիր քո հաջորդ ուղղությունը և կազմիր անմոռանալի ճանապարհորդություն։
        </p>
      </div>
    </section>

    <!-- 2. SEARCH & FILTERS -->
    <section class="border-b border-ink/10 bg-beige">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-6">
          <div class="grid gap-4 lg:grid-cols-12">
            <!-- Search -->
            <div class="lg:col-span-4">
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/50">Որոնում</label>
              <div class="relative">
                <svg viewBox="0 0 24 24" class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  v-model="search"
                  type="text"
                  placeholder="Փնտրիր վայր..."
                  class="w-full rounded-full border border-ink/15 bg-beige/50 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <!-- Region -->
            <div class="lg:col-span-3">
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/50">Մարզ</label>
              <select
                v-model="region"
                class="w-full rounded-full border border-ink/15 bg-beige/50 px-4 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">Բոլոր մարզերը</option>
                <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
              </select>
            </div>

            <!-- Category -->
            <div class="lg:col-span-3">
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/50">Կատեգորիա</label>
              <select
                v-model="category"
                class="w-full rounded-full border border-ink/15 bg-beige/50 px-4 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">Բոլոր կատեգորիաները</option>
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <!-- Best for -->
            <div class="lg:col-span-2">
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/50">Հարմար է</label>
              <select
                v-model="bestFor"
                class="w-full rounded-full border border-ink/15 bg-beige/50 px-4 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">Բոլորը</option>
                <option v-for="b in bestForOptions" :key="b" :value="b">{{ b }}</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between gap-4">
            <p class="text-sm text-ink/50">
              <span class="font-semibold text-ink">{{ filtered.length }}</span> վայր գտնվեց
            </p>
            <button
              v-if="hasFilters"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-brand hover:text-brand"
              @click="resetFilters"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Մաքրել ֆիլտրերը
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. DESTINATIONS GRID -->
    <section class="bg-beige py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div v-if="filtered.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="place in filtered"
            :key="place.id"
            class="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft transition-transform hover:-translate-y-1"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="imageFor(place.id)"
                :alt="`${place.name_am}, ${place.region}`"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <div class="absolute left-4 top-4 flex flex-wrap gap-2">
                <span class="rounded-full bg-gold/95 px-3 py-1 text-xs font-semibold text-ink">{{ place.region }}</span>
              </div>
              <span class="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-beige backdrop-blur-sm">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                Երևանից {{ formatDuration(place.from_yerevan_minutes) }}
              </span>
            </div>

            <div class="flex flex-1 flex-col p-6">
              <span class="inline-flex w-fit items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
                {{ place.category }}
              </span>
              <h3 class="mt-3 font-serif text-xl font-semibold text-ink">{{ place.name_am }}</h3>

              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in splitCsv(place.best_for)"
                  :key="tag"
                  class="rounded-full border border-ink/10 bg-beige px-2.5 py-0.5 text-xs text-ink/60"
                >
                  {{ tag }}
                </span>
              </div>

              <NuxtLink
                :to="`/places/${place.id}`"
                class="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-beige transition-colors hover:bg-brand-dark"
              >
                Տեսնել ավելին
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Empty state -->
        <div v-else class="rounded-3xl border border-dashed border-ink/20 bg-white py-20 text-center">
          <p class="font-serif text-xl font-semibold text-ink">Արդյունք չգտնվեց</p>
          <p class="mt-2 text-sm text-ink/55">Փորձիր փոխել ֆիլտրերը կամ որոնման բառը։</p>
          <button
            type="button"
            class="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-beige transition-colors hover:bg-brand-dark"
            @click="resetFilters"
          >
            Մաքրել ֆիլտրերը
          </button>
        </div>
      </div>
    </section>

    <!-- 4. EXPLORE BY REGIONS -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <p class="text-sm font-semibold uppercase tracking-wider text-brand">Ուսումնասիրիր</p>
          <h2 class="mt-3 text-balance font-serif text-3xl font-bold text-ink sm:text-4xl">
            Բացահայտիր ըստ մարզերի
          </h2>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="r in regionCards"
            :key="r.name"
            :to="`/places?region=${encodeURIComponent(r.name)}`"
            class="group relative block aspect-[3/2] overflow-hidden rounded-3xl shadow-soft"
          >
            <img
              :src="r.img"
              :alt="`${r.name} մարզ`"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <h3 class="font-serif text-2xl font-bold text-beige">{{ r.name }}</h3>
                <p class="mt-1 text-sm text-beige/75">{{ r.count }} ուղղություն</p>
              </div>
              <span class="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-bold text-ink transition-transform group-hover:scale-105">
                Բացահայտել
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
