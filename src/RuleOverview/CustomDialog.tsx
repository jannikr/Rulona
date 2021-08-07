import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import classnames from "classnames";
import _ from "lodash";
import { useState } from "react";
import styles from "./CustomDialog.module.css";

type Props = DialogProps & {
  link: string;
};

const CustomDialog: React.FC<Props> = (props) => {
  const { link, onClose, ...rest } = props;
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      className={styles.dialog}
      fullWidth={true}
      maxWidth={"sm"}
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
          onClick={(): void => {
            navigator.clipboard.writeText(link);
            setButtonClicked(true);
            setTimeout(() => {
              setButtonClicked(false);
            }, 3000);
          }}
          className={styles.copyButton}
          color={buttonClicked ? "primary" : "secondary"}
        >
          {buttonClicked ? "Kopiert" : "Link kopieren"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
