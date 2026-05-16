<script setup lang="ts">
import type { ExperienceItem } from '@/portfolio-data'

defineProps<{ items: ExperienceItem[] }>()
</script>

<template>
  <section>
    <h3 class="text-2xl font-800 mb-6">
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
        <!-- timeline dot -->
        <div class="absolute left-[4px] top-1.5 w-[1rem] h-[1rem] rounded-full bg-black dark:bg-white opacity-90 flex items-center justify-center">
          <div class="w-3 h-3 rounded-full bg-white dark:bg-zinc-900" />
        </div>

        <!-- company name -->
        <p class="text-xs font-600 uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-0.5">
          {{ item.company }}
        </p>

        <!-- role + period -->
        <div class="flex flex-wrap items-baseline gap-2 mb-3">
          <span class="text-base font-700 text-zinc-900 dark:text-zinc-100">{{ item.role }}</span>
          <span class="text-xs font-400 text-zinc-500 dark:text-zinc-400">{{ item.period }}</span>
        </div>

        <!-- bullet points -->
        <ul class="flex flex-col gap-1.5">
          <li
            v-for="highlight in item.highlights"
            :key="highlight"
            class="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            <span class="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0" />
            <span>{{ highlight }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
