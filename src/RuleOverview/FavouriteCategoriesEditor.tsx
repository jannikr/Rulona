import { Divider } from "@material-ui/core";
import React from "react";
import FavouriteCategory from "../Button/FavouriteCategory";
import { Category } from "../types";
import styles from "./FavouriteCategoriesEditor.module.css";
import commonStyles from "../common.module.css";
import classnames from "classnames";

interface Props {
  category: Category;
}

const FavouriteCategoriesEditor: React.FC<Props> = (props) => {
  const { category } = props;

  return (
    <div>
      <div className={classnames(commonStyles.row, styles.row)}>
        <span className={styles.categoryName}>{category.name}</span>
        <FavouriteCategory category={category} />
      </div>
      <Divider />
    </div>
  );
};

export default FavouriteCategoriesEditor;
