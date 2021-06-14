import React from "react";
import Bookmark from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";

const AddFavourite: React.FC = () => {
  return (
    <>
      <IconButton>
        <Bookmark />
      </IconButton>
    </>
  );
};

export default AddFavourite;
