import { useContext, useCallback, useEffect, useRef } from 'react';

import { Navbar } from '@components/index';
import { FileDataContext } from '@providers/index';
import { debounce } from '@utilities/index';

const HeaderContainer = () => {
  const {
    pathList,
    setPathList,
    setCurrOpenDirData,
    searchResult,
    searchMode,
    setSearchMode,
    setSearchResult,
    dirMap,
  } = useContext(FileDataContext);

  const searchVal = useRef('');

  /**
   * This useEffect handles EdgeCase when you try to rename/delete item while search mode is on
   * In this case we have to search recursively again because global directory mapis updated
   */
  useEffect(() => {
    if (searchMode && searchVal.current.length > 0) {
      const result = recursiveSearch(pathList[0].children, searchVal.current);
      setSearchResult(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirMap]);

  /**
   * Here we update pathList whenever user clicks on back button
   * or directly clicks breadcrumb
   * @param {number} startIndex - starting point of pathList
   * @param {number} endIndex - index of last element present in path list
   * @returns {void}
   */
  const updatePathList = (startIndex, endIndex) => {
    const slicedList = pathList.slice(startIndex, endIndex + 1);
    const lastPath = slicedList[slicedList.length - 1];
    setPathList(slicedList);
    setCurrOpenDirData(dirMap.get(lastPath.id).children);
  };

  /**
   * Triggers when user directly clicks breadcrumb
   * @param {object} item - data object of breadcrumb clicked
   * @returns {void}
   */
  const handlePathClick = (item) => {
    const clickedIndex = pathList.findIndex((path) => path.id === item.id);
    updatePathList(0, clickedIndex);
  };

  /**
   * Triggers when user clicks back button
   * @returns {void}
   */
  const handleBackClick = () => {
    if (pathList.length > 1) {
      updatePathList(0, pathList.length - 2);
    }
  };

  /**
   * Triggers when user directly clicks breadcrumb
   * @param {Array<Object>} searchList - list to be searched
   * @param {string} query - text to be searched
   * @returns {Array.<Object>}
   */
  const recursiveSearch = (searchList, query) => {
    let result = [];
    searchList.forEach((element) => {
      if (element.name.toLowerCase().includes(query.toLowerCase())) {
        result.push(element);
      }
      if (element.children && element.children.length > 0) {
        let recursiveResult = recursiveSearch(element.children, query);
        result.push(...recursiveResult);
      }
    });
    return result;
  };

  const handleSearch = (val) => {
    if (val.length > 0) {
      const rootData = pathList[0];
      const result = recursiveSearch(rootData.children, val);
      setSearchResult(result);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useCallback(debounce(handleSearch, 800), [pathList]);

  return (
    <Navbar
      disableBackButton={pathList.length <= 1}
      onBack={handleBackClick}
      onSelectPath={handlePathClick}
      pathList={pathList}
      searchResultLength={searchResult.length}
      searchMode={searchMode}
      onToggleSearchMode={(val) => setSearchMode(val)}
      onChange={(e) => {
        memoizedCallback(e.target.value);
        searchVal.current = e.target.value;
      }}
    />
  );
};

export default HeaderContainer;
