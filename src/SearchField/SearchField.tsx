import { InputAdornment, TextField } from "@material-ui/core";
import React, { useCallback, useState, MouseEvent, useRef } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { ArrowBackIos, Cancel } from "@material-ui/icons";
import classnames from "classnames";

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

enum Icon {
  Default = "Default",
  Empty = "Empty",
  Clear = "Clear",
}

const SearchField: React.FC<Props> = (props) => {
  const { label, onChange, onFocus, onBlur } = props;
  const inputRef = useRef<HTMLInputElement>();
  const [showBackArrow, setShowBackArrow] = useState(false);

  const [icon, setIcon] = useState(Icon.Default);

  const preventDefault = (e: MouseEvent): void => {
    e.preventDefault();
  };

  const setValue = (value: string): void => {
    if (!inputRef.current) return;
    const prototype = Object.getPrototypeOf(inputRef.current);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    )?.set;
    prototypeValueSetter?.call(inputRef.current, value);
    inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const icons = new Map([
    [Icon.Default, <SearchIcon className={styles.searchIconColor} />],
    [Icon.Empty, <></>],
    [
      Icon.Clear,
      <Cancel
        className={classnames(styles.searchIconColor, styles.button)}
        onMouseDown={preventDefault}
        onClick={(): void => {
          if (!inputRef.current) return;
          setValue("");
          inputRef.current.focus();
        }}
      />,
    ],
  ]);

  const selectIcon = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIcon(Icon.Empty);
      } else {
        setIcon(Icon.Clear);
      }
    },
    [setIcon]
  );

  const onChangeWrapper = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      selectIcon(e);
      onChange(e);
    },
    [onChange, selectIcon]
  );

  const onBlurWrapper = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIcon(Icon.Default);
        setShowBackArrow(false);
      }
      onBlur(e);
    },
    [onBlur]
  );

  const onFocusWrapper = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setShowBackArrow(true);
      selectIcon(e);
      onFocus(e);
    },
    [onFocus, selectIcon]
  );

  return (
    <div className={styles.row}>
      {showBackArrow ? (
        <ArrowBackIos
          className={classnames(styles.button, styles.backArrow)}
          onMouseDown={preventDefault}
          onClick={(): void => {
            if (!inputRef.current) return;
            setValue("");
            // needs focus to properly blur, if not currently focused
            inputRef.current.focus();
            inputRef.current.blur();
          }}
        />
      ) : (
        <></>
      )}
      <TextField
        variant="outlined"
        fullWidth
        label={label}
        className={styles.searchInput}
        inputRef={inputRef}
        onChange={onChangeWrapper}
        onFocus={onFocusWrapper}
        onBlur={onBlurWrapper}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{icons.get(icon)}</InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchField;
