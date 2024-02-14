import React from 'react';

import Header from '@/components/header';
import { SearchAside, SearchHeader } from '@/components/search';

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <SearchHeader />

        <div className="grid sm:grid-cols-home gap-4 sm:gap-6 mt-8">
          <SearchAside />
          <div className="bg-red-500 h-full"></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
