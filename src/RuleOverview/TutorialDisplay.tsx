import { Box, Container } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import TutorialContentPlace from "../Info/TutorialContentPlace";
import TutorialContentRoute from "../Info/TutorialContentRoute";
import styles from "./TutorialDisplay.module.css";
import commonStyles from "../common.module.css";

const TutorialDisplay: React.FC = () => {
  return (
    <Box className={classnames(commonStyles.scrollVert, styles.content)}>
      <Container className={styles.outerBox}>
        <img className={styles.logo} src="/images/Logo.svg" alt="" />
        <Box className={classnames(commonStyles.row, styles.box)}>
          <TutorialContentPlace />
        </Box>
        <Box className={classnames(commonStyles.row, styles.box)}>
          <TutorialContentRoute />
        </Box>
      </Container>
    </Box>
  );
};

export default TutorialDisplay;
