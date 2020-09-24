import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Index.vue'
import local from '@/utils/local.js'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
        path: '/info',
        component: () =>
          import(/* webpackChunkName : "info" */ '../views/info/Index.vue')
      },
      {
        path: '/product',
        redirect: '/product/list',
        meta: { title: '商品首页' },
        component: () =>
          import(
            /* webpackChunkName : "product" */ '../views/product/index.vue'
          ),
        children: [
          {
            path: '/product/list',
            meta: { title: '商品列表' },
            component: () =>
              import(
                /* webpackChunkName : "product" */ '../views/product/productList.vue'
              )
          },
          {
            path: '/product/add',
            meta: { title: '添加商品' },
            component: () =>
              import(
                /* webpackChunkName : "product" */ '../views/product/productAdd.vue'
              )
          },
          {
            path: '/product/cate',
            meta: { title: '商品分类' },
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
        meta: { title: '销售统计' },
        component: () =>
          import(
            /* webpackChunkName : "salecount" */ '../views/saleCount/index.vue'
          ),
        children: [
          {
            path: '/salecount/commodity',
            meta: { title: '商品统计' },
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/saleCount/CommodityStatistics.vue'
              )
          },
          {
            path: '/salecount/orders',
            meta: { title: '订单统计' },
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
        meta: { title: '订单管理' },
        component: () =>
          import(
            /* webpackChunkName : "ordermag" */ '../views/order/index.vue'
          ),
        children: [
          {
            path: '/ordermag/ordermanage',
            meta: { title: '订单首页' },
            component: () =>
              import(
                /* webpackChunkName : "ordermag" */ '../views/order/orderManage.vue'
              )
          },
          {
            path: '/ordermag/edit/:id',
            meta: { title: '订单编辑' },
            props: true,
            component: () =>
              import(
                /* webpackChunkName : "ordermag" */ '../views/order/orderEdit.vue'
              )
          }
        ]
      },

      {
        path: '/store',
        redirect: '/store/storeManage',
        meta: { title: '店铺管理' },
        component: () =>
          import(/* webpackChunkName : "store" */ '../views/store/index.vue'),
        children: [
          {
            path: '/store/storeManage',
            meta: { title: '店铺首页' },
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
        meta: { title: '账号管理' },
        component: () =>
          import(
            /* webpackChunkName : "salecount" */ '../views/store/index.vue'
          ),
        children: [
          {
            path: '/account/list',
            meta: { title: '账号列表' },
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/account/accountList.vue'
              )
          },
          {
            path: '/account/add',
            meta: { title: '添加账号' },
            component: () =>
              import(
                /* webpackChunkName : "salecount" */ '../views/account/accountAdd.vue'
              )
          },
          {
            path: '/account/change',
            meta: { title: '修改密码' },
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

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = local.get('tk')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
