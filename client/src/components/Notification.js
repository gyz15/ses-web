import React, { useEffect, useState } from "react";
// TODO Alert
import axios from "../utils/axios-config";
import { Icon, Grid } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import Moment from "react-moment";
// INFO Component to show latest notifications
const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get the latest 5 dumps
    axios
      .get("/dumps/latest-five")
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      })
      .catch((e) => console.log(e.message));
  }, []);
  // console.log(process.env.NODE_ENV);
  let icon = {
    info: InfoIcon,
    warn: WarningIcon,
    danger: ReportIcon,
  };
  let color = {
    info: "#7baeed",
    warn: "#FFA500",
    danger: "#FF0000",
  };

  return (
    <div className="cyan-border">
      <h1>Latest notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((notification) => {
          return (
            <div key={notification.id}>
              {/* <Alert severity="info">
                <h3>
                  {notification.content}
                  <span className="float-right">{notification.created_at}</span>
                </h3>
                <p>{notification.message}</p>
              </Alert> */}
              <Grid container className="notification-box">
                <Grid item xs={1}>
                  <Icon
                    className="station-container"
                    component={icon[notification.level]}
                    htmlColor={color[notification.level]}
                    inheritViewBox
                  />
                </Grid>
                <div>
                  <h3 className="no-margin">{notification.content}</h3>
                  <span className="float-right">
                    <Moment fromNow>{notification.createdAt}</Moment>
                  </span>
                </div>
              </Grid>
            </div>
          );
        })
      ) : (
        <p>No notification found</p>
      )}
    </div>
  );
};

export default Notification;
