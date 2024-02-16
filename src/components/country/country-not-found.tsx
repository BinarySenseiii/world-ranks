'use client';

import { Loader2, Search } from 'lucide-react';
import React, { useState } from 'react';

import { useCountryActions } from '@/store/useCountryStore';
import { sleep } from '@/utils';
import { Button } from '../ui/button';
import { TableCaption } from '../ui/table';

const CountryNotFound = () => {
  const { reset } = useCountryActions();
  const [isResetting, setIsResetting] = useState(false);

  const onResetHandle = async () => {
    setIsResetting(true);

    await sleep(2000);

    setIsResetting(false);
    reset();
  };

  return (
    <TableCaption>
      <div className=" border-2 border-theme-dark_3 rounded-md h-[50vh] flex items-center justify-center bg-theme-dark_2">
        <div className="space-y-4">
          <Search />
          <span className="block"> Results you&apos;re looking for not found</span>
          <Button size="sm" onClick={onResetHandle} disabled={isResetting}>
            {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isResetting ? 'Resetting...' : 'Reset Filters'}
          </Button>
        </div>
      </div>
    </TableCaption>
  );
};

export default CountryNotFound;
