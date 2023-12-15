import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: "/friends",
			name: "friends",
			component: () =>
				import(/* webpackChunkName: "friends" */ "../views/FriendsView.vue"),
		},
		{
			path: "/presents",
			name: "presents",
			component: () =>
				import(/* webpackChunkName: "presents" */ "../views/PresentsView.vue"),
		},
		{
			path: "/assignments",
			name: "assignments",
			component: () =>
				import(/* webpackChunkName: "assignments" */ "../views/AssignmentsView.vue"),
		},
	]
})

export default router
