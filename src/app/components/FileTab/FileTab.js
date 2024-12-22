import { Box } from '@mui/material';
import { StyledBox, StyledImage, StyledName } from './style';

import FolderImage from '@assets/images/folder.png';
import FileImage from '@assets/images/file.png';
import { FILE_TYPE_CONSTANTS } from '@constants/index';
import { useTheme } from '@emotion/react';
import { WrapWithPopover } from '..';
import { useState } from 'react';

const FileTab = ({
  uid,
  name,
  type,
  height = 50,
  width = 50,
  isActive,
  onClick,
  onRename,
  onDelete,
  onCopy,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickPopover = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <WrapWithPopover
      uid={uid}
      anchorEl={anchorEl}
      handleClick={handleClickPopover}
      handleClose={handleClosePopover}
      config={[
        {
          name: 'Copy',
          onClick: onCopy,
        },
        {
          name: 'Rename',
          onClick: onRename,
        },
        {
          name: 'Delete',
          onClick: onDelete,
        },
      ]}
    >
      <StyledBox aria-describedby={uid} isActive={isActive} onClick={onClick}>
        <Box
          sx={{
            height: theme.typography.pxToRem(height),
            width: theme.typography.pxToRem(width),
          }}
        >
          <StyledImage
            src={type === FILE_TYPE_CONSTANTS.file ? FileImage : FolderImage}
          />
        </Box>
        <StyledName textAlign="center" variant="body1">
          {name}
        </StyledName>
      </StyledBox>
    </WrapWithPopover>
  );
};

export default FileTab;
