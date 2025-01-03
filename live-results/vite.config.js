import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Load all .env files based on the current mode ('development', 'production', etc.)
  const env = loadEnv(mode, process.cwd(), '')

  const coreUrl = env.CORE_URL
  
  return {
    plugins: [react(),
      federation({
        name: 'liveResults',
        filename: 'liveResultsEntry.js',
        exposes: {
          './App': './src/app.jsx'
        },
        remotes: {
          core: `${coreUrl}/assets/coreEntry.js`
        },
        shared: {
          'react': { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
          'react-router-dom': { singleton: true, eager: true }
        }
      })
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: 'false',
      cssCodeSplit: false
    },
    server: {
      cors: true
    }
  }
})
