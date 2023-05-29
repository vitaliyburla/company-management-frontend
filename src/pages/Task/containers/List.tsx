import React from 'react';
import { format } from 'date-fns';
import { Paragraph } from 'src/components/Paragraph';
import { Spinner } from 'src/components/Spinner';
import { THEME } from 'src/theme';
import { styled } from 'styled-components';
import { Report } from 'src/types/Report';
import { roles } from 'src/constants/user';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

const Card = styled.div`
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${THEME.color.neutral.line};
  min-width: 220px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

interface Props {
  loading: boolean;
  reports: Report[];
}

export const List = ({ reports, loading }: Props) => {
  if (loading) return <Spinner />;

  return (
    <Wrapper>
      <Paragraph.XL $heavy>Reports</Paragraph.XL>
      {reports.map((report) => {
        return (
          <Card key={report._id}>
            <div>
              <Paragraph.XXL $heavy style={{ marginBottom: 12 }}>
                {report.title}
              </Paragraph.XXL>
              <div dangerouslySetInnerHTML={{ __html: report.description }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Paragraph.M color="secondary">Created by {roles[report.createdBy.role]}</Paragraph.M>
              <Paragraph.L>{report.createdBy.name}</Paragraph.L>
              <Paragraph.M color="secondary">{format(new Date(report.createdAt), 'd MMMM yyyy, HH:mm')}</Paragraph.M>
            </div>
          </Card>
        );
      })}
    </Wrapper>
  );
};
