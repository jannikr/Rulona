import { Tab, Tabs } from "@material-ui/core";
import React, { HTMLProps } from "react";
import PlacesSearch from "../PlacesSearch/PlacesSearch";
import RouteSearch from "../RouteSearch/RouteSearch";
import styles from "./Sidebar.module.css";
import Box from "@material-ui/core/Box";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

interface TabPanelProps extends HTMLProps<HTMLDivElement> {
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, index, value } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
};

const Sidebar: React.FC<RouteComponentProps> = (props) => {
  const { match } = props;
  const path = match.path;
  const defaultValue = 0;
  const [value, setValue] = React.useState(
    path.startsWith("/route") ? 1 : defaultValue
  );

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <>
      <div className={styles.tabHeader}>
        <Box boxShadow={3}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab component={Link} label="Orte" to="/rules" />
            <Tab component={Link} label="Route" to="/route" />
          </Tabs>
        </Box>
      </div>
      <TabPanel value={value} index={0}>
        <PlacesSearch />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RouteSearch />
      </TabPanel>
    </>
  );
};

export default withRouter(Sidebar);
