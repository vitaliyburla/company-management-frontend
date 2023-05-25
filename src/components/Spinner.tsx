import { Spin } from 'antd';
import { THEME } from 'src/theme';
import styled from 'styled-components';

export const Spinner = styled(Spin)`
  width: 100%;
  .ant-spin-dot-item {
    background-color: ${THEME.color.neutral.line};
  }
`;
