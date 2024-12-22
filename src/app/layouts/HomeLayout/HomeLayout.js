import { WrapWithPopover } from '@components/index';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { useContext, useState } from 'react';

import { FileDataContext } from '@providers/index';
import { pasteContentToDir } from '@utilities/commonUtility';

/**
 * Layout files for definitive layout
 * like here if we have multiple pages with same layout
 * that is header at top content at bottom we can use this common file for it
 * Container file contains all business logic with some exceptions
 */
const HomeLayout = ({ header, children }) => {
  const theme = useTheme();

  const { copyCache, setDirMap, pathList } = useContext(FileDataContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  const handleClickPopover = (event) => {
    event.preventDefault();
    if (!copyCache) {
      return;
    }
    setAnchorEl(event.currentTarget);

    const position = {
      left: event.clientX,
      top: event.clientY,
    };
    setPos(position);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {header}
      <WrapWithPopover
        uid="homeLayout"
        anchorEl={anchorEl}
        handleClick={handleClickPopover}
        handleClose={handleClosePopover}
        config={[
          {
            name: 'Paste',
            onClick: () => {
              setDirMap((prev) =>
                pasteContentToDir({
                  currDirId: pathList[pathList.length - 1].id,
                  copiedItem: copyCache,
                  dirMap: prev,
                })
              );
            },
          },
        ]}
        anchorReference="anchorPosition"
        anchorPosition={{
          left: pos.left,
          top: pos.top,
        }}
      >
        <Box
          aria-describedby="homeLayout"
          component="main"
          mx={theme.typography.pxToRem(10)}
          sx={{ height: '100%' }}
        >
          {children}
        </Box>
      </WrapWithPopover>
    </>
  );
};

export default HomeLayout;
