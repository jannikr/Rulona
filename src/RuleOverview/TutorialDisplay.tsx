import { Box, Container } from "@material-ui/core";
import React from "react";
import TutorialContentPlace from "../Info/TutorialContentPlace";
import TutorialContentRoute from "../Info/TutorialContentRoute";
import styles from "./TutorialDisplay.module.css";

const TutorialDisplay: React.FC = () => {
  return (
    <>
      <Box mt={8} className={styles.content}>
        <Container className={styles.outerBox}>
          <img className={styles.logo} src="/images/Logo.svg" alt="" />
          <Box className={styles.box}>
            <TutorialContentPlace />
          </Box>
          <Box className={styles.box}>
            <TutorialContentRoute />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TutorialDisplay;
