import { request } from '@umijs/max';

/**
 * 获取商家餐厅列表及信息
 */
export const getMerchantData = async (id:string) => {
    return request(`/staff/${id}`, {
    method: 'GET',
  });
}