import Image from 'next/image';

import { getCountry } from '@/api/hooks/useCountries';
import { RESP_SIZES } from '@/constants/image';
import { formatNumberWithThousandSeparator } from '@/utils';

export const dynamic = 'force-dynamic';

const CountryDetailPage = async ({ params }: { params: { slug: string } }) => {
  const country = (await getCountry(params.slug)).at(0);
  return (
    <div className="page-wrapper max-w-3xl space-y-6">
      <div className="flex flex-col items-center -mt-[4.5rem]">
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

      <div className="flex flex-wrap items-center gap-3 sm:gap-6 justify-center max-w-xl mx-auto">
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
    </div>
  );
};

export default CountryDetailPage;
