import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import styles from "./CustomDialog.module.css";

type Props = DialogProps & {
  link: string;
};

const CustomDialog: React.FC<Props> = (props) => {
  const { link, ...rest } = props;
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <>
      <Dialog {...rest}>
        <DialogTitle>{link}</DialogTitle>
      </Dialog>

      <Dialog
        {...rest}
        className={styles.dialog}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Link teilen</DialogTitle>
        <DialogContent className={styles.dialogRow}>
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
            color={buttonClicked ? "secondary" : "primary"}
          >
            {buttonClicked ? "Kopiert" : "Link kopieren"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDialog;
