import { CloseOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, message, Select, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getWarrantAdmin } from '@/services/groupManagement';
import type { QueryParams } from '@/type/groupManagement';

const { Option } = Select;

// 表头类型
type GroupColumnsType = {
  nickname: string;
  string_id: string;
  name: string;
  city: string;
  phone_number: string;
  reg_vat_number: string;
  last_name: string;
  first_name: string;
  _id: string;
};

// 搜索条件类型
type SearchCondition = {
  id: string;
  type: string;
  value: string | string[];
  label: string;
  displayValue: string;
};

// 授权方案选项类型
type AuthPlanOption = {
  value: string;
  label: string;
};

const columns: ProColumns<GroupColumnsType>[] = [
  {
    title: '集团名字',
    dataIndex: 'nickname',
    key: 'nickname',
    hideInSearch: true,
  },
  {
    title: '集团标识码',
    dataIndex: 'string_id',
    key: 'string_id',
    hideInSearch: true,
  },
  {
    title: '账户',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: true,
    render: (_, record) => {
      return `${record.last_name}${record.first_name}`;
    },
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    hideInSearch: true,
  },
  {
    title: '手机号',
    dataIndex: 'phone_number',
    key: 'phone_number',
    hideInSearch: true,
  },
  {
    title: '增值税号',
    dataIndex: 'reg_vat_number',
    key: 'reg_vat_number',
    hideInSearch: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    hideInSearch: true,
    render: (_, record) => (
      <Space>
        <Button size="small" type="primary">
          编辑
        </Button>
        <Button size="small" danger>
          删除
        </Button>
      </Space>
    ),
  },
];

const GroupManagementPage = () => {
  const actionRef = useRef<ActionType>(null);
  const [searchType, setSearchType] = useState('groupName');
  const [searchValue, setSearchValue] = useState<string | string[]>('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [entityType, setEntityType] = useState('group');
  const [searchConditions, setSearchConditions] = useState<SearchCondition[]>(
    [],
  );
  const [authPlanOptions, setAuthPlanOptions] = useState<AuthPlanOption[]>([]);
  // 添加表格数据状态
  const [tableData, setTableData] = useState<GroupColumnsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // 搜索类型选项
  const searchTypeOptions = [
    { value: 'groupName', label: '集团名字' },
    { value: 'restaurantName', label: '餐厅名称' },
    { value: 'phone', label: '手机号' },
    { value: 'city', label: '城市' },
    { value: 'authPlan', label: '授权方案' },
  ];

  // 状态筛选选项 - 需要转换为API对应的值
  const statusOptions = [
    { value: 'ALL', label: 'ALL', apiValue: '0' },
    { value: 'expired', label: '已过期', apiValue: '1' },
    { value: 'notExpired', label: '未到期（大于90天）', apiValue: '2' },
    { value: 'nearExpiry', label: '临近到期（小于90天）', apiValue: '3' },
    { value: 'noAuth', label: '无任何授权', apiValue: '4' },
  ];

  // 实体类型选项
  const entityTypeOptions = [
    { value: 'group', label: '集团' },
    { value: 'restaurant', label: '餐厅' },
  ];

  // 获取授权方案选项
  useEffect(() => {
    const fetchAuthPlanOptions = async () => {
      setAuthPlanOptions([
        { value: 'AU009', label: 'AU009 - 基础方案' },
        { value: 'AU010', label: 'AU010 - 高级方案' },
        { value: 'AU011', label: 'AU011 - 企业方案' },
      ]);
    };
    fetchAuthPlanOptions();
  }, []);

  // 当搜索类型改变时重置搜索值
  useEffect(() => {
    setSearchValue(searchType === 'authPlan' ? [] : '');
  }, [searchType]);

  // 提取搜索逻辑为独立函数，支持传入特定的搜索条件
  const executeSearchWithConditions = async (
    conditions: SearchCondition[] = searchConditions,
  ) => {
    // 检查是否有搜索条件
    const hasSearchConditions = conditions.length > 0 || statusFilter !== 'ALL';

    if (!hasSearchConditions) {
      message.warning('请添加搜索条件');
      return;
    }

    setLoading(true);

    try {
      // 构建API参数
      const statusOption = statusOptions.find(
        (opt) => opt.value === statusFilter,
      );

      const params: QueryParams = {
        filter_authorize: statusOption?.apiValue || '0',
        pagination_page: 1,
        pagination_per_page: 9999,
        key: 'CN',
        sort_key: 'create_date',
        sort_value: '1',
      };

      // 根据搜索条件添加参数
      conditions.forEach((condition) => {
        switch (condition.type) {
          case 'groupName':
            params.nickname = Array.isArray(condition.value)
              ? condition.value.join(',')
              : condition.value;
            break;
          case 'restaurantName':
            params.restaurantsNickname = Array.isArray(condition.value)
              ? condition.value.join(',')
              : condition.value;
            break;
          case 'phone':
            params.tel = Array.isArray(condition.value)
              ? condition.value.join(',')
              : condition.value;
            break;
          case 'city':
            params.city = Array.isArray(condition.value)
              ? condition.value.join(',')
              : condition.value;
            break;
          case 'authPlan':
            params.access = Array.isArray(condition.value)
              ? condition.value.join(',')
              : condition.value;
            break;
        }
      });

      console.log('API请求参数:', params);

      // 发起API请求
      const response = await getWarrantAdmin(params);

      console.log('API响应:', response);

      if (response?.error) {
        message.error('获取数据失败');
        setTableData([]);
        setTotal(0);
        return;
      }

      // 处理返回数据
      const dbResults = response?.[0]?.dbResults || [];
      const totalCount = response?.[0]?.totalCount?.[0]?.count || 0;

      let processedData: GroupColumnsType[] = [];

      if (entityType === 'group') {
        // 集团模式数据处理
        processedData = dbResults.map((item: any) => ({
          _id: item._id,
          nickname: item.nickname || '',
          string_id: item.string_id || '',
          name: '',
          last_name: item.supervisor?.[0]?.last_name || '',
          first_name: item.supervisor?.[0]?.first_name || '',
          city: item.city || '',
          phone_number: `+${item.supervisor?.[0]?.phone_prefix || ''} ${item.supervisor?.[0]?.phone || ''}`,
          reg_vat_number: item.reg_vat_number || '',
        }));
        setTotal(totalCount);
      } else {
        // 餐厅模式数据处理
        dbResults.forEach((groupItem: any) => {
          groupItem?.restaurants?.forEach((resItem: any) => {
            processedData.push({
              _id: resItem._id,
              nickname: resItem.nickname || '',
              string_id: resItem.string_id || '',
              name: '',
              last_name: resItem.supervisor?.[0]?.last_name || '',
              first_name: resItem.supervisor?.[0]?.first_name || '',
              city: resItem.city || '',
              phone_number: `+${resItem.supervisor?.[0]?.phone_prefix || ''} ${resItem.supervisor?.[0]?.phone || ''}`,
              reg_vat_number: resItem.reg_vat_number || '',
            });
          });
        });
        setTotal(processedData.length);
      }

      setTableData(processedData);
      message.success(`成功获取 ${processedData.length} 条数据`);
    } catch (error) {
      console.error('请求失败:', error);
      message.error('网络请求失败');
      setTableData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // 添加搜索条件并立即搜索
  const handleAddSearchCondition = async () => {
    if (
      !searchValue ||
      (Array.isArray(searchValue) && searchValue.length === 0)
    ) {
      message.warning('请输入搜索内容');
      return;
    }

    const typeLabel =
      searchTypeOptions.find((option) => option.value === searchType)?.label ||
      '';
    let displayValue = '';

    if (searchType === 'authPlan') {
      if (Array.isArray(searchValue)) {
        const labels = searchValue.map(
          (val) =>
            authPlanOptions.find((option) => option.value === val)?.label ||
            val,
        );
        displayValue = labels.join(', ');
      }
    } else {
      displayValue = searchValue as string;
    }

    const newCondition: SearchCondition = {
      id: `${searchType}_${Date.now()}`,
      type: searchType,
      value: searchValue,
      label: typeLabel,
      displayValue: displayValue,
    };

    // 更新搜索条件
    const updatedConditions = [...searchConditions, newCondition];
    setSearchConditions(updatedConditions);
    setSearchValue(searchType === 'authPlan' ? [] : '');

    // 立即执行搜索
    await executeSearchWithConditions(updatedConditions);
  };

  // 专门处理授权方案的添加搜索条件 - 也要自动搜索
  const handleAuthPlanSearchCondition = async (value: string[]) => {
    if (value.length === 0) {
      const filteredConditions = searchConditions.filter(
        (condition) => condition.type !== 'authPlan',
      );
      setSearchConditions(filteredConditions);
      // 如果还有其他搜索条件，重新搜索
      if (filteredConditions.length > 0 || statusFilter !== 'ALL') {
        await executeSearchWithConditions(filteredConditions);
      } else {
        setTableData([]);
        setTotal(0);
      }
      return;
    }

    const typeLabel = '授权方案';
    const labels = value.map(
      (val) =>
        authPlanOptions.find((option) => option.value === val)?.label || val,
    );
    const displayValue = labels.join(', ');

    const newCondition: SearchCondition = {
      id: `authPlan_${Date.now()}`,
      type: 'authPlan',
      value: value,
      label: typeLabel,
      displayValue: displayValue,
    };

    const filteredConditions = searchConditions.filter(
      (condition) => condition.type !== 'authPlan',
    );
    const updatedConditions = [...filteredConditions, newCondition];
    setSearchConditions(updatedConditions);

    // 自动执行搜索
    await executeSearchWithConditions(updatedConditions);
  };

  // 删除搜索条件
  const handleRemoveSearchCondition = async (id: string) => {
    const updatedConditions = searchConditions.filter(
      (condition) => condition.id !== id,
    );
    setSearchConditions(updatedConditions);

    // 删除条件后重新搜索
    if (updatedConditions.length > 0 || statusFilter !== 'ALL') {
      await executeSearchWithConditions(updatedConditions);
    } else {
      setTableData([]);
      setTotal(0);
    }
  };

  // 状态筛选改变
  const handleStatusFilterChange = async (value: string) => {
    if (value === 'noAuth') {
      setSearchConditions((prev) =>
        prev.filter((condition) => condition.type !== 'authPlan'),
      );
      setSearchValue('');
    }
    setStatusFilter(value);

    // 如果有搜索条件或选择了非ALL状态，自动搜索
    const hasConditions = searchConditions.length > 0 || value !== 'ALL';
    if (hasConditions) {
      setTimeout(async () => {
        await executeSearchWithConditions(searchConditions);
      }, 100);
    }
  };

  // 实体类型改变
  const handleEntityTypeChange = async (value: string) => {
    setEntityType(value);

    // 如果有搜索条件，自动重新搜索
    const hasConditions = searchConditions.length > 0 || statusFilter !== 'ALL';
    if (hasConditions) {
      setTimeout(async () => {
        await executeSearchWithConditions(searchConditions);
      }, 100);
    }
  };

  // 渲染搜索输入框
  const renderSearchInput = () => {
    if (searchType === 'authPlan') {
      return (
        <Select
          mode="multiple"
          placeholder="请选择授权方案"
          value={searchValue as string[]}
          onChange={(value) => {
            setSearchValue(value);
            if (value.length > 0) {
              handleAuthPlanSearchCondition(value);
            } else {
              setSearchConditions((prev) =>
                prev.filter((condition) => condition.type !== 'authPlan'),
              );
            }
          }}
          style={{ flex: 1 }}
        >
          {authPlanOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      );
    }

    return (
      <Input
        placeholder={`请输入${searchTypeOptions.find((opt) => opt.value === searchType)?.label}`}
        value={searchValue as string}
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={handleAddSearchCondition}
        style={{ flex: 1 }}
      />
    );
  };

  return (
    <div>
      <ProTable<GroupColumnsType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowKey="_id"
        search={false}
        dateFormatter="string"
        dataSource={tableData}
        loading={loading}
        pagination={{
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        toolbar={{
          search: (
            <div>
              <Space size="middle" style={{ marginBottom: 16 }}>
                {/* 自定义搜索框 */}
                <Input.Group compact style={{ display: 'flex', width: 400 }}>
                  <Select
                    value={searchType}
                    onChange={setSearchType}
                    style={{ width: 120 }}
                  >
                    {searchTypeOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                  {renderSearchInput()}
                  {/* "添加并搜索"按钮 */}
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handleAddSearchCondition}
                    style={{ borderLeft: 0 }}
                    loading={loading}
                  >
                    添加并搜索
                  </Button>
                </Input.Group>

                {/* 状态筛选器 */}
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  style={{ width: 180 }}
                  placeholder="选择状态"
                >
                  {statusOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>

                {/* 集团/餐厅选择器 */}
                <Select
                  value={entityType}
                  onChange={handleEntityTypeChange}
                  style={{ width: 100 }}
                >
                  {entityTypeOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Space>

              {/* 搜索条件标签 */}
              {searchConditions.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <Space size={[8, 8]} wrap>
                    <span style={{ color: '#666', fontSize: '14px' }}>
                      搜索条件：
                    </span>
                    {searchConditions.map((condition) => (
                      <Tag
                        key={condition.id}
                        closable
                        closeIcon={<CloseOutlined />}
                        onClose={() =>
                          handleRemoveSearchCondition(condition.id)
                        }
                        color="blue"
                      >
                        {condition.label}: {condition.displayValue}
                      </Tag>
                    ))}
                  </Space>
                </div>
              )}
            </div>
          ),
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              console.log('新建操作');
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </div>
  );
};

export default GroupManagementPage;
