import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/dashboard',
    component: Home,
    children: [
      {
        path: '/dashboard',
        component: () =>
          import(
            /* webpackChunkName : "index" */ '../views/dashboard/index.vue'
          )
      },
      {
        path: '/product',
        redirect: '/product/list',
        component: () =>
          import(
            /* webpackChunkName : "product" */ '../views/product/index.vue'
          ),
        children: [
          {
            path: '/product/list',
            component: () =>
              import(
                /* webpackChunkName : "product" */ '../views/product/productList.vue'
              )
          },
          {
            path: '/product/add',
            component: () =>
              import(
                /* webpackChunkName : "product" */ '../views/product/productAdd.vue'
              )
          },
          {
            path: '/product/cate',
            component: () =>
              import(
                /* webpackChunkName : "product" */ '../views/product/productCate.vue'
              )
          }
        ]
      },
      {
        path: '/salecount',
        redirect: '/salecount/commodity',
        component: () =>
          import(
            /* webpackChunkName : "salecount" */ '../views/saleCount/index.vue'
          ),
        children: [
          {
            path: '/salecount/commodity',
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/saleCount/CommodityStatistics.vue'
              )
          },
          {
            path: '/salecount/orders',
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/saleCount/OrdersStatistics.vue'
              )
          }
        ]
      },
      {
        path: '/ordermag',
        redirect: '/ordermag/ordermanage',
        component: () =>
          import(
            /* webpackChunkName : "ordermag" */ '../views/order/index.vue'
          ),
        children: [
          {
            path: '/ordermag/ordermanage',
            component: () =>
              import(
                /* webpackChunkName : "ordermag" */ '../views/order/orderManage.vue'
              )
          }
        ]
      },

      {
        path: '/store',
        redirect: '/store/storeManage',
        component: () =>
          import(/* webpackChunkName : "store" */ '../views/store/index.vue'),
        children: [
          {
            path: '/store/storeManage',
            component: () =>
              import(
                /* webpackChunkName : "store" */ '../views/store/StoreManage.vue'
              )
          }
        ]
      },
      {
        path: '/account',
        redirect: '/account/list',
        component: () =>
          import(
            /* webpackChunkName : "salecount" */ '../views/store/index.vue'
          ),
        children: [
          {
            path: '/account/list',
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/account/accountList.vue'
              )
          },
          {
            path: '/account/add',
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/account/accountAdd.vue'
              )
          },
          {
            path: '/account/change',
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/account/changePwds.vue'
              )
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName : "login" */ '../views/login/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
