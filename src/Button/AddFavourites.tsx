import React from "react";
import { Bookmark } from "@material-ui/icons";
import styles from "../Button/AddFavourites.module.css";

const AddFavourite: React.FC = () => {
  return (
    <>
      <Bookmark className={styles.headingicon} />
    </>
  );
};

export default AddFavourite;
