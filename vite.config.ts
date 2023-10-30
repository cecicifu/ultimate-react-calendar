import { defineConfig } from "vite"
import { extname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { glob } from "glob"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			include: ["lib"],
		}),
	],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, "lib/Calendar.tsx"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
			input: Object.fromEntries(
				// https://rollupjs.org/configuration-options/#input
				glob.sync("lib/**/!(*.d).{ts,tsx}").map((file) => [
					// 1. The name of the entry point
					// lib/nested/foo.js becomes nested/foo
					relative("lib", file.slice(0, file.length - extname(file).length)),
					// 2. The absolute path to the entry file
					// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
					fileURLToPath(new URL(file, import.meta.url)),
				])
			),
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "[name].js",
			},
		},
	},
})
