import React from 'react';

import ReactPaginate from 'react-paginate';

import { leftArrow, rightArrow } from '../../assets/icons';

import './pagination.scss';

interface Props {
  pageCount?: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
  currentPage?: number;
}

export const Pagination: React.FC<Props> = (props) => {
  const { pageCount, handlePageChange, currentPage } = props;

  return (
    <ReactPaginate
      pageCount={pageCount || 1}
      onPageChange={handlePageChange}
      marginPagesDisplayed={3}
      pageRangeDisplayed={1}
      nextLabel={<img src={rightArrow} alt={leftArrow} />}
      previousLabel={<img src={leftArrow} alt={leftArrow} />}
      containerClassName="pagination"
      pageLinkClassName="pagination--num"
      previousLinkClassName="pagination--num prev"
      nextLinkClassName="pagination--num next"
      activeLinkClassName="pagination--num active"
      breakClassName="pagination--num break"
      forcePage={currentPage}
    />
  );
};
