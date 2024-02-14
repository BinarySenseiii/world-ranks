import React from 'react';

import { Input } from '../ui/input';

const SearchHeader = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h2 className="text-theme-dark_3 font-semibold text-sm md:text-[15px]">Found 234 countries</h2>
      <Input type="text" placeholder="Search by Name, Region, Subregion" />
    </div>
  );
};

export default SearchHeader;
