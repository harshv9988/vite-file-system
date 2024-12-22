import React from 'react';
import { HomeLayout } from '@layouts/index';
import { HeaderContainer, FolderContainer } from '@containers/index';

/**
 * Layout files for definitive layout
 * like here if we have multiple pages with same layout
 * that is header at top content at bottom we can use this common file for it
 * Container file contains all business logic with some exceptions
 */
const HomePage = () => {
  return (
    <HomeLayout header={<HeaderContainer />}>
      <FolderContainer />
    </HomeLayout>
  );
};

export default HomePage;
