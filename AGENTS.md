# AGENTS.md — Developer Portfolio (Astro Vitesse Theme)

This file provides guidance for agentic coding tools operating in this repository.

## Project Overview

Personal developer portfolio built on the [Vitesse theme for Astro](https://github.com/kieranwv/astro-theme-vitesse).
Stack: **Astro 5**, **Vue 3**, **UnoCSS**, **TypeScript**, **MDX**.

## Project Structure

```
src/
  components/       # Shared UI components
    BaseHead.astro  # HTML <head> meta/SEO (Astro)
    Header.vue      # Site header with nav and theme toggle
    Footer.vue      # Site footer with links
    ListPosts.vue   # Blog post listing
    ListProjects.vue# Projects listing
    ScrollToTop.vue # Scroll-to-top button
    ThemeToggle.vue # Dark/light mode toggle
  content/
    blog/           # Blog posts as .md / .mdx files
    pages/          # Custom pages as .md / .mdx files
    config.ts       # Astro content collection schemas (zod)
  layouts/
    BaseLayout.astro# Root layout wrapping all pages
  pages/
    index.astro     # Home page
    [slug].astro    # Dynamic page route
    404.mdx         # 404 page
    blog/           # Blog index and category pages
    posts/          # Post detail pages
    projects/
      data.ts       # Projects data file
    robots.txt.ts   # Robots.txt endpoint
    rss.xml.ts      # RSS feed endpoint
  styles/           # Global CSS / UnoCSS styles
  types.ts          # Shared TypeScript types
  site-config.ts    # Site-wide configuration (author, nav, social links)
  env.d.ts          # Astro environment type declarations
public/             # Static assets (images, favicon, etc.)
astro.config.ts     # Astro configuration
uno.config.ts       # UnoCSS configuration (shortcuts, presets, fonts)
eslint.config.js    # ESLint flat config (@antfu/eslint-config)
tsconfig.json       # TypeScript config (extends astro/tsconfigs/strict)
```

## Build / Dev Commands

```bash
# Install dependencies
npm install

# Start local dev server (port 1977)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint all files
npm run lint

# Lint and auto-fix
npm run lint:fix
```

> **Note:** There is no test suite in this project. No `npm test` command exists.
> The pre-commit hook runs `lint:fix` via lint-staged on every commit.

## Code Style Guidelines

### General

- Use **TypeScript** everywhere. Avoid `any`; prefer explicit types or `unknown`.
- `tsconfig.json` extends `astro/tsconfigs/strict` with `strictNullChecks: true`.
- Path alias `@/*` maps to `src/*`. Always use `@/` for internal imports instead of relative paths when crossing directory boundaries.
- Node ≥ 18.17.1 or ≥ 20.3.0 required.

### Formatting / Linting

- ESLint with `@antfu/eslint-config` (flat config). Covers Vue, TypeScript, and Astro files.
- `eslint-plugin-format` is active for CSS and Astro files (via `prettier-plugin-astro`).
- No separate Prettier config — formatting is handled entirely through ESLint rules.
- Run `npm run lint:fix` before committing; the pre-commit hook enforces it automatically.
- Key style rules enforced by `@antfu/eslint-config`:
  - Single quotes for strings.
  - No semicolons.
  - 2-space indentation.
  - Trailing commas in multi-line structures.
  - `import type` for type-only imports.

### Imports

- Group imports: external packages → `@/` internal → relative.
- Use `import type { ... }` for type-only imports.
- Sort imports automatically (enforced by ESLint).

```ts
import type { PostKey } from '@/types'
// Good
import type { CollectionEntry } from 'astro:content'
import { siteConfig } from '@/site-config'
import { getCollection } from 'astro:content'
```

### TypeScript

- Define shared types in `src/types.ts`.
- Use Zod schemas in `src/content/config.ts` for content collection validation.
- Prefer `interface` for object shapes that may be extended; `type` for unions and aliases.
- Use `CollectionEntry<'blog'>` / `CollectionEntry<'pages'>` from `astro:content` for post types.

### Astro Components (`.astro`)

- Use `.astro` for layout/structural components with minimal interactivity.
- Component frontmatter (`---`) should import only what is needed.
- Pass typed props using `Astro.props` with explicit type annotations.
- Keep logic in the frontmatter; avoid inline scripts unless necessary.

```astro
---
import type { CollectionPosts } from '@/types'
interface Props {
  post: CollectionPosts
}
const { post } = Astro.props
---
```

### Vue Components (`.vue`)

- Use Vue 3 `<script setup>` syntax with TypeScript.
- Use `defineProps<{...}>()` for typed props — no runtime prop declarations.
- Prefer `@vueuse/core` composables over custom equivalents when available.
- Component filenames: **PascalCase** (e.g., `ListPosts.vue`, `ThemeToggle.vue`).

```vue
<script setup lang="ts">
import type { CollectionPosts } from '@/types'
const props = defineProps<{ posts: CollectionPosts[] }>()
</script>
```

### Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Astro components | PascalCase | `BaseHead.astro` |
| Vue components | PascalCase | `ThemeToggle.vue` |
| TypeScript files | camelCase | `site-config.ts`, `posts.ts` |
| Content collections | lowercase | `blog`, `pages` |
| CSS utility shortcuts | kebab-case | `bg-main`, `text-link` |
| Variables / functions | camelCase | `getPostsByTag` |
| Types / Interfaces | PascalCase | `ProjectData`, `PostKey` |

### Styling (UnoCSS)

- Use **UnoCSS utility classes** directly in templates — no scoped CSS unless necessary.
- Custom shortcuts are defined in `uno.config.ts` (e.g., `bg-main`, `text-link`, `nav-link`, `prose-link`).
- Icons use `i-` prefix with Iconify collections (e.g., `i-ri-github-line`, `i-simple-icons-x`).
- Dark mode uses `dark:` variant classes.
- Fonts: `font-sans` (Inter) and `font-mono` (DM Mono) — configured in `uno.config.ts`.
- Add new icon classes to the `safelist` in `uno.config.ts` if they are dynamically generated.

### Content Collections

- Blog posts go in `src/content/blog/` as `.md` or `.mdx` files.
- Custom pages go in `src/content/pages/` as `.md` or `.mdx` files.
- Required frontmatter for blog posts: `title`, `date`.
- Optional frontmatter: `description`, `duration`, `tag`, `draft`, `lang`, `image`, `redirect`, `video`.
- Set `draft: true` to hide a post from listings without deleting it.

### Site Configuration

- Update `src/site-config.ts` to change author info, nav links, social links, and footer links.
- Update `astro.config.ts` `site` field to match the production deployment URL.

### Error Handling

- Use optional chaining and nullish coalescing — `strictNullChecks` is enabled.
- Validate external data (content frontmatter) through Zod schemas in `src/content/config.ts`.
- For API/endpoint routes (`.ts` files in `pages/`), return proper HTTP status codes.

## Key Dependencies

| Package | Purpose |
|---|---|
| `astro` | Framework |
| `@astrojs/vue` | Vue 3 integration |
| `@astrojs/mdx` | MDX support for content |
| `@astrojs/sitemap` | Auto sitemap generation |
| `@astrojs/rss` | RSS feed |
| `unocss` | Atomic CSS engine |
| `@unocss/reset` | CSS reset |
| `vue` | UI components |
| `@vueuse/core` | Vue composables |
| `nprogress` | Page loading progress bar |
