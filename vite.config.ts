import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

const lastUpdated = execSync('git log -1 --format="%ad" --date=format:"%B %d, %Y"').toString().trim()

export default defineConfig({
  base: '/communication-research-agent/',
  plugins: [react(), tailwindcss()],
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated),
  },
})
