import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CustomButton from "./CustomButton";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

const Pagination = ({
  totalItems,
  itemsPerPage,
  setCurrentPage,
  currentPage,
  className
}) => {
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }
  if (totalItems <= itemsPerPage) {
    setCurrentPage(1);
  }

  const handlaNextPage = ()=> {
    setCurrentPage(currentPage + 1)

    if(currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlaPrevPage = ()=> {
    setCurrentPage(currentPage - 1)

    if((currentPage - 1) % minPageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  return (
    <Wrapper>
      {pages.length > 1 ? (
        <div className={className + " pagination"}>

          {/* prev btn */}
          <CustomButton
            onClick={handlaPrevPage}
            disabled={currentPage === 1}
            textBtn={<AiOutlineLeft />}
            className="pagination__btn btn-prev" classNameParent='mx-1'
          />

          {/* prev dots */}
          {minPageNumberLimit >= 1 && <CustomButton disabled={currentPage === 1} className="pagination__btn btn-prev" classNameParent='mx-1' textBtn={<HiOutlineDotsHorizontal/>} />}

          {/* page numbers */}
          {pages.map((page, index) => {
            if(page < maxPageNumberLimit+1 && page > minPageNumberLimit) {
              return (
                <CustomButton key={index} textBtn={page} onClick={() => setCurrentPage(page)} className={
                  page === currentPage
                    ? "pagination__btn active"
                    : "pagination__btn"
                } classNameParent='mx-1'/>
              );
            } else {
              return null
            }
          })}

          {/* next dots */}
          {pages.length > maxPageNumberLimit && <CustomButton disabled={currentPage === Math.ceil(totalItems / itemsPerPage)} className="pagination__btn btn-next" classNameParent='mx-1' textBtn={<HiOutlineDotsHorizontal/>} />}

          {/* next btn */}
          <CustomButton
            onClick={handlaNextPage}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            textBtn={<AiOutlineRight />}
            className="pagination__btn btn-next" classNameParent='mx-1'
          />
        </div>
      ) : null}
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  .pagination {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    .pagination__btn {
      background-color: var(--white);
      color: var(--orange) !important;
      margin: 0.2rem;
      width: 3rem !important;
      border: none !important;
      box-shadow: var(--shadow);
      border-radius: 50%;
      transition: var(--transition-fast);
    }
    .pagination__btn:disabled {
      background-color: transparent !important;
      color: var(--gray) !important;
    }
    .pagination__btn::before {
      background-color: var(--orange) !important;
    }
    .active,
    .pagination__btn:hover {
      color: var(--white) !important;
      background-color: var(--orange) !important;
    }
    .pagination__btn:disabled:hover {
      background-color: transparent !important;
      color: var(--gray) !important;
      opacity: 1 !important;
    }
    .btn-next, .btn-prev {
      width: 2rem !important;
      height: 2rem !important;
      padding: 0.2rem !important;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 450px) {
      .pagination__btn {
        width: 2rem !important;
        height: 2rem;
      }
      .btn-next, .btn-prev {
        width: 1.3rem !important;
        height: 1.3rem !important;
      }
    }
  }
`;