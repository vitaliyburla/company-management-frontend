import { Typography } from 'antd';
import styled from 'styled-components';

import { THEME } from 'src/theme';

interface StyledProps {
  $heavy?: boolean;
  color?: 'primary' | 'secondary' | 'disabled';
}

const ParagraphS = styled(Typography.Paragraph)<StyledProps>`
  font-size: 10px;
  line-height: 15px;
  font-weight: ${(props) => (props.$heavy ? 600 : 400)};
  color: ${(props) => (props.color ? THEME.color.text[props.color] : THEME.color.text.primary)};
  &.ant-typography {
    margin: 0;
  }
`;
const ParagraphM = styled(Typography.Paragraph)<StyledProps>`
  font-size: 12px;
  line-height: 18px;
  font-weight: ${(props) => (props.$heavy ? 600 : 400)};
  color: ${(props) => (props.color ? THEME.color.text[props.color] : THEME.color.text.primary)};
  &.ant-typography {
    margin: 0;
  }
`;
const ParagraphL = styled(Typography.Paragraph)<StyledProps>`
  font-size: 14px;
  line-height: 21px;
  font-weight: ${(props) => (props.$heavy ? 600 : 400)};
  color: ${(props) => (props.color ? THEME.color.text[props.color] : THEME.color.text.primary)};
  &.ant-typography {
    margin: 0;
  }
`;
const ParagraphXL = styled(Typography.Paragraph)<StyledProps>`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${(props) => (props.$heavy ? 600 : 400)};
  color: ${(props) => (props.color ? THEME.color.text[props.color] : THEME.color.text.primary)};
  &.ant-typography {
    margin: 0;
  }
`;
const ParagraphXXL = styled(Typography.Paragraph)<StyledProps>`
  font-size: 18px;
  line-height: 22px;
  font-weight: ${(props) => (props.$heavy ? 600 : 400)};
  color: ${(props) => (props.color ? THEME.color.text[props.color] : THEME.color.text.primary)};
  &.ant-typography {
    margin: 0;
  }
`;

export type ParagraphProps = {
  S: typeof ParagraphS;
  M: typeof ParagraphM;
  L: typeof ParagraphL;
  XL: typeof ParagraphXL;
  XXL: typeof ParagraphXXL;
};

export const Paragraph = {} as ParagraphProps;
Paragraph.S = ParagraphS;
Paragraph.M = ParagraphM;
Paragraph.L = ParagraphL;
Paragraph.XL = ParagraphXL;
Paragraph.XXL = ParagraphXXL;
