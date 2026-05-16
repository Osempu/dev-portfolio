<script setup lang="ts">
import type { ExperienceItem } from '@/portfolio-data'

defineProps<{ items: ExperienceItem[] }>()
</script>

<template>
  <section>
    <h3 class="text-2xl font-800 mb-3">
      🟣 Experience
    </h3>
    <div class="flex flex-col gap-6">
      <div v-for="item in items" :key="item.company">
        <h4 class="font-600">
          👨🏾‍💻 {{ item.company }}
        </h4>
        <span>{{ item.role }}</span> | <span>{{ item.period }}</span>
        <ul class="pl-7 list-disc">
          <li v-for="highlight in item.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
