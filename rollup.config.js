import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import builtins from 'rollup-plugin-node-builtins';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
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
    plugins: [
      resolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      sourceMaps(),
      builtins(),
      nodePolyfills({ include: null }),
      replace({
        preventAssignment: true,
        delimiters: ['', ''],
        '  host: parsedUrl.hostname,':
          '  protocol: parsedUrl.protocol, host: parsedUrl.hostname,',
      }),
    ],
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
      resolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      sourceMaps(),
      copy({
        targets: [{ src: 'src/index.d.ts', dest: 'dist' }],
      }),
    ],
  },
];
