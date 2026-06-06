<script setup lang="ts">
useHead({
  title: 'Armenia Travel — Բացահայտիր Հայաստանը խելացի երթուղիներով',
  meta: [
    {
      name: 'description',
      content:
        'Գտիր տեսարժան վայրեր, ուսումնասիրիր մարզերը և AI-ի օգնությամբ կազմիր քո ճանապարհորդությունը Հայաստանում։'
    }
  ]
})

const { getAll } = usePlaces()
const totalPlaces = getAll().length

const features = [
  {
    title: 'Մոտակա վայրեր',
    desc: 'Գտիր տեսարժան վայրեր քո շուրջը՝ Երևանից հեռավորությամբ և այցի տևողությամբ։',
    icon: 'pin'
  },
  {
    title: 'Խելացի AI երթուղիներ',
    desc: 'AI-ն կկազմի անհատական ճանապարհորդություն՝ ըստ քո հետաքրքրությունների և օրերի։',
    icon: 'route'
  },
  {
    title: 'Ուսումնասիրիր մարզերը',
    desc: 'Բացահայտիր Հայաստանի մարզերը՝ Կոտայքից մինչև Սյունիք, յուրաքանչյուրն իր հմայքով։',
    icon: 'map'
  }
]

const destinations = [
  { name: 'Գառնի', region: 'Կոտայք', img: '/images/garni.png', id: 1 },
  { name: 'Գեղարդ', region: 'Կոտայք', img: '/images/geghard.png', id: 2 },
  { name: 'Սևան', region: 'Գեղարքունիք', img: '/images/sevan.png', id: 5 },
  { name: 'Դիլիջան', region: 'Տավուշ', img: '/images/dilijan.png', id: 5 },
  { name: 'Տաթև', region: 'Սյունիք', img: '/images/tatev.png', id: 10 },
  { name: 'Ջերմուկ', region: 'Վայոց ձոր', img: '/images/jermuk.png', id: 8 }
]

const steps = [
  { n: '01', title: 'Ընտրիր օրերի քանակը', desc: 'Որքա՞ն ժամանակ ունես ճանապարհորդելու համար։' },
  { n: '02', title: 'Նշիր հետաքրքրությունները', desc: 'Պատմություն, բնություն, հոգևոր վայրեր, թե գինի։' },
  { n: '03', title: 'Ստացիր անհատական երթուղի', desc: 'AI-ն կկազմի օրեցօր պլանավորված ճանապարհորդություն։' }
]
</script>

<template>
  <div>
    <!-- 1. HERO -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="'/images/hero-armenia.png'"
          alt="Հայկական լեռնաշխարհ և հին վանք ոսկեգույն մայրամուտին"
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/30" />
      </div>

      <div class="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <span class="inline-flex w-fit items-center gap-2 rounded-full border border-beige/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-beige backdrop-blur-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-gold" />
          Բացահայտիր Հայաստանը
        </span>

        <h1 class="mt-6 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-beige sm:text-5xl lg:text-6xl">
          Բացահայտիր Հայաստանը խելացի երթուղիներով
        </h1>

        <p class="mt-5 max-w-xl text-pretty text-base leading-relaxed text-beige/80 sm:text-lg">
          Գտիր տեսարժան վայրեր, ուսումնասիրիր մարզերը և AI-ի օգնությամբ կազմիր
          քո ճանապարհորդությունը։
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NuxtLink
            to="/places"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-beige shadow-card transition-transform hover:scale-[1.02] hover:bg-brand-dark"
          >
            Տեսնել վայրերը
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/planner"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-beige/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-beige backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Կազմել երթուղի AI-ով
          </NuxtLink>
        </div>

        <div class="mt-12 flex flex-wrap gap-8 text-beige">
          <div>
            <p class="font-serif text-3xl font-bold text-gold">{{ totalPlaces }}+</p>
            <p class="text-sm text-beige/70">Տեսարժան վայրեր</p>
          </div>
          <div>
            <p class="font-serif text-3xl font-bold text-gold">11</p>
            <p class="text-sm text-beige/70">Մարզեր</p>
          </div>
          <div>
            <p class="font-serif text-3xl font-bold text-gold">AI</p>
            <p class="text-sm text-beige/70">Խելացի պլանավորում</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. FEATURES -->
    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-wider text-brand">Ինչու Armenia Travel</p>
        <h2 class="mt-3 text-balance font-serif text-3xl font-bold text-ink sm:text-4xl">
          Ճանապարհորդիր ավելի խելացի
        </h2>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <article
          v-for="f in features"
          :key="f.title"
          class="group rounded-3xl border border-ink/10 bg-white p-8 shadow-soft transition-transform hover:-translate-y-1"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-beige">
            <svg v-if="f.icon === 'pin'" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 21s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10Z" />
              <circle cx="12" cy="11" r="2.5" />
            </svg>
            <svg v-else-if="f.icon === 'route'" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="6" cy="19" r="3" />
              <circle cx="18" cy="5" r="3" />
              <path d="M9 19h6a3 3 0 0 0 3-3V8M6 16V8a3 3 0 0 1 3-3h6" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" />
              <path d="M9 4v14M15 6v14" />
            </svg>
          </span>
          <h3 class="mt-6 font-serif text-xl font-semibold text-ink">{{ f.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink/60">{{ f.desc }}</p>
        </article>
      </div>
    </section>

    <!-- 3. FEATURED DESTINATIONS -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-wider text-brand">Տեսարժան վայրեր</p>
            <h2 class="mt-3 text-balance font-serif text-3xl font-bold text-ink sm:text-4xl">
              Հանրահայտ ուղղություններ
            </h2>
          </div>
          <NuxtLink
            to="/places"
            class="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            Բոլորը
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="d in destinations"
            :key="d.name"
            :to="`/places/${d.id}`"
            class="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-soft"
          >
            <img
              :src="d.img"
              :alt="`${d.name}, ${d.region}`"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 p-6">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-ink">
                {{ d.region }}
              </span>
              <h3 class="mt-3 font-serif text-2xl font-bold text-beige">{{ d.name }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. AI PLANNER TEASER -->
    <section class="relative overflow-hidden bg-wine">
      <img
        :src="'/images/planner-bg.png'"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span class="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              AI Planner
            </span>
            <h2 class="mt-5 text-balance font-serif text-3xl font-bold text-beige sm:text-4xl">
              Քո անհատական ճանապարհորդությունը՝ րոպեների ընթացքում
            </h2>
            <p class="mt-4 max-w-md text-pretty leading-relaxed text-beige/75">
              Մեր AI պլանավորիչը կազմում է երթուղի՝ հարմարեցված քո ճաշակին,
              ժամանակին և հետաքրքրություններին։
            </p>

            <NuxtLink
              to="/planner"
              class="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-ink shadow-card transition-transform hover:scale-[1.02] hover:bg-gold-dark"
            >
              Փորձել AI Planner
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <ol class="space-y-4">
            <li
              v-for="s in steps"
              :key="s.n"
              class="flex gap-5 rounded-2xl border border-beige/15 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span class="font-serif text-2xl font-bold text-gold">{{ s.n }}</span>
              <div>
                <h3 class="font-serif text-lg font-semibold text-beige">{{ s.title }}</h3>
                <p class="mt-1 text-sm text-beige/70">{{ s.desc }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>
