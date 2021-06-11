import { Tab, Tabs } from "@material-ui/core";
import React, { HTMLProps } from "react";
import PlacesSearch from "../PlacesSearch/PlacesSearch";
import RouteSearch from "../RouteSearch/RouteSearch";
import styles from "./Sidebar.module.css";

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

const Sidebar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={styles.tabHeader}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab label="Orte" />
          <Tab label="Route" />
        </Tabs>
      </div>
      <div className={styles.tabContent}>
        <TabPanel value={value} index={0}>
          <PlacesSearch />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RouteSearch />
        </TabPanel>
      </div>
    </div>
  );
};

export default Sidebar;
