'use client';

import React from 'react';

import { useCountries } from '@/api/hooks/useCountries';
import { useCountryActions, useCountryQuery } from '@/store/useCountryStore';
import { Input } from '../ui/input';

const SearchHeader = () => {
  const { searchQuery } = useCountryQuery();
  const { setSearchQuery } = useCountryActions();
  const countryCount = useCountries<number>((countries) => countries.length).data ?? 0;

  let timeoutId: NodeJS.Timeout;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value.trimStart();

    setSearchQuery({ searchQuery: newSearchQuery, isFiltering: true });

    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => setSearchQuery({ isFiltering: false }), 1000);
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h2 className="text-theme-dark_3 font-semibold text-sm md:text-[15px]">Found {countryCount} countries</h2>
      <Input
        value={searchQuery}
        onChange={onChangeHandler}
        type="text"
        placeholder="Search by Name, Region, Subregion"
      />
    </div>
  );
};

export default SearchHeader;
