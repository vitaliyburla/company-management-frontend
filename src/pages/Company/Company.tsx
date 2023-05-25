import { Skeleton, message } from 'antd';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Paragraph } from 'src/components/Paragraph';
import { PageLayout } from 'src/containers/PageLayout';
import { Employees } from 'src/pages/Company/containers/Employees';
import httpService from 'src/services/httpService';
import { Company as CompanyType } from 'src/types/Company';

export const Company = () => {
  const [company, setCompany] = useState<CompanyType>();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .get<CompanyType>('/company')
      .then((res) => {
        setCompany(res.data);
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

  return (
    <PageLayout>
      {contextHolder}
      {loading ? <Skeleton.Input /> : <Paragraph.XXL $heavy>{company?.name}</Paragraph.XXL>}
      <Employees />
    </PageLayout>
  );
};
