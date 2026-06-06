<script setup lang="ts">
const { getAll } = usePlaces()
const places = getAll()

useHead({ title: 'Բոլոր վայրերը · Armenia Travel' })
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold">Բոլոր վայրերը</h1>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <PlaceCard v-for="place in places" :key="place.id" :place="place" />
    </div>
  </div>
</template>
