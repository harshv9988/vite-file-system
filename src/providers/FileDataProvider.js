import React from 'react';
import { useState, createContext, useEffect } from 'react';

export const FileDataContext = createContext();

export const FileDataProvider = (props) => {
  const [currOpenDirData, setCurrOpenDirData] = useState([]);
  const [pathList, setPathList] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [dirMap, setDirMap] = useState(new Map());
  const [copyCache, setCopyCache] = useState(null);

  /**
   * This useEffect automatically updated current data of directoyy to be shown to user
   * when global directory map is updated
   * This happens when you create/update/delete a file/folder
   */
  useEffect(() => {
    let lastIndex = pathList.length - 1;
    if (lastIndex !== -1) {
      const currOpenFolderId = pathList[lastIndex].id;
      const updatedData = dirMap.get(currOpenFolderId);
      setCurrOpenDirData([...updatedData.children]);
    }
  }, [dirMap, pathList]);

  /**
   * Yep using a context API here since we have two containers(business logic wrappers)
   * and needed some way for 2 way communication between them
   * Prop drilling is not a solution
   */
  return (
    <FileDataContext.Provider
      value={{
        currOpenDirData,
        setCurrOpenDirData,
        pathList,
        setPathList,
        searchMode,
        setSearchMode,
        searchResult,
        setSearchResult,
        dirMap,
        setDirMap,
        copyCache,
        setCopyCache,
      }}
    >
      {props.children}
    </FileDataContext.Provider>
  );
};
