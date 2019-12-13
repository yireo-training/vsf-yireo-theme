import routes from '../../default/router';
const Home = () => import(/* webpackChunkName: "vsf-home" */ 'theme/pages/Home.vue')

routes.push({ name: 'foobar', path: '/home2', component: Home, alias: '/home2.html' });

export default routes;
