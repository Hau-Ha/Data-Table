import React from "react";
import { useState, useMemo, useEffect } from "react";
import "./Table.css";
import { Sort, paginateRows } from "../../components/Sort";
import { Filter } from "../../components/Filter";
import { Pagination } from "../../components/Pagination";
import { TableData } from "./TableData";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpDown } from "@fortawesome/free-solid-svg-icons";

export const Table = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  const rowsPerPage = 10;

  const [rows, setRows] = useState([]);

  const columns = [
    { accessor: "id", label: "ID" },
    {
      accessor: "location",
      label: "Location",
      format: (value) => (value === null ? "N/A" : value),
    },

    {
      accessor: "connectionStatus",
      label: "ConnectionStatus (1 - online, 2 - pending, 3 - offline)",
      format: (value) =>
        value === 1 ? "online" : value === 2 ? "pending" : "offline",
    },
    {
      accessor: "stateOfCharge",
      label: "StateOfCharge",
      format: (value) => (value === null ? "N/A" : value),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries"
    )
      .then((response) => response.json())
      .then((json) => setRows(json));
    setIsLoading(false);
  }, []);

  const filteredRows = useMemo(() => Filter(rows, filters), [rows, filters]);
  const sortedRows = useMemo(() => Sort(filteredRows, sort), [
    filteredRows,
    sort,
  ]);
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead className="thead">
          <tr className="thead">
            {columns.map((column) => {
              return (
                <th className="th" key={column.accessor}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>
                    <FontAwesomeIcon icon={faUpDown} />
                  </button>
                </th>
              );
            })}
          </tr>
          <tr className="thead">
            {columns.map((column) => {
              return (
                <th className="th">
                  <input
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="tbody">
          {calculatedRows.map((row) => {
            return (
              <tr className="trBody" key={row.id}>
                <TableData
                  id={row.id}
                  location={row.location}
                  connectionStatusId={row.connectionStatusId}
                  stateOfCharge={row.stateOfCharge}
                  key={row.index}
                />
              </tr>
            );
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
