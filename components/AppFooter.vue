<script setup lang="ts">
const year = new Date().getFullYear()

const sections = [
  {
    title: 'Հայտնագործիր',
    links: [
      { to: '/places', label: 'Բոլոր վայրերը' },
      { to: '/places', label: 'Մարզեր' },
      { to: '/planner', label: 'AI Planner' }
    ]
  },
  {
    title: 'Ընկերություն',
    links: [
      { to: '/', label: 'Մեր մասին' },
      { to: '/', label: 'Բլոգ' },
      { to: '/', label: 'Համագործակցություն' }
    ]
  }
]
</script>

<template>
  <footer class="bg-ink text-beige">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-4">
        <!-- Brand -->
        <div class="md:col-span-2 max-w-sm">
          <div class="flex items-center gap-2.5">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-beige">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 21s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10Z" />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
            </span>
            <span class="font-serif text-lg font-bold">Armenia Travel</span>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-beige/60">
            Բացահայտիր Հայաստանի գանձերը՝ խելացի երթուղիներով։ Տեսարժան վայրեր,
            մարզեր և AI-ով կազմված անհատական ճանապարհորդություններ։
          </p>
        </div>

        <!-- Link sections -->
        <div v-for="s in sections" :key="s.title">
          <h3 class="font-serif text-sm font-semibold text-gold">{{ s.title }}</h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="(l, i) in s.links" :key="i">
              <NuxtLink :to="l.to" class="text-sm text-beige/60 transition-colors hover:text-beige">
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Contact -->
      <div class="mt-12 flex flex-col gap-2 border-t border-beige/15 pt-8 text-sm text-beige/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} Armenia Travel։ Բոլոր իրավունքները պաշտպանված են։</p>
        <a href="mailto:hello@armeniatravel.am" class="transition-colors hover:text-gold">
          hello@armeniatravel.am
        </a>
      </div>
    </div>
  </footer>
</template>
