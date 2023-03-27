const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: "lib/service.js",
  cache: false,
  plugins: [
    terser()
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