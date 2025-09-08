import { nanoid, PageContainer, ProCard } from '@ant-design/pro-components';
import { useState, useEffect } from 'react';
import {
    useModel,
} from "@umijs/max";
import './merchant.less';
import { getMerchantData } from '@/services/merchant';
import { GroupInfoData,RestaurantInfoData } from '@/type/merchantType';
import { message } from 'antd';

const MerchantPage = () => {
    const { initialState } = useModel("@@initialState");
    const [loading, setLoading] = useState<boolean>(false);
    const [showMoudle, setShowMoudle] = useState<string>('restaurant');
    //餐厅列表
    const [restaurantList, setRestaurantList] = useState<RestaurantInfoData[]>([]);
    //所属集团信息
    const [groupInfo, setGroupInfo] = useState<GroupInfoData>({} as GroupInfoData);
    //功能数据
    const domainList = [
        { name: '集团信息', _id: nanoid() },
        { name: '餐厅管理', _id: nanoid() },
        { name: '账号管理', _id: nanoid() },
        { name: '授权管理', _id: nanoid() },
        { name: '骑手管理', _id: nanoid() },
    ];

    //获取当前用户下的餐厅
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getMerchantData(initialState?.currentUser?._id);
            if (res.belonged_restaurant) {
                message.success('获取成功')
                setRestaurantList(res.belonged_restaurant);
                setGroupInfo(res.belonged_group[0] || {})
            } else {
                message.error('获取失败')
            }
        } catch (error) {
            message.error('请求异常')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    //跳转
    const NavigateToPage = () => {
        window.location.href = '/order';
    };

    //功能跳转
    const NavigateToDomain = () => {
        window.location.href = '/groupinfo';
    }
    return (
        <div className='bg-color'>
            <PageContainer
                loading={loading}
                header={{
                    title: groupInfo.nickname || false,
                    ghost: true,
                }}
                tabList={[
                    {
                        tab: '餐厅选择',
                        key: 'restaurant',
                        closable: false,
                    },
                    {
                        tab: '功能选择',
                        key: 'domain',
                        closable: false,
                    },
                ]}
                onTabChange={(key: string) => setShowMoudle(key)}
            >
                {showMoudle === 'domain' ? (
                    <ProCard ghost gutter={8}>
                        {domainList.map((item) => (
                            <ProCard
                                className='active_style'
                                colSpan={4}
                                layout="center"
                                bordered
                                key={item._id}
                                onClick={NavigateToDomain}
                            >
                                {item.name}
                            </ProCard>
                        ))}
                    </ProCard>
                ) : (
                    <ProCard ghost gutter={8}>
                        {restaurantList.map((item) => (
                            <ProCard
                                className='active_style'
                                colSpan={4}
                                layout="center"
                                bordered
                                key={item._id}
                                onClick={NavigateToPage}
                            >
                                {item.nickname}
                            </ProCard>
                        ))}
                    </ProCard>
                )}
            </PageContainer>
        </div>
    );
};

export default MerchantPage;