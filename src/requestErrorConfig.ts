import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;

      // 判断是否为登录请求
      const isLoginRequest =
        error?.response?.config?.url?.includes('/admin/auth/token') ||
        error?.response?.config?.url?.includes('/auth/token');

      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // 对登录请求的特殊处理
        if (isLoginRequest) {
          const status = error.response.status;
          const responseData = error.response.data;

          if (`${status}`.startsWith('4')) {
            if (responseData?.result?.code === 'LOGIN_1001') {
              message.error('您已超过每日登录次数限制');
            } else {
              message.error('账号或者密码错误');
            }
          } else {
            message.error('登入失败');
          }
        } else {
          // 非登录请求使用后端返回的错误信息
          const errorMessage =
            error.response.data?.message ||
            error.response.data?.result?.message ||
            error.response.data?.error?.message ||
            `Response status:${error.response.status}`;
          message.error(errorMessage);
        }
      } else if (error.request) {
        message.error('None response! Please retry.');
      } else {
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const version = config.version || 'v1';
      //接口地址后缀默认为v1，其他的话在请求配置时默认携带 version: 'v2 || v3',
      config.headers = {
        ...config.headers, // 保留已有的 headers
        'authorization-type': 'BASIC_AUTH', // 添加自定义请求头
        authorization: `Bearer ${sessionStorage.getItem('authorizationToken')}`,
      };
      config.url = `/${version}${config.url}`;
      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;

      if (data?.success === false) {
        // 统一在上方处理
        //message.error("请求失败！");
      }
      return response;
    },
  ],
};
