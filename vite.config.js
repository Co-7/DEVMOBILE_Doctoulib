import {
  defineConfig
} from 'vite'
import {
  VitePWA
} from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Doctoulib',
        short_name: 'Doctou',
        description: 'Doctoulib pour la medecine',
        theme_color: '#374151',
        "background_color": "#374151",
        icons: [{
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  ],
})