import { InfoCircleOutlined } from '@ant-design/icons';
import { Skeleton, Space, Tooltip, message } from 'antd';
import { isAxiosError } from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Paragraph } from 'src/components/Paragraph';
import { PageLayout } from 'src/containers/PageLayout';
import { useSession } from 'src/hooks/useSession';
import { AddNotification } from 'src/pages/Notifications/containers/AddNotification';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import { Message } from 'src/types/Message';
import { styled } from 'styled-components';

const Card = styled.div<{ $system?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.$system ? THEME.color.secondary.default : THEME.color.primary.default)};
  padding: 8px 12px;
  border-radius: 4px;
  gap: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Notifications = () => {
  const { profile } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .get('/messages')
      .then((res) => {
        setMessages(res.data);
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
      <Wrapper>
        <AddNotification onAdd={() => setTriggerFetch((prev) => !prev)} />
        {loading ? (
          <Skeleton />
        ) : (
          messages.map((message) => (
            <Card $system={message.type === 'system'} key={message._id}>
              <Space>
                {message.type === 'info' && message.createdBy._id === profile?.userId && (
                  <Tooltip
                    overlayInnerStyle={{ background: THEME.color.neutral.secondary }}
                    title={
                      <Space direction="vertical" size={0}>
                        {message.sentTo.length === 0 ? (
                          <Paragraph.M color="secondary">Sent to all</Paragraph.M>
                        ) : (
                          <>
                            <Paragraph.M color="secondary">Sent to:</Paragraph.M>
                            <Space direction="vertical">
                              {message.sentTo.map((user) => (
                                <Paragraph.M color="primary" as="span" key={user._id}>
                                  {user.name}
                                </Paragraph.M>
                              ))}
                            </Space>
                          </>
                        )}
                      </Space>
                    }>
                    <InfoCircleOutlined />
                  </Tooltip>
                )}
                <Paragraph.L>
                  <Paragraph.M color="secondary" as="span">
                    ({message.type === 'system' ? 'system' : message.createdBy._id === profile?.userId ? 'me' : message.createdBy.name})&nbsp;
                  </Paragraph.M>
                  {message.content}
                </Paragraph.L>
              </Space>
              <Paragraph.M color="secondary">{format(new Date(message.createdAt), 'd MMMM yyyy, HH:mm')}</Paragraph.M>
            </Card>
          ))
        )}
      </Wrapper>
    </PageLayout>
  );
};
