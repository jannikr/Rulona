import { InputAdornment, TextField } from "@material-ui/core";
import React, { useCallback, useState, MouseEvent, useRef } from "react";
import styles from "./SearchField.module.css";
import commonStyles from "../common.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { ArrowBackIos, Cancel } from "@material-ui/icons";
import classnames from "classnames";
import mergeRefs from "react-merge-refs";
import { setInputValue } from "../utils";

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClose?: () => void;
  autoFocus?: boolean;
}

enum Icon {
  Default = "Default",
  Empty = "Empty",
  Clear = "Clear",
}

const SearchField = React.forwardRef<HTMLInputElement | undefined, Props>(
  (props, ref) => {
    const { label, onChange, onFocus, onBlur, onClose, autoFocus } = props;
    const localInputRef = useRef<HTMLInputElement>();
    const [showBackArrow, setShowBackArrow] = useState(false);

    const [icon, setIcon] = useState(Icon.Default);

    const preventDefault = (e: MouseEvent): void => {
      e.preventDefault();
    };

    const icons = new Map([
      [Icon.Default, <SearchIcon />],
      [Icon.Empty, <></>],
      [
        Icon.Clear,
        <Cancel
          className={styles.button}
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
        setShowBackArrow(true);
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
        if (onBlur) onBlur(e);
      },
      [onBlur]
    );

    const onFocusWrapper = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setShowBackArrow(true);
        selectIcon(e);
        if (onFocus) onFocus(e);
      },
      [onFocus, selectIcon]
    );

    return (
      <div className={classnames(commonStyles.row, styles.row)}>
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
              onClose && onClose();
            }}
          />
        ) : (
          <></>
        )}
        <TextField
          variant="outlined"
          color="secondary"
          fullWidth
          autoFocus={autoFocus}
          label={label}
          className={styles.searchInput}
          inputRef={mergeRefs([localInputRef, ref])}
          onChange={onChangeWrapper}
          onFocus={onFocusWrapper}
          onBlur={onBlurWrapper}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className={commonStyles.greyDark}>
                {icons.get(icon)}
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
);

export default SearchField;
