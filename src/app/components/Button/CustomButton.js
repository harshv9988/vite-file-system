import { Typography } from '@mui/material';

import { StyledButton } from './style';
import { useTheme } from '@emotion/react';

const CustomButton = ({ title, color = 'primary', ...props }) => {
  const theme = useTheme();
  return (
    <StyledButton flex={1} color={color} {...props}>
      <Typography
        display="flex"
        alignItems="center"
        component="span"
        variant="button"
        maxWidth={theme.typography.pxToRem(100)}
        noWrap
      >
        {title}
      </Typography>
    </StyledButton>
  );
};

export default CustomButton;
