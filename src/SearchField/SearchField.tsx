import { InputAdornment, TextField } from "@material-ui/core";
import React, { useCallback, useState, MouseEvent, useRef } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { ArrowBackIos, Cancel } from "@material-ui/icons";
import classnames from "classnames";
import mergeRefs from "react-merge-refs";
import { setInputValue } from "../utils";

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

const SearchField = React.forwardRef<HTMLInputElement | undefined, Props>(
  (props, ref) => {
    const { label, onChange, onFocus, onBlur } = props;
    const localInputRef = useRef<HTMLInputElement>();
    const [showBackArrow, setShowBackArrow] = useState(false);

    const [icon, setIcon] = useState(Icon.Default);

    const preventDefault = (e: MouseEvent): void => {
      e.preventDefault();
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
            if (!localInputRef.current) return;
            setInputValue("", localInputRef);
            localInputRef.current.focus();
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
              if (!localInputRef.current) return;
              setInputValue("", localInputRef);
              // needs focus to properly blur, if not currently focused
              localInputRef.current.focus();
              localInputRef.current.blur();
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
          inputRef={mergeRefs([localInputRef, ref])}
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
  }
);

export default SearchField;
