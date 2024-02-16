import React from 'react';

import { CountryList } from '@/components/country';
import Header from '@/components/header';
import { SearchAside, SearchHeader } from '@/components/search';

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <SearchHeader />

        <div className="block sm:grid sm:grid-cols-home gap-4 sm:gap-6 mt-8 items-start">
          <div className="md:sticky top-4 mb-8 sm:mb-0">
            <SearchAside />
          </div>
          <CountryList />
        </div>
      </div>
    </>
  );
};

export default HomePage;
