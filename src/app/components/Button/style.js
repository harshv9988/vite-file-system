import { styled, Button } from '@mui/material';

const StyledButton = styled(Button, {
  shouldForwardProp: (propName) => propName !== 'textColor',
})(({ theme: { palette }, flex, textColor }) => ({
  flex,
  color: textColor ?? palette.getContrastText(palette.primary.main),
  width: '100%',
}));

export { StyledButton };
