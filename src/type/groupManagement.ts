// 查询参数类型定义
export interface QueryParams {
  nickname?: string; // 集团名字
  restaurantsNickname?: string; // 餐厅名称
  tel?: string; // 电话号码
  city?: string; // 城市
  access?: string; // 授权方案
  filter_authorize: string; // 筛选时间，默认1为全部
  pagination_page: 1; // 页数，默认
  pagination_per_page: 9999; // 数据量；默认
  key: string; // 语言
  sort_key?: string; //
  sort_value?: string; //
}
