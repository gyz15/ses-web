import React, { useEffect, useState } from "react";
import axios from "../utils/axios-config";
import { Grid, Icon, Alert } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const StationList = () => {
  const [station, setStation] = useState([]);
  useEffect(() => {
    axios.get("/stations").then((res) => {
      setStation(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className="cyan-border">
      <h1>Station List</h1>
      {station.length > 0 ? (
        station.map((station) => {
          return (
            <div key={station.id}>
              {/* Align this svg to center */}
              <h3>
                <Icon
                  className="station-container"
                  component={FiberManualRecordIcon}
                  fontSize="small"
                  htmlColor={station.active ? "#00FF83" : "#4b4b4b"}
                  inheritViewBox
                />
                {station.name}
              </h3>
            </div>
          );
        })
      ) : (
        <p>No station found</p>
      )}
    </div>
  );
};

export default StationList;
