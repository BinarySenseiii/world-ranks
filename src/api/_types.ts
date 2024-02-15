type FlagData = {
  png: string;
  svg: string;
  alt: string;
};

type NativeName = {
  official: string;
  common: string;
};

type CountryName = {
  common: string;
  official: string;
  nativeName: {
    ell: NativeName;
    tur: NativeName;
  };
};

export type CountryData = {
  flags: FlagData;
  name: CountryName;
  region: string;
  area: number;
  population: number;
};
