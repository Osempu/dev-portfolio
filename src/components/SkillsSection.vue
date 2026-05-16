<script setup lang="ts">
import type { SkillCategory } from '@/portfolio-data'

defineProps<{ categories: SkillCategory[] }>()
</script>

<template>
  <section>
    <h3 class="text-2xl font-800 mb-3">
      🟣 Skills
    </h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="category in categories"
        :key="category.title"
        class="border-solid rounded-md border-gray-300 border-1 p-5"
      >
        <h3 class="mb-2">
          {{ category.icon }} {{ category.title }}
        </h3>
        <ul class="flex flex-row justify-start gap-x-4 gap-y-2 flex-wrap">
          <li v-for="item in category.items" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
