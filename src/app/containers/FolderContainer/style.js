import { Box, styled } from '@mui/material';

const StyledBox = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'isActive',
})(({ theme: { typography } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  padding: typography.pxToRem(10),
  width: typography.pxToRem(100),
  cursor: 'pointer',
}));

export { StyledBox };
