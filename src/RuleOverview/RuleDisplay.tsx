import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Rule } from "../types";
import Highlighter from "./Higlighter";
import ReactDOMServer from "react-dom/server";
import styles from "./RuleDisplay.module.css";

interface Props {
  rule: Rule;
  searchWord: string;
}

const RuleDisplay: React.FC<Props> = (props) => {
  const { rule } = props;
  return (
    <div>
      <ReactMarkdown className={styles.content} children={rule.text} />
      <h2 className={styles.timestamp}>
        Zuletzt aktualisiert &nbsp;
        {rule.timestamp.slice(6, 9)}.{rule.timestamp.slice(4, 6)}.
        {rule.timestamp.slice(0, 4)}
      </h2>
    </div>
  );
  const { rule, searchWord } = props;

  const components = <Highlighter text={rule.text} searchWord={searchWord} />;
  const test = ReactDOMServer.renderToStaticMarkup(components);

  return <ReactMarkdown rehypePlugins={[rehypeRaw]} children={test} />;
};

export default RuleDisplay;
