const routes = [
  {
    path: '/users',
    component: () => import('layouts/UsersLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
