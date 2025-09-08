//集团信息
export interface GroupInfoData extends CommonInterface {
    /**
     * 删除日期
     */
    deleted_date: string | null;
    /**
     * 是否删除
     */
    is_deleted: boolean;
}

//餐厅信息
export interface RestaurantInfoData extends CommonInterface {
    /**
     * 餐厅描述
     */
    description: string;
        /**
     * 餐厅邮箱
     */
    status: boolean ;
    version: string ;
    restaurant_types: string ;
    restaurant_belonged_group: {
        _id: string ;
        nickname: string ;
        string_id: string ;
    };
}

//公共类型
interface CommonInterface{
    /**
     * 标识
     */
    _id: string;
    /**
     * 名称
     */
    nickname: string;
    string_id: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 电话
     */
    tel: string;
    /**
     * 国区
     */
    tel_prefix: string;
}