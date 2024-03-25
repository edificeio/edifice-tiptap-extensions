// rollup.config.js

import autoExternal from 'rollup-plugin-auto-external';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    autoExternal({ packagePath: './package.json' }),
    sourcemaps(),
    babel(),
    commonjs(),
    typescript(),
    terser()
  ],
};

export default config;
