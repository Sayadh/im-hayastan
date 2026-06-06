<script setup lang="ts">
import type { Place } from '~/types/place'

// Receives the current place; resolves nearby ids via the composable.
const props = defineProps<{ place: Place }>()
const { getNearby } = usePlaces()

const nearby = computed(() => getNearby(props.place))
</script>

<template>
  <section v-if="nearby.length" class="mt-8">
    <h2 class="mb-3 text-lg font-semibold">Մոտակա վայրեր</h2>
    <ul class="flex flex-wrap gap-2">
      <li v-for="n in nearby" :key="n.id">
        <NuxtLink
          :to="`/places/${n.id}`"
          class="inline-block rounded-full border px-3 py-1 text-sm hover:border-brand hover:text-brand"
        >
          {{ n.name_am }}
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
