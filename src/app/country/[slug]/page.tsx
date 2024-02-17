import { Metadata } from 'next';
import Image from 'next/image';

import { getCountry } from '@/api/hooks/useCountries';
import CountriesNeigbours from '@/components/country/countries-neighbours';
import { ArrayStringify } from '@/components/country/country-helpers';
import { RESP_SIZES } from '@/constants/image';
import { formatNumberWithThousandSeparator } from '@/utils';

type PageProps = {
  params: { slug: string };
};

export const dynamic = 'force-dynamic';

const CountryInfo = ({ label, value, className }: { label: string; value?: string; className?: string }) => {
  return (
    <div
      className={`flex items-center px-4 sm:px-6 justify-between py-5 border-t border-theme-dark_2 text-sm sm:text-[15px] ${className}`}
    >
      <h3 className="text-theme-dark_3 font-semibold">{label}</h3>
      <h4 className="text-theme-off_white">{value}</h4>
    </div>
  );
};

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const country = (await getCountry(slug)).at(0);

  return {
    title: country?.name.common,
    description: country?.flags.alt,
  };
}

const CountryDetailPage = async ({ params }: PageProps) => {
  const country = (await getCountry(params.slug)).at(0);

  return (
    <div className="page-wrapper max-w-3xl space-y-7 px-0">
      <div className="flex px-4 md:px-8 flex-col items-center -mt-[4.5rem]">
        <div className="max-w-64 w-full h-48 relative">
          <Image
            alt={country!.flags.alt}
            src={country!.flags.png}
            className="object-cover rounded-md shadow-md"
            fill
            sizes={RESP_SIZES}
            priority
          />
        </div>

        <div className="text-center space-y-3 mt-8 text-theme-off_white">
          <h2 className="text-4xl font-bold">{country?.name.common}</h2>
          <h4>{country?.name.official}</h4>
        </div>
      </div>

      <div className="flex px-4 md:px-8 flex-wrap items-center gap-3 sm:gap-6 justify-center max-w-xl mx-auto">
        <div className="info">
          <h5>Population</h5>
          <h6 className="pl-3">{formatNumberWithThousandSeparator(country!.population)}</h6>
        </div>

        <div className="info">
          <h5>
            Area(Km<sup>2</sup>)
          </h5>
          <h6 className="pl-3">{formatNumberWithThousandSeparator(country!.area)}</h6>
        </div>
      </div>

      <div className="space-y-5">
        <div className="divide-y divide-theme-dark_2 !mt-14">
          <CountryInfo label="Capital" value={country?.capital?.at(0)} />
          <CountryInfo label="Subregion" value={country?.subregion} />
          <CountryInfo label="Language" value={ArrayStringify(country?.languages)} />
          <CountryInfo
            label="Currencies"
            value={country?.currencies && Object.values(country?.currencies)?.at(0)?.name}
          />
          <CountryInfo className="!border-b" label="Continents" value={ArrayStringify(country?.continents as any)} />
        </div>

        <div className="px-4 sm:px-6 space-y-4">
          <CountriesNeigbours borders={country?.borders} />
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPage;
