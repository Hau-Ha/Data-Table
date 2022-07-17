import React from "react";
import "./TableData.css";
import { Link } from "react-router-dom";
export const TableData = ({
  id,
  location,
  connectionStatusId,
  stateOfCharge,
}) => {
  function formatLocation(locations) {
    if (locations === null) {
      return "N/A";
    } else {
      return location;
    }
  }

  function formatStateOfCharge(stateOfCharges) {
    if (stateOfCharges === null) {
      return "N/A";
    } else {
      return stateOfCharges;
    }
  }

  function formatConnectionStatusId(connectionStatusIds) {
    if (connectionStatusIds === 1) {
      return "online";
    } else if (connectionStatusIds === 2) {
      return "pending";
    } else {
      return "offline";
    }
  }
  return (
    <>
      <td className="td">
        <Link to={`/${id}`}>
          <span>{id}</span>
        </Link>
      </td>
      <td className="td ">
        <span>{formatLocation(location)}</span>
      </td>
      <td className={`td`}>
        <span
          className={`status -${formatConnectionStatusId(connectionStatusId)}`}>
          {formatConnectionStatusId(connectionStatusId)}
        </span>
      </td>
      <td className="td">
        <span>{formatStateOfCharge(stateOfCharge)} &#37;</span>
      </td>
    </>
  );
};
