import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginPage.vue';
import Dashboard from '../views/DashboardPage.vue';
import ShoppingListIndex from '../views/list/IndexPage.vue';
import CreateShoppingList from '../views/list/CreatePage.vue';

function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

const routes = [{
        path: '/',
        name: 'Home',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/shopping-list',
        name: 'ShoppingList',
        component: ShoppingListIndex,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/create-shopping-list',
        name: 'CreateShoppingList',
        component: CreateShoppingList,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/edit-shopping-list/:id',
        name: 'EditShoppingList',
        component: CreateShoppingList,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
});

export default router;