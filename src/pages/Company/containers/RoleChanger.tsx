import { LoadingOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, message } from 'antd';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { Paragraph } from 'src/components/Paragraph';
import { roles } from 'src/constants/user';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import { User, UserRole } from 'src/types/User';
import { styled } from 'styled-components';

const Editable = styled.div`
  display: inline-flex;
  gap: 4px;
  cursor: pointer;
  &:hover {
    .ant-typography,
    .anticon {
      color: ${THEME.color.text.secondary};
    }
  }
`;

const items: { key: UserRole; label: string }[] = [
  { label: roles.manager, key: 'manager' },
  { label: roles.worker, key: 'worker' }
];

interface Props {
  employeeId: string;
  role: UserRole;
  setEmployees: React.Dispatch<React.SetStateAction<User[]>>;
}

export const RoleChanger = ({ role, employeeId: userId, setEmployees }: Props) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    const newRole = e.key as UserRole;

    if (role === newRole) return;

    setLoading(true);

    try {
      await httpService.patch(`/users/${userId}/role`, {
        role: newRole
      });
      setEmployees((prev) => prev.map((user) => (user._id === userId ? { ...user, role: newRole } : user)));
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
    <>
      {contextHolder}
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick
        }}
        trigger={['click']}>
        <Editable>
          <Paragraph.L $heavy>{roles[role]}</Paragraph.L>
          {loading ? <LoadingOutlined /> : <UserSwitchOutlined />}
        </Editable>
      </Dropdown>
    </>
  );
};
