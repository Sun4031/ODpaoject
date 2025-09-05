import type { ProLayoutProps } from '@ant-design/pro-components';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ordelivery 商家管理后台',
  pwa: true,
  logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAACXBIWXMAAAsSAAALEgHS3X78AAADFklEQVR42u2az5GbMBTGPzO+41Sw5MQxdLCugDh3ZkwHcQnuIKSCFTMUYKuBkApiHzmZ7QAqIId9ymjwLqyDJGCtN+ODZwxCP3/vL1o0TYN7NwfWLAQLwUKwECwEC8FCsBAshC5b6rx5GBUBgBWA9Q2XnQBU4gvP/Fw3hIXq3iGMijWAHW3cVXjrM8HJAZQATjzzT5ODEEZFAuC7QSXXBCUHcOCZX44KgRTwa2T3PgNgABjP/GoMCDmAx4nEuhpAAiB5DwwlECgA/plg4K8B7HjmMxMpcjfR7OcCeAqjgmlVQhgVHoDLDMqBlGd+rEsJ+5nURNswKvbKlTAjFcj2uZ1KnTtRQeczOwNVsJ0hhI3KmDBHFQCAG0bFajCEGatAWKCii9Slgpq6yJwasEBxE6amldaogpSqu0paa0VAvihe6zTUHXSoIOWZH7frfPrOVKutvY4zARXUhsvufGh20KGCvrY3mAwEjbEgMbwmG6IEHSo49kyDYg2xp/ovCCOpYKUhVuyHdJE6VPDcM0mOFdcI6Vuqc0ZUQR/Ynan1nJFUUAM4dICPATyYUEFvxahRBX1psSsgnqniK6V0V4pN0jN7eHnpE9BnP6Rs1tUjdAXENa6n1kdSTi5tNpA2ug6jQv59RaDYe95FvDlZ0jg1OvLM33RAOAD4Si7D8DI2L2nTG2qsHm90vZwgHl5TYBcEpskVvvHMP3SAz0kpTHKNncIYkQLYywpxRpgXdMmz4pnv0b+W0G9/KA6SWwAXCr6d2UFXLAAA1p7syH0CKfBCD6tzlvAkQFy5g6EJskiRQhUe+foDzFoNwFsaVoEwF9MYz7kAAsdgLJisOSOoYHL2LybM9G2SCvvk3LkKUp751fKDxILfIsXemFYTuXeYiwqeKbWe0HNwi3oQT/QWuB7b/xTXL6U8PVUT55BuOpjVHthQgbahMnwl//GLpmnGOHXW22S1u0ZT2SGWujR3BJnn0sYrk4u/2kVS2yr7FKDuZJoIYrnk2+WYstN1ovVN35x0sXTPZk+5WwgWgoVgIVgIFoKFYCF02F+711GrGzyWLgAAAABJRU5ErkJggg==',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
