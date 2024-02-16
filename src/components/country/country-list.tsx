'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { useCountries } from '@/api/hooks/useCountries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RESP_SIZES } from '@/constants/image';
import { useCountryActions, useCountryQuery } from '@/store/useCountryStore';
import { addEllipsis, formatNumberWithThousandSeparator, sleep } from '@/utils';
import { filterData, sortData } from './country-helpers';
import CountryNotFound from './country-not-found';
import CountryPagination from './country-pagination';
import TableSkeleton from './skeleton/table-skeleton';

const CountryList = () => {
  const { isFiltering, searchQuery, region, checked, sortBy } = useCountryQuery();
  const { setTotalCountries, setSearchQuery } = useCountryActions();
  const { data, isLoading } = useCountries();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!data || !data.length) {
      return [];
    }

    const normalizedSearchQuery = searchQuery?.toLowerCase() ?? '';
    const search = (property: string) => property.includes(normalizedSearchQuery);

    let filteredCountries = data.filter((country) => filterData(country, search));

    if (region !== 'all') {
      filteredCountries = filteredCountries.filter((country) => country.region.toLowerCase().includes(region!));
    }

    if (checked !== undefined) {
      filteredCountries = filteredCountries.filter((country) => country.independent === checked);
    }

    if (sortBy) {
      filteredCountries = sortData(filteredCountries, sortBy);
    }

    return filteredCountries;
  }, [checked, data, region, searchQuery, sortBy]);

  useEffect(() => {
    setTotalCountries(filteredData?.length ?? 0);
  }, [filteredData, setTotalCountries]);

  const ITEMS_PER_PAGE = 20;

  const totalCountries = filteredData?.length ?? 0;
  const totalPages = Math.ceil(totalCountries / ITEMS_PER_PAGE);

  const handlePageChange = async (pageNumber: number) => {
    setSearchQuery({ isFiltering: true });

    await sleep(1000);

    setCurrentPage(pageNumber);
    window.scrollTo({ top: 250, behavior: 'smooth' });
    setSearchQuery({ isFiltering: false });
  };

  useEffect(() => setCurrentPage(1), [searchQuery, region, checked, sortBy]);

  return (
    <div className="space-y-7">
      <Table className="whitespace-nowrap">
        {!isLoading && filteredData?.length === 0 && <CountryNotFound />}

        <TableHeader>
          <TableRow>
            <TableHead className="w-24 pl-0">Flag</TableHead>
            <TableHead className="w-52">Name</TableHead>
            <TableHead>Population</TableHead>
            <TableHead>
              Area(Km<sup>2</sup>)
            </TableHead>

            <TableHead className="pr-0">Region</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || isFiltering ? (
            <TableSkeleton />
          ) : (
            filteredData
              ?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
              ?.map((country, index) => (
                <TableRow key={index} className="text-theme-off_white">
                  <TableCell className="pl-0">
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
                  <TableCell className="pr-0">{country.region}</TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>

      {filteredData?.length > ITEMS_PER_PAGE && (
        <CountryPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default CountryList;
