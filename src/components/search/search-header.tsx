'use client';

import React from 'react';

import { useCountries } from '@/api/hooks/useCountries';
import { useCountryActions, useCountryCount, useCountryQuery } from '@/store/useCountryStore';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

const SearchHeader = () => {
  const { isLoading } = useCountries();
  const { searchQuery, isFiltering } = useCountryQuery();
  const { setSearchQuery } = useCountryActions();
  const totalCount = useCountryCount();

  let timeoutId: NodeJS.Timeout;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value.trimStart();

    setSearchQuery({ searchQuery: newSearchQuery, isFiltering: true });

    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => setSearchQuery({ isFiltering: false }), 1000);
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      {isFiltering || isLoading ? (
        <Skeleton className="w-40 h-6 rounded-md shadow-md" />
      ) : (
        <h2 className="text-theme-dark_3 font-semibold text-sm md:text-[15px]">
          Found {totalCount} {totalCount === 1 ? 'Country' : 'Countries'}
        </h2>
      )}

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
