import sourceMaps from 'rollup-plugin-sourcemaps';
import copy from 'rollup-plugin-copy';

const pkg = require('./package.json');

export default [
  {
    input: 'out-tsc/index.js',
    output: [
      {
        exports: 'named',
        file: pkg.module,
        sourcemap: true,
      },
    ],
    plugins: [sourceMaps()],
  },
  {
    input: 'out-tsc/index-cjs.js',
    output: [
      {
        exports: 'named',
        file: pkg.main,
        sourcemap: true,
        format: 'cjs',
      },
    ],
    plugins: [
      sourceMaps(),
      copy({
        targets: [{ src: 'src/index.d.ts', dest: 'dist' }],
      }),
    ],
  },
];
