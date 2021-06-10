import { IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import styles from "./SearchField.module.css";

interface Props {
  search: () => void;
}

const SearchField: React.FC<Props> = (props) => {
  const { search } = props;

  return (
    <OutlinedInput
      className={styles.searchInput}
      placeholder="Suche"
      onChange={search}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={search}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default SearchField;
