import React, { useEffect, useState } from "react";
import "./SingleUser.css";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import { SingleUserData } from "./SingleUserData.js";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Chart } from "./Chart";

export const SingleUser = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const singleUserApiUrl = `https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id=${params.userId}`;

    setIsLoading(true);
    fetch(singleUserApiUrl)
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        setData(json.measurements);
        setData2(json.recentIssues);
        setIsLoading(false);
      });
  }, [params]);

  const timeconvert = (time) => {
    return moment(time)
      .utc()
      .format("MM-DD-YYYY, h:mm:ss a");
  };

  const newArr = data.map((obj) => {
    return {
      timestamp: (obj.timestamp = moment(obj.timestamp)
        .utc()
        .format("h:mm a,MM-DD")),
      ...obj,
    };
  });

  const newArr2 = data2.map((element, index) => {
    if (element === 1) {
      return "deep discharge";
    } else if (element === 2) {
      return "overheating";
    } else if (element === 3) {
      return " unknown anomaly";
    } else {
      return "missing data";
    }
  });
  return (
    <div className="container">
      {isLoading ? <LoadingSpinner /> : <Chart data={newArr} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SingleUserData
          id={user.id}
          location={user.location}
          connectionStatusId={user.connectionStatusId}
          stateOfCharge={user.stateOfCharge}
          key={user.index}
          capacity={user.capacity}
          voltage={user.voltage}
          stateOfHealth={user.stateOfHealth}
          lastConnectionTime={timeconvert(user.lastConnectionTime)}
          recentIssues={newArr2}
        />
      )}
    </div>
  );
};
