const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const themeConfig = require('./theme.json');

module.exports = function (config, { isClient, isDev }) {
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/(\.*)/, resource => {
      let match;

      match = resource.request.match(/^theme\/(.*)/);
      if (match) {
        if (!fs.existsSync(path.resolve(__dirname, match[1]))) {
          resource.request = resource.request.replace(
            /^theme\//,
            'src/themes/' + themeConfig.parent + '/'
          );
        }
      }
    })
  );

  return config;
};
