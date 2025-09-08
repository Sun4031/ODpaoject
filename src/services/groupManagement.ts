import { QueryParams } from "@/type/groupManagement";
import { request } from "@umijs/max";

// 获取所有餐厅和集团信息
export const getWarrantAdmin = async (params: QueryParams) => {
  return request(`/warrant/condition`, {
    params,
  });
};
