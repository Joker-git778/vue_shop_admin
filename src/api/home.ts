import ajax from './ajax'

// 左侧菜单权限
export const reqMenus = () => ajax('/menus');