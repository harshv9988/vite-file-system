import { useEffect, useState, useContext } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import { v4 as uuid } from 'uuid';

import { FileTab } from '@components/index';
import { FileDataContext } from '@providers/index';
import { FILE_TYPE_CONSTANTS } from '@constants/index';
import { StyledImage } from '@components/FileTab/style';
import ButtonImage from '@assets/images/add_new_button.png';

import { StyledBox } from './style';
import {
  addToCurrDir,
  createContentObj,
  deleteFromCurrDir,
  updateCurrDir,
} from '@utilities/commonUtility';
import { ModalContainer } from '..';

const FolderContainer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const [editContent, setEditContent] = useState(null);

  const {
    pathList,
    searchMode,
    searchResult,
    currOpenDirData,
    setCurrOpenDirData,
    setPathList,
    setSearchMode,
    setSearchResult,
    dirMap,
    setDirMap,
    setCopyCache,
  } = useContext(FileDataContext);

  /**
   * Main useEffect which loads initial data on page load
   * Loads mock json file and creates root directory
   */
  useEffect(() => {
    const createDirectoryMap = (data) => {
      let map = new Map();
      data.forEach((item) => {
        map.set(item.id, item);
        if (item.children && item.children.length > 0) {
          let childrenMap = createDirectoryMap(item.children);
          map = new Map([...map, ...childrenMap]);
        }
      });
      return map;
    };

    const createRootElement = (data) => {
      return {
        name: 'root',
        children: data,
        id: uuid(),
        type: FILE_TYPE_CONSTANTS.folder,
      };
    };

    /**
     * Fetch data from mock json file and set values in context API methods
     * @returns {void}
     */

    const getData = () => {
      fetch('data/mock.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const rootElement = createRootElement(data);
          const buildMap = createDirectoryMap(data);
          buildMap.set(rootElement.id, rootElement);
          setPathList([rootElement]);
          setDirMap(buildMap);
          setCurrOpenDirData(data);
        });
    };
    getData();
  }, [setCurrOpenDirData, setPathList, setDirMap]);

  /**
   * Handles the click on folder
   * Also different handling is done when searchMode is on
   * @param {string} id - folder Id
   * @returns {void}
   */

  const handleOpenFolder = (id) => {
    // Always fetch data from globalMap
    // Because we update any CRUD operations on globallevel
    // to simplify the process
    const clickedItem = dirMap.get(id);
    if (searchMode) {
      let root = pathList[0];
      setSearchMode(false);
      setPathList([root, clickedItem]);
      setSearchResult([]);
    } else {
      setPathList((prev) => [...prev, clickedItem]);
    }
    setCurrOpenDirData(clickedItem.children);
  };

  /**
   * Handles Mouse click event on file/folder
   * @param {React.MouseEvent<HTMLButtonElement>} e - onClickEvent
   * @param {object} item - folder data
   * @returns {void}
   */
  const clickHandler = (e, item) => {
    if (e.detail === 2) {
      if (item.type === FILE_TYPE_CONSTANTS.folder) {
        handleOpenFolder(item.id);
      }
    } else {
      setActiveItem(item.id);
    }
  };

  /**
   * Adds New content in global directory map
   * @param {string} newContentName - name of new content to be added
   * @param {number} alignment - type of file
   * @returns {void}
   */
  const addNewContent = (newContentName, alignment) => {
    let dataObj = createContentObj({ name: newContentName, type: alignment });

    setDirMap((prev) =>
      addToCurrDir({
        data: dataObj,
        currDirId: pathList[pathList.length - 1].id,
        dirMap: prev,
      })
    );
  };

  /**
   * Updates New content in global directory map
   * @param {string} newContentName - name of new content to be added
   * @param {number} alignment - type of file
   * @returns {void}
   */
  const updateContent = (newContentName, alignment) => {
    let dataObj = { ...editContent, name: newContentName };
    setDirMap((prev) =>
      updateCurrDir({
        data: dataObj,
        currDirId: pathList[pathList.length - 1].id,
        dirMap: prev,
      })
    );
    setEditContent(null);
  };

  /**
   * Submit handler which mainly checks validation when submit button is clicked in modal
   * @param {string} name - name of new content to be added
   * @param {number} alignment - type of file
   * @returns {string | null}
   */
  const onSubmitContent = (name, alignment) => {
    if (name.length === 0) {
      return 'Required Field';
    }

    if (alignment === FILE_TYPE_CONSTANTS.file) {
      if (!name.includes('.')) {
        return 'Wrong file extension';
      }

      const splitName = name.split('.');
      if (splitName[splitName.length - 1] === '') {
        return 'Wrong file format';
      }
    }

    const file = currOpenDirData.find((item) => item.name === name);

    if (file === undefined || file.id === editContent?.id) {
      editContent ? updateContent(name, alignment) : addNewContent(name, alignment);
      handleDialogClose();
    } else {
      return 'File with name already exists';
    }
  };

  /**
   * Delete Handler
   * @param {object} item - data of content to be deleted
   * @returns {void}
   */
  const handleItemDelete = (item) => {
    setDirMap((prev) =>
      deleteFromCurrDir({
        dirMap: prev,
        currDirId: pathList[pathList.length - 1].id,
        deleteId: item.id,
      })
    );
  };

  /**
   * Item rename handler
   * @param {object} item - data of content to be deleted
   * @returns {void}
   */
  const handleItemRename = (item) => {
    setEditContent(item);
    setOpen(true);
  };

  /**
   * Handles closing of modal
   */
  const handleDialogClose = () => {
    setOpen(false);
    setEditContent(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {(searchMode ? searchResult : currOpenDirData).map((item) => (
          <Box m="1rem" key={item.id}>
            <FileTab
              name={item.name}
              type={item.type}
              isActive={activeItem === item.id}
              onClick={(e) => clickHandler(e, item)}
              onCopy={() => setCopyCache(item)}
              onRename={() => handleItemRename(item)}
              onDelete={() => handleItemDelete(item)}
            />
          </Box>
        ))}
        {!searchMode && (
          <StyledBox my="1rem" onClick={() => setOpen(true)}>
            <Box
              sx={{
                width: theme.typography.pxToRem(50),
                height: theme.typography.pxToRem(50),
              }}
            >
              <StyledImage src={ButtonImage} />
            </Box>
          </StyledBox>
        )}
      </Box>
      <ModalContainer
        open={open}
        handleDialogClose={handleDialogClose}
        onSubmitContent={onSubmitContent}
        defaultContent={editContent}
      />
    </>
  );
};

export default FolderContainer;
