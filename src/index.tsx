import { loadDynamicConstants } from "./constants";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootStyles } from "./utils";
import { ColorVariables } from "./types";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: rootStyles.getPropertyValue(ColorVariables.Primary),
    },
    secondary: {
      main: rootStyles.getPropertyValue(ColorVariables.Secondary),
    },
  },
});

loadDynamicConstants().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store()}>
          <App />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
