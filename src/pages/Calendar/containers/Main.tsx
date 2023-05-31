import React, { useEffect, useState } from 'react';
import { BadgeProps, message } from 'antd';
import { Badge, Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { Vacation } from 'src/types/Vacation';
import httpService from 'src/services/httpService';
import { isAxiosError } from 'axios';
import { styled } from 'styled-components';
dayjs.extend(isBetween);

const Wrapper = styled.div`
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
`;

export const Main = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setLoading(true);
    httpService
      .get('/vacations?status=approved')
      .then((res) => {
        setVacations(res.data);
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
  }, []);

  const dateCellRender = (value: Dayjs) => {
    const getListData = (value: Dayjs) => {
      const vacationOnThisDate = vacations.filter((vacation) => {
        const { startAt, endAt } = vacation;
        return dayjs(value).isBetween(dayjs(startAt), dayjs(endAt), 'day', '[]');
      });

      if (vacationOnThisDate) {
        return vacationOnThisDate.map((v) => ({ type: 'error', content: `${v.createdBy.name}`, key: v._id }));
      }

      return [];
    };

    const listData = getListData(value);

    return (
      <div>
        {listData.map((item) => (
          <Badge key={item.key} status={item.type as BadgeProps['status']} text={item.content} />
        ))}
      </div>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <>
      {contextHolder}
      <Wrapper>
        <Calendar cellRender={cellRender} />
      </Wrapper>
    </>
  );
};
