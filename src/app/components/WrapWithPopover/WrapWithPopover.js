import { Box } from '@mui/material';

import { CustomPopover } from '@components/index';

const WrapWithPopover = ({
  uid,
  config = [],
  children,
  handleClick,
  anchorEl,
  handleClose,
  anchorOrigin = {
    vertical: 'center',
    horizontal: 'center',
  },
  ...props
}) => {
  const open = Boolean(anchorEl);
  const id = open ? uid : undefined;
  return (
    <>
      <Box sx={{ height: '100%' }} onContextMenu={handleClick}>
        {children}
      </Box>
      <CustomPopover
        config={config}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        {...props}
      />
    </>
  );
};

export default WrapWithPopover;
