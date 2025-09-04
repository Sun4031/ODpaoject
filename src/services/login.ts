import { request } from '@umijs/max';
import { LoginParams } from '@/type/login';

/**
 * 通用登录请求函数
 * @param endpoint - 接口地址
 * @param option - 请求参数
 */
const loginRequest = async <T>(
  endpoint: string,
  option: LoginParams
): Promise<T> => {
  const formData = new URLSearchParams();
  // 传递进来的参数统一处理
  formData.append('phone', option.phone);
  formData.append('password', option.password);
  formData.append('phone_prefix', option.prefix || '39'); //没传默认39
  return request<T>(endpoint, {
    method: 'POST',
    data: formData,
  });
};

/**
 * 管理员登录
 * @param option - 登录参数
 */
export const loginByAdmin = (option: LoginParams) =>
  loginRequest('/admin/auth/token', option);

/**
 * 商家登录
 * @param option - 登录参数
 */
export const loginByBusiness = (option: LoginParams) =>
  loginRequest('/staff/auth/token', option);