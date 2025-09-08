import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';
const GroupInformationPage = () => {
    return <div
        style={{
            background: '#F5F7FA',
        }}
    >
        <PageContainer
            header={{title: '集团信息',ghost: true}}
            footer={[
                <Button key="3">重置</Button>,
                <Button key="2" type="primary">提交</Button>
            ]}
        >
            <ProCard ghost gutter={8} style={{marginBottom:8}}>
                <ProCard colSpan={8} layout="center" bordered>集团名称</ProCard>
                <ProCard colSpan={8} layout="center" bordered>手机号</ProCard>
                <ProCard colSpan={8} layout="center" bordered>邮箱</ProCard>
            </ProCard>
            <ProCard ghost gutter={8} style={{marginBottom:8}}>
                <ProCard colSpan={24} layout="center" bordered>地址</ProCard>
            </ProCard>
            <ProCard ghost gutter={8} style={{marginBottom:8}}>
                <ProCard colSpan={12} layout="center" bordered>集团财务信息</ProCard>
                <ProCard colSpan={12} layout="center" bordered>积分滚动清空规则</ProCard>
            </ProCard>
             <ProCard ghost gutter={8}>
                <ProCard colSpan={24} layout="center" bordered>负责人信息</ProCard>
            </ProCard>
        </PageContainer>
    </div>;
}
export default GroupInformationPage;