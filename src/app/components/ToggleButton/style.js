import { ToggleButton, styled } from '@mui/material';

const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => !['rank', 'length'].includes(prop),
})(({ theme: { typography }, rank, length }) => ({
  minWidth: typography.pxToRem(70),

  ...(rank === 0 && {
    borderRadius: `${typography.pxToRem(9999)} 0 0 ${typography.pxToRem(9999)}`,
  }),

  ...(rank === length - 1 && {
    borderRadius: `0 ${typography.pxToRem(9999)} ${typography.pxToRem(9999)} 0`,
  }),
}));

export { StyledToggleButton };
