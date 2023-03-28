import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

module.exports = {
  input: "lib/service.js",
  cache: false,
  plugins: [
    json(),
    terser(),
  ],
  exclude: ['node_modules', 'rollup'],
  output: [
    {
      format: "umd",
      name: "mo-deploy",
      file: "dist/mo-deploy.umd.js"
    },
    {
      format: "es",
      name: "mo-deploy",
      file: "dist/mo-deploy.es.js"
    }
  ]
}