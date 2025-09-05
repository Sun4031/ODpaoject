/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: "/login",
    layout: false,
    name: "login",
    component: "./login/LoginPage",
  },
  {
    name: "集团管理",
    icon: "ApartmentOutlined",
    path: "/group",
    component: "./groupManagement/GroupManagementPage",
    access: 'adminRouteFilter'

  },
  {
    name: "此账号",
    icon: "UserOutlined",
    path: "/account",
    component: "./thisAccount/ThisAccountPage",
    access: 'adminRouteFilter'

  },
  {
    name: "被删除的资源",
    icon: "DeleteOutlined",
    path: "/recycleBin",
    component: "./recycleBin/RecycleBinPage",
    access: 'adminRouteFilter'

  },
  {
    name: "客户管理",
    icon: "UsergroupAddOutlined",
    path: "/customer",
    component: "./customerManagement/CustomerPage",
    access: 'adminRouteFilter'

  },
  {
    path: "/setting",
    name: "设置",
    icon: "SettingOutlined",
    access: 'adminRouteFilter',
    routes: [
      {
        path: "/setting",
        redirect: "/setting/basicSetting",
      },
      {
        name: "基础设置",
        path: "/setting/basicSetting",
        component: "./settingMoudle/BasicSettings",
      },
      {
        name: "Viva Wallet 设置",
        path: "/setting/vivawallet",
        component: "./settingMoudle/VivaWallet",
      },
      {
        name: "Whats App 设置",
        path: "/setting/whatsapp",
        component: "./settingMoudle/WhatsApp",
      },
    ],
  },
  {
    path: "/merchant",
    layout: false,
    name: "MerchantPage",
    component: "./merchant/MerchantPage",
    access: 'normalRouteFilter',
  },
  {
    path: "/order",
    name: "订单",
    icon: "SettingOutlined",
    access: 'normalRouteFilter',
    routes: [
      {
        path: "/order",
        redirect: "/order/list",
      },
      {
        name: "订单",
        path: "/order/list",
        component: "./order/OrderPage",
      },
      {
        name: "预定订单",
        path: "/order/reserve",
        component: "./order/ReservePage",
      },
    ],
  },
  {
    path: "/menu",
    name: "菜单",
    icon: "SettingOutlined",
    access: 'normalRouteFilter',
    routes: [
      {
        name: "菜单管理",
        path: "/menu/list",
        component: "./menu/MenuManagement",
      },
      {
        name: "套餐&包餐小类设置",
        path: "/menu/combo",
        component: "./menu/Combo",
      },
      {
        name: "调味品组",
        path: "/menu/condiment",
        component: "./menu/Condiment",
      },
    ],
  },
  {
    path: "/shop",
    name: "店铺",
    icon: "SettingOutlined",
    access: 'normalRouteFilter',
    routes: [
      {
        name: "我的餐厅",
        path: "/shop/myrestaurant",
        component: "./shop/MyRestaurant",
      },
      {
        name: "外卖业务营业时间",
        path: "/shop/takeout",
        component: "./shop/Takeout",
      },
      {
        name: "预定业务营业时间",
        path: "/shop/businessHours",
        component: "./shop/BusinessHours",
      },
      {
        name: "桌台设置",
        path: "/shop/tablesetting",
        component: "./shop/TableSetting",
      },
    ],
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    component: "404",
    path: "/*",
  },
];
