
import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';
import { useState } from 'react';
import './merchant.less';
const MerchantPage = () => {
    const [showMoudle, setShowMoudle] = useState<string>('restaurant');
    const navigate = () => {
        window.location.href = '/order';
    }
    const domainList = [
        {
            name: '集团信息'
        },
        {
            name: '餐厅管理'
        },
        {
            name: '账号管理'
        },
        {
            name: '授权管理'
        },
        {
            name: '骑手管理'
        },
    ]
    const restaurantList = [
        {
            name: '喵星集团',
        },
        {
            name: '迪士尼游乐场',
        },
    ]
    return (
        <div
            style={{
                background: '#F5F7FA',
            }}
        >
            <PageContainer
                header={{
                    title: false,
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
                    <>
                        <ProCard ghost gutter={8}>
                            {
                                domainList.map((item) => (
                                    <ProCard className='active_style'  colSpan={4} layout="center" bordered key={item.name}>
                                        {item.name}
                                    </ProCard>
                                ))
                            }
                        </ProCard>
                    </>
                ) : (
                    <>
                        <ProCard ghost gutter={8}>
                            {
                                restaurantList.map((item) => (
                                    <ProCard className='active_style' colSpan={4} layout="center" bordered key={item.name}>
                                        {item.name}
                                    </ProCard>
                                ))
                            }
                        </ProCard>
                    </>
                )}
            </PageContainer>
        </div>
    )
}
export default MerchantPage;



