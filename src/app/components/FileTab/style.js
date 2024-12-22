import { Box, Typography, styled } from '@mui/material';

const StyledBox = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'isActive',
})(({ theme: { typography, palette }, isActive }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: typography.pxToRem(10),
  width: typography.pxToRem(100),
  cursor: 'pointer',
  borderRadius: typography.pxToRem(5),
  backgroundColor: isActive ? palette.grey[100] : 'transparent',
  '&:hover': {
    backgroundColor: palette.grey[100],
  },
}));

const StyledImage = styled('img')(() => ({
  height: '100%',
  width: '100%',
}));

const StyledName = styled(Typography)(({ theme: { typography } }) => ({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: typography.pxToRem(100),
}));

export { StyledBox, StyledImage, StyledName };
