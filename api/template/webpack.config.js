const { composePlugins, withNx } = require('@nx/webpack')
const { merge } = require('webpack-merge');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  return merge(config, {
    output: {
      filename: '[name].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          secrets: {
            test: /config\/secrets.ts/,
            filename: 'config/secrets.js',
            chunks: "initial",
            enforce: true,
            name(module) {
              const filename = module.rawRequest.replace(/^.*[\\/]/, '');
              return filename.substring(0, filename.lastIndexOf('.'));
            },
          }
        }
      }
    }
  })
})
