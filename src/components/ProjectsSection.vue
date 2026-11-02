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

// Smooth height 0 → auto transition via JS hooks
function onEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
  element.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    element.style.transition = 'height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease'
    element.style.height = `${element.scrollHeight}px`
    element.style.opacity = '1'
  })
}

function onAfterEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.overflow = ''
  element.style.transition = ''
  element.style.opacity = ''
}

function onLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    element.style.transition = 'height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease'
    element.style.height = '0'
    element.style.opacity = '0'
  })
}

function onAfterLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.overflow = ''
  element.style.transition = ''
  element.style.opacity = ''
}
</script>

<template>
  <section class="mt-10">
    <h3 class="text-3xl font-600 mb-3">
      Projects
    </h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="project in projects"
        :key="project.title"
        class="border-solid rounded-xl border-gray-300 dark:border-gray-700
               transition-[transform,box-shadow,background-color,border-color,backdrop-filter] duration-300 cursor-default
               hover:scale-[1.02] hover:shadow-lg
               hover:bg-gray-100/70 hover:backdrop-blur-sm hover:border-gray-400
               dark:hover:bg-white/5 dark:hover:backdrop-blur-sm dark:hover:border-gray-500"
      >
        <!-- collapsed header -->
        <div class="flex gap-4 p-5">
          <!-- image -->
          <div
            v-if="project.image"
            class="w-40 h-25 shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-zinc-800"
          >
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover">
          </div>
          <!-- placeholder when no image -->
          <div
            v-else
            class="w-40 h-25 shrink-0 rounded-lg bg-gray-200 dark:bg-zinc-800 flex items-center justify-center"
          >
            <i class="i-ri-code-box-line text-2xl text-gray-400 dark:text-zinc-500" />
          </div>

          <!-- title + description + stats -->
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-700 text-lg text-blue-500 dark:text-emerald-400 leading-tight">
                {{ project.title }}
              </h3>
              <!-- chevron -->
              <button
                class="text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-emerald-400 transition-colors ml-1 shrink-0"
                :aria-label="expanded.has(project.title) ? 'Collapse' : 'Expand'"
                @click="toggle(project.title)"
              >
                <i
                  class="text-xl block transition-transform duration-300"
                  :class="expanded.has(project.title) ? 'rotate-180' : 'rotate-0'"
                  i-ri-arrow-down-s-line
                />
              </button>
            </div>

            <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1 mb-3">
              {{ project.shortDescription }}
            </p>

            <!-- github stats row -->
            <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
              <div v-if="project.githubStats" class="flex gap-4">
                <span v-if="project.githubStats.language" class="flex items-center gap-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-emerald-400" />
                  {{ project.githubStats.language }}
                </span>
                <span class="flex items-center gap-1">
                  <i class="i-ri-star-line" />
                  {{ project.githubStats.stars }}
                </span>
                <span class="flex items-center gap-1">
                  <i class="i-ri-git-branch-line" />
                  {{ project.githubStats.forks }}
                </span>
              </div>
              <div v-else />
              <!-- links aligned to the right -->
              <div class="flex gap-3 items-center">
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  class="flex items-center gap-1 hover:text-blue-500 dark:hover:text-emerald-400 transition-colors"
                  aria-label="GitHub repository"
                >
                  <i class="i-simple-icons-github text-base mr-1" />
                  GitHub
                </a>
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  class="flex items-center gap-1 hover:text-blue-500 dark:hover:text-emerald-400 transition-colors"
                  aria-label="Live site"
                >
                  <i class="i-ri-external-link-line text-base" />
                  Website
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- expanded details — JS-driven height animation -->
        <Transition
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @leave="onLeave"
          @after-leave="onAfterLeave"
        >
          <div
            v-if="expanded.has(project.title)"
            class="px-5 pb-5 border-t border-gray-200 dark:border-gray-700/60 pt-4"
          >
            <p class="text-base text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
              {{ project.fullDescription }}
            </p>

            <ul class="flex flex-col gap-2 mb-5">
              <li
                v-for="feature in project.features"
                :key="feature"
                class="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-emerald-400 flex-shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <!-- tech stack tags -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="text-xs font-500 px-3 py-1 rounded-full
                       bg-blue-50 text-blue-700
                       dark:bg-emerald-900/40 dark:text-emerald-300
                       border border-blue-300 dark:border-emerald-700/60"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
