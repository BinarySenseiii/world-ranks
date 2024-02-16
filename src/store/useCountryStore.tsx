import { create } from 'zustand';

type SearchPayload = {
  searchQuery?: string;
  isFiltering?: boolean;
};

interface countryQueryState {
  query: {
    searchQuery: string;
    isFiltering: boolean;
  };
  actions: {
    setSearchQuery: (query: SearchPayload) => void;
  };
}

const useCountryStore = create<countryQueryState>()((set) => ({
  query: {
    searchQuery: '',
    isFiltering: false,
  },
  actions: {
    setSearchQuery: ({ searchQuery, isFiltering = false }) =>
      set((state) => ({
        query: { ...state.query, searchQuery: searchQuery ?? state.query.searchQuery, isFiltering },
      })),
  },
}));

export const useCountryQuery = () => useCountryStore((state) => state.query);
export const useCountryActions = () => useCountryStore((state) => state.actions);
