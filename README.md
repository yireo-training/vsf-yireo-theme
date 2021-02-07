# Vue Storefront 1 - parent/child theme
A parent/child theme mechanism for Vue Storefront 1.

## Installation
Fork this repository under your own GitHub account and clone it to the `src/themes/` folder - for instance `src/themes/example`.

Within the theme folder `src/themes/example`, run the following command:

    yarn add @yireo/vsf1-webpack-inheritance-plugin

Next, create a file `theme.json` with the following content. A sample is provided in `theme.json.dist`:
```json
{
    "parent": "capybara"
}
```

Copy `index.js.dist` to `index.js` IF (!) you want to have a clean start. Or study its contents. These files are **not** a drop-in click-click solution. They require you to be a Vue Storefront 1 developer that knows how to customize a Vue Storefront 1 theme. Otherwise copy the file from the parent theme, modify its paths (`import`) to be correctly pointing to the right files, and hack the demo.

Copy the file `router/index.js.dist` to `router/index.js` IF (!) you want to have the routing this way. See the comment above.

Copy over the following folders from your parent theme to this child theme:
- `assets/`
- `css/`
- `resource/`

## Additional step for the Default Theme
Create a `webpack.config.js` file with the following contents:
```js
const InheritancePlugin = require('@yireo/vsf1-webpack-inheritance-plugin');
const themeJson = require('./theme.json');

module.exports = function (config, {isClient}) {
  if (!config.resolve.plugins) config.resolve.plugins = [];
  config.resolve.plugins.push(new InheritancePlugin({parent: themeJson.parent}));
  
  return config;
};
```

Edit `index.js` so that it matches your theme:
```js
import { themeEntry } from '../default';
```

Edit `router/index.js` so that it matches your theme:
```js
import routes from '../../default/router';
```

## Additional step for the Capybara Theme
Copy `webpack.config.js` from Capybara to your theme. Edit the file `webpack.config.js` so that the Webpack plugin is added.

In the top:
```js
const InheritancePlugin = require("@yireo/vsf1-webpack-inheritance-plugin");
const themeJson = require("./theme.json");
```

In the bottom:
```js
  ...

  if (!mergedConfig.resolve.plugins) mergedConfig.resolve.plugins = [];
  mergedConfig.resolve.plugins.push(new Vsf1ThemeInheritancePlugin({parent: themeJson.parent}));

  return mergedConfig;
};
```

Do make sure to copy the file `config/modules.ts` from Capybara into your custom theme.

## Usage: Components
You can copy any component file (like `pages/Home.vue`) from the parent theme to the child theme. This should automatically be resolved correctly.

## Usage: Routing
It is strongly advised to import the parent routes in your own route file `router/index.js`. Next you can make simply modifications:

```js
import routes from '../../default/router';
const Foobar = () => import(/* webpackChunkName: "vsf-foobar" */ 'theme/pages/Foobar.vue')

routes.push({ name: 'foobar', path: '/foobar', component: Home, alias: '/foobar.html' });

export default routes;
```

## Usage: CSS & assets & resources
CSS & assets & resources are not resolved automatically. But if you are extending upon Capybara, you will only need to copy a single file `css/main.scss` with a single line of code, and then you're good to go.

