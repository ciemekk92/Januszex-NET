import React from 'react';
import { useTranslation } from 'react-i18next';

import { PaginationProps } from 'Types/utils';
import { usePagination, DOTS } from 'Hooks';
import {
  StyledRow,
  StyledDotsButton,
  StyledNextButton,
  StyledPaginationButton,
  StyledPaginationButtonsContainer,
  StyledPaginationContainer,
  StyledPaginationLabel,
  StyledPreviousButton
} from './Pagination.styled';

interface Props {
  paginationProps: Nullable<PaginationProps>;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  paginationProps,
  onPageChange
}: Props): Nullable<JSX.Element> => {
  const { t } = useTranslation();
  if (!paginationProps) {
    return null;
  }

  const paginationRange = usePagination({ paginationProps, siblingCount: 3 });

  if (paginationRange!.length < 2) {
    return null;
  }

  const onPageChangeFactory = (page: number) => () => {
    onPageChange(page);
  };

  const onNext = () => {
    onPageChange(paginationProps.CurrentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(paginationProps.CurrentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];

  return (
    <StyledRow>
      <StyledPaginationContainer>
        <StyledPaginationLabel>
          {t('pagination.page', {
            page: paginationProps.CurrentPage,
            of: paginationProps.TotalPages
          })}
        </StyledPaginationLabel>
        <StyledPaginationButtonsContainer>
          <StyledPreviousButton
            disabled={paginationProps.CurrentPage === 1}
            onClick={onPrevious}
          />
          {paginationRange!.map((pageNumber: number | string) => {
            if (pageNumber === DOTS) {
              return <StyledDotsButton key={pageNumber} />;
            }

            return (
              <StyledPaginationButton
                selected={pageNumber === paginationProps.CurrentPage}
                onClick={onPageChangeFactory(pageNumber as number)}
                key={pageNumber}
              >
                {pageNumber}
              </StyledPaginationButton>
            );
          })}
          <StyledNextButton
            disabled={paginationProps.CurrentPage === lastPage}
            onClick={onNext}
          />
        </StyledPaginationButtonsContainer>
      </StyledPaginationContainer>
    </StyledRow>
  );
};
