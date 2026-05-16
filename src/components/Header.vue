<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import { useDark, useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const isDark = useDark()
const logoFill = computed(() => isDark.value ? '#34D399' : '#3B82F6')

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
    <div class="flex items-center h-full">
      <a href="/" mr-6 aria-label="Header Logo Image">
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 41" :alt="siteConfig.header.logo.alt" style="transition: fill 0.3s ease">
          <g id="logogram" transform="translate(0, 0) rotate(0 20.5 20.5) translate(20.5, 20.5) scale(1, -1) translate(-20.5, -20.5)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.461 12.3052C24.8165 11.2064 22.8831 10.6199 20.9053 10.6199V0.619934C24.8609 0.619934 28.7277 1.79291 32.0167 3.99054C35.3056 6.18817 37.8691 9.31174 39.3829 12.9663C40.8966 16.6208 41.2927 20.6421 40.521 24.5217C39.7493 28.4014 37.8444 31.965 35.0474 34.7621C32.2503 37.5591 28.6867 39.4639 24.8071 40.2356C20.9275 41.0073 16.9061 40.6113 13.2516 39.0975C9.59708 37.5838 6.47351 35.0203 4.27588 31.7313C2.07825 28.4423 0.905273 24.5756 0.905273 20.6199H10.9053C10.9053 22.5977 11.4918 24.5311 12.5906 26.1756C13.6894 27.8201 15.2512 29.1018 17.0784 29.8587C18.9057 30.6156 20.9164 30.8136 22.8562 30.4278C24.796 30.0419 26.5778 29.0895 27.9763 27.691C29.3749 26.2925 30.3273 24.5106 30.7131 22.5708C31.099 20.631 30.9009 18.6204 30.1441 16.7931C29.3872 14.9658 28.1055 13.404 26.461 12.3052Z" :fill="logoFill" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9053 0.619965C10.9053 1.93318 10.6466 3.23354 10.1441 4.4468C9.64153 5.66006 8.90493 6.76245 7.97635 7.69103C7.04776 8.61962 5.94537 9.35621 4.73211 9.85876C3.51886 10.3613 2.2185 10.62 0.905279 10.62L0.905273 20.6199C3.53171 20.6199 6.13244 20.1026 8.55895 19.0976C10.9855 18.0925 13.1902 16.6193 15.0474 14.7621C16.9046 12.9049 18.3778 10.7001 19.3829 8.27363C20.388 5.84712 20.9053 3.24637 20.9053 0.619934L10.9053 0.619965Z" :fill="logoFill" />
          </g>
        </svg>
      </a>
      <div sm:hidden h-full flex items-center @click="toggleNavDrawer()">
        <menu i-ri-menu-2-fill />
      </div>
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
