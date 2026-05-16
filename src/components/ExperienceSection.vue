<script setup lang="ts">
import type { ExperienceItem } from '@/portfolio-data'

defineProps<{ items: ExperienceItem[] }>()
</script>

<template>
  <section>
    <h3 class="text-3xl font-800 mb-6">
      Experience
    </h3>
    <div class="relative flex flex-col">
      <!-- vertical timeline line -->
      <div class="absolute left-3 top-2 bottom-2 w-px bg-black dark:bg-white opacity-20" />

      <div
        v-for="item in items"
        :key="item.company"
        class="relative pl-10 pb-8 last:pb-0"
      >
        <!-- timeline dot (outside the scaling wrapper so it stays fixed) -->
        <div class="absolute left-[4px] top-1.5 w-[1rem] h-[1rem] rounded-full bg-black dark:bg-white opacity-90 flex items-center justify-center">
          <div class="w-3 h-3 rounded-full bg-white dark:bg-zinc-900" />
        </div>

        <!-- content card (this is what scales + gets the glass effect) -->
        <div
          class="rounded-md cursor-default transition-all duration-300 px-4 p-3 mt-[-0.5rem]
                 hover:scale-[1.02] hover:shadow-lg
                 hover:bg-gray-100/70 hover:backdrop-blur-sm
                 dark:hover:bg-white/5 dark:hover:backdrop-blur-sm"
        >
          <!-- company name -->
          <p class="text-sm font-600 uppercase tracking-widest text-blue-500 dark:text-emerald-400 mb-0.5">
            {{ item.company }}
          </p>

          <!-- role + period -->
          <div class="flex flex-wrap items-baseline gap-2 mb-3">
            <span class="text-lg font-700 text-zinc-900 dark:text-zinc-100">{{ item.role }}</span>
            <span class="text-sm font-400 text-zinc-500 dark:text-zinc-400">{{ item.period }}</span>
          </div>

          <!-- bullet points -->
          <ul class="flex flex-col gap-1.5">
            <li
              v-for="highlight in item.highlights"
              :key="highlight"
              class="flex gap-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              <span class="mt-2 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0" />
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
