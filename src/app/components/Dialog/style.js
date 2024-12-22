import { Box, Dialog, DialogTitle, styled } from '@mui/material';

const StyledDialog = styled(Dialog)(({ theme: { typography } }) => ({
  '& .MuiPaper-root': {
    minWidth: typography.pxToRem(400),
    padding: typography.pxToRem(50),
    position: 'relative',
  },
}));

const StyledTitle = styled(DialogTitle)(({ theme: { typography } }) => ({
  textAlign: 'center',
  padding: typography.pxToRem(10),
}));

const StyledCloseIconWrapper = styled(Box)(({ theme: { typography } }) => ({
  position: 'absolute',
  right: typography.pxToRem(20),
  top: typography.pxToRem(20),
  display: 'flex',
  justifyContent: 'flex-end',
  cursor: 'pointer',
}));

export { StyledDialog, StyledTitle, StyledCloseIconWrapper };
