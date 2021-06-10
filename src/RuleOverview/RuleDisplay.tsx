import React from "react";
import ReactMarkdown from "react-markdown";
import { Rule } from "../types";

interface Props {
  rule: Rule;
}

const RuleDisplay: React.FC<Props> = (props) => {
  const { rule } = props;
  return <ReactMarkdown children={rule.text} />;
};

export default RuleDisplay;
