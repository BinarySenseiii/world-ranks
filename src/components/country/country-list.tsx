'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { CountryData } from '@/api/_types';
import { useCountries } from '@/api/hooks/useCountries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RESP_SIZES } from '@/constants/image';
import { useCountryQuery } from '@/store/useCountryStore';
import { addEllipsis, formatNumberWithThousandSeparator } from '@/utils';
import CountryPagination from './country-pagination';
import TableSkeleton from './skeleton/table-skeleton';

const CountryList = () => {
  const { isFiltering, searchQuery } = useCountryQuery();
  const { data, isLoading } = useCountries<CountryData[]>();

  const filteredData = useMemo(() => {
    if (!data || !data.length) {
      return [];
    }

    const normalizedSearchQuery = searchQuery.toLowerCase();
    const search = (property: string) => property.includes(normalizedSearchQuery);

    return data.filter((country) => {
      const name = country.name.common.toLowerCase();
      const region = country.region.toLowerCase();
      const subRegion = country.subregion.toLowerCase();

      return search(name) || search(region) || search(subRegion);
    });
  }, [data, searchQuery]);

  return (
    <div className="space-y-4">
      <Table className="relative whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Flag</TableHead>
            <TableHead className="w-52">Name</TableHead>
            <TableHead>Population</TableHead>
            <TableHead>
              Area(Km<sup>2</sup>)
            </TableHead>

            <TableHead>Region</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || isFiltering ? (
            <TableSkeleton />
          ) : (
            filteredData?.map((country, index) => (
              <TableRow key={index} className="text-theme-off_white">
                <TableCell>
                  <a href={country.maps.googleMaps} target="_blank" referrerPolicy="no-referrer">
                    <div className="w-[54px] h-10 relative">
                      <Image
                        alt={country.flags.alt}
                        src={country.flags.png}
                        className="object-cover rounded-md shadow-md"
                        fill
                        sizes={RESP_SIZES}
                        priority
                        fetchPriority="auto"
                      />
                    </div>
                  </a>
                </TableCell>
                <TableCell>
                  <TooltipProvider delayDuration={400}>
                    <Tooltip>
                      <TooltipTrigger>{addEllipsis(country.name.common, 20)}</TooltipTrigger>
                      <TooltipContent>{country.name.official}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{formatNumberWithThousandSeparator(country.population)}</TableCell>
                <TableCell>{formatNumberWithThousandSeparator(country.area)}</TableCell>
                <TableCell>{country.region}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <CountryPagination />
    </div>
  );
};

export default CountryList;
