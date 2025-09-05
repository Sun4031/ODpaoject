import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        title: '顾客',
        dataIndex: 'name',
        key: 'name',
        hideInSearch: true,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        hideInTable: true,
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        hideInSearch: true,
    },
    {
        title: 'Facebook',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Google',
        dataIndex: 'google_related_id',
        key: 'google_related_id',
    },
];
const CustomerPage = () => {
    const actionRef = useRef<ActionType>(null);
    return (
        <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            dateFormatter="string"
            headerTitle="客户管理"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        actionRef.current?.reload();
                    }}
                    type="primary"
                >
                    新建
                </Button>,
            ]}
        />
    );
};

export default CustomerPage;