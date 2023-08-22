import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/astro-app',
  integrations: [react()],
})
