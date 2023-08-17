const { composePlugins, withNx } = require('@nx/webpack')
const { merge } = require('webpack-merge')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  // return config
  return merge(config, {
    output: {
      filename: '[name].js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          /**
           * Added webpack configuration to separate the json files
           * from the config folder into a separate chunk...
           * with this now , we can inject the config files separated
           * to replace in the different stages =)
           */
          secrets: {
            test: /config\/secrets.ts/,
            filename: 'config/secrets.js',
            chunks: 'initial',
            enforce: true,
            name(module) {
              const filename = module.rawRequest.replace(/^.*[\\/]/, '')
              return filename.substring(0, filename.lastIndexOf('.'))
            },
          },
        },
      },
    },
  })
})
