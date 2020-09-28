import Vue from 'vue'
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/home')
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: () => import('@/components/block')
    },
    {
      path: '/accounts/:address',
      name:"accounts",
      hidden:true,
      component: () => import('@/components/accountInfo'),
    },
    {
      path: '/txs/:txhash',
      name:"txsInfo",
      hidden:true,
      component: () => import('@/components/txInfo'),
    },
    {
      path: '/block/:block',
      name:"blockInfo",
      hidden:true,
      component: () => import('@/components/blockInfo'),
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('@/components/account')
    },
    {
      path: '/txs',
      name: 'txs',
      component: () => import('@/components/tx')
    },
    {
      path: '/1',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
