<script setup lang="ts">
const { getAll } = usePlaces()
const total = getAll().length
</script>

<template>
  <section class="text-center py-12">
    <h1 class="text-4xl font-bold">Բացահայտիր Հայաստանը</h1>
    <p class="mx-auto mt-3 max-w-xl text-gray-600">
      Տեսարժան վայրեր, մարզեր և երթուղիներ՝ մեկ տեղում։
      Շուտով՝ AI Planner, որը կկազմի քո անհատական ճամփորդությունը։
    </p>

    <div class="mt-8 flex justify-center gap-4">
      <NuxtLink
        to="/places"
        class="rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark"
      >
        Տես {{ total }} վայր
      </NuxtLink>
      <NuxtLink
        to="/planner"
        class="rounded-lg border px-6 py-3 font-medium hover:border-brand hover:text-brand"
      >
        Կազմել երթուղի
      </NuxtLink>
    </div>
  </section>
</template>
