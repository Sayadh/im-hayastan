<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-brand text-white">
      <nav class="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
        <NuxtLink to="/" class="font-bold text-lg">🇦🇲 Armenia Travel</NuxtLink>
        <NuxtLink to="/places" class="hover:underline">Վայրեր</NuxtLink>
        <NuxtLink to="/planner" class="hover:underline">AI Planner</NuxtLink>
      </nav>
    </header>

    <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <footer class="border-t bg-white">
      <div class="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
        © {{ new Date().getFullYear() }} Armenia Travel — MVP
      </div>
    </footer>
  </div>
</template>
