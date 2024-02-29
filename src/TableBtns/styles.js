import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => ({
  'tb-btn': css`
    color: ${token.colorPrimary};
    cursor: pointer;
  `,
  disabled: css`
    color: ${token.colorTextDisabled};
    cursor: not-allowed;
  `,
}));
