import { InputAdornment, OutlinedInput } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import styles from "./SearchField.module.css";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<Props> = (props) => {
  const { onChange, onFocus, onBlur } = props;

  return (
    <OutlinedInput
      className={styles.searchInput}
      placeholder="Suche"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

export default SearchField;
