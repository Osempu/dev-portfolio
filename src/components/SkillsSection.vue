<script setup lang="ts">
import type { SkillCategory } from '@/portfolio-data'

defineProps<{ categories: SkillCategory[] }>()
</script>

<template>
  <section class="mt-10">
    <h3 class="text-3xl font-600 mb-3 text-center md:text-left">
      Skills
    </h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="category in categories"
        :key="category.title"
        class="border-solid rounded-md border-gray-300 dark:border-gray-700 p-4 sm:p-7
               transition-all duration-300 cursor-default
               hover:scale-[1.02] hover:shadow-lg
               hover:bg-gray-100/70 hover:backdrop-blur-sm hover:border-gray-400
               dark:hover:bg-white/5 dark:hover:backdrop-blur-sm dark:hover:border-gray-500"
      >
        <h4 class="mb-4 font-600 text-lg text-zinc-900 dark:text-zinc-100">
          {{ category.icon }} {{ category.title }}
        </h4>
        <ul class="flex flex-row justify-start gap-x-2 gap-y-2 flex-wrap">
          <li
            v-for="item in category.items"
            :key="item"
            class="text-sm font-500 px-3 py-1 rounded-full
                   bg-blue-50 text-blue-700
                   dark:bg-emerald-900/40 dark:text-emerald-300
                   border border-blue-300 dark:border-emerald-700/60"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
