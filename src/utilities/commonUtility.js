import { v4 as uuid } from 'uuid';
import { FILE_TYPE_CONSTANTS } from '@constants/fileTypeConstants';

/**
 * I agree content of this file looks scary :( lets go one by one
 *
 * Basically we have 2 things
 * 1) Global directory map which is a map of id vs content of file/folder
 * 2) current open folder whom's data is being currently displayed to user
 *
 * so if any update happens we need to update these both
 */

/**
 * Just creates a object for file/folder structure
 * @param {string} name - name of file/folder
 * @param {number} type - type that is file/folder
 * @param {string} id - id of file/folder if not provided we create a random one
 */
export const createContentObj = ({ name, type, id = null }) => {
  return {
    name: name,
    id: id ?? uuid(),
    type: type,
    children: type === FILE_TYPE_CONSTANTS.folder ? [] : null,
  };
};

/**
 * Adds new file/folder node
 * 1) First we update children list of current open folder
 * 2) we create a new entry in global directory map showing a new file/folder has been added
 * @param {Object} data - data of file/folder
 * @param {Map} dirMap - global directory map
 * @param {string} currDirId - Id of current folder in open state
 * @returns {Map}
 */
export const addToCurrDir = ({ data, currDirId, dirMap }) => {
  const currOpenDirData = dirMap.get(currDirId);
  currOpenDirData.children.push(data);
  dirMap.set(currDirId, currOpenDirData);
  return new Map(dirMap.set(data.id, data));
};

/**
 * Updates file and folder
 * 1) First we update children list of current open folder
 * 2) we update the entry in global directory map showing a new file/folder has been updated
 * @param {Object} data - data of file/folder
 * @param {Map} dirMap - global directory map
 * @param {string} currDirId - Id of current folder in open state
 * @returns {Map}
 */
export const updateCurrDir = ({ data, currDirId, dirMap }) => {
  const currOpenDirData = dirMap.get(currDirId);
  const updatedList = currOpenDirData.children.map((item) =>
    item.id === data.id ? data : item
  );
  currOpenDirData.children = updatedList;
  dirMap.set(currDirId, currOpenDirData);
  return new Map(dirMap.set(data.id, data));
};

/**
 * Deletes file and folder
 * 1) First we update children list of current open folder
 * 2) we delete the entry in global directory map showing a new file/folder has been deleted
 * @param {Object} data - data of file/folder
 * @param {Map} dirMap - global directory map
 * @param {string} currDirId - Id of current folder in open state
 * @returns {Map}
 */
export const deleteFromCurrDir = ({ currDirId, deleteId, dirMap }) => {
  const currOpenDirData = dirMap.get(currDirId);
  const updatedList = currOpenDirData.children.filter(
    (item) => item.id !== deleteId
  );
  currOpenDirData.children = updatedList;
  dirMap.delete(deleteId);
  dirMap.set(currDirId, currOpenDirData);
  return new Map(dirMap);
};

/**
 * copy-paste function
 * 1) Provide a new Id
 * 2) Add this to global directory map and current open folder
 * @param {Object} copiedItem - data of file/folder to be copied
 * @param {Map} dirMap - global directory map
 * @param {string} currDirId - Id of current folder in open state
 * @returns {Map}
 */
export const pasteContentToDir = ({ copiedItem, dirMap, currDirId }) => {
  const currOpenDirData = dirMap.get(currDirId);
  let newName = getUpdatedFileName(
    copiedItem.name,
    currOpenDirData.children.map((item) => item.name)
  );

  // for folder
  if (copiedItem.children) {
    const copiedChildrenObj = generateNewChildren(copiedItem.children);
    const updateCopiedItem = {
      ...copiedItem,
      id: uuid(),
      name: newName,
      children: copiedChildrenObj.children,
    };
    const updatedMap = addToCurrDir({
      dirMap,
      currDirId: currDirId,
      data: updateCopiedItem,
    });
    return new Map([...updatedMap, ...copiedChildrenObj.map]);
  } else {
    const updateCopiedItem = {
      ...copiedItem,
      id: uuid(),
      name: newName,
    };

    const updatedMap = addToCurrDir({
      dirMap,
      currDirId: currDirId,
      data: updateCopiedItem,
    });

    return new Map([...updatedMap]);
  }
};

/**
 * For most complicated edge case
 * what if you copy a folder and paste it inside it itself?
 * For this firstly we need to recursively traverse each children of this folder
 * then make a copy of eavh and every content with new id
 * Also we need to update global directory map with each and every value that is generated
 */
export const generateNewChildren = (childrenList) => {
  let children = [];
  let map = new Map();
  childrenList.forEach((item) => {
    if (item.type === FILE_TYPE_CONSTANTS.folder) {
      const childData = generateNewChildren(item.children);
      const obj = { ...item, id: uuid(), children: childData.children };
      map = new Map([...childData.map, ...map.set(obj.id, obj)]);
      children.push(obj);
    } else {
      const obj = { ...item, id: uuid() };
      map = new Map([...map.set(obj.id, obj)]);
      children.push(obj);
    }
  });
  return {
    children,
    map,
  };
};

/**
 * Generates a new file name when file/folder is copied and pasted
 */
export const getUpdatedFileName = (originalFileName, existingFileNames) => {
  let updatedFileName = originalFileName;
  let counter = 1;

  while (existingFileNames.includes(updatedFileName)) {
    // Extract the file name without extension (if any)
    const parts = originalFileName.split('.');
    const baseName = parts[0];
    const extension = parts.length > 1 ? `.${parts.slice(1).join('.')}` : '';

    // Construct the updated filename by appending the counter
    updatedFileName = `${baseName}_${counter}${extension}`;
    counter++;
  }

  return updatedFileName;
};
