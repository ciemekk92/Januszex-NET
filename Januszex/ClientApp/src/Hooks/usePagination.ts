import React from 'react';
import { PaginationProps } from '../Types/utils';

interface Props {
  paginationProps: PaginationProps;
  siblingCount: number;
}

const range = (start: number, end: number): number[] => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

export const usePagination = ({ paginationProps, siblingCount = 1 }: Props) => {
  const { TotalCount, CurrentPage, PageSize, TotalPages } = paginationProps;
  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= TotalPages) {
      return range(1, TotalPages);
    }

    const leftSiblingIndex = Math.max(CurrentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(CurrentPage + siblingCount, TotalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < TotalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = TotalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, TotalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(TotalPages - rightItemCount + 1, TotalPages);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [TotalCount, PageSize, siblingCount, CurrentPage]);

  return paginationRange;
};
