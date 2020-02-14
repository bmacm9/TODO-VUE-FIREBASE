import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import privado from './components/privado.vue';
import login from './components/login.vue';
import register from './components/register.vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(firestorePlugin);
Vue.use(VueRouter);
Vue.use(firebase);

const routes = [
  { path: '/login', component: login },
  { path: '/', component: login },
  { path: '/register', component: register },
  {
    path: '/privado', component: privado,
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});


firebase.auth().onAuthStateChanged(function(user){
  if(user){
    router.replace("/privado")
  }else{
    router.replace("/login");
  }
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/login');
  else next();
})

export default router;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
