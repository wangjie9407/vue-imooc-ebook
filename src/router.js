import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index.vue'),
      children: [
        {
          path: ':filename',
          component: () => import('./components/ebook/ebook-reader.vue')
        }
      ]
    }
  ]
})
