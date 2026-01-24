import App from '@/App.vue'
import AllMoviesPage from '@/views/AllMoviesPage.vue'
import FirstPageView from '@/views/FirstPageView.vue'
import MovieInfoView from '@/views/MovieInfoView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FirstPageView,
    },
    {
      path: '/movies',
      name: 'allMovies',
      component: AllMoviesPage,
    },
    {
    path: '/movies/:id',
    name: 'MovieDetails',
    component: MovieInfoView,
    },
  ],
})

export default router
