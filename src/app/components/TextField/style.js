import { styled, TextField } from '@mui/material';

const StyledTextField = styled(TextField)(
  ({ theme, radius, width, shadow, padding = 5 }) => ({
    width,
    '& fieldset': {
      borderRadius: radius,
      boxShadow: shadow,
    },

    '& .MuiOutlinedInput-root': {
      padding: theme.typography.pxToRem(padding),
    },
    '& .MuiInputBase-input': {
      padding: theme.typography.pxToRem(padding),
    },
  })
);

export { StyledTextField };
