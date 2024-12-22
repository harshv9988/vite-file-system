import { useState, useEffect } from 'react';
import { FILE_TYPE_CONSTANTS } from '@constants/fileTypeConstants';
import { useTheme } from '@emotion/react';

import {
  CustomDialog,
  CustomToggleButton,
  CustomTextField,
  CustomButton,
} from '@components/index';
import { Box } from '@mui/material';

const ModalContainer = ({
  onSubmitContent,
  handleDialogClose,
  open,
  defaultContent,
}) => {
  const theme = useTheme();

  const [alignment, setAlignment] = useState(FILE_TYPE_CONSTANTS.file);
  const [newContentName, setNewContentName] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (defaultContent !== null) {
      setAlignment(defaultContent.type);
      setNewContentName(defaultContent.name);
    }
  }, [defaultContent]);

  return (
    <CustomDialog title="Create New" onClose={handleDialogClose} open={open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CustomToggleButton
          disabled={defaultContent != null}
          exclusive={true}
          onChange={(_, val) => {
            setAlignment(val);
          }}
          color="primary"
          value={alignment}
          config={[
            {
              name: 'File',
              value: FILE_TYPE_CONSTANTS.file,
            },
            {
              name: 'Folder',
              value: FILE_TYPE_CONSTANTS.folder,
            },
          ]}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            const err = onSubmitContent(newContentName, alignment);
            if (err && err.length > 0) {
              setErrorText(err);
            } else {
              setNewContentName('');
              setErrorText('');
            }
          }}
        >
          <Box width="80%" mt={theme.typography.pxToRem(20)}>
            <CustomTextField
              error={errorText.length > 0}
              helperText={errorText}
              padding={3}
              placeholder="Name"
              value={newContentName}
              onChange={(e) => setNewContentName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box width="80%" mt={theme.typography.pxToRem(20)}>
            <CustomButton
              title="Submit"
              variant="contained"
              textColor={theme.palette.common.white}
              type="submit"
            />
          </Box>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default ModalContainer;
