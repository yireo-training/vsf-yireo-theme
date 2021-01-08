import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore';
import routes from './router';
import '@vue-storefront/core/lib/passive-listeners';
import { RouterManager } from '@vue-storefront/core/lib/router-manager';
import { themeEntry } from '../default';

const initTheme = function (app, router, store, config, ssrContext) {
  setupMultistoreRoutes(config, router, routes);
  RouterManager.addRoutes(routes, router);
};

export { themeEntry, initTheme };
