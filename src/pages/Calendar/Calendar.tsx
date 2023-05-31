import React, { useState } from 'react';
import { PageLayout } from 'src/containers/PageLayout';
import { useSession } from 'src/hooks/useSession';
import { AddVacation } from 'src/pages/Calendar/containers/AddVacation';
import { Main } from 'src/pages/Calendar/containers/Main';
import { Requests } from 'src/pages/Calendar/containers/Requests';
import { styled } from 'styled-components';

const Header = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Calendar = () => {
  const { profile } = useSession();

  return (
    <PageLayout>
      <Header>
        {(profile?.role === 'director' || profile?.role === 'manager') && <Requests />}
        <AddVacation />
      </Header>
      <Main />
    </PageLayout>
  );
};
