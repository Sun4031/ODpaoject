import LogoPng from "@/assets/image/logo.png";
import ItalyFlag from "@/assets/image/Italy.png";
import ChinaFlag from "@/assets/image/wuxinghongqi.png";
import SpainFlag from "@/assets/image/xibanya.png";
import {
  fetchUserInfoByToken,
  loginByAdmin,
  loginByBusiness,
} from "@/services/login";
import { LockOutlined, DownOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import {
  FormattedMessage,
  Helmet,
  SelectLang,
  useIntl,
  useModel,
} from "@umijs/max";
import { Alert, App, Tabs } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import Settings from "../../../config/defaultSettings";
import { Select, Input } from 'antd';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: "8px",
      color: "rgba(0, 0, 0, 0.2)",
      fontSize: "24px",
      verticalAlign: "middle",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: "42px",
      position: "fixed",
      right: 16,
      borderRadius: token.borderRadius,
      ":hover": {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: "100% 100%",
    },
    // 电话输入框容器样式
    phoneInputContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '40px',
      padding: '4px 11px',
      borderRadius: 6,
      border: `1px solid ${token.colorBorder}`,
      fontSize: 14,
      backgroundColor: token.colorBgContainer,
      transition: 'all 0.2s',
      marginBottom: 24,
      
      // 获得焦点时的样式
      '&:focus-within': {
        borderColor: `${token.colorPrimary} !important`,
        boxShadow: `0 0 0 2px ${token.colorPrimary}1a !important`,
        outline: 0,
      },
      
      // 悬停样式
      '&:hover': {
        borderColor: `${token.colorPrimary} !important`,
      },
      
      // 下拉框样式
      '& .ant-select': {
        border: 'none !important',
        minWidth: '85px',
        '& .ant-select-selector': {
          border: 'none !important',
          boxShadow: 'none !important',
          background: 'transparent !important',
          padding: '0 !important',
          height: '32px !important',
        },
        '& .ant-select-selection-item': {
          display: 'flex',
          alignItems: 'center',
          height: '32px',
          padding: '0 !important',
        },
        '& .ant-select-arrow': {
          color: token.colorTextTertiary,
        }
      },
      
      // 输入框样式
      '& .ant-input': {
        border: 'none !important',
        boxShadow: 'none !important',
        background: 'transparent !important',
        padding: '0 0 0 8px !important',
        height: '32px !important',
        '&:focus': {
          border: 'none !important',
          boxShadow: 'none !important',
          outline: 'none !important',
        }
      },
      
      // 分隔线
      '& .phone-separator': {
        width: '1px',
        height: '20px',
        backgroundColor: token.colorBorder,
        margin: '0 4px',
      }
    },
    
    // 国旗样式
    countryFlag: {
      width: '20px',
      height: '15px',
      marginRight: '8px',
      borderRadius: '2px',
      objectFit: 'cover',
    },
    
    // 选择器内的国旗样式
    selectedCountryFlag: {
      width: '18px',
      height: '13px',
      marginRight: '6px',
      borderRadius: '2px',
      objectFit: 'cover',
    },
    
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{content: string;}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>("account");
  const { initialState, setInitialState } = useModel("@@initialState");
  const { styles } = useStyles();
  const { message } = App.useApp();
  const intl = useIntl();
  const [countryCode, setCountryCode] = useState<string>('+39');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // 页面跳转
  const getUserInfo = (path: string) => {
    window.location.href = path;
  };

  // 国家选项配置
  const countryOptions = [
    {
      value: '+86',
      flag: ChinaFlag,

    },
    {
      value: '+34',
      flag: SpainFlag,
    },
    {
      value: '+39',
      flag: ItalyFlag,
    },
  ];

  // 获取当前选中国家的信息
  const getCurrentCountry = () => {
    return countryOptions.find(option => option.value === countryCode) || countryOptions[2];
  };

  // 国家代码下拉框变化
  const handleCountryChange = (value: string) => {
    setCountryCode(value);
    console.log(`selected country code: ${value}`);
  };

  // 电话号码输入变化
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  //登录
const handleSubmit = async (values: any) => {
  const cleanPrefix = countryCode.replace('+', '');
  const submitData = {
    ...values,
    phone: phoneNumber,  // 只存储电话号码本身
    prefix: cleanPrefix, // 存储去掉+号的区号
  };

  if (type === "account") {
    loginByAdmin(submitData).then((res: any) => {
      if (res.error) {
        return;
      } else {
        window.sessionStorage.setItem("authorizationToken", res.accessToken);
        getUserInfo("/group");
      }
    });
  } else {
    loginByBusiness(submitData).then((res: any) => {
      if (res.error) {
        return;
      } else {
        window.sessionStorage.setItem("authorizationToken", res.accessToken);
        getUserInfo("/merchant");
      }
    });
  }
};


  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: "menu.login",
            defaultMessage: "登录页",
          })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: "1",
          padding: "32px 0",
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          logo={<img alt="logo" src={LogoPng} />}
          title="Ordelivery "
          subTitle="商家管理后台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: "account",
                label: intl.formatMessage({
                  id: "pages.login.accountLogin.tab",
                  defaultMessage: "账户密码登录",
                }),
              },
              {
                key: "mobile",
                label: intl.formatMessage({
                  id: "pages.login.phoneLogin.tab",
                  defaultMessage: "手机号登录",
                }),
              },
            ]}
          />

          {status === "error" && loginType === "account" && (
            <LoginMessage
              content={intl.formatMessage({
                id: "pages.login.accountLogin.errorMessage",
                defaultMessage: "账户或密码错误(admin/ant.design)",
              })}
            />
          )}

          {/* 电话输入框组合 */}
          <div className={styles.phoneInputContainer}>
            <Select
              value={{
                value: countryCode,
                label: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={getCurrentCountry().flag} 
                      className={styles.selectedCountryFlag} 
                    />
                    <span>{countryCode}</span>
                  </div>
                )
              }}
              onChange={(option: any) => handleCountryChange(option.value)}
              labelInValue
              size="large"
              popupMatchSelectWidth={120}
              suffixIcon={<DownOutlined style={{ fontSize: '10px' }} />}
            >
              {countryOptions.map(option => (
                <Select.Option 
                  key={option.value} 
                  value={option.value}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={option.flag} 
                        className={styles.selectedCountryFlag} 
                      />
                      <span>{option.value}</span>
                    </div>
                  }
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={option.flag} 
                      className={styles.countryFlag} 
                    />
                    <span> ({option.value})</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
            <div className="phone-separator" />
            <Input
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder={intl.formatMessage({
                id: "pages.login.phone.placeholder",
                defaultMessage: "请输入手机号",
              })}
              size="large"
              style={{ flex: 1 }}
            />
          </div>

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={intl.formatMessage({
              id: "pages.login.password.placeholder",
              defaultMessage: "密码",
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
