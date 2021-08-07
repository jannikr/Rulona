import { Box, Container } from "@material-ui/core";
import React from "react";
import TutorialBox from "./TutorialBox";
import styles from "./TutorialDisplay.module.css";

const TutorialDisplay: React.FC = () => {
  return (
    <>
      <Box mt={5} className={styles.content}>
        <Container className={styles.outerBox}>
          <img className={styles.logo} src="/images/Logo.svg" />
          <TutorialBox
            heading={"Finde Orte und Regeln"}
            text={
              "Finde deinen Wohnort und sehe auf einen Blick, welche Regeln und Vorschriften für dich gelten."
            }
            imageSource={"/images/tutorialImage1.png"}
          />
          <TutorialBox
            heading={"Plane deine Route"}
            text={
              "Komme sorgenfrei und sicher an dein Ziel. Rulona warnt dich vor Risiko-Gebieten auf deiner geplanten Route."
            }
            imageSource={"/images/tutorialImage2.png"}
          />
        </Container>
      </Box>
    </>
  );
};

export default TutorialDisplay;
