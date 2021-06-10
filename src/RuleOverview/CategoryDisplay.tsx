import React from "react";
import { Category, Rule } from "../types";
import RuleDisplay from "./RuleDisplay";

interface Props {
  category: Category;
  rules: Rule[];
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules } = props;
  return (
    <>
      <h3>{category.name}</h3>
      {rules.map((rule) => (
        <RuleDisplay key={rule.id} rule={rule} />
      ))}
    </>
  );
};

export default CategoryDisplay;
