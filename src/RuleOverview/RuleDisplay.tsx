import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Rule } from "../types";
import Highlighter from "./Higlighter";
import ReactDOMServer from "react-dom/server";

interface Props {
  rule: Rule;
  searchWord: string;
}

const RuleDisplay: React.FC<Props> = (props) => {
  const { rule, searchWord } = props;

  const components = <Highlighter text={rule.text} searchWord={searchWord} />;
  const test = ReactDOMServer.renderToStaticMarkup(components);

  return <ReactMarkdown rehypePlugins={[rehypeRaw]} children={test} />;
};

export default RuleDisplay;
