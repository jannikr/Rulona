import React from "react";
import { Container } from "@material-ui/core";
import styles from "./Info.module.css";

interface Props {
  text: string;
}

const Info: React.FC<Props> = (props) => {
  const { text } = props;
  return <Container className={styles.container}>{text}</Container>;
};

export default Info;
