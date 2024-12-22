import { Box, Typography, styled } from '@mui/material';

const StyledBox = styled(Box)(({ theme: { palette, typography } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0',
  margin: typography.pxToRem(10),
  borderBottom: `1px solid ${palette.grey[200]}`,
}));

const StyledLink = styled(Typography)(({ theme: { palette, typography } }) => ({
  padding: typography.pxToRem(2),
  margin: typography.pxToRem(5),
  borderBottom: `1px solid ${palette.grey[300]}`,
  cursor: 'pointer',
  '&:hover': {
    color: palette.grey[300],
  },
}));

export { StyledBox, StyledLink };
