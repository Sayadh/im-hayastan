<script setup lang="ts">
import { formatDuration, splitCsv } from '~/utils/format'

const route = useRoute()
const { getById, getNearby } = usePlaces()
const { imageFor } = usePlaceImage()

// Validate the dynamic id: must be a positive integer.
const id = Number(route.params.id)
const place = Number.isInteger(id) && id > 0 ? getById(id) : undefined

// Friendly 404 if the place does not exist.
if (!place) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Այս վայրը գոյություն չունի',
    fatal: true,
  })
}

useHead({ title: `${place.name_am} · Armenia Travel` })

const interests = computed(() => splitCsv(place!.best_for))
const nearby = computed(() => getNearby(place!))

// Editorial copy keyed by place id, with graceful fallbacks built from data.
type Editorial = {
  subtitle: string
  about: string
  why: string[]
  bestTime: string
  tips: string[]
}

const editorialById: Record<number, Editorial> = {
  1: {
    subtitle: 'Հայաստանի ամենահայտնի հելլենիստական հուշարձաններից մեկը։',
    about:
      'Գառնիի տաճարը մ.թ. 1-ին դարում կառուցված հունահռոմեական ոճի սյունազարդ տաճար է՝ կանգնած խոր կիրճի եզրին։ Այն Հայաստանի միակ պահպանված հեթանոսական տաճարն է և երկրի ճարտարապետական խորհրդանիշերից մեկը։',
    why: [
      'Միակ պահպանված հելլենիստական տաճարը տարածաշրջանում',
      'Հիասքանչ տեսարան դեպի Ազատ գետի կիրճը',
      'Ընդամենը 45 րոպե Երևանից՝ իդեալական կես օրվա այցի համար',
    ],
    bestTime:
      'Մայիսից հոկտեմբեր՝ տաք եղանակ և պարզ տեսարաններ։ Վաղ առավոտը լավագույնն է լուսանկարների համար։',
    tips: [
      'Հարմարավետ կոշիկներ հագեք՝ քարե արահետների համար',
      'Համատեղեք այցը Գեղարդի վանքի և Քարե սիմֆոնիայի հետ',
      'Տեղում կա ավանդական հայկական հաց թխող փուռ',
    ],
  },
}

const fallbackEditorial = computed<Editorial>(() => ({
  subtitle: `${place!.region}ի ${place!.category.toLowerCase()} գանձերից մեկը։`,
  about: `${place!.name_am}ը գտնվում է ${place!.region} մարզում և Հայաստանի ամենաարժեքավոր ${place!.category.toLowerCase()} վայրերից է։ Երևանից ընդամենը ${formatDuration(place!.from_yerevan_minutes)} հեռավորության վրա՝ այն հիանալի կանգառ է ձեր ճանապարհորդության համար։`,
  why: [
    `${place!.category} ժառանգության վառ օրինակ`,
    `Հարմար է՝ ${splitCsv(place!.best_for).join(', ')}`,
    `Մոտակայքում ևս ${getNearby(place!).length} տեսարժան վայր`,
  ],
  bestTime:
    'Գարունն ու աշունը լավագույն ժամանակն են՝ մեղմ եղանակ և գեղեցիկ բնական գույներ։',
  tips: [
    'Նախապես ստուգեք բացման ժամերը',
    'Վերցրեք ջուր և հարմարավետ կոշիկներ',
    'Համատեղեք մոտակա վայրերի հետ՝ լիարժեք օր կազմելու համար',
  ],
}))

const content = computed<Editorial>(
  () => editorialById[place!.id] ?? fallbackEditorial.value
)

// Quick-info cards.
const quickInfo = computed(() => [
  { label: 'Երևանից', value: formatDuration(place!.from_yerevan_minutes), icon: 'route' },
  { label: 'Այցի տևողություն', value: formatDuration(place!.visit_duration_minutes), icon: 'clock' },
  { label: 'Հարմար է', value: interests.value.slice(0, 2).join(', '), icon: 'heart' },
  { label: 'Մոտակայքում', value: `${nearby.value.length} վայր`, icon: 'pin' },
])

// Suggested one-day itinerary derived from the place's route group.
const itinerary = computed(() => {
  const stops = [
    { time: '09:00', name: 'Երևան', note: 'Մեկնում' },
    { time: '09:45', name: place!.name_am, note: 'Հիմնական այց' },
  ]
  const extra = nearby.value.slice(0, 2)
  let clock = 11
  for (const n of extra) {
    stops.push({ time: `${String(clock).padStart(2, '0')}:15`, name: n.name_am, note: n.category })
    clock += 2
  }
  stops.push({ time: '18:00', name: 'Երևան', note: 'Վերադարձ' })
  return stops
})
</script>

<template>
  <div class="bg-sand">
    <!-- Hero -->
    <section class="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <img
        :src="imageFor(place.id)"
        :alt="place.name_am"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />

      <div class="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:px-6">
        <NuxtLink
          to="/places"
          class="mb-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          ← Բոլոր վայրերը
        </NuxtLink>

        <div class="flex flex-wrap gap-2">
          <span class="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            {{ place.region }}
          </span>
          <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {{ place.category }}
          </span>
        </div>

        <h1 class="mt-3 text-balance text-4xl font-bold text-white sm:text-5xl">
          {{ place.name_am }}
        </h1>
        <p class="mt-2 max-w-xl text-pretty text-base text-white/85 sm:text-lg">
          {{ content.subtitle }}
        </p>
      </div>
    </section>

    <!-- Quick info cards -->
    <section class="mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div
          v-for="card in quickInfo"
          :key="card.label"
          class="rounded-2xl bg-white p-4 shadow-soft sm:p-5"
        >
          <span
            class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand text-brand"
          >
            <svg
              v-if="card.icon === 'route'"
              class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" />
              <path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />
            </svg>
            <svg
              v-else-if="card.icon === 'clock'"
              class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
            </svg>
            <svg
              v-else-if="card.icon === 'heart'"
              class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 13 12 21 12 21s2.5-2 5-5z" />
            </svg>
            <svg
              v-else
              class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <p class="text-xs text-gray-400">{{ card.label }}</p>
          <p class="mt-0.5 text-lg font-semibold text-ink">{{ card.value }}</p>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left column -->
        <div class="space-y-10 lg:col-span-2">
          <div>
            <h2 class="text-2xl font-bold text-ink">Նկարագրություն</h2>
            <p class="mt-3 leading-relaxed text-gray-600">{{ content.about }}</p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-ink">Ինչու այցելել</h2>
            <ul class="mt-4 space-y-3">
              <li
                v-for="(reason, i) in content.why"
                :key="i"
                class="flex items-start gap-3"
              >
                <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span class="leading-relaxed text-gray-600">{{ reason }}</span>
              </li>
            </ul>
          </div>

          <div class="rounded-2xl border border-gold/30 bg-white p-6">
            <h2 class="flex items-center gap-2 text-xl font-bold text-ink">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.5-6.5-1.4 1.4M6.9 17.1l-1.4 1.4m0-12.6 1.4 1.4m10.2 10.2 1.4 1.4" />
                </svg>
              </span>
              Լավագույն ժամանակը
            </h2>
            <p class="mt-3 leading-relaxed text-gray-600">{{ content.bestTime }}</p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-ink">Խորհուրդներ զբոսաշրջիկներին</h2>
            <ul class="mt-4 grid gap-3 sm:grid-cols-2">
              <li
                v-for="(tip, i) in content.tips"
                :key="i"
                class="rounded-xl bg-white p-4 text-sm leading-relaxed text-gray-600 shadow-soft"
              >
                {{ tip }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Right column -->
        <aside class="space-y-6">
          <!-- Map placeholder -->
          <div class="overflow-hidden rounded-2xl bg-white shadow-soft">
            <div class="relative flex h-48 items-center justify-center bg-wine/5">
              <div
                class="absolute inset-0 opacity-[0.07]"
                style="background-image: radial-gradient(circle, #7A1E2C 1px, transparent 1px); background-size: 18px 18px;"
              />
              <div class="relative flex flex-col items-center text-center">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-soft">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <p class="mt-2 text-sm font-medium text-ink">{{ place.name_am }}</p>
                <p class="text-xs text-gray-400">{{ place.region }}, Հայաստան</p>
              </div>
            </div>
          </div>

          <!-- Route summary -->
          <div class="rounded-2xl bg-white p-6 shadow-soft">
            <h3 class="text-lg font-bold text-ink">Երթուղու ամփոփում</h3>
            <dl class="mt-4 space-y-3 text-sm">
              <div class="flex items-center justify-between">
                <dt class="text-gray-400">Մեկնման կետ</dt>
                <dd class="font-medium text-ink">Երևան</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-gray-400">Ճանապարհ</dt>
                <dd class="font-medium text-ink">{{ formatDuration(place.from_yerevan_minutes) }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-gray-400">Այցի տևողություն</dt>
                <dd class="font-medium text-ink">{{ formatDuration(place.visit_duration_minutes) }}</dd>
              </div>
              <div class="flex items-center justify-between border-t pt-3">
                <dt class="text-gray-400">Մոտակա վայրեր</dt>
                <dd class="font-medium text-ink">{{ nearby.length }}</dd>
              </div>
            </dl>

            <NuxtLink
              to="/planner"
              class="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-wine"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3v3m0 12v3M5 12H2m20 0h-3M6.3 6.3 4.2 4.2m15.6 0-2.1 2.1M6.3 17.7l-2.1 2.1m15.6 0-2.1-2.1" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Կազմել երթուղի AI-ով
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <!-- Nearby places -->
    <section v-if="nearby.length" class="bg-white py-14 lg:py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 class="text-2xl font-bold text-ink sm:text-3xl">Մոտակա վայրեր</h2>
        <p class="mt-1 text-gray-500">Բացահայտեք շրջակայքը նույն ճանապարհորդության ընթացքում։</p>

        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="n in nearby"
            :key="n.id"
            :to="`/places/${n.id}`"
            class="group overflow-hidden rounded-2xl bg-sand shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="relative h-44 overflow-hidden">
              <img
                :src="imageFor(n.id)"
                :alt="n.name_am"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur">
                {{ n.category }}
              </span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-ink">{{ n.name_am }}</h3>
              <p class="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <svg class="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                Երևանից {{ formatDuration(n.from_yerevan_minutes) }}
              </p>
              <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Տեսնել
                <svg class="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Suggested route -->
    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <div class="overflow-hidden rounded-3xl bg-wine text-white shadow-soft">
        <div class="grid lg:grid-cols-5">
          <div class="p-8 lg:col-span-2 lg:p-10">
            <span class="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
              Առաջարկվող երթուղի
            </span>
            <h2 class="mt-4 text-balance text-3xl font-bold">1-օրյա երթուղի Երևանից</h2>
            <p class="mt-3 leading-relaxed text-white/75">
              Ամբողջական օր՝ ներառելով {{ place.name_am }}ը և մոտակա տեսարժան վայրերը՝ կազմված հարմարավետ տեմպով։
            </p>
            <NuxtLink
              to="/planner"
              class="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-deep hover:text-white"
            >
              Կազմել իմ երթուղին
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </NuxtLink>
          </div>

          <div class="bg-white/5 p-8 lg:col-span-3 lg:p-10">
            <ol class="relative space-y-6 border-l border-white/20 pl-6">
              <li
                v-for="(stop, i) in itinerary"
                :key="i"
                class="relative"
              >
                <span class="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-gold ring-4 ring-wine" />
                <div class="flex items-baseline gap-3">
                  <span class="font-mono text-sm font-semibold text-gold">{{ stop.time }}</span>
                  <span class="text-base font-semibold">{{ stop.name }}</span>
                </div>
                <p class="text-sm text-white/60">{{ stop.note }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
