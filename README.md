# Vue Storefront 1 - parent/child theme
A parent/child theme mechanism for Vue Storefront 1.

## Installation
Fork this repository under your own GitHub account and clone it to the `src/themes/` folder - for instance `src/themes/example`.

Next, create a file `theme.json` with the following content:

```json
{
    "parent": "capybara"
}
```

Copy over the following folders from your parent theme to this child theme:
- `assets/`
- `css/`
- `resource/`

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