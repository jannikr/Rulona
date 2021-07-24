import React from "react";
import ReactMarkdown from "react-markdown";
import { Rule } from "../types";
import styles from "./RuleDisplay.module.css";

interface Props {
  rule: Rule;
}

const RuleDisplay: React.FC<Props> = (props) => {
  const { rule } = props;
  return (
    <div>
      <ReactMarkdown className={styles.links} children={rule.text} />
      <h2 className={styles.timestamp}>
        Zuletzt aktualisiert &nbsp;
        {rule.timestamp.slice(6, 9)}.{rule.timestamp.slice(4, 6)}.
        {rule.timestamp.slice(0, 4)}
      </h2>
    </div>
  );
};

export default RuleDisplay;
