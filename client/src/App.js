import GoogleFontLoader from "react-google-font-loader";
import "./App.css";
import Notification from "./components/Notification";
import Header from "./components/Header";
import StationList from "./components/StationList";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto Mono",
            weights: [400, 700],
          },
        ]}></GoogleFontLoader>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <StationList />
        </Grid>
        <Grid item xs={7}>
          <Notification />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
