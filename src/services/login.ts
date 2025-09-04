import { request } from '@umijs/max';
import { LoginParams } from '@/type/login';

//管理员登陆
// export function LoginByAdmin(options: LoginParams) {
//     let formData = new URLSearchParams();
//     formData.append('phone', options.phone);
//     formData.append('password', options.password);
//     formData.append('phone_prefix', options.phone_prefix);
//     return request('/admin/auth/token', {
//         method: 'POST',
//         formData,
//     })
// }


   export async function LoginByAdmin(option:any) {
        let formData = new URLSearchParams();
        formData.append('phone', option.phone);
        formData.append('password', option.password);
        formData.append('phone_prefix', option.prefix);
        return await request(
            `/admin/auth/token`,{
                method: 'POST',
                data: formData,
            }
        );
    }

//商家登录
export function LoginByBusiness(options: LoginParams) {
    return request('/staff/auth/token', {
        method: 'POST',
        ...(options || {}),
    })
}   