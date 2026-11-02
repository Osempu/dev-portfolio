<!-- eslint-disable unused-imports/no-unused-vars -->
<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import { useDark, useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const isDark = useDark()

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') {
      return link
    }
    else if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    else {
      return false
    }
  })
})

const { y: scroll } = useWindowScroll()

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const navMask = document.querySelector('.nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})

function toggleNavDrawer() {
  const drawer = document.querySelector('.nav-drawer') as HTMLElement
  const mask = document.querySelector('.nav-drawer-mask') as HTMLElement
  if (!drawer || !mask)
    return
  if (drawer.style.transform === `translateX(0%)`) {
    drawer.style.transform = `translateX(-100%)`
    mask.style.display = `none`
  }
  else {
    drawer.style.transform = `translateX(0%)`
    mask.style.display = `block`
  }
}
</script>

<template>
  <header
    id="header" :class="{ 'header-bg-blur': scroll > 20 }"
    view-transition-name="site-header"
    class="bg-transparent z-899 md:w-3/5 w-full mx-auto h-20 px-6 flex justify-between items-center relative"
  >
    <div sm:hidden h-full flex items-center @click="toggleNavDrawer()">
      <menu i-ri-menu-2-fill />
    </div>

    <nav
      class="sm:flex hidden flex-wrap gap-x-6 flex-row rounded-full border-gray-400 border-solid border-1 border-link px-6 py-3 font-600 text-sm transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            hover:scale-105"
    >
      <a
        v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
        nav-link :href="link.href" class="inline-flex items-center gap-1"
      >
        {{ link.text }}
        <i v-if="link.external" class="i-ri-arrow-right-up-line text-xs opacity-60" />
      </a>
    </nav>

    <!-- SOCIAL LINKS -->
    <div class="flex gap-x-6">
      <a
        v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" nav-link
        class="sm:block hidden"
        :target="getLinkTarget(link.href)" :href="link.href"
      />

      <!-- <a nav-link target="_blank" href="/rss.xml" i-ri-rss-line aria-label="RSS" /> -->
      <ThemeToggle />
    </div>
  </header>
  <nav
    class="nav-drawer sm:hidden"
  >
    <i i-ri-menu-2-fill />
    <a
      v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
      nav-link :href="link.href" class="inline-flex items-center gap-1" @click="toggleNavDrawer()"
    >
      {{ link.text }}
      <i v-if="link.external" class="i-ri-arrow-right-up-line text-xs opacity-60" />
    </a>
    <!-- Social links in mobile drawer -->
    <div class="flex gap-4 mt-2 pt-4 border-t border-gray-200 dark:border-gray-700">
      <a
        v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" nav-link
        :target="getLinkTarget(link.href)" :href="link.href"
      />
    </div>
  </nav>
  <div class="nav-drawer-mask" @click="toggleNavDrawer()" />
</template>

<style scoped>
.header-hide {
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm;
}

.nav-drawer {
  transform: translateX(-100%);
  --at-apply: box-border fixed h-screen z-999 left-0 top-0 min-w-32vw max-w-50vw bg-main p-6 text-lg flex flex-col gap-5
    transition-all;
}

.nav-drawer-mask {
  display: none;
  --at-apply: transition-all;
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
