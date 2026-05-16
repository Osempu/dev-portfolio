<script setup lang="ts">
import type { SkillCategory } from '@/portfolio-data'

defineProps<{ categories: SkillCategory[] }>()
</script>

<template>
  <section class="mt-10">
    <h3 class="text-3xl font-600 mb-3">
      Skills
    </h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="category in categories"
        :key="category.title"
        class="border-solid rounded-md border-gray-300 dark:border-gray-700 border-1 p-5"
      >
        <h4 class="mb-2 font-600 text-zinc-900 dark:text-zinc-100">
          {{ category.icon }} {{ category.title }}
        </h4>
        <ul class="flex flex-row justify-start gap-x-4 gap-y-2 flex-wrap">
          <li v-for="item in category.items" :key="item" class="text-sm text-zinc-600 dark:text-zinc-400">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
