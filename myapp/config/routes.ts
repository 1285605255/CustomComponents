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
    name: 'AMap',
    path: '/AMap',
    component: './AMap',
  },
  {
    name: 'ViewVideo',
    path: '/UploadModel/ViewVideo',
    component: './UploadModel/components/ViewVideo',
    hideInMenu: true,
  },
  {
    name: 'EditableProTable',
    path: '/EditableProTable',
    component: './EditableProTable',
  },
  {
    name: '3D模块',
    path: '/3DModel',
    component: './3DModel',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
