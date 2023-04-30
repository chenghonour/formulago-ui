import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';
// import { LAYOUT } from '/@/router/constant';

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// const dashboard: AppRouteModule = {
//   path: '/dashboard',
//   name: 'Dashboard',
//   component: LAYOUT,
//   redirect: '/dashboard/analysis',
//   meta: {
//     icon: 'ion:grid-outline',
//     title: '控制台',
//   },
//   children: [
//     {
//       path: 'analysis',
//       name: 'Analysis',
//       component: () => import('/@/views/dashboard/analysis/index.vue'),
//       meta: {
//         affix: true,
//         title: '控制台',
//       },
//     },
//     {
//       path: 'workbench',
//       name: 'Workbench',
//       component: () => import('/@/views/dashboard/workbench/index.vue'),
//       meta: {
//         title: '控制台',
//       },
//     },
//   ],
// };

// init route
export const InitRoute: AppRouteRecordRaw = {
  path: PageEnum.BASE_INITIAL_PAGE,
  name: 'InitializeDatabase',
  component: () => import('/@/views/sys/initialize/index.vue'),
  meta: {
    title: t('sys.init.initTitle'),
    ignoreAuth: true,
  },
};


// oauth log in callback route
export const OauthCallbackRoute: AppRouteRecordRaw = {
  path: PageEnum.OAUTH_CALLBACK,
  name: 'OauthCallback',
  component: () => import('/@/views/sys/oauth/callback.vue'),
  meta: {
    title: t('sys.oauth.callback'),
    ignoreAuth: true,
  },
};

// oauth log in callback route
// export const DictionaryDetail: AppRouteRecordRaw = {
//   path: PageEnum.DICT_CALLBACK,
//   name: 'DictionaryDetail',
//   component: () => import('/@/views/sys/dictionary/detail.vue'),
//   meta: {
//     title: '字典值',
//     ignoreAuth: true,
//   },
// };

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  // dashboard,
  LoginRoute,
  InitRoute,
  OauthCallbackRoute,
  RootRoute,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  // DictionaryDetail,
];
