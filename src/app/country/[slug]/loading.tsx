import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const CountryInfo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex items-center px-4 sm:px-6 justify-between py-5 border-t border-theme-dark_2 text-sm sm:text-[15px] ${className}`}
    >
      <Skeleton className="h-5 rounded-md shadow-md w-40 " />
      <Skeleton className="h-4 rounded-md shadow-md w-20 " />
    </div>
  );
};

const CountryDetailLoading = () => {
  return (
    <div className="page-wrapper max-w-3xl space-y-7 px-0">
      <div className="flex px-4 md:px-8 flex-col items-center -mt-[4.5rem]">
        <div className="max-w-64 w-full h-48 relative">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>

        <div className="text-center space-y-3 mt-8 text-theme-off_white">
          <Skeleton className="h-5 rounded-md shadow-md w-40 mx-auto" />
          <Skeleton className="h-4 rounded-md shadow-md w-20 mx-auto" />
        </div>
      </div>

      <div className="flex px-4 md:px-8 flex-wrap items-center gap-3 sm:gap-6 justify-center max-w-xl mx-auto">
        <div className="info">
          <Skeleton className="h-5 rounded-md shadow-md w-20 mx-auto" />
          <Skeleton className="h-5 rounded-md shadow-md w-20 mx-auto" />
        </div>

        <div className="info">
          <Skeleton className="h-5 rounded-md shadow-md w-20 mx-auto" />
          <Skeleton className="h-5 rounded-md shadow-md w-20 mx-auto" />
        </div>
      </div>

      <div className="space-y-5">
        <div className="divide-y divide-theme-dark_2 !mt-14">
          <CountryInfo />
          <CountryInfo />
          <CountryInfo />
          <CountryInfo />
          <CountryInfo className="!border-b" />
        </div>
      </div>

      <div className="px-4 sm:px-6 space-y-4">
        <h3 className="text-theme-dark_3 text-[15px]">Neighbouring Countries</h3>
        <div className="flex items-center flex-wrap gap-4">
          {Array(7)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-[84px] h-[64px] relative">
                  <Skeleton className="absolute inset-0 h-full w-full" />
                </div>
                <Skeleton className="h-5 rounded-md shadow-md w-20 mx-auto" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CountryDetailLoading;
