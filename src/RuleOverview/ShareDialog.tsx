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
import commonStyles from "../common.module.css";

type Props = Omit<DialogProps, "open" | "onClose"> & {
  open?: boolean;
  path: string;
};

const ShareDialog: React.FC<Props> = (props) => {
  const { path, ...rest } = props;
  const link = new URL(path, window.location.origin).toString();
  const [showDialog, setShowDialog] = useState(false);
  const [clicked, setClicked] = useState(false);

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
        onClick={(e): void => e.stopPropagation()}
        onClose={onClose}
        className={styles.dialog}
        fullWidth={true}
        maxWidth={"sm"}
        {...rest}
      >
        <DialogTitle>
          <div className={commonStyles.row}>
            <b>Link teilen</b>
            <IconButton
              onClick={onClose || _.noop}
              className={commonStyles.grey}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent
          className={classnames(commonStyles.row, styles.dialogRow)}
        >
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
            color={clicked ? "primary" : "secondary"}
            disableElevation
            onClick={(e): void => {
              e.stopPropagation();
              navigator.clipboard.writeText(link);
              if (!clicked) {
                setClicked(true);
                setTimeout(() => {
                  setClicked(false);
                }, 3000);
              }
            }}
            className={styles.copyButton}
          >
            {clicked ? "Kopiert" : "Link kopieren"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareDialog;
