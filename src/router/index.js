import Vue from 'vue'
import Router from 'vue-router'

// 後台的 page
import Login from '@/components/admin/pages/Login'
import Dashboard from '@/components/admin/Dashboard'
import Report from '@/components/admin/Pages/Report'
import Products from '@/components/admin/Pages/Products'
import Orders from '@/components/admin/Pages/Orders'
import Coupon from '@/components/admin/Pages/Coupon'

// 前台的 page
import Layout from '@/components/Front/Layout';
import Home from '@/components/Front/pages/Home';
import FrontProducts from '@/components/Front/pages/Products';
import FrontProduct from '@/components/Front/pages/Product';
import FrontCart from '@/components/Front/pages/Cart';
import FrontCheckoutOrder from '@/components/Front/pages/Checkout_Order';
import FrontCheckoutPay from '@/components/Front/pages/Checkout_Pay';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/admin',
      name: 'HelloWorld',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Report,
          meta: { requiresAuth: true },
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: '/',
      // name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'products',
          name: 'Products',
          component: FrontProducts,
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          component: FrontProduct,
        },
        {
          path: 'cart',
          name: 'Cart',
          component: FrontCart,
        },
        {
          path: 'checkout_order',
          name: 'FrontCheckoutOrder',
          component: FrontCheckoutOrder,
        },
        {
          path: 'checkout_pay/:order_id',
          name: 'FrontCheckoutPay',
          component: FrontCheckoutPay,
        },
      ]
    }
  ]
})
