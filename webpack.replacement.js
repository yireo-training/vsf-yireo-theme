const webpack = require('webpack');
const themeConfig = require('./theme.json');
const path = require('path');
const fs = require('fs');

module.exports = new webpack.NormalModuleReplacementPlugin(
  /(\.*)/,
  (resource) => {
    let match = resource.request.match(/^theme\/(.*)/);
    if (!match) {
      return;
    }

    if (!fs.existsSync(path.resolve(__dirname, match[1]))) {
      resource.request = resource.request.replace(
        /^theme\//,
        "src/themes/" + themeConfig.parent + "/"
      );
    }
  }
);

