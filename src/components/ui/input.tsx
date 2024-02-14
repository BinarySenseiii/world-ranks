import { Search } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative w-full max-w-96 h-10">
      <Search className="absolute top-2/4 transform -translate-y-2/4 text-theme-dark_3 left-3" size={17} />
      <input
        type={type}
        className={cn(
          'flex w-full h-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-dark_3 disabled:cursor-not-allowed disabled:opacity-50 bg-theme-dark_2 placeholder:text-sm pl-9',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
