import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

/* eslint-disable no-undef */
export default defineConfig(({ mode }) => {
  // Load all .env files based on the current mode ('development', 'production', etc.)
  const env = loadEnv(mode, process.cwd(), '')

  const liveResultsUrl = env.LIVE_RESULTS_URL
  const scoreboardsUrl = env.SCOREBOARDS_URL
  const teamStatsUrl = env.TEAM_STATS_URL
  
  return {
    plugins: [
      react(),
      federation({
        name: 'core',
        filename: 'coreEntry.js',
        exposes: {
          './Layout': './src/layout/Layout.jsx',
          './SharedRouter': './src/router/SharedRouter.jsx',
          './CoreRoutes': './src/router/CoreRoutes.jsx'
        },
        remotes: {
          liveResults: `${liveResultsUrl}/assets/liveResultsEntry.js`,
          scoreboards: `${scoreboardsUrl}/assets/scoreboardsEntry.js`,
          teamStats: `${teamStatsUrl}/assets/teamStatsEntry.js`,
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
    env: {
      node: true, 
    },
    server: {
      cors: true
    }
  }
})
