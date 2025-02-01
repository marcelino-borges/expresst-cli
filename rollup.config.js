// import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    external: [],
    output: {
      dir: "dist",
      entryFileNames: "[name].mjs",
      format: "esm",
      preserveModules: true,
    },
    plugins: [
      typescript(),
      commonjs(),
      copy({
        targets: [{ src: "src/assets", dest: "dist" }],
      }),
    ],
  },

  {
    input: "src/index.ts",
    output: {
      file: "./dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
