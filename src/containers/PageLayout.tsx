import React, { PropsWithChildren, useLayoutEffect } from 'react';

import { Avatar, Button, Layout, Space } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { THEME } from 'src/theme';
import { ROUTE } from 'src/constants/routes';
import { useSession } from 'src/hooks/useSession';
import { Paragraph } from 'src/components/Paragraph';
import { UserOutlined } from '@ant-design/icons';

const StyledLayout = styled(Layout)`
  height: 100vh;
  min-width: 800px;
`;

const StyledContent = styled(Layout.Content)`
  overflow-y: scroll;
  padding: 48px;
  &&& {
    background-color: ${THEME.color.neutral.base};
  }
`;

const StyledSider = styled(Layout.Sider)`
  &&& {
    position: relative;
    background-color: ${THEME.color.neutral.primary};
  }
  .ant-layout-sider-children {
    gap: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SideLink = styled.div<{ $isActive?: boolean }>`
  width: 90%;
  height: 48px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? THEME.color.neutral.base : THEME.color.neutral.secondary)};

  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;

  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${THEME.color.neutral.base};
  }
`;

const Logout = styled(Button).attrs({
  type: 'ghost'
})`
  border: 1px solid ${THEME.color.neutral.line};

  &:hover {
    background: ${THEME.color.neutral.secondary};
    border: 1px solid ${THEME.color.neutral.secondary};
  }
`;

const Profile = styled.div`
  position: absolute;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const routes = [
  {
    name: 'Tasks',
    path: ROUTE.Groups.Index
  },
  {
    name: 'Calendar',
    path: ROUTE.Calendar.Index
  },
  {
    name: 'Notifications',
    path: ROUTE.Notifications.Index
  },
  {
    name: 'Company',
    path: ROUTE.Company.Index
  }
];

export const PageLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const navigate = useNavigate();

  const { isLoggedIn, logout, profile } = useSession();

  useLayoutEffect(() => {
    if (isLoggedIn) return;

    navigate('/auth', { replace: true });
  }, [isLoggedIn]);

  return (
    <StyledLayout hasSider>
      <StyledSider>
        {routes.map((route) => (
          <SideLink $isActive={window.location.pathname.startsWith(route.path)} key={route.path} onClick={() => navigate(route.path)}>
            <Paragraph.L $heavy>{route.name}</Paragraph.L>
          </SideLink>
        ))}
        {profile && (
          <Profile>
            <Space>
              <Avatar size={24} shape="square" icon={<UserOutlined />} />
              <Paragraph.L $heavy>{profile.name}</Paragraph.L>
            </Space>
            <Logout onClick={logout}>Logout</Logout>
          </Profile>
        )}
      </StyledSider>
      <StyledLayout>
        <StyledContent>{children}</StyledContent>
      </StyledLayout>
    </StyledLayout>
  );
};
