import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    lib: {
      name: "@urekasystems/datex-bs",
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
