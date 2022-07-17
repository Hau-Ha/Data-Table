import React from "react";
import { Link } from "react-router-dom";
import "./SingleUserData.css";

export const SingleUserData = ({
  id,
  location,
  connectionStatusId,
  stateOfCharge,
  capacity,
  voltage,
  stateOfHealth,
  recentIssues,
  lastConnectionTime,
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

  function formatStateOfHealth(stateOfHealths) {
    if (stateOfHealths === null) {
      return "N/A";
    } else {
      return stateOfHealth;
    }
  }

  function formatConnectionStatusId(connectionStatusIds) {
    if (connectionStatusIds === 1) {
      return "online";
    } else if (connectionStatusIds === 2) {
      return "pending";
    } else {
      return " offline";
    }
  }

  return (
    <>
      <p className="td">
        ID:
        <span> {id}</span>
      </p>
      <p className="td">
        LastConnectionTime:
        <span> {lastConnectionTime}</span>
      </p>
      <p className="td">
        Location:
        <span> {formatLocation(location)}</span>
      </p>
      <p className="td">
        ConnectionStatusId:
        <span
          className={`status -${formatConnectionStatusId(
            connectionStatusId
          )} `}>
          {" "}
          {formatConnectionStatusId(connectionStatusId)}
        </span>
      </p>
      <p className="td">
        StateOfCharge:
        <span> {formatStateOfCharge(stateOfCharge)} &#37;</span>
      </p>
      <p className="td">
        Capacity:
        <span>{capacity} (A⋅h)</span>
      </p>
      <p className="td">
        Voltage:
        <span>{voltage} (V)</span>
      </p>
      <p className="td">
        StateOfHealth:
        <span> {formatStateOfHealth(stateOfHealth)} &#37;</span>
      </p>
      <p className="td">
        RecentIssues:
        <span> {recentIssues.toString()}</span>
      </p>
      <div className="btn-container">
        <button className="btn">
          <Link to={"/"} className="disabled-link">
            <span>Back</span>
          </Link>
        </button>
      </div>
    </>
  );
};
