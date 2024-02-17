'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { useCountries } from '@/api/hooks/useCountries';
import { RESP_SIZES } from '@/constants/image';

const CountriesNeigbours = ({ borders }: { borders: string[] | undefined }) => {
  const { data } = useCountries();

  const neighbours = useMemo(
    () => borders?.map((border) => data?.filter((country) => country.cca3 === border)?.at(0)),
    [borders, data]
  );

  return (
    <>
      <h3 className="text-theme-dark_3 text-[15px]">Neighbouring Countries</h3>
      <div className="flex items-center flex-wrap gap-4">
        {neighbours?.map((neigbour, index) => {
          const name = neigbour?.name.common;
          return (
            <Link key={index} aria-label={name} role="link" href={`/country/${name}`}>
              <div className="w-[84px] h-[64px] relative">
                <Image
                  alt={neigbour?.flags.alt as string}
                  src={neigbour?.flags.png as string}
                  className="object-cover rounded-md shadow-md"
                  fill
                  sizes={RESP_SIZES}
                  priority
                  fetchPriority="auto"
                />
              </div>
              <span className="block text-[13px] text-theme-off_white mt-2">{name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CountriesNeigbours;
