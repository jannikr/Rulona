import { InputAdornment, OutlinedInput } from "@material-ui/core";
import React, { useCallback, useState, MouseEvent } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Clear } from "@material-ui/icons";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<Props> = (props) => {
  const { onChange, onFocus, onBlur } = props;

  const [icon, setIcon] = useState(<SearchIcon />);

  const onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
  };

  const onChangeWrapper = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIcon(<></>);
      } else {
        setIcon(
          <div
            className={styles.searchButton}
            onMouseDown={onMouseDown}
            onClick={(): void => {
              e.target.value = "";
              setIcon(<></>);
              onChange(e);
            }}
          >
            <Clear />
          </div>
        );
      }
      onChange(e);
    },
    [onChange]
  );

  const onFocusWrapper = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIcon(<></>);
      }
      onFocus(e);
    },
    [onFocus]
  );

  const onBlurWrapper = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIcon(<SearchIcon />);
      }
      onBlur(e);
    },
    [onBlur]
  );

  return (
    <OutlinedInput
      className={styles.searchInput}
      placeholder="Suche"
      onChange={onChangeWrapper}
      onFocus={onFocusWrapper}
      onBlur={onBlurWrapper}
      endAdornment={<InputAdornment position="end">{icon}</InputAdornment>}
    />
  );
};

export default SearchField;
