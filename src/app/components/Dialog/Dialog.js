import CloseIcon from '@mui/icons-material/Close';

import { StyledDialog, StyledTitle, StyledCloseIconWrapper } from './style';

const CustomDialog = ({ title, children, ...props }) => {
  return (
    <StyledDialog {...props}>
      <StyledCloseIconWrapper onClick={props.onClose}>
        <CloseIcon />
      </StyledCloseIconWrapper>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledDialog>
  );
};

export default CustomDialog;
