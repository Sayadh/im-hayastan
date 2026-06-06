<script setup lang="ts">
import type { Place } from '~/types/place'
import { formatDuration, splitCsv } from '~/utils/format'

const props = defineProps<{ place: Place }>()
const interests = computed(() => splitCsv(props.place.best_for))
</script>

<template>
  <article>
    <header class="border-b pb-4">
      <p class="text-sm text-brand">{{ place.region }} · {{ place.category }}</p>
      <h1 class="mt-1 text-3xl font-bold">{{ place.name_am }}</h1>
    </header>

    <dl class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div class="rounded-lg bg-white border p-4">
        <dt class="text-xs text-gray-400">Երևանից ճանապարհ</dt>
        <dd class="mt-1 text-xl font-semibold">
          {{ formatDuration(place.from_yerevan_minutes) }}
        </dd>
      </div>
      <div class="rounded-lg bg-white border p-4">
        <dt class="text-xs text-gray-400">Այցի տևողություն</dt>
        <dd class="mt-1 text-xl font-semibold">
          {{ formatDuration(place.visit_duration_minutes) }}
        </dd>
      </div>
      <div class="rounded-lg bg-white border p-4">
        <dt class="text-xs text-gray-400">Երթուղու խումբ</dt>
        <dd class="mt-1 text-xl font-semibold">{{ place.route_group }}</dd>
      </div>
    </dl>

    <section class="mt-6">
      <h2 class="mb-2 text-lg font-semibold">Հարմար է</h2>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="tag in interests"
          :key="tag"
          class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
        >
          {{ tag }}
        </li>
      </ul>
    </section>
  </article>
</template>
