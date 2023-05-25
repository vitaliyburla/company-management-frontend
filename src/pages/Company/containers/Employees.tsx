import { UserOutlined } from '@ant-design/icons';
import { Avatar, message } from 'antd';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Paragraph } from 'src/components/Paragraph';
import { Spinner } from 'src/components/Spinner';
import { roles } from 'src/constants/user';
import { useSession } from 'src/hooks/useSession';
import { AddEmployee } from 'src/pages/Company/containers/AddEmployee';
import { RemoveEmployee } from 'src/pages/Company/containers/RemoveEmployee';
import { RoleChanger } from 'src/pages/Company/containers/RoleChanger';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import { User } from 'src/types/User';
import { styled } from 'styled-components';

const Container = styled.div`
  margin-top: 24px;
  border: 1px solid ${THEME.color.neutral.line};
  padding: 24px;
  border-radius: 8px;
  gap: 12px;
  min-width: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  border: 1px solid ${THEME.color.neutral.line};
  padding: 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-avatar {
    margin-right: 12px;
  }
`;

export const Employees = () => {
  const { profile } = useSession();
  const [employees, setEmployees] = useState<User[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .get<User[]>('/users')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        isAxiosError(error) &&
          messageApi.open({
            type: 'error',
            content: error.response?.data?.message
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [triggerFetch]);

  return (
    <Container>
      {contextHolder}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {employees.map((employee) => (
            <Wrapper key={employee._id}>
              <div>
                <Avatar shape="square" size={36} icon={<UserOutlined />} />
                {employee.name} -&nbsp;
                {profile?.role === 'director' && employee._id !== profile.userId ? (
                  <RoleChanger employeeId={employee._id} role={employee.role} setEmployees={setEmployees} />
                ) : (
                  <Paragraph.L $heavy as="span">
                    {roles[employee.role]}
                  </Paragraph.L>
                )}
                {profile?.userId === employee._id && (
                  <Paragraph.L color="secondary" as="span">
                    &nbsp;(You)
                  </Paragraph.L>
                )}
              </div>
              {profile?.role === 'director' && employee._id !== profile.userId && (
                <RemoveEmployee employeeId={employee._id} setEmployees={setEmployees} />
              )}
            </Wrapper>
          ))}
          <AddEmployee onAdd={() => setTriggerFetch((prev) => !prev)} />
        </>
      )}
    </Container>
  );
};
