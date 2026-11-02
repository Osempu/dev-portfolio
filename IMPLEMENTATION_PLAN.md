# Portfolio Implementation Plan: React Migration & New Features

This document outlines the detailed action plan for rewriting the portfolio's UI from Vue to React, implementing a single project view, adding a resume download feature, and creating a contact form.

## Phase 1: React Configuration & Integration

### 1.1 Install React Dependencies
- Install `@astrojs/react`, `react`, `react-dom`, and `@types/react`, `@types/react-dom`.
- Configure `astro.config.ts` to include the React integration.
- Ensure UnoCSS is configured to scan `.tsx` and `.jsx` files.

### 1.2 TypeScript Setup
- Update `tsconfig.json` to support React JSX (`"jsx": "react-jsx"` and `"jsxImportSource": "react"`).

## Phase 2: Component Migration (Vue to React)

### 2.1 Core Component Rewrite
Rewrite all existing Vue components in `src/components/` as React functional components using Hooks.

| Vue Component | React Replacement | Status |
| :--- | :--- | :--- |
| `Header.vue` | `Header.tsx` | Todo |
| `Footer.vue` | `Footer.tsx` | Todo |
| `ThemeToggle.vue` | `ThemeToggle.tsx` | Todo |
| `ScrollToTop.vue` | `ScrollToTop.tsx` | Todo |
| `ListPosts.vue` | `ListPosts.tsx` | Todo |
| `ListProjects.vue` | `ListProjects.tsx` | Todo |
| `ExperienceSection.vue` | `ExperienceSection.tsx` | Todo |
| `SkillsSection.vue` | `SkillsSection.tsx` | Todo |
| `ProjectsSection.vue` | `ProjectsSection.tsx` | Todo |

### 2.2 Shared Hooks
- Implement `useDark` hook or similar using `@vueuse/core` logic (or standard React state/effect) to handle theme switching in React.

## Phase 3: Single Project View

### 3.1 Data Schema Update
- Enhance `src/types.ts` to include detailed project info (long description, technologies used, screenshots, gallery, etc.).
- Update `src/pages/projects/data.ts` with unique IDs or slugs for each project.

### 3.2 Dynamic Routing
- Create `src/pages/projects/[id].astro`.
- Implement `getStaticPaths()` to generate routes for all projects in `data.ts`.

### 3.3 Project Detail Template
- Design and build the single project layout (Astro + React components).
- Include "Back to Projects" navigation.

## Phase 4: Resume Download Logic

### 4.1 Asset Placement
- Place the resume PDF in `public/resume.pdf`.

### 4.2 Download Button Component
- Create a `DownloadResume.tsx` component.
- Add it to the `Header` or a prominent location on the `index.astro` page.
- Implement simple anchor tag with the `download` attribute.

## Phase 5: Contact Form

### 5.1 UI Design
- Create a `ContactForm.tsx` component.
- Fields: Name, Email, Subject, Message.
- Add client-side validation using React state.

### 5.2 Form Handling (Logic)
- Option A: Simple `mailto:` link.
- Option B: Integration with a service like Formspree, Netlify Forms, or Getform.io.
- Option C: Astro API route (`src/pages/api/contact.ts`) if SSR is enabled, or a simple serverless function.
- *Recommended for Static Sites:* Use Netlify Forms or Formspree for zero-config backend handling.

## Phase 6: Refinement & Cleanup

### 6.1 Remove Vue Dependencies
- Remove `@astrojs/vue` from `astro.config.ts`.
- Uninstall Vue-related npm packages.
- Delete all `.vue` files once the migration is confirmed stable.

### 6.2 SEO & Accessibility
- Ensure all new React components maintain the SEO metadata and accessibility standards of the original theme.
- Audit the single project pages for proper heading hierarchy and ARIA labels.

## Timeline Estimate
1. **Phase 1 & 2:** 2-3 days (Core setup and migration).
2. **Phase 3:** 1 day (Single project view).
3. **Phase 4 & 5:** 1 day (Resume and Contact features).
4. **Phase 6:** 0.5 day (Cleanup).

---
*Created on 2026-05-20*
