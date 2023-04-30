interface NavItem {
  title: string;
  icon: string;
  color: string;
  redirect?: string;
}

export const navItems: NavItem[] = [
  {
    title: 'routes.system.userManagementTitle',
    icon: 'ant-design:user-outlined',
    color: '#bf0c2c',
    redirect: '/sys/user/index',
  },
  {
    title: 'routes.system.roleManagementTitle',
    icon: 'eos-icons:role-binding-outlined',
    color: '#e18525',
    redirect: '/sys/role/index',
  },
  {
    title: 'routes.system.menuManagementTitle',
    icon: 'ep:menu',
    color: '#3fb27f',
    redirect: '/sys/menu/index',
  },
  {
    title: 'routes.system.apiManagementTitle',
    icon: 'ant-design:api-outlined',
    color: '#4daf1bc9',
    redirect: '/sys/api/index',
  },
  {
    title: 'routes.system.dictionaryManagementTitle',
    icon: 'ant-design:book-outlined',
    color: '#cc00ff',
    redirect: '/sys/dictionary/index',
  },
  {
    title: 'routes.system.oauthManagement',
    icon: 'ant-design:unlock-filled',
    color: '#0099ff',
    redirect: '/sys/oauth/index',
  },
  // {
  //   title: 'routes.system.fileManagementTitle',
  //   icon: 'akar-icons:folder',
  //   color: '#00d8ff',
  //   redirect: '/file',
  // },
];

export const systemInfoData = [
  ['sys.sys.Name', 'FormulaGo Admin'],
  ['sys.sys.version', 'V 0.1.6'],
];
