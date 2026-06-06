<script setup lang="ts">
useHead({
  title: 'AI Ճանապարհորդության պլանավորում · Armenia Travel',
  meta: [
    {
      name: 'description',
      content:
        'Պատասխանիր մի քանի հարցի, և մեր AI օգնականը կառաջարկի անհատական երթուղի Հայաստանի տեսարժան վայրերով։',
    },
  ],
})

// --- Form options (Armenian) ---
const dayOptions = ['1 օր', '2 օր', '3 օր', '4+ օր']
const startOptions = ['Երևան', 'Գյումրի', 'Դիլիջան', 'Ջերմուկ']
const interestOptions = [
  'Պատմություն և մշակույթ',
  'Վանքեր',
  'Բնություն',
  'Ընտանեկան վայրեր',
  'Արկածային',
  'Գաստրոնոմիա',
  'Լուսանկարչություն',
  'Հանգիստ',
]
const paceOptions = ['Արագ', 'Հավասարակշռված', 'Հանգիստ']
const companyOptions = ['Մենակ', 'Զույգով', 'Ընտանիքով', 'Ընկերներով']
const transportOptions = ['Սեփական մեքենա', 'Վարորդ / տուր', 'Հանրային տրանսպորտ']

// --- Reactive state (UI only) ---
const form = reactive({
  days: '2 օր',
  start: 'Երևան',
  interests: [] as string[],
  pace: 'Հավասարակշռված',
  company: 'Զույգով',
  transport: 'Սեփական մեքենա',
})

function toggleInterest(value: string) {
  const idx = form.interests.indexOf(value)
  if (idx === -1) form.interests.push(value)
  else form.interests.splice(idx, 1)
}

function isSelected(value: string) {
  return form.interests.includes(value)
}

const previewItems = [
  {
    title: 'Օրերով բաժանված երթուղի',
    desc: 'Ամեն օր՝ հստակ հաջորդականությամբ և տրամաբանական անցումներով։',
    icon: 'calendar',
  },
  {
    title: 'Ճանապարհի և այցի մոտավոր ժամանակ',
    desc: 'Իմացիր՝ որքան ժամանակ կպահանջվի ճանապարհին և յուրաքանչյուր վայրում։',
    icon: 'clock',
  },
  {
    title: 'Մոտակայքի վայրերի խելացի առաջարկներ',
    desc: 'Համակարգը կառաջարկի մոտակա տեսարժան վայրեր՝ առանց ավելորդ ճանապարհի։',
    icon: 'pin',
  },
]

const exampleDays = [
  {
    label: 'Օր 1',
    stops: [
      { time: '09:00', name: 'Երևան' },
      { time: '09:45', name: 'Գառնի' },
      { time: '11:00', name: 'Քարերի սիմֆոնիա' },
      { time: '13:00', name: 'Գեղարդ' },
    ],
  },
  {
    label: 'Օր 2',
    stops: [
      { time: '09:00', name: 'Խոր Վիրապ' },
      { time: '12:00', name: 'Արենի' },
      { time: '14:00', name: 'Նորավանք' },
    ],
  },
]

const steps = [
  {
    n: '1',
    title: 'Ընտրում եք նախասիրությունները',
    desc: 'Օրերի քանակ, հետաքրքրություններ, տեմպ և ճանապարհորդության ոճ։',
  },
  {
    n: '2',
    title: 'Համակարգը ընտրում է համապատասխան վայրերը',
    desc: 'Ֆիլտրում է մեր բազան՝ ըստ մարզի, կատեգորիայի և տևողության։',
  },
  {
    n: '3',
    title: 'AI-ը ներկայացնում է գեղեցիկ երթուղի',
    desc: 'Ստանում եք պատրաստի, օրերով բաժանված անհատական պլան։',
  },
]

const faqs = [
  {
    q: 'Կարո՞ղ եմ փոխել երթուղին',
    a: 'Այո։ Առաջարկվող երթուղին ելակետ է — կարող եք ավելացնել կամ հեռացնել վայրեր և վերադասավորել օրերը ձեր նախասիրությամբ։',
  },
  {
    q: 'AI-ը իրական տվյալներով է աշխատու՞մ',
    a: 'Այո։ Համակարգը չի հորինում վայրեր. այն օգտագործում է միայն մեր ստուգված բազան՝ մարզերը, ճանապարհի և այցի տևողությունները և մոտակա վայրերը։',
  },
  {
    q: 'Կարո՞ղ եմ ընտրել միայն բնություն կամ միայն վանքեր',
    a: 'Իհարկե։ Ընտրեք ցանկացած մեկ կամ մի քանի հետաքրքրություն, և երթուղին կկազմվի հենց դրանց շուրջ։',
  },
]

const openFaq = ref<number | null>(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}
</script>

<template>
  <div class="bg-beige">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-wine text-beige">
      <img
        :src="'/images/planner-bg.png'"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-wine/70 via-wine/80 to-wine" />
      <div class="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-sm font-medium text-gold backdrop-blur"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6 7 18.2l1.9-5.8L4 8.8h6.1z" />
          </svg>
          AI-powered travel planning
        </span>
        <h1 class="mx-auto mt-6 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Կազմիր քո կատարյալ ճանապարհորդությունը
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-beige/80">
          Պատասխանիր մի քանի հարցի, և մեր AI օգնականը կառաջարկի անհատական երթուղի Հայաստանի տեսարժան վայրերով։
        </p>
      </div>
    </section>

    <!-- Main planner -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-5">
        <!-- Form card -->
        <form
          class="rounded-3xl bg-white p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5 sm:p-8 lg:col-span-3"
          @submit.prevent
        >
          <h2 class="font-serif text-2xl font-bold text-ink">Ձեր նախասիրությունները</h2>
          <p class="mt-1 text-sm text-ink/50">Լրացրեք դաշտերը՝ անհատական երթուղի ստանալու համար։</p>

          <!-- Days -->
          <fieldset class="mt-7">
            <legend class="text-sm font-semibold text-ink">Ճանապարհորդության օրեր</legend>
            <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                v-for="opt in dayOptions"
                :key="opt"
                type="button"
                :aria-pressed="form.days === opt"
                class="rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                :class="form.days === opt
                  ? 'border-brand bg-brand text-white'
                  : 'border-ink/10 bg-beige/40 text-ink hover:border-brand/40'"
                @click="form.days = opt"
              >
                {{ opt }}
              </button>
            </div>
          </fieldset>

          <!-- Starting point -->
          <fieldset class="mt-7">
            <legend class="text-sm font-semibold text-ink">Մեկնման կետ</legend>
            <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                v-for="opt in startOptions"
                :key="opt"
                type="button"
                :aria-pressed="form.start === opt"
                class="rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                :class="form.start === opt
                  ? 'border-brand bg-brand text-white'
                  : 'border-ink/10 bg-beige/40 text-ink hover:border-brand/40'"
                @click="form.start = opt"
              >
                {{ opt }}
              </button>
            </div>
          </fieldset>

          <!-- Interests -->
          <fieldset class="mt-7">
            <legend class="text-sm font-semibold text-ink">Հետաքրքրություններ</legend>
            <p class="mt-1 text-xs text-ink/40">Ընտրեք մեկ կամ մի քանիսը</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="opt in interestOptions"
                :key="opt"
                type="button"
                :aria-pressed="isSelected(opt)"
                class="rounded-full border px-4 py-2 text-sm font-medium transition"
                :class="isSelected(opt)
                  ? 'border-gold bg-gold/15 text-wine'
                  : 'border-ink/10 bg-beige/40 text-ink hover:border-gold/50'"
                @click="toggleInterest(opt)"
              >
                {{ opt }}
              </button>
            </div>
          </fieldset>

          <!-- Pace -->
          <fieldset class="mt-7">
            <legend class="text-sm font-semibold text-ink">Տեմպ</legend>
            <div class="mt-3 grid grid-cols-3 gap-2">
              <button
                v-for="opt in paceOptions"
                :key="opt"
                type="button"
                :aria-pressed="form.pace === opt"
                class="rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                :class="form.pace === opt
                  ? 'border-brand bg-brand text-white'
                  : 'border-ink/10 bg-beige/40 text-ink hover:border-brand/40'"
                @click="form.pace = opt"
              >
                {{ opt }}
              </button>
            </div>
          </fieldset>

          <!-- Company -->
          <fieldset class="mt-7">
            <legend class="text-sm font-semibold text-ink">Ճանապարհորդում եք</legend>
            <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                v-for="opt in companyOptions"
                :key="opt"
                type="button"
                :aria-pressed="form.company === opt"
                class="rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                :class="form.company === opt
                  ? 'border-brand bg-brand text-white'
                  : 'border-ink/10 bg-beige/40 text-ink hover:border-brand/40'"
                @click="form.company = opt"
              >
                {{ opt }}
              </button>
            </div>
          </fieldset>

          <!-- Transport -->
          <fieldset class="mt-7">
            <legend class="text-sm font-semibold text-ink">Տրանսպորտ</legend>
            <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                v-for="opt in transportOptions"
                :key="opt"
                type="button"
                :aria-pressed="form.transport === opt"
                class="rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                :class="form.transport === opt
                  ? 'border-brand bg-brand text-white'
                  : 'border-ink/10 bg-beige/40 text-ink hover:border-brand/40'"
                @click="form.transport = opt"
              >
                {{ opt }}
              </button>
            </div>
          </fieldset>

          <button
            type="submit"
            class="mt-8 w-full rounded-xl bg-brand px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark"
          >
            Ստանալ առաջարկ
          </button>
          <p class="mt-3 text-center text-xs text-ink/40">
            Երթուղին կազմվում է միայն մեր բազայում առկա վայրերի հիման վրա։
          </p>
        </form>

        <!-- Preview card -->
        <aside class="lg:col-span-2">
          <div class="sticky top-24 rounded-3xl bg-wine p-6 text-beige shadow-lg shadow-wine/20 sm:p-8">
            <h2 class="font-serif text-2xl font-bold">Ինչ կստանաք</h2>

            <ul class="mt-6 space-y-5">
              <li v-for="item in previewItems" :key="item.title" class="flex gap-4">
                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <svg v-if="item.icon === 'calendar'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <svg v-else-if="item.icon === 'clock'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <h3 class="font-semibold leading-snug">{{ item.title }}</h3>
                  <p class="mt-1 text-sm leading-relaxed text-beige/70">{{ item.desc }}</p>
                </div>
              </li>
            </ul>

            <!-- Example itinerary -->
            <div class="mt-8 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p class="text-sm font-semibold text-gold">Օրինակ՝ 2-օրյա պատմամշակութային երթուղի</p>
              <div class="mt-4 space-y-5">
                <div v-for="day in exampleDays" :key="day.label">
                  <p class="text-xs font-bold uppercase tracking-wide text-beige/50">{{ day.label }}</p>
                  <ul class="mt-2 space-y-2">
                    <li v-for="stop in day.stops" :key="stop.time" class="flex items-center gap-3 text-sm">
                      <span class="w-12 shrink-0 font-mono text-xs text-gold">{{ stop.time }}</span>
                      <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
                      <span class="text-beige/90">{{ stop.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-white py-16 md:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-wide text-brand">Ինչպես է աշխատում</p>
          <h2 class="mt-2 text-balance font-serif text-3xl font-bold text-ink md:text-4xl">Երեք պարզ քայլ</h2>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div
            v-for="step in steps"
            :key="step.n"
            class="rounded-3xl border border-ink/5 bg-beige/40 p-8 text-center"
          >
            <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand font-serif text-xl font-bold text-white">
              {{ step.n }}
            </span>
            <h3 class="mt-5 text-lg font-semibold text-ink">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink/60">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust / data block -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div class="flex flex-col items-center gap-6 rounded-3xl bg-gold/10 p-8 text-center ring-1 ring-gold/20 md:flex-row md:p-12 md:text-left">
        <span class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold/20 text-wine">
          <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </span>
        <p class="text-pretty text-lg leading-relaxed text-wine">
          AI-ը չի հորինում վայրեր․ այն աշխատում է միայն մեր բազայի տվյալներով՝ հաշվի առնելով մարզերը,
          ճանապարհի տևողությունը, այցի տևողությունը և մոտակա վայրերը։
        </p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-white py-16 md:py-20">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-sm font-semibold uppercase tracking-wide text-brand">Հաճախ տրվող հարցեր</p>
          <h2 class="mt-2 font-serif text-3xl font-bold text-ink md:text-4xl">Հարցեր ու պատասխաններ</h2>
        </div>
        <div class="mt-10 space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="overflow-hidden rounded-2xl border border-ink/10 bg-beige/30"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              :aria-expanded="openFaq === i"
              @click="toggleFaq(i)"
            >
              <span class="font-semibold text-ink">{{ faq.q }}</span>
              <svg
                class="h-5 w-5 shrink-0 text-brand transition-transform"
                :class="openFaq === i ? 'rotate-45' : ''"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div v-show="openFaq === i" class="px-6 pb-5 text-sm leading-relaxed text-ink/60">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
