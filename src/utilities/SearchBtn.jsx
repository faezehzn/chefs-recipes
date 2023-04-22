import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { ImSearch } from "react-icons/im";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCustomContext } from "../context/customContext";
 

const SearchBtn = () => {
  const { handleSearchTotalSubmit, txtInputRef } = useCustomContext();
  const [searchShow, setSearchShow] = useState(false);

  return (
    <Wrapper>
      <Button
        className="navigation__right--icon"
        onClick={() => setSearchShow(true)}
      >
        <ImSearch size={15} className="search--icon" />
      </Button>
      <Modal
        className="modal-search"
        fullscreen={true}
        show={searchShow}
        onHide={() => setSearchShow(false)}
        animation={true}
      >
        <Modal.Header
          className="modal-search__header"
          closeButton
        ></Modal.Header>
        <Modal.Body className="modal-search__body">
          <Form className="d-flex form-search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 form-search__input"
              aria-label="Search"
              ref={txtInputRef}
            />
            <Link reloadDocument to={`/`}>
              <Button onClick={(e)=> handleSearchTotalSubmit(e)} variant="outline-success form-search__btn">
                <ImSearch className="search-icon--box" />
              </Button>
            </Link>
          </Form>
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};

export default SearchBtn;

const Wrapper = styled.section`
  display: flex;
  .navigation__right--icon,
  .navigation__right--icon:hover {
    background-color: transparent !important;
    border: none !important;
    padding: 0.2rem 0.5rem !important;
    box-shadow: none;
  }
  .search--icon {
    color: var(--light);
  }
`;
