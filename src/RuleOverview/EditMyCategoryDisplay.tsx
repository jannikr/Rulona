import React from "react";
import FavouriteCategory from "../Button/FavouriteCategory";
import { Category } from "../types";
import styles from "./RuleOverview.module.css";

interface Props {
  category: Category;
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category } = props;

  return (
    <div className={styles.row}>
      <span>{category.name}</span>
      <FavouriteCategory category={category} />
    </div>
  );
};

export default CategoryDisplay;
