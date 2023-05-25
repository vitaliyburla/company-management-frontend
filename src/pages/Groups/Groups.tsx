import { RightCircleOutlined } from '@ant-design/icons';
import { Space, message } from 'antd';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paragraph } from 'src/components/Paragraph';
import { Spinner } from 'src/components/Spinner';
import { ROUTE } from 'src/constants/routes';
import { PageLayout } from 'src/containers/PageLayout';
import { useSession } from 'src/hooks/useSession';
import { AddGroup } from 'src/pages/Groups/containers/AddGroup';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import { Group } from 'src/types/Group';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

const Card = styled.div`
  padding: 24px;
  min-width: fit-content;
  width: 100%;
  max-width: 560px;
  min-width: 240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${THEME.color.neutral.line};

  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid ${THEME.color.neutral.secondary};
    background-color: ${THEME.color.neutral.secondary};
  }
`;

export const Groups = () => {
  const navigate = useNavigate();
  const { profile } = useSession();
  const [groups, setGroups] = useState<Group[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .get('/groups')
      .then((res) => {
        setGroups(res.data);
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
    <PageLayout>
      <Space align="start" size={16}>
        <Paragraph.XXL $heavy ellipsis>
          Groups
        </Paragraph.XXL>
        {(profile?.role === 'manager' || profile?.role === 'director') && <AddGroup onAdd={() => setTriggerFetch((prev) => !prev)} />}
      </Space>
      {contextHolder}
      {loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          {groups.map((group) => (
            <Card key={group._id} onClick={() => navigate(ROUTE.Groups.Tasks(group._id))}>
              <Paragraph.XL ellipsis>{group.title}</Paragraph.XL>
              <Space size={24}>
                <Space direction="vertical" size={0}>
                  <Paragraph.M color="secondary" ellipsis>
                    Supervisor
                  </Paragraph.M>
                  <Paragraph.L ellipsis>{group.createdBy.name}</Paragraph.L>
                </Space>
                <RightCircleOutlined />
              </Space>
            </Card>
          ))}
        </Wrapper>
      )}
    </PageLayout>
  );
};
