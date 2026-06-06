<script setup lang="ts">
const route = useRoute()
const { getById } = usePlaces()

// Validate the dynamic id: must be a positive integer.
const id = Number(route.params.id)
const place = Number.isInteger(id) && id > 0 ? getById(id) : undefined

// Friendly 404 if the place does not exist.
if (!place) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Այս վայրը գոյություն չունի',
    fatal: true
  })
}

useHead({ title: `${place.name_am} · Armenia Travel` })
</script>

<template>
  <div>
    <NuxtLink to="/places" class="text-sm text-gray-500 hover:text-brand">
      ← Բոլոր վայրերը
    </NuxtLink>

    <div class="mt-4">
      <PlaceDetails :place="place" />
      <NearbyPlaces :place="place" />
    </div>
  </div>
</template>
