import { request } from '@umijs/max';
import { LoginParams } from '@/type/login';

//管理员登陆
export function LoginByAdmin(options: LoginParams) {
    return request('/admin/auth/token', {
        method: 'POST',
        ...(options || {}),
    })
}

//商家登录
export function LoginByBusiness(options: LoginParams) {
    return request('/staff/auth/token', {
        method: 'POST',
        ...(options || {}),
    })
}   