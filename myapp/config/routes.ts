export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'UploadModel',
    path: '/UploadModel',
    component: './UploadModel',
  },
  {
    path: '/UploadModel/ViewVideo',
    name: 'ViewVideo',
    component: './UploadModel/components/ViewVideo',
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
