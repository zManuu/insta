/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('@vue/cli-service')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      plugins: [
        new TsconfigPathsPlugin()
      ]
    }
  },
  transpileDependencies: true,
  outputDir: '../server/resources/alt-next/client/vue'
})