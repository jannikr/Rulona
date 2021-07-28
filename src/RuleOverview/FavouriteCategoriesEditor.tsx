import { Divider } from "@material-ui/core";
import React from "react";
import FavouriteCategory from "../Button/FavouriteCategory";
import { Category } from "../types";
import styles from "./FavouriteCategoriesEditor.module.css";

interface Props {
  category: Category;
}

const FavouriteCategoriesEditor: React.FC<Props> = (props) => {
  const { category } = props;

  return (
    <div>
      <div className={styles.row}>
        <span>{category.name}</span>
        <FavouriteCategory category={category} />
      </div>
      <Divider />
    </div>
  );
};

export default FavouriteCategoriesEditor;
