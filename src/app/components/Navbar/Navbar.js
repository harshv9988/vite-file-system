import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';

import { CustomTextField } from '@components/index';

import { StyledBox, StyledLink } from './style';
import { useTheme } from '@emotion/react';

const Navbar = ({
  pathList,
  onSelectPath,
  onBack,
  searchMode,
  searchResultLength,
  onToggleSearchMode,
  onChange,
  disableBackButton,
}) => {
  const theme = useTheme();

  const getBreadCrumb = () => (
    <Box display="flex">
      <Box
        onClick={onBack}
        mx={theme.typography.pxToRem(5)}
        sx={{
          cursor: 'pointer',
        }}
      >
        <ArrowBackIcon
          sx={{
            color: disableBackButton ? theme.palette.grey[200] : 'black',
          }}
        />
      </Box>
      {pathList.map((item, index) => (
        <Box key={item.id}>
          <StyledLink
            onClick={() => onSelectPath(item)}
            variant="body1"
            component="span"
          >
            {item.name}
          </StyledLink>
          <Typography component="span" variant="body2">
            {index < pathList.length - 1 ? '/' : ''}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const getSearchResult = () => (
    <Box display="flex">
      <Box
        mx={theme.typography.pxToRem(5)}
        onClick={() => onToggleSearchMode(false)}
        sx={{
          cursor: 'pointer',
        }}
      >
        <CloseIcon />
      </Box>
      <Typography>Found Results: {searchResultLength} items</Typography>
    </Box>
  );

  return (
    <StyledBox>
      {searchMode ? getSearchResult() : getBreadCrumb()}
      <CustomTextField
        placeholder="Search for anything"
        onChange={onChange}
        onFocus={() => onToggleSearchMode(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </StyledBox>
  );
};

export default Navbar;
