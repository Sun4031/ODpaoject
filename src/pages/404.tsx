import { history, useIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import{ useModel } from '@umijs/max';
import React from 'react';
const {initialState} = useModel('@@initialState');
const NavigateBackHome = () => {
  if (initialState?.currentUser?.account_type === 'ADMIN') {
    return history.push('/group');
}
if (initialState?.currentUser?.account_type === 'STAFF') {
    return history.push('/order');
}
}
const NoFoundPage: React.FC = () => (
  <Card variant="borderless">
    <Result
      status="404"
      title="404"
      subTitle={useIntl().formatMessage({ id: 'pages.404.subTitle' })}
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          {useIntl().formatMessage({ id: 'pages.404.buttonText' })}
        </Button>
      }
    />
  </Card>
);

export default NoFoundPage;
