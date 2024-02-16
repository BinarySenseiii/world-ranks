import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

const TableSkeleton = () => {
  return Array(20)
    .fill(null)
    .map((_: unknown, index: number) => (
      <TableRow key={index} className="text-theme-off_white">
        <TableCell>
          <Skeleton className="w-[54px] h-10 rounded-md shadow-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-40 h-3 rounded-lg shadow-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-40 h-3 rounded-lg shadow-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-40 h-3 rounded-lg shadow-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-32 h-3 rounded-lg shadow-md" />
        </TableCell>
      </TableRow>
    ));
};

export default TableSkeleton;
