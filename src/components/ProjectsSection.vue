<script setup lang="ts">
import type { ProjectData } from '@/portfolio-data'
import { ref } from 'vue'

defineProps<{ projects: ProjectData[] }>()

const expanded = ref<Set<string>>(new Set())

function toggle(title: string) {
  if (expanded.value.has(title))
    expanded.value.delete(title)
  else
    expanded.value.add(title)
}
</script>

<template>
  <section>
    <h3 class="text-2xl font-800 mb-3">
      🟣 Projects
    </h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="project in projects"
        :key="project.title"
        class="border-solid rounded-md border-gray-300 border-1 p-5"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-600 text-lg">
              {{ project.title }}
            </h3>
            <p class="text-sm op-75">
              {{ project.shortDescription }}
            </p>
          </div>
          <div class="flex gap-2 items-center ml-4 shrink-0">
            <button
              class="op-70 hover:op-100 transition-opacity"
              :aria-label="expanded.has(project.title) ? 'Collapse' : 'Expand'"
              @click="toggle(project.title)"
            >
              <i :class="expanded.has(project.title) ? 'i-ri-arrow-up-s-line' : 'i-ri-arrow-down-s-line'" />
            </button>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="op-70 hover:op-100 transition-opacity"
              aria-label="GitHub repository"
            >
              <i class="i-simple-icons-github" />
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="op-70 hover:op-100 transition-opacity"
              aria-label="Live site"
            >
              <i class="i-ri-external-link-line" />
            </a>
          </div>
        </div>

        <div v-if="expanded.has(project.title)" class="mt-4">
          <p class="mb-3">
            {{ project.fullDescription }}
          </p>
          <ul class="pl-5 list-disc mb-3">
            <li v-for="feature in project.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="border-solid rounded border-gray-300 border-1 px-2 py-0.5 text-sm"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
