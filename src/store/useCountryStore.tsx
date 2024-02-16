import { CheckedState } from '@radix-ui/react-checkbox';
import { create } from 'zustand';

type queryType = {
  searchQuery?: string;
  isFiltering?: boolean;
  region?: string;
  checked?: CheckedState;
  sortBy?: string;
};

interface countryQueryState {
  totalCountries: number;
  query: queryType;
  actions: {
    setSearchQuery: (query: queryType) => void;
    setTotalCountries: (total: number) => void;
    reset: () => void;
  };
}

const initialState = {
  searchQuery: '',
  region: 'all',
  isFiltering: false,
  checked: true,
  sortBy: 'population',
};

const useCountryStore = create<countryQueryState>()((set) => ({
  totalCountries: 0,
  query: {
    ...initialState,
  },
  actions: {
    setSearchQuery: ({ searchQuery, isFiltering = false, region, checked, sortBy }) =>
      set((state) => {
        const queryUpdate = region
          ? { region, isFiltering }
          : checked !== undefined
            ? { checked, isFiltering }
            : sortBy
              ? { sortBy, isFiltering }
              : { searchQuery: searchQuery ?? state.query.searchQuery, isFiltering };

        return { query: { ...state.query, ...queryUpdate } };
      }),

    setTotalCountries: (total) => set(() => ({ totalCountries: total })),
    reset: () => set(() => ({ query: initialState })),
  },
}));

export const useCountryQuery = () => useCountryStore((state) => state.query);
export const useCountryCount = () => useCountryStore((state) => state.totalCountries);
export const useCountryActions = () => useCountryStore((state) => state.actions);
