import App from '@/App.vue'
import AllMoviesPage from '@/views/AllMoviesPage.vue'
import FirstPageView from '@/views/FirstPageView.vue'
import LoginView from '@/views/LoginView.vue'
import MovieInfoView from '@/views/MovieInfoView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
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
    {
    path: '/registration',
    name: 'Registration',
    component: RegistrationView,
    },
    {
    path: '/login',
    name: 'LogIn',
    component: LoginView,
    },
  ],
})

export default router
