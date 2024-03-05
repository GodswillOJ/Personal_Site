import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-react'

// to remove errors in password reset link token such as dots in password
export default defineConfig({
    plugin: [react(), pluginRewriteAll()],
})