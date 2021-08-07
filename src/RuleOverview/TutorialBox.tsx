import { Box } from "@material-ui/core";
import React from "react";
import styles from "./TutorialBox.module.css";

interface Props {
  heading: string;
  text: string;
  imageSource: string;
}

const TutorialBox: React.FC<Props> = (props) => {
  const { heading, text, imageSource } = props;
  return (
    <Box className={styles.box}>
      <div className={styles.text}>
        <h2 className={styles.heading}>{heading}</h2>
        {text}
      </div>
      <img className={styles.image} src={imageSource} />
    </Box>
  );
};

export default TutorialBox;
