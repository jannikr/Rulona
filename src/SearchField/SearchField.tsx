import { InputAdornment, OutlinedInput } from "@material-ui/core";
import React from "react";
import styles from "./SearchField.module.css";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
}

const SearchField: React.FC<Props> = (props) => {
  const { onChange, onFocus, onBlur, icon } = props;

  return (
    <OutlinedInput
      className={styles.searchInput}
      placeholder="Suche"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      endAdornment={<InputAdornment position="end">{icon}</InputAdornment>}
    />
  );
};

export default SearchField;
