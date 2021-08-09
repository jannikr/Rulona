import React from "react";
import styles from "./RuleOverview.module.css";

interface Props {
  text: string;
  searchWord?: string;
}

const Highlighter: React.FC<Props> = (props) => {
  const { text, searchWord } = props;

  const regex = new RegExp(
    `(${searchWord})` + String.raw`(?![^\(\)]*\))`,
    "gi"
  );
  const parts = text.split(regex);

  if (!searchWord || !searchWord.trim()) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {parts
        .filter((part) => part)
        .map((part, i) =>
          regex.test(part) ? (
            <span key={i} className={styles.highlight}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </span>
  );
};

export default Highlighter;
