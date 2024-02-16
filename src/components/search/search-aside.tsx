import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const regions = [
  { id: 1, value: 'americans', label: 'Americas' },
  { id: 2, value: 'antarctic', label: 'Antarctic' },
  { id: 3, value: 'africa', label: 'Africa' },
  { id: 4, value: 'asia', label: 'Asia' },
  { id: 5, value: 'europe', label: 'Europe' },
  { id: 6, value: 'oceania', label: 'Oceania' },
];

const SearchAside = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-theme-dark_3 text-xs">Sort by</h4>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="population">Population</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h4 className="text-theme-dark_3 text-xs">Region</h4>
        <ToggleGroup type="single" value="americans">
          {regions.map((region) => (
            <ToggleGroupItem key={region.id} value={region.value} className="text-sm">
              {region.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-theme-dark_3 text-xs">Status</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="independant" />
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
