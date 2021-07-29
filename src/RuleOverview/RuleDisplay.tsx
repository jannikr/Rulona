import React from "react";
import { Rule } from "../types";
import Highlighter from "react-highlight-words";
import styles from "./RuleOverview.module.css";

interface Props {
  rule: Rule;
  searchWord: string;
}

const RuleDisplay: React.FC<Props> = (props) => {
  const { rule, searchWord } = props;

  return (
    <div>
      <Highlighter
        highlightClassName={styles.highlight}
        searchWords={searchWord}
        textToHighlight={rule}
      />
    </div>
  );
};

export default RuleDisplay;
