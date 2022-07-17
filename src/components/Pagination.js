/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faBackwardFast,
  faForward,
  faForwardFast,
} from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className="pagination">
        <button
          className="btn"
          disabled={activePage === 1}
          onClick={() => setActivePage(1)}>
          <FontAwesomeIcon icon={faBackwardFast} /> First
        </button>
        <button
          className="btn"
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}>
          <FontAwesomeIcon icon={faBackward} /> Previous
        </button>
        <button
          className="btn"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}>
          Next <FontAwesomeIcon icon={faForward} />
        </button>
        <button
          className="btn"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}>
          Last <FontAwesomeIcon icon={faForwardFast} />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontWeight: "bold",
        }}>
        <p>
          Page {activePage} of {totalPages}
        </p>
        <p>
          Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
      </div>
    </>
  );
};
