<script setup lang="ts">
const open = ref(false)
const lang = ref<'AM' | 'EN' | 'RU'>('AM')
const langs: Array<'AM' | 'EN' | 'RU'> = ['AM', 'EN', 'RU']

const links = [
  { to: '/places', label: 'Վայրեր' },
  { to: '/places', label: 'Մարզեր' },
  { to: '/planner', label: 'AI Planner' }
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-ink/10 bg-beige/80 backdrop-blur-md">
    <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5">
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-beige">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 21s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10Z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
        </span>
        <span class="font-serif text-lg font-bold tracking-tight text-ink">Armenia Travel</span>
      </NuxtLink>

      <!-- Desktop links -->
      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="(l, i) in links"
          :key="i"
          :to="l.to"
          class="text-sm font-medium text-ink/70 transition-colors hover:text-brand"
        >
          {{ l.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-3">
        <!-- Language selector -->
        <div class="hidden items-center rounded-full border border-ink/15 bg-white/60 p-0.5 sm:flex">
          <button
            v-for="l in langs"
            :key="l"
            type="button"
            class="rounded-full px-2.5 py-1 text-xs font-semibold transition-colors"
            :class="lang === l ? 'bg-brand text-beige' : 'text-ink/60 hover:text-ink'"
            @click="lang = l"
          >
            {{ l }}
          </button>
        </div>

        <NuxtLink
          to="/planner"
          class="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-beige transition-colors hover:bg-wine sm:inline-block"
        >
          AI երթուղի
        </NuxtLink>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-label="Բացել մենյուն"
          @click="open = !open"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path v-if="!open" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-if="open" class="border-t border-ink/10 bg-beige md:hidden">
      <div class="space-y-1 px-4 py-3">
        <NuxtLink
          v-for="(l, i) in links"
          :key="i"
          :to="l.to"
          class="block rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-white"
          @click="open = false"
        >
          {{ l.label }}
        </NuxtLink>
        <NuxtLink
          to="/planner"
          class="mt-2 block rounded-lg bg-brand px-3 py-2 text-center text-sm font-semibold text-beige"
          @click="open = false"
        >
          AI երթուղի
        </NuxtLink>
        <div class="flex items-center gap-2 pt-2">
          <button
            v-for="l in langs"
            :key="l"
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-semibold"
            :class="lang === l ? 'border-brand bg-brand text-beige' : 'border-ink/15 text-ink/60'"
            @click="lang = l"
          >
            {{ l }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
