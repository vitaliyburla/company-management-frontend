import React, { useContext, useState } from 'react';
import { Button, Space, Typography, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { SignIn, SignUp } from './containers';
import { styled } from 'styled-components';
import httpService from '../../services/httpService';
import { isAxiosError } from 'axios';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Auth = () => {
  const [type, setType] = useState<'signin' | 'signup'>('signin');
  const { saveUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const response = await httpService.post(`/auth/${type}`, values);
      saveUser(response.data.access_token);
      navigate('/company');
    } catch (error) {
      isAxiosError(error) &&
        messageApi.open({
          type: 'error',
          content: error.response?.data?.message
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Wrapper>
        {contextHolder}
        {type === 'signup' && <SignUp form={form} />}
        {type === 'signin' && <SignIn form={form} />}
        <Space size={16}>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            {type === 'signin' ? 'Sign in' : 'Sign up'}
          </Button>
          <Typography.Link onClick={() => setType(type === 'signin' ? 'signup' : 'signin')}>
            Go to {type === 'signin' ? 'Sign up' : 'Sign in'}
          </Typography.Link>
        </Space>
      </Wrapper>
    </Layout>
  );
};
