import { Tab, Tabs } from "@material-ui/core";
import React, { HTMLProps } from "react";
import PlacesSearch from "../PlacesSearch/PlacesSearch";
import RouteSearch from "../RouteSearch/RouteSearch";
import styles from "./Sidebar.module.css";
import Box from "@material-ui/core/Box";

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
    <>
      <div className={styles.tabHeader}>
        <Box boxShadow={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            classes={{
              indicator: styles.indicator,
            }}
          >
            <Tab label="Orte" />
            <Tab label="Route" />
          </Tabs>
        </Box>
      </div>
      <div>
        <TabPanel value={value} index={0} className={styles.tabContent}>
          <PlacesSearch />
        </TabPanel>
        <TabPanel value={value} index={1} className={styles.tabContent}>
          <RouteSearch />
        </TabPanel>
      </div>
    </>
  );
};

export default Sidebar;
