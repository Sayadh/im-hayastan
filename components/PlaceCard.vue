<script setup lang="ts">
import type { Place } from '~/types/place'
import { formatDuration } from '~/utils/format'

defineProps<{ place: Place }>()
</script>

<template>
  <NuxtLink
    :to="`/places/${place.id}`"
    class="block rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md hover:border-brand"
  >
    <div class="flex items-start justify-between gap-2">
      <h3 class="font-semibold text-lg text-gray-900">{{ place.name_am }}</h3>
      <span class="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand">
        {{ place.region }}
      </span>
    </div>

    <p class="mt-1 text-sm text-gray-500">{{ place.category }}</p>

    <dl class="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div>
        <dt class="text-gray-400">Երևանից</dt>
        <dd class="font-medium">{{ formatDuration(place.from_yerevan_minutes) }}</dd>
      </div>
      <div>
        <dt class="text-gray-400">Այցի տևողություն</dt>
        <dd class="font-medium">{{ formatDuration(place.visit_duration_minutes) }}</dd>
      </div>
    </dl>
  </NuxtLink>
</template>
