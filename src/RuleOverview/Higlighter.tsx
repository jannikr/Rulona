import React from "react";
import ReactMarkdown from "react-markdown";
import { Rule } from "../types";

interface Props {
  text: string;
  searchWord: string;
}

const Highlighter: React.FC<Props> = (props) => {
  const { text, searchWord } = props;
  return <span></span>;
};

export default Highlighter;
