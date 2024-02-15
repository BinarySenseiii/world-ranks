'use client';

import Image from 'next/image';

import { useCountries } from '@/api/hooks/useCountries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatNumberWithThousandSeparator } from '@/utils';

const CountryList = () => {
  const { data } = useCountries();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Flag</TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Population</TableHead>
          <TableHead>
            Area(Km<sup>2</sup>)
          </TableHead>

          <TableHead>Region</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((country, index) => (
          <TableRow key={index}>
            <TableCell>
              <Image
                alt={country.flags.alt}
                src={country.flags.png}
                height={40}
                width={80}
                className="h-10 w-16 object-cover rounded-md shadow-md"
              />
            </TableCell>
            <TableCell>
              <TooltipProvider delayDuration={400}>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="line-clamp-1">{country.name.common}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{country.name.official}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{formatNumberWithThousandSeparator(country.population)}</TableCell>
            <TableCell>{formatNumberWithThousandSeparator(country.area)}</TableCell>
            <TableCell>{country.region}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CountryList;
