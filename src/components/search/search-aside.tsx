'use client';

import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useCountryActions, useCountryQuery } from '@/store/useCountryStore';
import { sleep } from '@/utils';

const regions = ['All', 'Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania'];

const SearchAside = () => {
  const { region, checked, sortBy } = useCountryQuery();
  const { setSearchQuery } = useCountryActions();

  const commonSearchQueryLogic = async (params: { region?: string; checked?: CheckedState; sortBy?: string }) => {
    setSearchQuery({ ...params, isFiltering: true });

    await sleep(1000);

    setSearchQuery({ isFiltering: false });
  };

  const onValueChangeHandle = async (region: string) => {
    await commonSearchQueryLogic({ region });
  };

  const onCheckedHandle = async (checked: CheckedState) => {
    await commonSearchQueryLogic({ checked });
  };

  const onSortChangeHandle = async (sortBy: string) => {
    await commonSearchQueryLogic({ sortBy });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-theme-dark_3 text-xs">Sort by</h4>
        <Select value={sortBy} onValueChange={onSortChangeHandle}>
          <SelectTrigger>
            <SelectValue placeholder="population" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="population">Population</SelectItem>
            <SelectItem value="area">
              Area(Km<sup>2</sup>)
            </SelectItem>

            <SelectItem value="a-z">Alphabetically, A-Z</SelectItem>
            <SelectItem value="z-a">Alphabetically, Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h4 className="text-theme-dark_3 text-xs">Region</h4>
        <ToggleGroup type="single" value={region} onValueChange={onValueChangeHandle}>
          {regions.map((reg, index) => (
            <ToggleGroupItem key={index} value={reg.toLowerCase()} className="text-sm">
              {reg}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-theme-dark_3 text-xs">Status</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="independant" checked={checked} onCheckedChange={onCheckedHandle} />
            <label
              htmlFor="independant"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Independant
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAside;
