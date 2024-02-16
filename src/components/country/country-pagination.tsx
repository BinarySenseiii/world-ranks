import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface CountryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const CountryPagination: React.FC<CountryPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbersToShow = 4;

    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

    if (endPage - startPage < pageNumbersToShow - 1) {
      startPage = Math.max(1, endPage - pageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink className="cursor-pointer" isActive={currentPage === i} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={cn('hidden md:flex', {
            'cursor-not-allowed': currentPage === 1,
          })}
        >
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage === 1 ? 'pointer-events-none' : 'pointer-events-auto'}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem
          className={cn('hidden md:flex', {
            'cursor-not-allowed': currentPage === totalPages,
          })}
        >
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={currentPage === totalPages ? 'pointer-events-none' : 'pointer-events-auto'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CountryPagination;
