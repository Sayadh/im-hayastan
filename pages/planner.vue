<script setup lang="ts">
import type { RouteSuggestion } from '~/types/place'
import { formatDuration } from '~/utils/format'

const { categories, interests, suggestRoutes } = usePlaces()

// Simple reactive form state. No AI yet — pure local filtering.
const form = reactive({
  days: 1,
  interest: '',
  category: '',
  startCity: 'Երևան'
})

const results = ref<RouteSuggestion[] | null>(null)

function onSubmit() {
  results.value = suggestRoutes({
    category: form.category || undefined,
    interest: form.interest || undefined
  })
}

useHead({ title: 'AI Planner · Armenia Travel' })
</script>

<template>
  <div class="max-w-3xl">
    <h1 class="text-2xl font-bold">Երթուղու պլանավորում</h1>
    <p class="mt-1 text-sm text-gray-500">
      MVP փուլ — առաջարկները հիմնված են միայն մեր բազայի վրա (առանց AI-ի)։
    </p>

    <form class="mt-6 grid gap-4 sm:grid-cols-2" @submit.prevent="onSubmit">
      <label class="block">
        <span class="text-sm font-medium">Քանի օր</span>
        <input
          v-model.number="form.days"
          type="number"
          min="1"
          max="14"
          class="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="text-sm font-medium">Սկիզբ քաղաք</span>
        <input
          v-model="form.startCity"
          type="text"
          class="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="text-sm font-medium">Հետաքրքրություն</span>
        <select v-model="form.interest" class="mt-1 w-full rounded-lg border px-3 py-2">
          <option value="">Բոլորը</option>
          <option v-for="i in interests()" :key="i" :value="i">{{ i }}</option>
        </select>
      </label>

      <label class="block">
        <span class="text-sm font-medium">Կատեգորիա</span>
        <select v-model="form.category" class="mt-1 w-full rounded-lg border px-3 py-2">
          <option value="">Բոլորը</option>
          <option v-for="c in categories()" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>

      <div class="sm:col-span-2">
        <button
          type="submit"
          class="rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark"
        >
          Առաջարկել երթուղի
        </button>
      </div>
    </form>

    <!-- Results -->
    <section v-if="results" class="mt-10">
      <h2 class="mb-4 text-xl font-semibold">
        Հնարավոր երթուղիներ ({{ results.length }})
      </h2>

      <p v-if="!results.length" class="text-gray-500">
        Այս ֆիլտրերով երթուղի չգտնվեց։ Փորձիր այլ պարամետրեր։
      </p>

      <div v-else class="space-y-4">
        <article
          v-for="r in results"
          :key="r.route_group"
          class="rounded-xl border bg-white p-5"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-semibold capitalize">
              {{ r.route_group.replaceAll('_', ' ') }}
            </h3>
            <span class="text-sm text-gray-500">
              Ընդամենը {{ formatDuration(r.total_minutes) }}
            </span>
          </div>

          <ol class="mt-3 space-y-1 text-sm">
            <li v-for="(p, idx) in r.places" :key="p.id">
              <NuxtLink :to="`/places/${p.id}`" class="hover:text-brand">
                {{ idx + 1 }}. {{ p.name_am }}
                <span class="text-gray-400">· {{ formatDuration(p.visit_duration_minutes) }}</span>
              </NuxtLink>
            </li>
          </ol>
        </article>
      </div>
    </section>
  </div>
</template>
