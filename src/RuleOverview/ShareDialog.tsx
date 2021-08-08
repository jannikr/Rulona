import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Close, Share } from "@material-ui/icons";
import classnames from "classnames";
import _ from "lodash";
import { useState } from "react";
import styles from "./ShareDialog.module.css";

type Props = Omit<DialogProps, "open" | "onClose"> & {
  open?: boolean;
  path: string;
};

const ShareDialog: React.FC<Props> = (props) => {
  const { path, ...rest } = props;
  const link = new URL(path, window.location.origin).toString();
  const [showDialog, setShowDialog] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const onClose = (): void => {
    setShowDialog(false);
  };

  return (
    <>
      <IconButton
        onClick={(e): void => {
          e.stopPropagation();
          setShowDialog(!showDialog);
        }}
      >
        <Share />
      </IconButton>
      <Dialog
        open={showDialog}
        onClose={onClose}
        className={styles.dialog}
        fullWidth={true}
        maxWidth={"sm"}
        {...rest}
      >
        <DialogTitle>
          <div className={styles.row}>
            <b>Link teilen</b>
            <Close className={styles.closeButton} onClick={onClose || _.noop} />
          </div>
        </DialogTitle>
        <DialogContent className={classnames(styles.row, styles.dialogRow)}>
          <TextField
            defaultValue={link}
            onFocus={(event): void => {
              event.target.select();
            }}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth={true}
            className={styles.linkField}
          />
          <Button
            variant="contained"
            disableElevation
            onClick={(e): void => {
              e.stopPropagation();
              navigator.clipboard.writeText(link);
              if (!buttonClicked) {
                setButtonClicked(true);
                setTimeout(() => {
                  setButtonClicked(false);
                }, 3000);
              }
            }}
            className={classnames(
              styles.copyButton,
              buttonClicked ? styles.clicked : styles.unclicked
            )}
          >
            {buttonClicked ? "Kopiert" : "Link kopieren"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareDialog;
