import { InputAdornment, OutlinedInput } from "@material-ui/core";
import React, { useCallback, useState, MouseEvent } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { ArrowBackIos, Cancel } from "@material-ui/icons";
import classnames from "classnames";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<Props> = (props) => {
  const { onChange, onFocus, onBlur } = props;

  const [icon, setIcon] = useState(
    <SearchIcon className={styles.searchIconColor} />
  );
  const [backArrow, setBackArrow] = useState(<></>);

  const onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
  };

  const onChangeWrapper = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIcon(<></>);
      } else {
        setIcon(
          <Cancel
            className={classnames(styles.searchIconColor, styles.button)}
            onMouseDown={onMouseDown}
            onClick={(): void => {
              e.target.value = "";
              setIcon(<></>);
              onChange(e);
            }}
          />
        );
      }
      onChange(e);
    },
    [onChange]
  );

  const onBlurWrapper = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIcon(<SearchIcon className={styles.searchIconColor} />);
        setBackArrow(<></>);
      } else {
        setIcon(<></>);
      }
      onBlur(e);
    },
    [onBlur]
  );

  const onFocusWrapper = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setBackArrow(
        <ArrowBackIos
          className={classnames(styles.button, styles.backArrow)}
          onClick={(): void => {
            e.target.value = "";
            onBlurWrapper(e);
          }}
        />
      );
      if (e.target.value === "") {
        setIcon(<></>);
      } else {
        setIcon(
          <Cancel
            className={classnames(styles.searchIconColor, styles.button)}
            onMouseDown={onMouseDown}
            onClick={(): void => {
              e.target.value = "";
              setIcon(<></>);
              onChange(e);
            }}
          />
        );
      }
      onFocus(e);
    },
    [onFocus, onChange, onBlurWrapper]
  );

  return (
    <div className={styles.row}>
      {backArrow}
      <OutlinedInput
        onChange={onChangeWrapper}
        onFocus={onFocusWrapper}
        onBlur={onBlurWrapper}
        className={styles.searchInput}
        placeholder="Suche"
        endAdornment={<InputAdornment position="end">{icon}</InputAdornment>}
      />
    </div>
  );
};

export default SearchField;
