import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';
import {
  AvatarDropdown,
  AvatarName,
  SelectLang,
} from '@/components';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import '@ant-design/v5-patch-for-react-19';
import {
  fetchUserInfoByToken,
  getUserAvatar
} from "@/services/login";

// 类型定义
type InitialState = {
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser>;
};
const isDev = process.env.NODE_ENV === 'development' || process.env.CI;
const loginPath = '/login';

// 用户信息获取服务
const fetchUserServices = async () => {
  try {
    // 并行请求用户信息和头像
    const [userInfoRes, avatarRes] = await Promise.all([
      fetchUserInfoByToken(),
      getUserAvatar()
    ]);
    
    return {
      ...userInfoRes,
      avatar: avatarRes
    };
  } catch (error) {
    message.error('获取用户信息失败');
    throw error;
  }
};

/**
 * 获取初始状态
 */
export async function getInitialState(): Promise<InitialState> {
  const { location } = history;
  
  // 非登录页需要验证登录状态
  const isLoginPage = location.pathname === loginPath;
  
  // 获取用户信息
  const fetchUserInfo = async () => {
    const user = await fetchUserServices();
    return user;
  };

  // 如果不是登录页面，强制获取用户信息
  if (!isLoginPage) {
    try {
      const user = await fetchUserInfo();
      return {
        fetchUserInfo,
        currentUser: user,
        settings: defaultSettings as Partial<LayoutSettings>,
        loading: false
      };
    } catch {
      // 获取失败时保持登录状态检查
      return {
        fetchUserInfo,
        settings: defaultSettings as Partial<LayoutSettings>,
        loading: false
      };
    }
  }
  
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
    loading: false
  };
}

/**
 * 布局配置
 */
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    actionsRender: () => [
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      const { location } = history;
      
      // 登录状态检查逻辑
      if (!initialState?.currentUser && !initialState?.loading && 
          location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * 请求配置
 */
export const request: RequestConfig = {
  baseURL: 'https://dev-test-qftech-yennefer-be.evophotic.com/',
  ...errorConfig,
};