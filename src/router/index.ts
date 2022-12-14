import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { getStore, setStore } from '../utils/storage';
import { isTokenExpired, isTokenWillExpired, message, createRoute } from '../utils/utils';
import { useStore } from '../store'
import { publicUrl } from '../api';
import { postAction } from '../api/axios';

import { menuInterface } from "../utils/interface"

const UserLayout = () => import(/* webpackChunkName: "logins" */'../components/layouts/UserLayout.vue');
const Login = () => import(/* webpackChunkName: "logins" */ '../views/logins/Login.vue');
const Register = () => import(/* webpackChunkName: "logins" */ "../views/logins/Register.vue");
const Reset = () => import(/* webpackChunkName: "logins" */ "../views/logins/Reset.vue");
const ErrorLayout = () => import(/* webpackChunkName: "public" */'../components/layouts/ErrorLayout.vue');
const page404 = () => import(/* webpackChunkName: "public" */ "../views/plugins/echart/index.vue");
const page403 = () => import(/* webpackChunkName: "public" */ "../views/error/403.vue");
const page500 = () => import(/* webpackChunkName: "public" */ "../views/error/500.vue");
const introduce = () => import(/* webpackChunkName: "public" */ "../views/ADV/introduce.vue");
let childrenRoutes = [{
  path: "/",
  name: "Welcome",
  component: () => import('../views/logins/Welcome.vue'),
}]
const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/index",
    component: Home,
    children: childrenRoutes
  },

  {
    path: "/logins",
    name: "Logins",
    component: UserLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'reset',
        name: 'Reset',
        component: Reset
      }
    ]
  },
  {
    path: "/error",
    name: "error",
    component: ErrorLayout,
    children: [
      {
        path: '404',
        name: '404',
        component: page404,
      },
      {
        path: '403',
        name: '403',
        component: page403
      },
      {
        path: '500',
        name: '500',
        component: page500
      }
    ]
  },
  {
    path: "/introduce",
    name: "introduce",
    component: introduce,
  }
  // {
  //   name: '403',
  //   path: '/error/403',
  //   component: () => page403,
  //   meta: { model: 'error' }
  // },
  // {
  //   name: '500',
  //   path: '/error/500',
  //   component: () => page500,
  //   meta: { model: 'error' }
  // }
]

//??????????????????
let menu = getStore('menu');

if (menu) {
  //????????????????????????????????????
  let menuList = JSON.parse(getStore('menu'));
  menuList.forEach(function (v: menuInterface) {
    childrenRoutes.push(createRoute(v));
    if (v.children) {
      v.children.forEach(function (v2) {
        childrenRoutes.push(createRoute(v2 as menuInterface));
        if ((v2 as any).children) {
          (v2 as any).children.forEach(function (v3: menuInterface) {
            childrenRoutes.push(createRoute(v3));
          });
        }
      });
    }
  });
}
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
// router.selfaddRoutes = function (params){
//   router.matcher = new VueRouter().matcher;
//   router.addRoutes(params)
// }
//??????????????????
const write = ['']
router.beforeEach((to, from, next) => {
  let token = getStore('tokens');
  if (to.path.includes('/error') || to.path.includes('/introduce')) {
    next();
  }
  if (!to.path.includes('logins')) {
    if (token) {
      let tokens = JSON.parse(token);

      // if (!to.name) {
      //   console.log(router)
      //   message('info', '????????????????????????')
      //   next({
      //     path: '/error/404'
      //   })
      // }
      // if (to.path === '/login') {
      //   next({
      //     path: '/'
      //   })
      // } else { // ???????????????????????????
      //   store.dispatch('GetUserInfo').then(res => {
      //     next()
      //   }).catch(err => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error('?????????????????????????????????????????????' + err)
      //       next({
      //         path: '/'
      //       })
      //     })
      //   })
      // }

      let refreshToken = `${tokens.tokenType} ${tokens.refreshToken}`,
        accessTokenExp = tokens.accessTokenExp;
      if (isTokenExpired(accessTokenExp)) {
        //2?????????????????????????????????store???????????????
        useStore().setLogout();
        message('error', '?????????????????????????????????')
        next({
          path: '/logins/login'
        })
      } else {
        //??????accessToken?????????????????????token
        if (accessTokenExp && isTokenWillExpired(accessTokenExp)) {
          postAction(publicUrl.refreshAccessToken, { refreshToken }).then((res: any) => {
            tokens.accessToken = res.data.accessToken;
            tokens.accessTokenExp = res.data.accessTokenExp;
            if (res.data.refreshToken) {
              tokens.refreshToken = res.data.refreshToken;
            }
            setStore('tokens', tokens);
          });
        }
      }

    } else {
      next({
        path: '/logins/login'
      })
    }
  }

  //????????????
  // const HOME_PAGE = config.HOME_PAGE;
  // if (to.name === 'index' || to.path === '/index' || to.path === '/') {
  //   next({path: HOME_PAGE});
  //   return false;
  // }
  next();
});
router.beforeResolve((to, from, next) => {
  // console.log('??????????????????'); //?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  next();
});
//??????????????????
router.afterEach(() => {
  // console.log('??????????????????');
});
export default router
